{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red0\green0\blue255;\red255\green255\blue254;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;\red19\green118\blue70;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;\cssrgb\c3529\c52549\c34510;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 React\cf0 \strokec2 , \{ useState, useMemo, useEffect, useCallback \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'react'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   \cf5 \strokec5 LayoutDashboard\cf0 \strokec2 , \cb1 \
\cb4   \cf5 \strokec5 DollarSign\cf0 \strokec2 , \cb1 \
\cb4   \cf5 \strokec5 TrendingDown\cf0 \strokec2 , \cb1 \
\cb4   \cf5 \strokec5 TrendingUp\cf0 \strokec2 , \cb1 \
\cb4   \cf5 \strokec5 Filter\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Briefcase\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 Users\cf0 \strokec2 ,\cb1 \
\cb4   \cf5 \strokec5 AlertCircle\cf0 \cb1 \strokec2 \
\cb4 \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'lucide-react'\cf0 \strokec2 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ parseCSV, formatCurrency \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './utils/dataProcessing'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 FinancialRecord\cf0 \strokec2 , \cf5 \strokec5 DashboardMetrics\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './types'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 KPICard\cf0 \strokec2  \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './components/KPICard'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 RevenueSourceChart\cf0 \strokec2 , \cf5 \strokec5 ExpenseObjectChart\cf0 \strokec2 , \cf5 \strokec5 ProgramExpenseChart\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './components/Charts'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 DataTable\cf0 \strokec2  \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './components/DataTable'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 Header\cf0 \strokec2  \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './components/Header'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 GOOGLE_SHEET_URL\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 './constants'\cf0 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 function\cf0 \strokec2  \cf5 \strokec5 App\cf0 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   \cf3 \strokec3 const\cf0 \strokec2  [data, setData] = useState<\cf5 \strokec5 FinancialRecord\cf0 \strokec2 []>([]);\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [loading, setLoading] = useState<\cf3 \strokec3 boolean\cf0 \strokec2 >(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [error, setError] = useState<\cf3 \strokec3 string\cf0 \strokec2  | \cf3 \strokec3 null\cf0 \strokec2 >(\cf3 \strokec3 null\cf0 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [lastUpdated, setLastUpdated] = useState<\cf5 \strokec5 Date\cf0 \strokec2  | \cf3 \strokec3 null\cf0 \strokec2 >(\cf3 \strokec3 null\cf0 \strokec2 );\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [selectedFund, setSelectedFund] = useState<\cf3 \strokec3 string\cf0 \strokec2 >(\cf6 \strokec6 'All'\cf0 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [selectedOrg, setSelectedOrg] = useState<\cf3 \strokec3 string\cf0 \strokec2 >(\cf6 \strokec6 'All'\cf0 \strokec2 );\cb1 \
\cb4   \cb1 \
\cb4   \cf7 \strokec7 // Access Control States\cf0 \cb1 \strokec2 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [isAdmin, setIsAdmin] = useState(\cf3 \strokec3 false\cf0 \strokec2 );\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [isEmbed, setIsEmbed] = useState(\cf3 \strokec3 false\cf0 \strokec2 );\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  fetchData = useCallback(\cf3 \strokec3 async\cf0 \strokec2  () => \{\cb1 \
\cb4     setLoading(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4     setError(\cf3 \strokec3 null\cf0 \strokec2 );\cb1 \
\cb4     \cf3 \strokec3 try\cf0 \strokec2  \{\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  response = \cf3 \strokec3 await\cf0 \strokec2  fetch(\cf5 \strokec5 GOOGLE_SHEET_URL\cf0 \strokec2 );\cb1 \
\cb4       \cf3 \strokec3 if\cf0 \strokec2  (!response.ok) \{\cb1 \
\cb4         \cf3 \strokec3 throw\cf0 \strokec2  \cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Error\cf0 \strokec2 (\cf6 \strokec6 `Failed to fetch data: \cf0 \strokec2 $\{response.statusText\}\cf6 \strokec6 `\cf0 \strokec2 );\cb1 \
\cb4       \}\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  csvText = \cf3 \strokec3 await\cf0 \strokec2  response.text();\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  parsed = parseCSV(csvText);\cb1 \
\cb4       \cb1 \
\cb4       \cf3 \strokec3 if\cf0 \strokec2  (parsed.length === \cf8 \strokec8 0\cf0 \strokec2 ) \{\cb1 \
\cb4         \cf3 \strokec3 throw\cf0 \strokec2  \cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Error\cf0 \strokec2 (\cf6 \strokec6 "No data found in the spreadsheet. Please check the published link."\cf0 \strokec2 );\cb1 \
\cb4       \}\cb1 \
\
\cb4       setData(parsed);\cb1 \
\cb4       setLastUpdated(\cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Date\cf0 \strokec2 ());\cb1 \
\cb4     \} \cf3 \strokec3 catch\cf0 \strokec2  (err) \{\cb1 \
\cb4       console.error(err);\cb1 \
\cb4       setError(err \cf3 \strokec3 instanceof\cf0 \strokec2  \cf5 \strokec5 Error\cf0 \strokec2  ? err.message : \cf6 \strokec6 "An unknown error occurred"\cf0 \strokec2 );\cb1 \
\cb4     \} \cf3 \strokec3 finally\cf0 \strokec2  \{\cb1 \
\cb4       setLoading(\cf3 \strokec3 false\cf0 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4   \}, []);\cb1 \
\
\cb4   useEffect(() => \{\cb1 \
\cb4     \cf7 \strokec7 // 1. Parse URL Parameters for View Modes\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  params = \cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 URLSearchParams\cf0 \strokec2 (window.location.search);\cb1 \
\cb4     \cb1 \
\cb4     \cf7 \strokec7 // ?admin=true : Shows the CSV Import button\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 if\cf0 \strokec2  (params.\cf3 \strokec3 get\cf0 \strokec2 (\cf6 \strokec6 'admin'\cf0 \strokec2 ) === \cf6 \strokec6 'true'\cf0 \strokec2 ) \{\cb1 \
\cb4       setIsAdmin(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf7 \strokec7 // ?mode=embed : Hides navigation and adjusts padding for Iframe use\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 if\cf0 \strokec2  (params.\cf3 \strokec3 get\cf0 \strokec2 (\cf6 \strokec6 'mode'\cf0 \strokec2 ) === \cf6 \strokec6 'embed'\cf0 \strokec2 ) \{\cb1 \
\cb4       setIsEmbed(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf7 \strokec7 // 2. Initial Data Fetch\cf0 \cb1 \strokec2 \
\cb4     fetchData();\cb1 \
\cb4     \cb1 \
\cb4     \cf7 \strokec7 // Optional: Auto-refresh every 5 minutes if embedded\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 let\cf0 \strokec2  intervalId: \cf5 \strokec5 NodeJS\cf0 \strokec2 .\cf5 \strokec5 Timeout\cf0 \strokec2 ;\cb1 \
\cb4     \cf3 \strokec3 if\cf0 \strokec2  (params.\cf3 \strokec3 get\cf0 \strokec2 (\cf6 \strokec6 'mode'\cf0 \strokec2 ) === \cf6 \strokec6 'embed'\cf0 \strokec2 ) \{\cb1 \
\cb4        intervalId = setInterval(fetchData, \cf8 \strokec8 5\cf0 \strokec2  * \cf8 \strokec8 60\cf0 \strokec2  * \cf8 \strokec8 1000\cf0 \strokec2 ); \cb1 \
\cb4     \}\cb1 \
\cb4     \cf3 \strokec3 return\cf0 \strokec2  () => clearInterval(intervalId);\cb1 \
\cb4   \}, [fetchData]);\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  handleManualFileUpload = (event: \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 ChangeEvent\cf0 \strokec2 <\cf5 \strokec5 HTMLInputElement\cf0 \strokec2 >) => \{\cb1 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  file = event.target.files?.[\cf8 \strokec8 0\cf0 \strokec2 ];\cb1 \
\cb4     \cf3 \strokec3 if\cf0 \strokec2  (file) \{\cb1 \
\cb4       setLoading(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  reader = \cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 FileReader\cf0 \strokec2 ();\cb1 \
\cb4       reader.onload = (e) => \{\cb1 \
\cb4         \cf3 \strokec3 const\cf0 \strokec2  text = e.target?.result \cf3 \strokec3 as\cf0 \strokec2  \cf3 \strokec3 string\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 const\cf0 \strokec2  parsed = parseCSV(text);\cb1 \
\cb4         setData(parsed);\cb1 \
\cb4         setLoading(\cf3 \strokec3 false\cf0 \strokec2 );\cb1 \
\cb4         setLastUpdated(\cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Date\cf0 \strokec2 ()); \cf7 \strokec7 // Technically updated, though manual\cf0 \cb1 \strokec2 \
\cb4       \};\cb1 \
\cb4       reader.readAsText(file);\cb1 \
\cb4     \}\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  filteredData = useMemo(() => \{\cb1 \
\cb4     \cf3 \strokec3 return\cf0 \strokec2  data.filter(item => \{\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  fundMatch = selectedFund === \cf6 \strokec6 'All'\cf0 \strokec2  || item.\cf5 \strokec5 FundDescription\cf0 \strokec2  === selectedFund;\cb1 \
\cb4       \cf3 \strokec3 const\cf0 \strokec2  orgMatch = selectedOrg === \cf6 \strokec6 'All'\cf0 \strokec2  || item.\cf5 \strokec5 Organization\cf0 \strokec2  === selectedOrg;\cb1 \
\cb4       \cf3 \strokec3 return\cf0 \strokec2  fundMatch && orgMatch;\cb1 \
\cb4     \});\cb1 \
\cb4   \}, [data, selectedFund, selectedOrg]);\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  metrics: \cf5 \strokec5 DashboardMetrics\cf0 \strokec2  = useMemo(() => \{\cb1 \
\cb4     \cf3 \strokec3 return\cf0 \strokec2  filteredData.reduce((acc, curr) => \{\cb1 \
\cb4       \cf3 \strokec3 if\cf0 \strokec2  (curr.\cf5 \strokec5 Type\cf0 \strokec2  === \cf6 \strokec6 'R'\cf0 \strokec2 ) \{\cb1 \
\cb4         acc.totalRevenueBudget += curr.\cf5 \strokec5 FY26Budget\cf0 \strokec2 ;\cb1 \
\cb4         acc.totalRevenueActual += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4       \} \cf3 \strokec3 else\cf0 \strokec2  \cf3 \strokec3 if\cf0 \strokec2  (curr.\cf5 \strokec5 Type\cf0 \strokec2  === \cf6 \strokec6 'E'\cf0 \strokec2 ) \{\cb1 \
\cb4         acc.totalExpenseBudget += curr.\cf5 \strokec5 FY26Budget\cf0 \strokec2 ;\cb1 \
\cb4         acc.totalExpenseActual += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4         acc.totalEncumbered += curr.\cf5 \strokec5 EncumbranceAmt\cf0 \strokec2 ;\cb1 \
\cb4         \cb1 \
\cb4         \cf7 \strokec7 // Calculate Salaries & Benefits for Ratio\cf0 \cb1 \strokec2 \
\cb4         \cf3 \strokec3 const\cf0 \strokec2  srcObj = curr.\cf5 \strokec5 SourceObject\cf0 \strokec2  || \cf6 \strokec6 ""\cf0 \strokec2 ;\cb1 \
\cb4         \cf3 \strokec3 if\cf0 \strokec2  (srcObj.includes(\cf6 \strokec6 "Salaries"\cf0 \strokec2 ) || srcObj.includes(\cf6 \strokec6 "Benefits"\cf0 \strokec2 )) \{\cb1 \
\cb4             acc.salaryBenefitsExpense += curr.\cf5 \strokec5 FY26YTD\cf0 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\cb4       \}\cb1 \
\cb4       \cf3 \strokec3 return\cf0 \strokec2  acc;\cb1 \
\cb4     \}, \{\cb1 \
\cb4       totalRevenueBudget: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       totalRevenueActual: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       totalExpenseBudget: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       totalExpenseActual: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       netIncomeActual: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       totalEncumbered: \cf8 \strokec8 0\cf0 \strokec2 ,\cb1 \
\cb4       salaryBenefitsExpense: \cf8 \strokec8 0\cf0 \cb1 \strokec2 \
\cb4     \});\cb1 \
\cb4   \}, [filteredData]);\cb1 \
\
\cb4   metrics.netIncomeActual = metrics.totalRevenueActual - metrics.totalExpenseActual;\cb1 \
\
\cb4   \cf7 \strokec7 // Unique lists for filters\cf0 \cb1 \strokec2 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  uniqueFunds = useMemo(() => [\cf6 \strokec6 'All'\cf0 \strokec2 , ...\cf5 \strokec5 Array\cf0 \strokec2 .\cf3 \strokec3 from\cf0 \strokec2 (\cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Set\cf0 \strokec2 (data.map(item => item.\cf5 \strokec5 FundDescription\cf0 \strokec2 ))).filter(\cf5 \strokec5 Boolean\cf0 \strokec2 ).sort()], [data]);\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  uniqueOrgs = useMemo(() => [\cf6 \strokec6 'All'\cf0 \strokec2 , ...\cf5 \strokec5 Array\cf0 \strokec2 .\cf3 \strokec3 from\cf0 \strokec2 (\cf3 \strokec3 new\cf0 \strokec2  \cf5 \strokec5 Set\cf0 \strokec2 (data.map(item => item.\cf5 \strokec5 Organization\cf0 \strokec2 ))).filter(\cf5 \strokec5 Boolean\cf0 \strokec2 ).sort()], [data]);\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  salaryRatio = metrics.totalExpenseActual ? (metrics.salaryBenefitsExpense / metrics.totalExpenseActual * \cf8 \strokec8 100\cf0 \strokec2 ).toFixed(\cf8 \strokec8 1\cf0 \strokec2 ) : \cf6 \strokec6 "0.0"\cf0 \strokec2 ;\cb1 \
\
\cb4   \cf3 \strokec3 return\cf0 \strokec2  (\cb1 \
\cb4     \cf7 \strokec7 // BG color changes to white in embed mode to blend with Google Sites\cf0 \cb1 \strokec2 \
\cb4     <div className=\{\cf6 \strokec6 `min-h-screen font-sans \cf0 \strokec2 $\{isEmbed ? \cf6 \strokec6 'bg-white'\cf0 \strokec2  : \cf6 \strokec6 'bg-slate-50 pb-12'\cf0 \strokec2 \}\cf6 \strokec6 `\cf0 \strokec2 \}>\cb1 \
\cb4       \cb1 \
\cb4       \{\cf7 \strokec7 /* Header Component */\cf0 \strokec2 \}\cb1 \
\cb4       \{!isEmbed && (\cb1 \
\cb4         <\cf5 \strokec5 Header\cf0 \strokec2  \cb1 \
\cb4           isAdmin=\{isAdmin\}\cb1 \
\cb4           lastUpdated=\{lastUpdated\}\cb1 \
\cb4           loading=\{loading\}\cb1 \
\cb4           onRefresh=\{fetchData\}\cb1 \
\cb4           onFileUpload=\{handleManualFileUpload\}\cb1 \
\cb4         />\cb1 \
\cb4       )\}\cb1 \
\
\cb4       \{\cf7 \strokec7 /* Main Content */\cf0 \strokec2 \}\cb1 \
\cb4       <main className=\{\cf6 \strokec6 `max-w-7xl mx-auto \cf0 \strokec2 $\{isEmbed ? \cf6 \strokec6 'p-2'\cf0 \strokec2  : \cf6 \strokec6 'px-4 sm:px-6 lg:px-8 py-8'\cf0 \strokec2 \}\cf6 \strokec6 `\cf0 \strokec2 \}>\cb1 \
\cb4         \cb1 \
\cb4         \{\cf7 \strokec7 /* Error State */\cf0 \strokec2 \}\cb1 \
\cb4         \{error && (\cb1 \
\cb4           <div className=\cf6 \strokec6 "mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"\cf0 \strokec2 >\cb1 \
\cb4             <\cf5 \strokec5 AlertCircle\cf0 \strokec2  className=\cf6 \strokec6 "w-5 h-5"\cf0 \strokec2  />\cb1 \
\cb4             <span>\{error\}</span>\cb1 \
\cb4             <button onClick=\{fetchData\} className=\cf6 \strokec6 "ml-auto underline text-sm hover:text-red-800"\cf0 \strokec2 >\cf5 \strokec5 Try\cf0 \strokec2  \cf5 \strokec5 Again\cf0 \strokec2 </button>\cb1 \
\cb4           </div>\cb1 \
\cb4         )\}\cb1 \
\
\cb4         \{\cf7 \strokec7 /* Loading Skeleton Overlay (Optional simple version) */\cf0 \strokec2 \}\cb1 \
\cb4         \{loading && !data.length && (\cb1 \
\cb4              <div className=\cf6 \strokec6 "fixed inset-0 bg-white/80 z-50 flex items-center justify-center"\cf0 \strokec2 >\cb1 \
\cb4                  <div className=\cf6 \strokec6 "flex flex-col items-center animate-pulse"\cf0 \strokec2 >\cb1 \
\cb4                      <div className=\cf6 \strokec6 "h-8 w-8 bg-blue-600 rounded-full mb-2 animate-bounce"\cf0 \strokec2 ></div>\cb1 \
\cb4                      <p className=\cf6 \strokec6 "text-slate-600 font-medium"\cf0 \strokec2 >\cf5 \strokec5 Loading\cf0 \strokec2  \cf5 \strokec5 Financial\cf0 \strokec2  \cf5 \strokec5 Data\cf0 \strokec2 ...</p>\cb1 \
\cb4                  </div>\cb1 \
\cb4              </div>\cb1 \
\cb4         )\}\cb1 \
\
\cb4         \{\cf7 \strokec7 /* Page Title & Filters */\cf0 \strokec2 \}\cb1 \
\cb4         <div className=\{\cf6 \strokec6 `mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-slate-100 \cf0 \strokec2 $\{isEmbed ? \cf6 \strokec6 'p-3'\cf0 \strokec2  : \cf6 \strokec6 'p-4'\cf0 \strokec2 \}\cf6 \strokec6 `\cf0 \strokec2 \}>\cb1 \
\cb4           <div>\cb1 \
\cb4             <h1 className=\{\cf6 \strokec6 `\cf0 \strokec2 $\{isEmbed ? \cf6 \strokec6 'text-lg'\cf0 \strokec2  : \cf6 \strokec6 'text-2xl'\cf0 \strokec2 \}\cf6 \strokec6  font-bold text-slate-900`\cf0 \strokec2 \}>\cb1 \
\cb4               \cf5 \strokec5 Financial\cf0 \strokec2  \cf5 \strokec5 Overview\cf0 \cb1 \strokec2 \
\cb4             </h1>\cb1 \
\cb4             \{!isEmbed && <p className=\cf6 \strokec6 "text-slate-500 mt-1 text-sm"\cf0 \strokec2 >\cf5 \strokec5 Live\cf0 \strokec2  \cf5 \strokec5 Snapshot\cf0 \strokec2  \cf3 \strokec3 from\cf0 \strokec2  \cf5 \strokec5 District\cf0 \strokec2  \cf5 \strokec5 Records\cf0 \strokec2 </p>\}\cb1 \
\cb4           </div>\cb1 \
\cb4           \cb1 \
\cb4           <div className=\cf6 \strokec6 "flex flex-col sm:flex-row gap-3"\cf0 \strokec2 >\cb1 \
\cb4             <div className=\cf6 \strokec6 "relative"\cf0 \strokec2 >\cb1 \
\cb4               <\cf5 \strokec5 Filter\cf0 \strokec2  className=\cf6 \strokec6 "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"\cf0 \strokec2  />\cb1 \
\cb4               <select \cb1 \
\cb4                 value=\{selectedFund\} \cb1 \
\cb4                 onChange=\{(e) => setSelectedFund(e.target.value)\}\cb1 \
\cb4                 className=\cf6 \strokec6 "pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full appearance-none cursor-pointer hover:bg-slate-100 transition-colors"\cf0 \cb1 \strokec2 \
\cb4                 disabled=\{loading\}\cb1 \
\cb4               >\cb1 \
\cb4                 \{uniqueFunds.map(f => <option key=\{f\} value=\{f\}>\{f === \cf6 \strokec6 'All'\cf0 \strokec2  ? \cf6 \strokec6 'All Funds'\cf0 \strokec2  : f\}</option>)\}\cb1 \
\cb4               </select>\cb1 \
\cb4             </div>\cb1 \
\cb4             <div className=\cf6 \strokec6 "relative"\cf0 \strokec2 >\cb1 \
\cb4               <\cf5 \strokec5 Briefcase\cf0 \strokec2  className=\cf6 \strokec6 "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"\cf0 \strokec2  />\cb1 \
\cb4               <select \cb1 \
\cb4                 value=\{selectedOrg\} \cb1 \
\cb4                 onChange=\{(e) => setSelectedOrg(e.target.value)\}\cb1 \
\cb4                 className=\cf6 \strokec6 "pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full appearance-none cursor-pointer hover:bg-slate-100 transition-colors"\cf0 \cb1 \strokec2 \
\cb4                 disabled=\{loading\}\cb1 \
\cb4               >\cb1 \
\cb4                 \{uniqueOrgs.map(o => <option key=\{o\} value=\{o\}>\{o === \cf6 \strokec6 'All'\cf0 \strokec2  ? \cf6 \strokec6 'All Sites'\cf0 \strokec2  : o\}</option>)\}\cb1 \
\cb4               </select>\cb1 \
\cb4             </div>\cb1 \
\cb4           </div>\cb1 \
\cb4         </div>\cb1 \
\
\cb4         \{\cf7 \strokec7 /* KPI Cards */\cf0 \strokec2 \}\cb1 \
\cb4         <div className=\cf6 \strokec6 "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"\cf0 \strokec2 >\cb1 \
\cb4           <\cf5 \strokec5 KPICard\cf0 \strokec2  \cb1 \
\cb4             title=\cf6 \strokec6 "YTD Revenue"\cf0 \strokec2  \cb1 \
\cb4             value=\{formatCurrency(metrics.totalRevenueActual)\} \cb1 \
\cb4             subValue=\{\cf6 \strokec6 `Budget: \cf0 \strokec2 $\{formatCurrency(metrics.totalRevenueBudget)\}\cf6 \strokec6 `\cf0 \strokec2 \}\cb1 \
\cb4             icon=\{\cf5 \strokec5 TrendingUp\cf0 \strokec2 \}\cb1 \
\cb4             colorClass=\cf6 \strokec6 "bg-emerald-500"\cf0 \cb1 \strokec2 \
\cb4           />\cb1 \
\cb4           <\cf5 \strokec5 KPICard\cf0 \strokec2  \cb1 \
\cb4             title=\cf6 \strokec6 "YTD Expenses"\cf0 \strokec2  \cb1 \
\cb4             value=\{formatCurrency(metrics.totalExpenseActual)\} \cb1 \
\cb4             subValue=\{\cf6 \strokec6 `Budget: \cf0 \strokec2 $\{formatCurrency(metrics.totalExpenseBudget)\}\cf6 \strokec6 `\cf0 \strokec2 \}\cb1 \
\cb4             icon=\{\cf5 \strokec5 TrendingDown\cf0 \strokec2 \}\cb1 \
\cb4             colorClass=\cf6 \strokec6 "bg-blue-500"\cf0 \cb1 \strokec2 \
\cb4           />\cb1 \
\cb4            <\cf5 \strokec5 KPICard\cf0 \strokec2  \cb1 \
\cb4             title=\cf6 \strokec6 "Encumbered Funds"\cf0 \strokec2  \cb1 \
\cb4             value=\{formatCurrency(metrics.totalEncumbered)\} \cb1 \
\cb4             subValue=\cf6 \strokec6 "Committed / POs"\cf0 \cb1 \strokec2 \
\cb4             icon=\{\cf5 \strokec5 DollarSign\cf0 \strokec2 \}\cb1 \
\cb4             colorClass=\cf6 \strokec6 "bg-amber-500"\cf0 \cb1 \strokec2 \
\cb4           />\cb1 \
\cb4            <\cf5 \strokec5 KPICard\cf0 \strokec2  \cb1 \
\cb4             title=\cf6 \strokec6 "Personnel Cost Ratio"\cf0 \strokec2  \cb1 \
\cb4             value=\{\cf6 \strokec6 `\cf0 \strokec2 $\{salaryRatio\}\cf6 \strokec6 %`\cf0 \strokec2 \} \cb1 \
\cb4             subValue=\cf6 \strokec6 "of Total Expenses"\cf0 \cb1 \strokec2 \
\cb4             icon=\{\cf5 \strokec5 Users\cf0 \strokec2 \}\cb1 \
\cb4             colorClass=\cf6 \strokec6 "bg-indigo-500"\cf0 \cb1 \strokec2 \
\cb4           />\cb1 \
\cb4         </div>\cb1 \
\
\cb4         \{\cf7 \strokec7 /* Charts Section */\cf0 \strokec2 \}\cb1 \
\cb4         <div className=\cf6 \strokec6 "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"\cf0 \strokec2 >\cb1 \
\cb4           <div className=\cf6 \strokec6 "bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1 min-h-[350px]"\cf0 \strokec2 >\cb1 \
\cb4             <\cf5 \strokec5 RevenueSourceChart\cf0 \strokec2  data=\{filteredData\} />\cb1 \
\cb4           </div>\cb1 \
\cb4           <div className=\cf6 \strokec6 "bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2 min-h-[350px]"\cf0 \strokec2 >\cb1 \
\cb4              <\cf5 \strokec5 ProgramExpenseChart\cf0 \strokec2  data=\{filteredData\} />\cb1 \
\cb4           </div>\cb1 \
\cb4         </div>\cb1 \
\cb4         \cb1 \
\cb4         <div className=\cf6 \strokec6 "grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8"\cf0 \strokec2 >\cb1 \
\cb4              <div className=\cf6 \strokec6 "bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[350px]"\cf0 \strokec2 >\cb1 \
\cb4                 <\cf5 \strokec5 ExpenseObjectChart\cf0 \strokec2  data=\{filteredData\} />\cb1 \
\cb4             </div>\cb1 \
\cb4         </div>\cb1 \
\
\cb4         \{\cf7 \strokec7 /* Data Table */\cf0 \strokec2 \}\cb1 \
\cb4         \{\cf7 \strokec7 /* Shown by default, or could be toggled off in embed mode if space is tight */\cf0 \strokec2 \}\cb1 \
\cb4         <div className=\cf6 \strokec6 "mb-8"\cf0 \strokec2 >\cb1 \
\cb4           <div className=\cf6 \strokec6 "flex items-center justify-between mb-4"\cf0 \strokec2 >\cb1 \
\cb4              <h3 className=\cf6 \strokec6 "text-lg font-bold text-slate-900"\cf0 \strokec2 >\cf5 \strokec5 Detail\cf0 \strokec2  \cf5 \strokec5 Transaction\cf0 \strokec2  \cf5 \strokec5 Records\cf0 \strokec2 </h3>\cb1 \
\cb4           </div>\cb1 \
\cb4           <\cf5 \strokec5 DataTable\cf0 \strokec2  data=\{filteredData\} />\cb1 \
\cb4         </div>\cb1 \
\
\cb4       </main>\cb1 \
\cb4     </div>\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf0 \strokec2  \cf3 \strokec3 default\cf0 \strokec2  \cf5 \strokec5 App\cf0 \strokec2 ;}
