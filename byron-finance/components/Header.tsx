{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red0\green0\blue255;\red255\green255\blue254;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;\red19\green118\blue70;\red107\green0\blue1;
\red191\green28\blue37;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;\cssrgb\c3529\c52549\c34510;\cssrgb\c50196\c0\c0;
\cssrgb\c80392\c19216\c19216;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \cf5 \strokec5 React\cf0 \strokec2 , \{ useState \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'react'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 Upload\cf0 \strokec2 , \cf5 \strokec5 RefreshCw\cf0 \strokec2 , \cf5 \strokec5 ExternalLink\cf0 \strokec2 , \cf5 \strokec5 Code\cf0 \strokec2 , \cf5 \strokec5 Check\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 'lucide-react'\cf0 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf0 \strokec2  \{ \cf5 \strokec5 GOOGLE_SHEET_URL\cf0 \strokec2  \} \cf3 \strokec3 from\cf0 \strokec2  \cf6 \strokec6 '../constants'\cf0 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 interface\cf0 \strokec2  \cf5 \strokec5 HeaderProps\cf0 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   isAdmin: \cf3 \strokec3 boolean\cf0 \strokec2 ;\cb1 \
\cb4   lastUpdated: \cf5 \strokec5 Date\cf0 \strokec2  | \cf3 \strokec3 null\cf0 \strokec2 ;\cb1 \
\cb4   loading: \cf3 \strokec3 boolean\cf0 \strokec2 ;\cb1 \
\cb4   onRefresh: () => \cf3 \strokec3 void\cf0 \strokec2 ;\cb1 \
\cb4   onFileUpload: (event: \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 ChangeEvent\cf0 \strokec2 <\cf5 \strokec5 HTMLInputElement\cf0 \strokec2 >) => \cf3 \strokec3 void\cf0 \strokec2 ;\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 const\cf0 \strokec2  \cf5 \strokec5 Header\cf0 \strokec2 : \cf5 \strokec5 React\cf0 \strokec2 .\cf5 \strokec5 FC\cf0 \strokec2 <\cf5 \strokec5 HeaderProps\cf0 \strokec2 > = (\{ \cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb4   isAdmin, \cb1 \
\cb4   lastUpdated, \cb1 \
\cb4   loading, \cb1 \
\cb4   onRefresh, \cb1 \
\cb4   onFileUpload \cb1 \
\cb4 \}) => \{\cb1 \
\cb4   \cf3 \strokec3 const\cf0 \strokec2  [copied, setCopied] = useState(\cf3 \strokec3 false\cf0 \strokec2 );\cb1 \
\
\cb4   \cf3 \strokec3 const\cf0 \strokec2  copyEmbedCode = () => \{\cb1 \
\cb4     \cf7 \strokec7 // Get base URL without query params\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  baseUrl = window.location.href.split(\cf6 \strokec6 '?'\cf0 \strokec2 )[\cf8 \strokec8 0\cf0 \strokec2 ];\cb1 \
\cb4     \cf7 \strokec7 // Clean trailing slashes if any\cf0 \cb1 \strokec2 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  cleanUrl = baseUrl.replace(\cf9 \strokec9 /\\/$/\cf0 \strokec2 , \cf6 \strokec6 ""\cf0 \strokec2 );\cb1 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  embedUrl = \cf6 \strokec6 `\cf0 \strokec2 $\{cleanUrl\}\cf6 \strokec6 ?mode=embed`\cf0 \strokec2 ;\cb1 \
\cb4     \cb1 \
\cb4     \cf3 \strokec3 const\cf0 \strokec2  code = \cf6 \strokec6 `<iframe src="\cf0 \strokec2 $\{embedUrl\}\cf6 \strokec6 " width="100%" height="1200" style="border:none; background:white;" title="Byron Finance Dashboard"></iframe>`\cf0 \strokec2 ;\cb1 \
\cb4     \cb1 \
\cb4     navigator.clipboard.writeText(code).then(() => \{\cb1 \
\cb4       setCopied(\cf3 \strokec3 true\cf0 \strokec2 );\cb1 \
\cb4       setTimeout(() => setCopied(\cf3 \strokec3 false\cf0 \strokec2 ), \cf8 \strokec8 2000\cf0 \strokec2 );\cb1 \
\cb4     \});\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf3 \strokec3 return\cf0 \strokec2  (\cb1 \
\cb4     <nav className=\cf6 \strokec6 "bg-white border-b border-slate-200 sticky top-0 z-30"\cf0 \strokec2 >\cb1 \
\cb4       <div className=\cf6 \strokec6 "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"\cf0 \strokec2 >\cb1 \
\cb4         <div className=\cf6 \strokec6 "flex justify-between h-20"\cf0 \strokec2 >\cb1 \
\cb4           \{\cf7 \strokec7 /* Left Side: Logo & Title */\cf0 \strokec2 \}\cb1 \
\cb4           <div className=\cf6 \strokec6 "flex items-center"\cf0 \strokec2 >\cb1 \
\cb4             <div className=\cf6 \strokec6 "flex-shrink-0 flex items-center"\cf0 \strokec2 >\cb1 \
\cb4               \{\cf7 \strokec7 /* Ensure you save your bear image as 'logo.png' in the public folder */\cf0 \strokec2 \}\cb1 \
\cb4               <img \cb1 \
\cb4                 className=\cf6 \strokec6 "h-12 w-auto object-contain"\cf0 \strokec2  \cb1 \
\cb4                 src=\cf6 \strokec6 "/logo.png"\cf0 \strokec2  \cb1 \
\cb4                 alt=\cf6 \strokec6 "Byron Bears Logo"\cf0 \strokec2  \cb1 \
\cb4                 onError=\{(e) => \{\cb1 \
\cb4                   \cf7 \strokec7 // Fallback if image is missing\cf0 \cb1 \strokec2 \
\cb4                   e.currentTarget.style.display = \cf6 \strokec6 'none'\cf0 \strokec2 ;\cb1 \
\cb4                   e.currentTarget.nextElementSibling?.classList.remove(\cf6 \strokec6 'hidden'\cf0 \strokec2 );\cb1 \
\cb4                 \}\}\cb1 \
\cb4               />\cb1 \
\cb4               \{\cf7 \strokec7 /* Fallback placeholder if image fails to load */\cf0 \strokec2 \}\cb1 \
\cb4               <div className=\cf6 \strokec6 "hidden bg-yellow-400 p-2 rounded-lg shadow-sm"\cf0 \strokec2 >\cb1 \
\cb4                  <span className=\cf6 \strokec6 "text-slate-900 font-bold text-xl"\cf0 \strokec2 >\cf5 \strokec5 B\cf0 \strokec2 </span>\cb1 \
\cb4               </div>\cb1 \
\cb4             </div>\cb1 \
\cb4             <div className=\cf6 \strokec6 "ml-4"\cf0 \strokec2 >\cb1 \
\cb4               <span className=\cf6 \strokec6 "block text-2xl font-bold text-slate-900 leading-tight"\cf0 \strokec2 >\cb1 \
\cb4                 \cf5 \strokec5 Byron\cf0 \strokec2  \cf5 \strokec5 Finance\cf0 \strokec2  \cf5 \strokec5 Dashboard\cf0 \cb1 \strokec2 \
\cb4               </span>\cb1 \
\cb4               <div className=\cf6 \strokec6 "flex items-center gap-2 text-xs text-slate-500 mt-1"\cf0 \strokec2 >\cb1 \
\cb4                 <span className=\cf6 \strokec6 "flex items-center gap-1"\cf0 \strokec2 >\cb1 \
\cb4                   \cf5 \strokec5 Source\cf0 \strokec2 : \cf5 \strokec5 Google\cf0 \strokec2  \cf5 \strokec5 Sheet\cf0 \cb1 \strokec2 \
\cb4                   <a \cb1 \
\cb4                     href=\{\cf5 \strokec5 GOOGLE_SHEET_URL\cf0 \strokec2 \} \cb1 \
\cb4                     target=\cf6 \strokec6 "_blank"\cf0 \strokec2  \cb1 \
\cb4                     rel=\cf6 \strokec6 "noreferrer"\cf0 \strokec2  \cb1 \
\cb4                     className=\cf6 \strokec6 "text-blue-500 hover:text-blue-700"\cf0 \cb1 \strokec2 \
\cb4                     title=\cf6 \strokec6 "Open Source CSV"\cf0 \cb1 \strokec2 \
\cb4                   >\cb1 \
\cb4                     <\cf5 \strokec5 ExternalLink\cf0 \strokec2  className=\cf6 \strokec6 "w-3 h-3"\cf0 \strokec2  />\cb1 \
\cb4                   </a>\cb1 \
\cb4                 </span>\cb1 \
\cb4                 \{lastUpdated && (\cb1 \
\cb4                   <>\cb1 \
\cb4                     <span className=\cf6 \strokec6 "hidden sm:inline"\cf0 \strokec2 >\cf10 \strokec10 \'95\cf0 \strokec2 </span>\cb1 \
\cb4                     <span className=\cf6 \strokec6 "hidden sm:inline"\cf0 \strokec2 >\cf5 \strokec5 Synced\cf0 \strokec2 : \{lastUpdated.toLocaleTimeString()\}</span>\cb1 \
\cb4                   </>\cb1 \
\cb4                 )\}\cb1 \
\cb4               </div>\cb1 \
\cb4             </div>\cb1 \
\cb4           </div>\cb1 \
\
\cb4           \{\cf7 \strokec7 /* Right Side: Actions */\cf0 \strokec2 \}\cb1 \
\cb4           <div className=\cf6 \strokec6 "flex items-center gap-2 sm:gap-3"\cf0 \strokec2 >\cb1 \
\cb4              <button \cb1 \
\cb4               onClick=\{onRefresh\}\cb1 \
\cb4               disabled=\{loading\}\cb1 \
\cb4               className=\cf6 \strokec6 "p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"\cf0 \cb1 \strokec2 \
\cb4               title=\cf6 \strokec6 "Refresh Data"\cf0 \cb1 \strokec2 \
\cb4             >\cb1 \
\cb4               <\cf5 \strokec5 RefreshCw\cf0 \strokec2  className=\{\cf6 \strokec6 `w-5 h-5 \cf0 \strokec2 $\{loading ? \cf6 \strokec6 'animate-spin'\cf0 \strokec2  : \cf6 \strokec6 ''\cf0 \strokec2 \}\cf6 \strokec6 `\cf0 \strokec2 \} />\cb1 \
\cb4             </button>\cb1 \
\
\cb4             \{\cf7 \strokec7 /* Admin Tools */\cf0 \strokec2 \}\cb1 \
\cb4             \{isAdmin && (\cb1 \
\cb4               <>\cb1 \
\cb4                 <div className=\cf6 \strokec6 "h-6 w-px bg-slate-200 mx-1"\cf0 \strokec2 ></div>\cb1 \
\cb4                 \cb1 \
\cb4                 <button\cb1 \
\cb4                   onClick=\{copyEmbedCode\}\cb1 \
\cb4                   className=\cf6 \strokec6 "flex items-center gap-2 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium"\cf0 \cb1 \strokec2 \
\cb4                   title=\cf6 \strokec6 "Get HTML Embed Code"\cf0 \cb1 \strokec2 \
\cb4                 >\cb1 \
\cb4                   \{copied ? <\cf5 \strokec5 Check\cf0 \strokec2  className=\cf6 \strokec6 "w-4 h-4 text-green-600"\cf0 \strokec2  /> : <\cf5 \strokec5 Code\cf0 \strokec2  className=\cf6 \strokec6 "w-4 h-4"\cf0 \strokec2  />\}\cb1 \
\cb4                   <span className=\cf6 \strokec6 "hidden lg:inline"\cf0 \strokec2 >\{copied ? \cf6 \strokec6 'Copied!'\cf0 \strokec2  : \cf6 \strokec6 'Embed'\cf0 \strokec2 \}</span>\cb1 \
\cb4                 </button>\cb1 \
\
\cb4                 <label className=\cf6 \strokec6 "flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"\cf0 \strokec2 >\cb1 \
\cb4                   <\cf5 \strokec5 Upload\cf0 \strokec2  className=\cf6 \strokec6 "w-4 h-4"\cf0 \strokec2  />\cb1 \
\cb4                   <span className=\cf6 \strokec6 "hidden sm:inline"\cf0 \strokec2 >\cf5 \strokec5 Manual\cf0 \strokec2  \cf5 \strokec5 Import\cf0 \strokec2 </span>\cb1 \
\cb4                   <input \cf3 \strokec3 type\cf0 \strokec2 =\cf6 \strokec6 "file"\cf0 \strokec2  accept=\cf6 \strokec6 ".csv"\cf0 \strokec2  onChange=\{onFileUpload\} className=\cf6 \strokec6 "hidden"\cf0 \strokec2  />\cb1 \
\cb4                 </label>\cb1 \
\cb4               </>\cb1 \
\cb4             )\}\cb1 \
\cb4           </div>\cb1 \
\cb4         </div>\cb1 \
\cb4       </div>\cb1 \
\cb4     </nav>\cb1 \
\cb4   );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf0 \strokec2  \cf3 \strokec3 default\cf0 \strokec2  \cf5 \strokec5 Header\cf0 \strokec2 ;}
