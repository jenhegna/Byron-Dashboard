import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FinancialRecord } from '../types';
import { formatCompactNumber, formatCurrency } from '../utils/dataProcessing';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

interface ChartProps {
  data: FinancialRecord[];
}

export const RevenueSourceChart: React.FC<ChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
      return <div className="h-full w-full flex items-center justify-center text-slate-400">No Revenue Data</div>;
  }

  // Aggregate Revenue by Source Category
  const aggregated = data
    .filter(r => r.Type === 'R')
    .reduce((acc, curr) => {
        let key = "Other";
        // Safety check for numeric conversion
        const code = parseInt(curr.SrcObj || "0", 10);
        
        if (code < 100) key = "Local Property Taxes & Fees";
        else if (code >= 200 && code < 400) key = "State Aid";
        else if (code >= 400 && code < 500) key = "Federal Sources";
        else if (code >= 600) key = "Local Sales & Other";
        
        if (!acc[key]) {
            acc[key] = { name: key, value: 0 };
        }
        acc[key].value += curr.FY26YTD;
        return acc;
    }, {} as Record<string, { name: string; value: number }>);

  const chartData = Object.values(aggregated).sort((a, b) => b.value - a.value);
  
  if (chartData.length === 0) {
      return <div className="h-full w-full flex items-center justify-center text-slate-400">No Revenue Data to Display</div>;
  }

  return (
    <div className="h-[350px] w-full relative">
       <h4 className="text-sm font-semibold text-slate-500 absolute top-0 left-0 mb-2">Revenue Sources</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             formatter={(value: number) => formatCurrency(value)}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ExpenseObjectChart: React.FC<ChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Aggregate Expenses by Object Code Group (UFARS standard)
  const aggregated = data
    .filter(r => r.Type === 'E')
    .reduce((acc, curr) => {
        let key = curr.SourceObject || 'Other';
        // Grouping similar items
        if (key.includes("Salaries")) key = "Salaries & Wages";
        else if (key.includes("Benefits") || key.includes("Employee Benefits")) key = "Employee Benefits";
        else if (key.includes("Purchased Services")) key = "Purchased Services";
        else if (key.includes("Supplies")) key = "Supplies & Materials";
        else if (key.includes("Capital")) key = "Capital Expenditures";
        else if (key.includes("Debt")) key = "Debt Service";
        
        if (!acc[key]) {
            acc[key] = { name: key, value: 0 };
        }
        acc[key].value += curr.FY26YTD;
        return acc;
    }, {} as Record<string, { name: string; value: number }>);

  const chartData = Object.values(aggregated)
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-[350px] w-full">
        <h4 className="text-sm font-semibold text-slate-500 mb-4">Expenses by Object</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
          <XAxis type="number" tickFormatter={(val) => `$${formatCompactNumber(val)}`} />
          <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{fill: '#f1f5f9'}}
          />
          <Bar dataKey="value" name="YTD Expense" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProgramExpenseChart: React.FC<ChartProps> = ({ data }) => {
   if (!data || data.length === 0) return null;

   // Group by Program (Program1 column)
   const aggregated = data
    .filter(r => r.Type === 'E')
    .reduce((acc, curr) => {
        let key = curr.Program1 || 'General';
        // Group small programs
        if (key.includes("Administration")) key = "Administration";
        else if (key.includes("Regular Instr")) key = "Regular Instruction";
        else if (key.includes("Special Education")) key = "Special Education";
        else if (key.includes("Vocational")) key = "Vocational";
        else if (key.includes("Pupil Support")) key = "Pupil Support";
        else if (key.includes("Sites & Buildings")) key = "Sites & Buildings";
        else if (key.includes("Instructional Support")) key = "Instructional Support";
        else if (key.includes("Community")) key = "Community Service";
        
        if (!acc[key]) {
            acc[key] = { name: key, budget: 0, actual: 0 };
        }
        acc[key].actual += curr.FY26YTD;
        acc[key].budget += curr.FY26Budget;
        return acc;
   }, {} as Record<string, { name: string; budget: number; actual: number }>);

   const chartData = Object.values(aggregated)
    .sort((a, b) => b.actual - a.actual);

   return (
    <div className="h-[400px] w-full">
      <h4 className="text-sm font-semibold text-slate-500 mb-4">Budget vs Actual by Program</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: '#64748b' }} 
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tickFormatter={(value) => `$${formatCompactNumber(value)}`}
            tick={{ fontSize: 12, fill: '#64748b' }} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" />
          <Bar dataKey="budget" name="Budget" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" name="YTD Actual" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
   )
}