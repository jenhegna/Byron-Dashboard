import React, { useState, useMemo } from 'react';
import { FinancialRecord } from '../types';
import { formatCurrency } from '../utils/dataProcessing';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';

interface DataTableProps {
  data: FinancialRecord[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof FinancialRecord>('FY26YTD');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  const itemsPerPage = 10;

  const handleSort = (field: keyof FinancialRecord) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const searchFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(row =>
      (row.GlaDesc || '').toLowerCase().includes(q) ||
      (row.FundDescription || '').toLowerCase().includes(q) ||
      (row.Organization || '').toLowerCase().includes(q) ||
      (row.SourceObject || '').toLowerCase().includes(q)
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    return [...searchFiltered].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [searchFiltered, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Th: React.FC<{ field: keyof FinancialRecord; label: string; align?: string }> = ({
    field, label, align = ''
  }) => (
    <th
      className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors select-none ${align}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-1 ${align.includes('right') ? 'justify-end' : ''}`}>
        {label}
        <ArrowUpDown className={`w-3 h-3 flex-shrink-0 ${sortField === field ? 'text-byron-gold' : 'text-slate-300'}`} />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search descriptions, funds, orgs…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-byron-gold transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <Th field="FundDescription" label="Fund" />
              <Th field="Organization"    label="Org" />
              <Th field="GlaDesc"         label="Description" />
              <Th field="Type"            label="Type" />
              <Th field="FY26Budget"      label="Budget"     align="text-right" />
              <Th field="FY26YTD"         label="YTD Actual" align="text-right" />
              <Th field="EncumbranceAmt"  label="Encumbered" align="text-right" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                  No records match your filters.
                </td>
              </tr>
            ) : paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-byron-gold-light transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800 font-medium">{row.FundDescription}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{row.Organization}</td>
                <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate" title={row.GlaDesc}>{row.GlaDesc}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.Type === 'R'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {row.Type === 'R' ? 'Revenue' : 'Expense'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 text-right tabular-nums">{formatCurrency(row.FY26Budget)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800 font-semibold text-right tabular-nums">{formatCurrency(row.FY26YTD)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400 text-right tabular-nums">{formatCurrency(row.EncumbranceAmt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-100">
        <p className="text-sm text-slate-500">
          {sortedData.length === 0
            ? 'No results'
            : <>Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</span>–<span className="font-semibold text-slate-800">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of <span className="font-semibold text-slate-800">{sortedData.length.toLocaleString()}</span></>
          }
        </p>
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-byron-gold-light hover:border-byron-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-sm text-slate-600 font-medium">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-byron-gold-light hover:border-byron-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DataTable;
