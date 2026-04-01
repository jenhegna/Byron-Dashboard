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

// Byron brand palette + accessible supporting colors
const BYRON_GOLD   = '#FDB913';
const BYRON_BLACK  = '#1C1C1C';
const BYRON_GOLD_D = '#C49200';

const CHART_COLORS = [
  BYRON_GOLD,
  '#2D5FA6',   // blue
  '#1C1C1C',   // black
  '#C49200',   // dark gold
  '#6B7280',   // slate
  '#0EA5E9',   // sky
  '#10B981',   // emerald
];

interface ChartProps {
  data: FinancialRecord[];
}

const tooltipStyle = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.15)',
  fontSize: '13px',
};

// ── Revenue Sources Donut ────────────────────────────────────────────────────

export const RevenueSourceChart: React.FC<ChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
        No Revenue Data
      </div>
    );
  }

  const aggregated = data
    .filter(r => r.Type === 'R')
    .reduce((acc, curr) => {
      const code = parseInt(curr.SrcObj || "0", 10);
      let key = "Other";
      if (code < 100)               key = "Local Property Taxes";
      else if (code >= 200 && code < 400) key = "State Aid";
      else if (code >= 400 && code < 500) key = "Federal Sources";
      else if (code >= 600)         key = "Local Sales & Other";

      if (!acc[key]) acc[key] = { name: key, value: 0 };
      acc[key].value += curr.FY26YTD;
      return acc;
    }, {} as Record<string, { name: string; value: number }>);

  const chartData = Object.values(aggregated)
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  if (chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
        No Revenue Data to Display
      </div>
    );
  }

  return (
    <div className="h-[340px] w-full">
      <h4 className="text-sm font-semibold text-slate-600 mb-3">Revenue Sources</h4>
      <ResponsiveContainer width="100%" height="92%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="47%"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), '']}
            contentStyle={tooltipStyle}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(v) => <span style={{ fontSize: 11, color: '#64748b' }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── Expenses by Object Horizontal Bar ───────────────────────────────────────

export const ExpenseObjectChart: React.FC<ChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const aggregated = data
    .filter(r => r.Type === 'E')
    .reduce((acc, curr) => {
      let key = curr.SourceObject || 'Other';
      if      (key.includes("Salaries"))           key = "Salaries & Wages";
      else if (key.includes("Benefits"))           key = "Employee Benefits";
      else if (key.includes("Purchased Services")) key = "Purchased Services";
      else if (key.includes("Supplies"))           key = "Supplies & Materials";
      else if (key.includes("Capital"))            key = "Capital Expenditures";
      else if (key.includes("Debt"))               key = "Debt Service";

      if (!acc[key]) acc[key] = { name: key, value: 0 };
      acc[key].value += curr.FY26YTD;
      return acc;
    }, {} as Record<string, { name: string; value: number }>);

  const chartData = Object.values(aggregated)
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-[350px] w-full">
      <h4 className="text-sm font-semibold text-slate-600 mb-4">Expenses by Object</h4>
      <ResponsiveContainer width="100%" height="92%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            tickFormatter={(val) => `$${formatCompactNumber(val)}`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'YTD Expense']}
            contentStyle={tooltipStyle}
            cursor={{ fill: '#fdf8e1' }}
          />
          <Bar
            dataKey="value"
            name="YTD Expense"
            fill={BYRON_GOLD}
            radius={[0, 6, 6, 0]}
            barSize={26}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── Budget vs Actual by Program ──────────────────────────────────────────────

export const ProgramExpenseChart: React.FC<ChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const aggregated = data
    .filter(r => r.Type === 'E')
    .reduce((acc, curr) => {
      let key = curr.Program1 || 'General';
      if      (key.includes("Administration"))    key = "Administration";
      else if (key.includes("Regular Instr"))     key = "Regular Instruction";
      else if (key.includes("Special Education")) key = "Special Education";
      else if (key.includes("Vocational"))        key = "Vocational";
      else if (key.includes("Pupil Support"))     key = "Pupil Support";
      else if (key.includes("Sites & Buildings")) key = "Sites & Buildings";
      else if (key.includes("Instructional Support")) key = "Instructional Support";
      else if (key.includes("Community"))         key = "Community Service";

      if (!acc[key]) acc[key] = { name: key, budget: 0, actual: 0 };
      acc[key].actual += curr.FY26YTD;
      acc[key].budget += curr.FY26Budget;
      return acc;
    }, {} as Record<string, { name: string; budget: number; actual: number }>);

  const chartData = Object.values(aggregated)
    .filter(d => d.budget > 0 || d.actual > 0)
    .sort((a, b) => b.actual - a.actual);

  return (
    <div className="h-[340px] w-full">
      <h4 className="text-sm font-semibold text-slate-600 mb-3">Budget vs. Actual by Program</h4>
      <ResponsiveContainer width="100%" height="92%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickFormatter={(value) => `$${formatCompactNumber(value)}`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={tooltipStyle}
          />
          <Legend
            verticalAlign="top"
            iconSize={10}
            formatter={(v) => <span style={{ fontSize: 12, color: '#475569' }}>{v}</span>}
          />
          <Bar dataKey="budget" name="Budget"     fill="#e2e8f0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" name="YTD Actual" fill={BYRON_GOLD} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
