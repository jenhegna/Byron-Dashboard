{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 interface\cf0 \strokec4  \cf5 \strokec5 FinancialRecord\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf5 \strokec5 Type\cf0 \strokec4 : \cf6 \strokec6 'R'\cf0 \strokec4  | \cf6 \strokec6 'E'\cf0 \strokec4 ; \cf7 \strokec7 // Revenue or Expense\cf0 \cb1 \strokec4 \
\cb3   \cf5 \strokec5 Fund\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Org\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Program\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Course\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Finance\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 SrcObj\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ; \cf7 \strokec7 // Mapped from "Src/Obj"\cf0 \cb1 \strokec4 \
\cb3   \cf5 \strokec5 GlaDesc\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 FundDescription\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Organization\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 FY26Budget\cf0 \strokec4 : \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 FY26YTD\cf0 \strokec4 : \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 EncumbranceAmt\cf0 \strokec4 : \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 Program1\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 FinanceDescription\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 SourceObject\cf0 \strokec4 : \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 interface\cf0 \strokec4  \cf5 \strokec5 FilterState\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   fund: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   organization: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 type\cf0 \strokec4 : \cf6 \strokec6 'All'\cf0 \strokec4  | \cf6 \strokec6 'R'\cf0 \strokec4  | \cf6 \strokec6 'E'\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 interface\cf0 \strokec4  \cf5 \strokec5 DashboardMetrics\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   totalRevenueBudget: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   totalRevenueActual: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   totalExpenseBudget: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   totalExpenseActual: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   netIncomeActual: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   totalEncumbered: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3   salaryBenefitsExpense: \cf2 \strokec2 number\cf0 \strokec4 ;\cb1 \
\cb3 \}}