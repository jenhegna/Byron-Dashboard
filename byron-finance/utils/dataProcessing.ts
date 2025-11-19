import Papa from 'papaparse';
import { FinancialRecord } from '../types';

export const parseCSV = (csvText: string): FinancialRecord[] => {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false, 
  });

  return results.data.map((row: any) => ({
    Type: row['Type'] as 'R' | 'E',
    Fund: row['Fund'],
    Org: row['Org'],
    Program: row['Program'],
    Course: row['Course'],
    Finance: row['Finance'],
    SrcObj: row['Src/Obj'],
    GlaDesc: row['gla_desc'],
    FundDescription: row['Fund Description'],
    Organization: row['Organization'],
    FY26Budget: parseFloat(row['FY26 Budget'] || '0'),
    FY26YTD: parseFloat(row['FY26 YTD'] || '0'),
    EncumbranceAmt: parseFloat(row['encumbrance_amt'] || '0'),
    Program1: row['Program1'] ? row['Program1'].replace(/^[0-9]+\s+/, '') : '',
    FinanceDescription: row['Finance Description'],
    SourceObject: row['Source/Object'] ? row['Source/Object'].replace(/^[0-9]+\s+/, '') : '',
  }));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactNumber = (number: number) => {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
};