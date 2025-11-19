export interface FinancialRecord {
  Type: 'R' | 'E'; // Revenue or Expense
  Fund: string;
  Org: string;
  Program: string;
  Course: string;
  Finance: string;
  SrcObj: string; // Mapped from "Src/Obj"
  GlaDesc: string;
  FundDescription: string;
  Organization: string;
  FY26Budget: number;
  FY26YTD: number;
  EncumbranceAmt: number;
  Program1: string;
  FinanceDescription: string;
  SourceObject: string;
}

export interface FilterState {
  fund: string;
  organization: string;
  type: 'All' | 'R' | 'E';
}

export interface DashboardMetrics {
  totalRevenueBudget: number;
  totalRevenueActual: number;
  totalExpenseBudget: number;
  totalExpenseActual: number;
  netIncomeActual: number;
  totalEncumbered: number;
  salaryBenefitsExpense: number;
}