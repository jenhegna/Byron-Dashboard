{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red0\green0\blue255;\red255\green255\blue254;
\red14\green110\blue109;\red144\green1\blue18;\red19\green118\blue70;\red15\green112\blue1;\red191\green28\blue37;
}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c3529\c52549\c34510;\cssrgb\c0\c50196\c0;\cssrgb\c80392\c19216\c19216;
}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 React\cf0 \strokec2  \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'react'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   \cf5 \strokec5 BarChart\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Bar\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 XAxis\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 YAxis\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 CartesianGrid\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Tooltip\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Legend\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 ResponsiveContainer\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 PieChart\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Pie\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Cell\cf0 \strokec2 ,\cb1 \
\cb4 \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'recharts'\cf0 \strokec2 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 FinancialRecord\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 '../types'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ formatCompactNumber, formatCurrency \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 '../utils/dataProcessing'\cf0 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 const\cf0 \strokec2  \cf5 \strokec5 COLORS\cf0 \strokec2  = [\cf6 \strokec6 '#3b82f6'\cf0 \strokec2 , \cf6 \strokec6 '#10b981'\cf0 \strokec2 , \cf6 \strokec6 '#f59e0b'\cf0 \strokec2 , \cf6 \strokec6 '#ef4444'\cf0 \strokec2 , \cf6 \strokec6 '#8b5cf6'\cf0 \strokec2 , \cf6 \strokec6 '#ec4899'\cf0 \strokec2 , \cf6 \strokec6 '#6366f1'\cf0 \strokec2 ];\cb1 \
\
\cf3 \cb4 \strokec3 interface\cf0 \strokec2  \cf5 \strokec5 ChartProps\cf0 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   data: \cf5 \strokec5 FinancialRecord\cf0 \strokec2 [];\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf0 \strokec2  \cf3 \strokec3 const\cf0 \strokec2  \cf5 \strokec5 RevenueSourceChart\cf0 \strokec2 : \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 FC\cf0 \strokec2 <\cf5 \strokec5 ChartProps\cf0 \strokec2 > = (\{ data \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   \cf3 \strokec3 if\cf0 \strokec2  (!data || data.length === \cf7 \strokec7 0\cf0 \strokec2 ) \{\cb1 \
\cb4       \cf3 \strokec3 return\cf0 \strokec2  <div className=\cf6 \strokec6 "h-full w-full flex items-center justify-center text-slate-400"\cf0 \strokec2 >\cf5 \strokec5 No\cf0 \strokec2  \cf5 \strokec5 Revenue\cf0 \strokec2  \cf5 \strokec5 Data\cf0 \strokec2 </div>;\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf8 \strokec8 // Aggregate Revenue by Source Category\cf0 \cb1 \strokec2 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  aggregated = data\cb1 \
\cb4     .filter(r => r.\cf5 \strokec5 Type\cf0 \strokec2  === \cf6 \strokec6 'R'\cf0 \strokec2 )\cb1 \
\cb4     .reduce((acc, curr) => \{\cb1 \
\cb4         \cf3 \strokec3 let\cf0 \strokec2  key = \cf6 \strokec6 "Other"\cf0 \strokec2 ;\cb1 \
\cb4         \cf8 \strokec8 // Safety check for numeric conversion\cf0 \cb1 \strokec2 \
\cb4         \cf3 \strokec3 const\cf0 \strokec2  code = parseInt(curr.\cf5 \strokec5 SrcObj\cf0 \strokec2  || \cf6 \strokec6 "0"\cf0 \strokec2 , \cf7 \strokec7 10\cf0 \strokec2 );\cb1 \
\cb4         \cb1 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (code < \cf7 \strokec7 100\cf0 \strokec2 ) key = \cf6 \strokec6 "Local Property Taxes & Fees"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (code >= \cf7 \strokec7 200\cf0 \strokec2  && code < \cf7 \strokec7 400\cf0 \strokec2 ) key = \cf6 \strokec6 "State Aid"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (code >= \cf7 \strokec7 400\cf0 \strokec2  && code < \cf7 \strokec7 500\cf0 \strokec2 ) key = \cf6 \strokec6 "Federal Sources"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (code >= \cf7 \strokec7 600\cf0 \strokec2 ) key = \cf6 \strokec6 "Local Sales & Other"\cf0 \strokec2 ;\cb1 \
\cb4         \cb1 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (!acc[key]) \{\cb1 \
\cb4             acc[key] = \{ name: key, value: \cf7 \strokec7 0\cf0 \strokec2  \};\cb1 \
\cb4         \}\cb1 \
\cb4         acc[key].value += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 return\cf0 \strokec2  acc;\cb1 \
\cb4     \}, \{\} \cf3 \strokec3 as\cf0 \strokec2  \cf5 \strokec5 Record\cf0 \strokec2 <\cf3 \strokec3 string\cf0 \strokec2 , \{ name: \cf3 \strokec3 string\cf0 \strokec2 ; value: \cf3 \strokec3 number\cf0 \strokec2  \}>);\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  chartData = \cf5 \strokec5 Object\cf0 \strokec2 .values(aggregated).sort((a, b) => b.value - a.value);\cb1 \
\cb4   \cb1 \
\cb4   \cf3 \strokec3 if\cf0 \strokec2  (chartData.length === \cf7 \strokec7 0\cf0 \strokec2 ) \{\cb1 \
\cb4       \cf3 \strokec3 return\cf0 \strokec2  <div className=\cf6 \strokec6 "h-full w-full flex items-center justify-center text-slate-400"\cf0 \strokec2 >\cf5 \strokec5 No\cf0 \strokec2  \cf5 \strokec5 Revenue\cf0 \strokec2  \cf5 \strokec5 Data\cf0 \strokec2  to \cf5 \strokec5 Display\cf0 \strokec2 </div>;\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf3 \strokec3 return\cf0 \strokec2  (\cb1 \
\cb4     <div className=\cf6 \strokec6 "h-[350px] w-full relative"\cf0 \strokec2 >\cb1 \
\cb4        <h4 className=\cf6 \strokec6 "text-sm font-semibold text-slate-500 absolute top-0 left-0 mb-2"\cf0 \strokec2 >\cf5 \strokec5 Revenue\cf0 \strokec2  \cf5 \strokec5 Sources\cf0 \strokec2 </h4>\cb1 \
\cb4       <\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2  width=\cf6 \strokec6 "100%"\cf0 \strokec2  height=\cf6 \strokec6 "100%"\cf0 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 PieChart\cf0 \strokec2 >\cb1 \
\cb4           <\cf5 \strokec5 Pie\cf0 \cb1 \strokec2 \
\cb4             data=\{chartData\}\cb1 \
\cb4             cx=\cf6 \strokec6 "50%"\cf0 \cb1 \strokec2 \
\cb4             cy=\cf6 \strokec6 "50%"\cf0 \cb1 \strokec2 \
\cb4             innerRadius=\{\cf7 \strokec7 60\cf0 \strokec2 \}\cb1 \
\cb4             outerRadius=\{\cf7 \strokec7 100\cf0 \strokec2 \}\cb1 \
\cb4             fill=\cf6 \strokec6 "#8884d8"\cf0 \cb1 \strokec2 \
\cb4             paddingAngle=\{\cf7 \strokec7 5\cf0 \strokec2 \}\cb1 \
\cb4             dataKey=\cf6 \strokec6 "value"\cf0 \cb1 \strokec2 \
\cb4           >\cb1 \
\cb4             \{chartData.map((entry, index) => (\cb1 \
\cb4               <\cf5 \strokec5 Cell\cf0 \strokec2  key=\{\cf6 \strokec6 `cell-\cf0 \strokec2 $\{index\}\cf6 \strokec6 `\cf0 \strokec2 \} fill=\{\cf5 \strokec5 COLORS\cf0 \strokec2 [index % \cf5 \strokec5 COLORS\cf0 \strokec2 .length]\} />\cb1 \
\cb4             ))\}\cb1 \
\cb4           </\cf5 \strokec5 Pie\cf0 \strokec2 >\cb1 \
\cb4           <\cf5 \strokec5 Tooltip\cf0 \strokec2  \cb1 \
\cb4              formatter=\{(value: \cf3 \strokec3 number\cf0 \strokec2 ) => formatCurrency(value)\}\cb1 \
\cb4              contentStyle=\{\{ borderRadius: \cf6 \strokec6 '8px'\cf0 \strokec2 , border: \cf6 \strokec6 'none'\cf0 \strokec2 , boxShadow: \cf6 \strokec6 '0 4px 6px -1px rgb(0 0 0 / 0.1)'\cf0 \strokec2  \}\}\cb1 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 Legend\cf0 \strokec2  verticalAlign=\cf6 \strokec6 "bottom"\cf0 \strokec2  height=\{\cf7 \strokec7 36\cf0 \strokec2 \} iconType=\cf6 \strokec6 "circle"\cf0 \strokec2  />\cb1 \
\cb4         </\cf5 \strokec5 PieChart\cf0 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2 >\cb1 \
\cb4     </div>\cb1 \
\cb4   );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf0 \strokec2  \cf3 \strokec3 const\cf0 \strokec2  \cf5 \strokec5 ExpenseObjectChart\cf0 \strokec2 : \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 FC\cf0 \strokec2 <\cf5 \strokec5 ChartProps\cf0 \strokec2 > = (\{ data \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   \cf3 \strokec3 if\cf0 \strokec2  (!data || data.length === \cf7 \strokec7 0\cf0 \strokec2 ) \cf3 \strokec3 return\cf0 \strokec2  \cf3 \strokec3 null\cf0 \strokec2 ;\cb1 \
\
\cb4   \cf8 \strokec8 // Aggregate Expenses by Object Code Group (UFARS standard)\cf0 \cb1 \strokec2 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  aggregated = data\cb1 \
\cb4     .filter(r => r.\cf5 \strokec5 Type\cf0 \strokec2  === \cf6 \strokec6 'E'\cf0 \strokec2 )\cb1 \
\cb4     .reduce((acc, curr) => \{\cb1 \
\cb4         \cf3 \strokec3 let\cf0 \strokec2  key = curr.\cf5 \strokec5 SourceObject\cf0 \strokec2  || \cf6 \strokec6 'Other'\cf0 \strokec2 ;\cb1 \
\cb4         \cf8 \strokec8 // Grouping similar items\cf0 \cb1 \strokec2 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Salaries"\cf0 \strokec2 )) key = \cf6 \strokec6 "Salaries & Wages"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Benefits"\cf0 \strokec2 ) || key.includes(\cf6 \strokec6 "Employee Benefits"\cf0 \strokec2 )) key = \cf6 \strokec6 "Employee Benefits"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Purchased Services"\cf0 \strokec2 )) key = \cf6 \strokec6 "Purchased Services"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Supplies"\cf0 \strokec2 )) key = \cf6 \strokec6 "Supplies & Materials"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Capital"\cf0 \strokec2 )) key = \cf6 \strokec6 "Capital Expenditures"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Debt"\cf0 \strokec2 )) key = \cf6 \strokec6 "Debt Service"\cf0 \strokec2 ;\cb1 \
\cb4         \cb1 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (!acc[key]) \{\cb1 \
\cb4             acc[key] = \{ name: key, value: \cf7 \strokec7 0\cf0 \strokec2  \};\cb1 \
\cb4         \}\cb1 \
\cb4         acc[key].value += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 return\cf0 \strokec2  acc;\cb1 \
\cb4     \}, \{\} \cf3 \strokec3 as\cf0 \strokec2  \cf5 \strokec5 Record\cf0 \strokec2 <\cf3 \strokec3 string\cf0 \strokec2 , \{ name: \cf3 \strokec3 string\cf0 \strokec2 ; value: \cf3 \strokec3 number\cf0 \strokec2  \}>);\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  chartData = \cf5 \strokec5 Object\cf0 \strokec2 .values(aggregated)\cb1 \
\cb4     .sort((a, b) => b.value - a.value);\cb1 \
\
\cb4   \cf3 \strokec3 return\cf0 \strokec2  (\cb1 \
\cb4     <div className=\cf6 \strokec6 "h-[350px] w-full"\cf0 \strokec2 >\cb1 \
\cb4         <h4 className=\cf6 \strokec6 "text-sm font-semibold text-slate-500 mb-4"\cf0 \strokec2 >\cf5 \strokec5 Expenses\cf0 \strokec2  by \cf5 \strokec5 Object\cf0 \strokec2 </h4>\cb1 \
\cb4       <\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2  width=\cf6 \strokec6 "100%"\cf0 \strokec2  height=\cf6 \strokec6 "100%"\cf0 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 BarChart\cf0 \cb1 \strokec2 \
\cb4           data=\{chartData\}\cb1 \
\cb4           layout=\cf6 \strokec6 "vertical"\cf0 \cb1 \strokec2 \
\cb4           margin=\{\{ top: \cf7 \strokec7 5\cf0 \strokec2 , right: \cf7 \strokec7 30\cf0 \strokec2 , left: \cf7 \strokec7 80\cf0 \strokec2 , bottom: \cf7 \strokec7 5\cf0 \strokec2  \}\}\cb1 \
\cb4         >\cb1 \
\cb4           <\cf5 \strokec5 CartesianGrid\cf0 \strokec2  strokeDasharray=\cf6 \strokec6 "3 3"\cf0 \strokec2  horizontal=\{\cf3 \strokec3 true\cf0 \strokec2 \} vertical=\{\cf3 \strokec3 false\cf0 \strokec2 \} stroke=\cf6 \strokec6 "#e2e8f0"\cf0 \strokec2  />\cb1 \
\cb4           <\cf5 \strokec5 XAxis\cf0 \strokec2  \cf3 \strokec3 type\cf0 \strokec2 =\cf6 \strokec6 "number"\cf0 \strokec2  tickFormatter=\{(val) => \cf6 \strokec6 `\cf9 \strokec9 $\cf0 \strokec2 $\{formatCompactNumber(val)\}\cf6 \strokec6 `\cf0 \strokec2 \} />\cb1 \
\cb4           <\cf5 \strokec5 YAxis\cf0 \strokec2  \cf3 \strokec3 type\cf0 \strokec2 =\cf6 \strokec6 "category"\cf0 \strokec2  dataKey=\cf6 \strokec6 "name"\cf0 \strokec2  width=\{\cf7 \strokec7 140\cf0 \strokec2 \} tick=\{\{ fontSize: \cf7 \strokec7 11\cf0 \strokec2  \}\} />\cb1 \
\cb4           <\cf5 \strokec5 Tooltip\cf0 \strokec2  \cb1 \
\cb4             formatter=\{(value: \cf3 \strokec3 number\cf0 \strokec2 ) => formatCurrency(value)\}\cb1 \
\cb4             contentStyle=\{\{ borderRadius: \cf6 \strokec6 '8px'\cf0 \strokec2 , border: \cf6 \strokec6 'none'\cf0 \strokec2 , boxShadow: \cf6 \strokec6 '0 4px 6px -1px rgb(0 0 0 / 0.1)'\cf0 \strokec2  \}\}\cb1 \
\cb4             cursor=\{\{fill: \cf6 \strokec6 '#f1f5f9'\cf0 \strokec2 \}\}\cb1 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 Bar\cf0 \strokec2  dataKey=\cf6 \strokec6 "value"\cf0 \strokec2  name=\cf6 \strokec6 "YTD Expense"\cf0 \strokec2  fill=\cf6 \strokec6 "#6366f1"\cf0 \strokec2  radius=\{[\cf7 \strokec7 0\cf0 \strokec2 , \cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 0\cf0 \strokec2 ]\} barSize=\{\cf7 \strokec7 30\cf0 \strokec2 \} />\cb1 \
\cb4         </\cf5 \strokec5 BarChart\cf0 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2 >\cb1 \
\cb4     </div>\cb1 \
\cb4   );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf0 \strokec2  \cf3 \strokec3 const\cf0 \strokec2  \cf5 \strokec5 ProgramExpenseChart\cf0 \strokec2 : \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 FC\cf0 \strokec2 <\cf5 \strokec5 ChartProps\cf0 \strokec2 > = (\{ data \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4    \cf3 \strokec3 if\cf0 \strokec2  (!data || data.length === \cf7 \strokec7 0\cf0 \strokec2 ) \cf3 \strokec3 return\cf0 \strokec2  \cf3 \strokec3 null\cf0 \strokec2 ;\cb1 \
\
\cb4    \cf8 \strokec8 // Group by Program (Program1 column)\cf0 \cb1 \strokec2 \
\cb4    \cf3 \strokec3 const\cf0 \strokec2  aggregated = data\cb1 \
\cb4     .filter(r => r.\cf5 \strokec5 Type\cf0 \strokec2  === \cf6 \strokec6 'E'\cf0 \strokec2 )\cb1 \
\cb4     .reduce((acc, curr) => \{\cb1 \
\cb4         \cf3 \strokec3 let\cf0 \strokec2  key = curr.\cf5 \strokec5 Program1\cf0 \strokec2  || \cf6 \strokec6 'General'\cf0 \strokec2 ;\cb1 \
\cb4         \cf8 \strokec8 // Group small programs\cf0 \cb1 \strokec2 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Administration"\cf0 \strokec2 )) key = \cf6 \strokec6 "Administration"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Regular Instr"\cf0 \strokec2 )) key = \cf6 \strokec6 "Regular Instruction"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Special Education"\cf0 \strokec2 )) key = \cf6 \strokec6 "Special Education"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Vocational"\cf0 \strokec2 )) key = \cf6 \strokec6 "Vocational"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Pupil Support"\cf0 \strokec2 )) key = \cf6 \strokec6 "Pupil Support"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Sites & Buildings"\cf0 \strokec2 )) key = \cf6 \strokec6 "Sites & Buildings"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Instructional Support"\cf0 \strokec2 )) key = \cf6 \strokec6 "Instructional Support"\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (key.includes(\cf6 \strokec6 "Community"\cf0 \strokec2 )) key = \cf6 \strokec6 "Community Service"\cf0 \strokec2 ;\cb1 \
\cb4         \cb1 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (!acc[key]) \{\cb1 \
\cb4             acc[key] = \{ name: key, budget: \cf7 \strokec7 0\cf0 \strokec2 , actual: \cf7 \strokec7 0\cf0 \strokec2  \};\cb1 \
\cb4         \}\cb1 \
\cb4         acc[key].actual += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4         acc[key].budget += curr.\cf5 \strokec5 FY26Budget\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 return\cf0 \strokec2  acc;\cb1 \
\cb4    \}, \{\} \cf3 \strokec3 as\cf0 \strokec2  \cf5 \strokec5 Record\cf0 \strokec2 <\cf3 \strokec3 string\cf0 \strokec2 , \{ name: \cf3 \strokec3 string\cf0 \strokec2 ; budget: \cf3 \strokec3 number\cf0 \strokec2 ; actual: \cf3 \strokec3 number\cf0 \strokec2  \}>);\cb1 \
\
\cb4    \cf3 \strokec3 const\cf0 \strokec2  chartData = \cf5 \strokec5 Object\cf0 \strokec2 .values(aggregated)\cb1 \
\cb4     .sort((a, b) => b.actual - a.actual);\cb1 \
\
\cb4    \cf3 \strokec3 return\cf0 \strokec2  (\cb1 \
\cb4     <div className=\cf6 \strokec6 "h-[400px] w-full"\cf0 \strokec2 >\cb1 \
\cb4       <h4 className=\cf6 \strokec6 "text-sm font-semibold text-slate-500 mb-4"\cf0 \strokec2 >\cf5 \strokec5 Budget\cf0 \strokec2  vs \cf5 \strokec5 Actual\cf0 \strokec2  by \cf5 \strokec5 Program\cf0 \strokec2 </h4>\cb1 \
\cb4       <\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2  width=\cf6 \strokec6 "100%"\cf0 \strokec2  height=\cf6 \strokec6 "100%"\cf0 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 BarChart\cf0 \cb1 \strokec2 \
\cb4           data=\{chartData\}\cb1 \
\cb4           margin=\{\{\cb1 \
\cb4             top: \cf7 \strokec7 20\cf0 \strokec2 ,\cb1 \
\cb4             right: \cf7 \strokec7 30\cf0 \strokec2 ,\cb1 \
\cb4             left: \cf7 \strokec7 20\cf0 \strokec2 ,\cb1 \
\cb4             bottom: \cf7 \strokec7 5\cf0 \strokec2 ,\cb1 \
\cb4           \}\}\cb1 \
\cb4         >\cb1 \
\cb4           <\cf5 \strokec5 CartesianGrid\cf0 \strokec2  strokeDasharray=\cf6 \strokec6 "3 3"\cf0 \strokec2  vertical=\{\cf3 \strokec3 false\cf0 \strokec2 \} stroke=\cf6 \strokec6 "#e2e8f0"\cf0 \strokec2  />\cb1 \
\cb4           <\cf5 \strokec5 XAxis\cf0 \strokec2  \cb1 \
\cb4             dataKey=\cf6 \strokec6 "name"\cf0 \strokec2  \cb1 \
\cb4             tick=\{\{ fontSize: \cf7 \strokec7 11\cf0 \strokec2 , fill: \cf6 \strokec6 '#64748b'\cf0 \strokec2  \}\} \cb1 \
\cb4             tickLine=\{\cf3 \strokec3 false\cf0 \strokec2 \}\cb1 \
\cb4             axisLine=\{\cf3 \strokec3 false\cf0 \strokec2 \}\cb1 \
\cb4             interval=\{\cf7 \strokec7 0\cf0 \strokec2 \}\cb1 \
\cb4             angle=\{-\cf7 \strokec7 20\cf0 \strokec2 \}\cb1 \
\cb4             textAnchor=\cf6 \strokec6 "end"\cf0 \cb1 \strokec2 \
\cb4             height=\{\cf7 \strokec7 60\cf0 \strokec2 \}\cb1 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 YAxis\cf0 \strokec2  \cb1 \
\cb4             tickFormatter=\{(value) => \cf6 \strokec6 `\cf9 \strokec9 $\cf0 \strokec2 $\{formatCompactNumber(value)\}\cf6 \strokec6 `\cf0 \strokec2 \}\cb1 \
\cb4             tick=\{\{ fontSize: \cf7 \strokec7 12\cf0 \strokec2 , fill: \cf6 \strokec6 '#64748b'\cf0 \strokec2  \}\} \cb1 \
\cb4             tickLine=\{\cf3 \strokec3 false\cf0 \strokec2 \}\cb1 \
\cb4             axisLine=\{\cf3 \strokec3 false\cf0 \strokec2 \}\cb1 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 Tooltip\cf0 \strokec2  \cb1 \
\cb4             formatter=\{(value: \cf3 \strokec3 number\cf0 \strokec2 ) => formatCurrency(value)\}\cb1 \
\cb4             contentStyle=\{\{ borderRadius: \cf6 \strokec6 '8px'\cf0 \strokec2 , border: \cf6 \strokec6 'none'\cf0 \strokec2 , boxShadow: \cf6 \strokec6 '0 4px 6px -1px rgb(0 0 0 / 0.1)'\cf0 \strokec2  \}\}\cb1 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 Legend\cf0 \strokec2  verticalAlign=\cf6 \strokec6 "top"\cf0 \strokec2  />\cb1 \
\cb4           <\cf5 \strokec5 Bar\cf0 \strokec2  dataKey=\cf6 \strokec6 "budget"\cf0 \strokec2  name=\cf6 \strokec6 "Budget"\cf0 \strokec2  fill=\cf6 \strokec6 "#cbd5e1"\cf0 \strokec2  radius=\{[\cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 0\cf0 \strokec2 , \cf7 \strokec7 0\cf0 \strokec2 ]\} />\cb1 \
\cb4           <\cf5 \strokec5 Bar\cf0 \strokec2  dataKey=\cf6 \strokec6 "actual"\cf0 \strokec2  name=\cf6 \strokec6 "YTD Actual"\cf0 \strokec2  fill=\cf6 \strokec6 "#0ea5e9"\cf0 \strokec2  radius=\{[\cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 4\cf0 \strokec2 , \cf7 \strokec7 0\cf0 \strokec2 , \cf7 \strokec7 0\cf0 \strokec2 ]\} />\cb1 \
\cb4         </\cf5 \strokec5 BarChart\cf0 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 ResponsiveContainer\cf0 \strokec2 >\cb1 \
\cb4     </div>\cb1 \
\cb4    )\cb1 \
\cb4 \}}
