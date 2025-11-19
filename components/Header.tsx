import React, { useState } from 'react';
import { Upload, RefreshCw, ExternalLink, Code, Check } from 'lucide-react';
import { GOOGLE_SHEET_URL } from '../constants';

interface HeaderProps {
  isAdmin: boolean;
  lastUpdated: Date | null;
  loading: boolean;
  onRefresh: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAdmin, 
  lastUpdated, 
  loading, 
  onRefresh, 
  onFileUpload 
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmbedCode = () => {
    // Get base URL without query params
    const baseUrl = window.location.href.split('?')[0];
    // Clean trailing slashes if any
    const cleanUrl = baseUrl.replace(/\/$/, "");
    const embedUrl = `${cleanUrl}?mode=embed`;
    
    const code = `<iframe src="${embedUrl}" width="100%" height="1200" style="border:none; background:white;" title="Byron Finance Dashboard"></iframe>`;
    
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Left Side: Logo & Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Ensure you save your bear image as 'logo.png' in the public folder */}
              <img 
                className="h-12 w-auto object-contain" 
                src="/logo.png" 
                alt="Byron Bears Logo" 
                onError={(e) => {
                  // Fallback if image is missing
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback placeholder if image fails to load */}
              <div className="hidden bg-yellow-400 p-2 rounded-lg shadow-sm">
                 <span className="text-slate-900 font-bold text-xl">B</span>
              </div>
            </div>
            <div className="ml-4">
              <span className="block text-2xl font-bold text-slate-900 leading-tight">
                Byron Finance Dashboard
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  Source: Google Sheet
                  <a 
                    href={GOOGLE_SHEET_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-500 hover:text-blue-700"
                    title="Open Source CSV"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
                {lastUpdated && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Synced: {lastUpdated.toLocaleTimeString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
             <button 
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Admin Tools */}
            {isAdmin && (
              <>
                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                
                <button
                  onClick={copyEmbedCode}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium"
                  title="Get HTML Embed Code"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Code className="w-4 h-4" />}
                  <span className="hidden lg:inline">{copied ? 'Copied!' : 'Embed'}</span>
                </button>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Manual Import</span>
                  <input type="file" accept=".csv" onChange={onFileUpload} className="hidden" />
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;