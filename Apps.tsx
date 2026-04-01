import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Filter,
  Briefcase,
  Users,
  AlertCircle,
  PiggyBank,
  LayoutGrid,
} from 'lucide-react';
import { parseCSV, formatCurrency } from './utils/dataProcessing';
import { FinancialRecord, DashboardMetrics } from './types';
import KPICard from './components/KPICard';
import { RevenueSourceChart, ExpenseObjectChart, ProgramExpenseChart } from './components/Charts';
import DataTable from './components/DataTable';
import Header from './components/Header';
import { GOOGLE_SHEET_URL } from './constants';

type TypeFilter = 'All' | 'R' | 'E';

function App() {
  const [data, setData] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [selectedFund, setSelectedFund] = useState<string>('All');
  const [selectedOrg, setSelectedOrg] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<TypeFilter>('All');

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
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdmin(true);
    if (params.get('mode') === 'embed') setIsEmbed(true);

    fetchData();

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
        setLastUpdated(new Date());
      };
      reader.readAsText(file);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const fundMatch = selectedFund === 'All' || item.FundDescription === selectedFund;
      const orgMatch = selectedOrg === 'All' || item.Organization === selectedOrg;
      const typeMatch = selectedType === 'All' || item.Type === selectedType;
      return fundMatch && orgMatch && typeMatch;
    });
  }, [data, selectedFund, selectedOrg, selectedType]);

  // Always compute metrics over all types regardless of type filter (so KPIs stay accurate)
  const metricsData = useMemo(() => {
    return data.filter(item => {
      const fundMatch = selectedFund === 'All' || item.FundDescription === selectedFund;
      const orgMatch = selectedOrg === 'All' || item.Organization === selectedOrg;
      return fundMatch && orgMatch;
    });
  }, [data, selectedFund, selectedOrg]);

  const metrics: DashboardMetrics = useMemo(() => {
    return metricsData.reduce((acc, curr) => {
      if (curr.Type === 'R') {
        acc.totalRevenueBudget += curr.FY26Budget;
        acc.totalRevenueActual += curr.FY26YTD;
      } else if (curr.Type === 'E') {
        acc.totalExpenseBudget += curr.FY26Budget;
        acc.totalExpenseActual += curr.FY26YTD;
        acc.totalEncumbered += curr.EncumbranceAmt;
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
  }, [metricsData]);

  metrics.netIncomeActual = metrics.totalRevenueActual - metrics.totalExpenseActual;

  const budgetRemaining = metrics.totalExpenseBudget - metrics.totalExpenseActual - metrics.totalEncumbered;
  const salaryRatio = metrics.totalExpenseActual
    ? (metrics.salaryBenefitsExpense / metrics.totalExpenseActual * 100).toFixed(1)
    : "0.0";

  const uniqueFunds = useMemo(() =>
    ['All', ...Array.from(new Set(data.map(item => item.FundDescription))).filter(Boolean).sort()],
    [data]
  );
  const uniqueOrgs = useMemo(() =>
    ['All', ...Array.from(new Set(data.map(item => item.Organization))).filter(Boolean).sort()],
    [data]
  );

  const selectClass = "pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-byron-gold shadow-sm w-full appearance-none cursor-pointer hover:border-byron-gold transition-colors disabled:opacity-50";

  return (
    <div className={`min-h-screen font-sans ${isEmbed ? 'bg-white' : 'bg-slate-50 pb-12'}`}>

      {!isEmbed && (
        <Header
          isAdmin={isAdmin}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={fetchData}
          onFileUpload={handleManualFileUpload}
        />
      )}

      <main className={`max-w-7xl mx-auto ${isEmbed ? 'p-2' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-sm">{error}</span>
            <button onClick={fetchData} className="ml-auto underline text-sm hover:text-red-800 font-medium">
              Try Again
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && !data.length && (
          <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full border-4 border-byron-gold-light border-t-byron-gold animate-spin" />
              </div>
              <p className="text-slate-600 font-semibold text-sm">Loading Financial Data…</p>
            </div>
          </div>
        )}

        {/* Page Title & Filters */}
        <div className={`mb-6 bg-white rounded-xl shadow-sm border border-slate-100 ${isEmbed ? 'p-3' : 'p-5'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={`${isEmbed ? 'text-lg' : 'text-2xl'} font-bold text-slate-900 flex items-center gap-2`}>
                <LayoutGrid className="w-6 h-6 text-byron-gold" />
                Financial Overview
              </h1>
              {!isEmbed && (
                <p className="text-slate-400 mt-1 text-sm">
                  FY26 Budget vs. Actual · Live from District Records
                </p>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">

              {/* Type Toggle */}
              <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm font-medium">
                {(['All', 'R', 'E'] as TypeFilter[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    disabled={loading}
                    className={`px-3 py-2 transition-colors ${
                      selectedType === t
                        ? 'bg-byron-gold text-byron-black font-semibold'
                        : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {t === 'All' ? 'All' : t === 'R' ? 'Revenue' : 'Expenses'}
                  </button>
                ))}
              </div>

              {/* Fund Select */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className={selectClass}
                  disabled={loading}
                >
                  {uniqueFunds.map(f => (
                    <option key={f} value={f}>{f === 'All' ? 'All Funds' : f}</option>
                  ))}
                </select>
              </div>

              {/* Org Select */}
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className={selectClass}
                  disabled={loading}
                >
                  {uniqueOrgs.map(o => (
                    <option key={o} value={o}>{o === 'All' ? 'All Sites' : o}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="YTD Revenue"
            value={formatCurrency(metrics.totalRevenueActual)}
            subValue={`Budget: ${formatCurrency(metrics.totalRevenueBudget)}`}
            icon={TrendingUp}
            colorClass="bg-byron-gold"
            iconTextClass="text-byron-black"
          />
          <KPICard
            title="YTD Expenses"
            value={formatCurrency(metrics.totalExpenseActual)}
            subValue={`Budget: ${formatCurrency(metrics.totalExpenseBudget)}`}
            icon={TrendingDown}
            colorClass="bg-byron-black"
            iconTextClass="text-white"
          />
          <KPICard
            title="Encumbered Funds"
            value={formatCurrency(metrics.totalEncumbered)}
            subValue="Committed / Open POs"
            icon={DollarSign}
            colorClass="bg-amber-500"
            iconTextClass="text-white"
          />
          <KPICard
            title="Budget Remaining"
            value={formatCurrency(budgetRemaining)}
            subValue="Unencumbered Expense Budget"
            icon={PiggyBank}
            colorClass={budgetRemaining >= 0 ? 'bg-emerald-600' : 'bg-red-500'}
            iconTextClass="text-white"
          />
        </div>

        {/* Secondary KPI: Personnel Ratio */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Personnel Cost Ratio</p>
                <p className="text-xl font-bold text-slate-900">{salaryRatio}%</p>
              </div>
            </div>
            <div className="flex-1 mx-6 hidden sm:block">
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className="bg-byron-gold h-3 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(parseFloat(salaryRatio), 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Salaries & Benefits as % of Total YTD Expenses</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">{formatCurrency(metrics.salaryBenefitsExpense)}</p>
              <p className="text-xs text-slate-400">of {formatCurrency(metrics.totalExpenseActual)}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-1 min-h-[350px]">
            <RevenueSourceChart data={metricsData} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 min-h-[350px]">
            <ProgramExpenseChart data={metricsData} />
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[350px]">
            <ExpenseObjectChart data={metricsData} />
          </div>
        </div>

        {/* Data Table */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Transaction Records</h3>
          {filteredData.length > 0 && (
            <span className="text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium">
              {filteredData.length.toLocaleString()} records
            </span>
          )}
        </div>
        <DataTable data={filteredData} />

      </main>
    </div>
  );
}

export default App;
