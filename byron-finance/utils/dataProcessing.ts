{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;\red107\green0\blue1;\red19\green118\blue70;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c50196\c0\c0;\cssrgb\c3529\c52549\c34510;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \cf5 \strokec5 Papa\cf0 \strokec4  \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 'papaparse'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 FinancialRecord\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 '../types'\cf0 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  parseCSV = (csvText: \cf2 \strokec2 string\cf0 \strokec4 ): \cf5 \strokec5 FinancialRecord\cf0 \strokec4 [] => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  results = \cf5 \strokec5 Papa\cf0 \strokec4 .parse(csvText, \{\cb1 \
\cb3     header: \cf2 \strokec2 true\cf0 \strokec4 ,\cb1 \
\cb3     skipEmptyLines: \cf2 \strokec2 true\cf0 \strokec4 ,\cb1 \
\cb3     dynamicTyping: \cf2 \strokec2 false\cf0 \strokec4 , \cb1 \
\cb3   \});\cb1 \
\
\cb3   \cf2 \strokec2 return\cf0 \strokec4  results.data.map((row: \cf2 \strokec2 any\cf0 \strokec4 ) => (\{\cb1 \
\cb3     \cf5 \strokec5 Type\cf0 \strokec4 : row[\cf6 \strokec6 'Type'\cf0 \strokec4 ] \cf2 \strokec2 as\cf0 \strokec4  \cf6 \strokec6 'R'\cf0 \strokec4  | \cf6 \strokec6 'E'\cf0 \strokec4 ,\cb1 \
\cb3     \cf5 \strokec5 Fund\cf0 \strokec4 : row[\cf6 \strokec6 'Fund'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 Org\cf0 \strokec4 : row[\cf6 \strokec6 'Org'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 Program\cf0 \strokec4 : row[\cf6 \strokec6 'Program'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 Course\cf0 \strokec4 : row[\cf6 \strokec6 'Course'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 Finance\cf0 \strokec4 : row[\cf6 \strokec6 'Finance'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 SrcObj\cf0 \strokec4 : row[\cf6 \strokec6 'Src/Obj'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 GlaDesc\cf0 \strokec4 : row[\cf6 \strokec6 'gla_desc'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 FundDescription\cf0 \strokec4 : row[\cf6 \strokec6 'Fund Description'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 Organization\cf0 \strokec4 : row[\cf6 \strokec6 'Organization'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 FY26Budget\cf0 \strokec4 : parseFloat(row[\cf6 \strokec6 'FY26 Budget'\cf0 \strokec4 ] || \cf6 \strokec6 '0'\cf0 \strokec4 ),\cb1 \
\cb3     \cf5 \strokec5 FY26YTD\cf0 \strokec4 : parseFloat(row[\cf6 \strokec6 'FY26 YTD'\cf0 \strokec4 ] || \cf6 \strokec6 '0'\cf0 \strokec4 ),\cb1 \
\cb3     \cf5 \strokec5 EncumbranceAmt\cf0 \strokec4 : parseFloat(row[\cf6 \strokec6 'encumbrance_amt'\cf0 \strokec4 ] || \cf6 \strokec6 '0'\cf0 \strokec4 ),\cb1 \
\cb3     \cf5 \strokec5 Program1\cf0 \strokec4 : row[\cf6 \strokec6 'Program1'\cf0 \strokec4 ] ? row[\cf6 \strokec6 'Program1'\cf0 \strokec4 ].replace(\cf7 \cb3 \strokec7 /^[0-9]+\\s+/\cf0 \cb3 \strokec4 , \cf6 \strokec6 ''\cf0 \strokec4 ) : \cf6 \strokec6 ''\cf0 \strokec4 ,\cb1 \
\cb3     \cf5 \strokec5 FinanceDescription\cf0 \strokec4 : row[\cf6 \strokec6 'Finance Description'\cf0 \strokec4 ],\cb1 \
\cb3     \cf5 \strokec5 SourceObject\cf0 \strokec4 : row[\cf6 \strokec6 'Source/Object'\cf0 \strokec4 ] ? row[\cf6 \strokec6 'Source/Object'\cf0 \strokec4 ].replace(\cf7 \cb3 \strokec7 /^[0-9]+\\s+/\cf0 \cb3 \strokec4 , \cf6 \strokec6 ''\cf0 \strokec4 ) : \cf6 \strokec6 ''\cf0 \strokec4 ,\cb1 \
\cb3   \}));\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  formatCurrency = (amount: \cf2 \strokec2 number\cf0 \strokec4 ) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 Intl\cf0 \strokec4 .\cf5 \strokec5 NumberFormat\cf0 \strokec4 (\cf6 \strokec6 'en-US'\cf0 \strokec4 , \{\cb1 \
\cb3     style: \cf6 \strokec6 'currency'\cf0 \strokec4 ,\cb1 \
\cb3     currency: \cf6 \strokec6 'USD'\cf0 \strokec4 ,\cb1 \
\cb3     minimumFractionDigits: \cf8 \cb3 \strokec8 0\cf0 \cb3 \strokec4 ,\cb1 \
\cb3     maximumFractionDigits: \cf8 \cb3 \strokec8 0\cf0 \cb3 \strokec4 ,\cb1 \
\cb3   \}).format(amount);\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  formatCompactNumber = (\cf2 \strokec2 number\cf0 \strokec4 : \cf2 \strokec2 number\cf0 \strokec4 ) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 Intl\cf0 \strokec4 .\cf5 \strokec5 NumberFormat\cf0 \strokec4 (\cf6 \strokec6 'en-US'\cf0 \strokec4 , \{\cb1 \
\cb3     notation: \cf6 \strokec6 "compact"\cf0 \strokec4 ,\cb1 \
\cb3     maximumFractionDigits: \cf8 \cb3 \strokec8 1\cf0 \cb1 \strokec4 \
\cb3   \}).format(\cf2 \strokec2 number\cf0 \strokec4 );\cb1 \
\cb3 \};}