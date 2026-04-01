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
    const baseUrl = window.location.href.split('?')[0];
    const cleanUrl = baseUrl.replace(/\/$/, "");
    const embedUrl = `${cleanUrl}?mode=embed`;
    const code = `<iframe src="${embedUrl}" width="100%" height="1200" style="border:none; background:white;" title="Byron Finance Dashboard"></iframe>`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      {/* Byron gold accent stripe */}
      <div className="h-1 bg-byron-gold w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-auto object-contain"
                src="/logo.png"
                alt="Byron Bears Logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  fallback?.classList.remove('hidden');
                }}
              />
              {/* Fallback badge if logo is missing */}
              <div className="hidden bg-byron-gold rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
                <span className="text-byron-black font-extrabold text-xl">B</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-byron-black leading-tight tracking-tight">
                  Byron Public Schools
                </span>
                <span className="hidden sm:inline-block h-5 w-px bg-slate-300" />
                <span className="hidden sm:inline text-base font-medium text-slate-500">
                  Finance Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  Live from Google Sheets
                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-byron-gold-dark hover:text-byron-gold transition-colors"
                    title="Open Source CSV"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
                {lastUpdated && (
                  <>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">
                      Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-byron-gold-dark hover:bg-byron-gold-light rounded-full transition-colors disabled:opacity-40"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-byron-gold' : ''}`} />
            </button>

            {isAdmin && (
              <>
                <div className="h-6 w-px bg-slate-200 mx-1" />

                <button
                  onClick={copyEmbedCode}
                  className="flex items-center gap-2 text-slate-500 hover:text-byron-gold-dark px-3 py-2 rounded-lg hover:bg-byron-gold-light transition-all text-sm font-medium"
                  title="Get HTML Embed Code"
                >
                  {copied
                    ? <Check className="w-4 h-4 text-green-600" />
                    : <Code className="w-4 h-4" />
                  }
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
