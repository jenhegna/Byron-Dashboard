import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Filter,
  Briefcase,
  Users,
  AlertCircle
} from 'lucide-react';
import { parseCSV, formatCurrency } from './utils/dataProcessing';
import { FinancialRecord, DashboardMetrics } from './types';
import KPICard from './components/KPICard';
import { RevenueSourceChart, ExpenseObjectChart, ProgramExpenseChart } from './components/Charts';
import DataTable from './components/DataTable';
import Header from './components/Header';
import { GOOGLE_SHEET_URL } from './constants';

function App() {
  const [data, setData] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [selectedFund, setSelectedFund] = useState<string>('All');
  const [selectedOrg, setSelectedOrg] = useState<string>('All');
  
  // Access Control States
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmbed, setIsEmbed] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const csvText = await response.text();
      const parsed = parseCSV(csvText);
      
      if (parsed.length === 0) {
        throw new Error("No data found in the spreadsheet. Please check the published link.");
      }

      setData(parsed);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Parse URL Parameters for View Modes
    const params = new URLSearchParams(window.location.search);
    
    // ?admin=true : Shows the CSV Import button
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
    
    // ?mode=embed : Hides navigation and adjusts padding for Iframe use
    if (params.get('mode') === 'embed') {
      setIsEmbed(true);
    }

    // 2. Initial Data Fetch
    fetchData();
    
    // Optional: Auto-refresh every 5 minutes if embedded
    let intervalId: NodeJS.Timeout;
    if (params.get('mode') === 'embed') {
       intervalId = setInterval(fetchData, 5 * 60 * 1000); 
    }
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleManualFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);
        setData(parsed);
        setLoading(false);
        setLastUpdated(new Date()); // Technically updated, though manual
      };
      reader.readAsText(file);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const fundMatch = selectedFund === 'All' || item.FundDescription === selectedFund;
      const orgMatch = selectedOrg === 'All' || item.Organization === selectedOrg;
      return fundMatch && orgMatch;
    });
  }, [data, selectedFund, selectedOrg]);

  const metrics: DashboardMetrics = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      if (curr.Type === 'R') {
        acc.totalRevenueBudget += curr.FY26Budget;
        acc.totalRevenueActual += curr.FY26YTD;
      } else if (curr.Type === 'E') {
        acc.totalExpenseBudget += curr.FY26Budget;
        acc.totalExpenseActual += curr.FY26YTD;
        acc.totalEncumbered += curr.EncumbranceAmt;
        
        // Calculate Salaries & Benefits for Ratio
        const srcObj = curr.SourceObject || "";
        if (srcObj.includes("Salaries") || srcObj.includes("Benefits")) {
            acc.salaryBenefitsExpense += curr.FY26YTD;
        }
      }
      return acc;
    }, {
      totalRevenueBudget: 0,
      totalRevenueActual: 0,
      totalExpenseBudget: 0,
      totalExpenseActual: 0,
      netIncomeActual: 0,
      totalEncumbered: 0,
      salaryBenefitsExpense: 0
    });
  }, [filteredData]);

  metrics.netIncomeActual = metrics.totalRevenueActual - metrics.totalExpenseActual;

  // Unique lists for filters
  const uniqueFunds = useMemo(() => ['All', ...Array.from(new Set(data.map(item => item.FundDescription))).filter(Boolean).sort()], [data]);
  const uniqueOrgs = useMemo(() => ['All', ...Array.from(new Set(data.map(item => item.Organization))).filter(Boolean).sort()], [data]);

  const salaryRatio = metrics.totalExpenseActual ? (metrics.salaryBenefitsExpense / metrics.totalExpenseActual * 100).toFixed(1) : "0.0";

  return (
    // BG color changes to white in embed mode to blend with Google Sites
    <div className={`min-h-screen font-sans ${isEmbed ? 'bg-white' : 'bg-slate-50 pb-12'}`}>
      
      {/* Header Component */}
      {!isEmbed && (
        <Header 
          isAdmin={isAdmin}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={fetchData}
          onFileUpload={handleManualFileUpload}
        />
      )}

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto ${isEmbed ? 'p-2' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
        
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button onClick={fetchData} className="ml-auto underline text-sm hover:text-red-800">Try Again</button>
          </div>
        )}

        {/* Loading Skeleton Overlay (Optional simple version) */}
        {loading && !data.length && (
             <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
                 <div className="flex flex-col items-center animate-pulse">
                     <div className="h-8 w-8 bg-blue-600 rounded-full mb-2 animate-bounce"></div>
                     <p className="text-slate-600 font-medium">Loading Financial Data...</p>
                 </div>
             </div>
        )}

        {/* Page Title & Filters */}
        <div className={`mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-slate-100 ${isEmbed ? 'p-3' : 'p-4'}`}>
          <div>
            <h1 className={`${isEmbed ? 'text-lg' : 'text-2xl'} font-bold text-slate-900`}>
              Financial Overview
            </h1>
            {!isEmbed && <p className="text-slate-500 mt-1 text-sm">Live Snapshot from District Records</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={selectedFund} 
                onChange={(e) => setSelectedFund(e.target.value)}
                className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                disabled={loading}
              >
                {uniqueFunds.map(f => <option key={f} value={f}>{f === 'All' ? 'All Funds' : f}</option>)}
              </select>
            </div>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={selectedOrg} 
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                disabled={loading}
              >
                {uniqueOrgs.map(o => <option key={o} value={o}>{o === 'All' ? 'All Sites' : o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard 
            title="YTD Revenue" 
            value={formatCurrency(metrics.totalRevenueActual)} 
            subValue={`Budget: ${formatCurrency(metrics.totalRevenueBudget)}`}
            icon={TrendingUp}
            colorClass="bg-emerald-500"
          />
          <KPICard 
            title="YTD Expenses" 
            value={formatCurrency(metrics.totalExpenseActual)} 
            subValue={`Budget: ${formatCurrency(metrics.totalExpenseBudget)}`}
            icon={TrendingDown}
            colorClass="bg-blue-500"
          />
           <KPICard 
            title="Encumbered Funds" 
            value={formatCurrency(metrics.totalEncumbered)} 
            subValue="Committed / POs"
            icon={DollarSign}
            colorClass="bg-amber-500"
          />
           <KPICard 
            title="Personnel Cost Ratio" 
            value={`${salaryRatio}%`} 
            subValue="of Total Expenses"
            icon={Users}
            colorClass="bg-indigo-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1 min-h-[350px]">
            <RevenueSourceChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2 min-h-[350px]">
             <ProgramExpenseChart data={filteredData} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[350px]">
                <ExpenseObjectChart data={filteredData} />
            </div>
        </div>

        {/* Data Table */}
        {/* Shown by default, or could be toggled off in embed mode if space is tight */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-bold text-slate-900">Detail Transaction Records</h3>
          </div>
          <DataTable data={filteredData} />
        </div>

      </main>
    </div>
  );
}

export default App;