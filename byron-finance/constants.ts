{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red15\green112\blue1;\red255\green255\blue254;
\red0\green0\blue255;\red14\green110\blue109;\red144\green1\blue18;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;\cssrgb\c0\c50196\c0;\cssrgb\c100000\c100000\c99608;
\cssrgb\c0\c0\c100000;\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 // The URL to the published Google Sheet CSV\cf0 \cb1 \strokec2 \
\cf3 \cb4 \strokec3 // Ensure the Google Sheet is published via File > Share > Publish to web > Link > CSV\cf0 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf0 \strokec2  \cf5 \strokec5 const\cf0 \strokec2  \cf6 \strokec6 GOOGLE_SHEET_URL\cf0 \strokec2  = \cf7 \strokec7 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTI2XfzQVfhZz1WtHXen0jxJgF-eJStucQndhhgXog49MwVNDqmpyXWQqotKHx-GleVqayWayeUDKwR/pub?output=csv'\cf0 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 // Fallback data structure description (kept for reference or empty state)\cf0 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf0 \strokec2  \cf5 \strokec5 const\cf0 \strokec2  \cf6 \strokec6 FALLBACK_MESSAGE\cf0 \strokec2  = \cf7 \strokec7 "No data loaded. Please check the Google Sheet connection."\cf0 \strokec2 ;}