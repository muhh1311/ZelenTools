// src/components/ui/ProgressLayout.tsx
import React from 'react';

// ─── PROP INTERFACE (Har tool ka data handle karne ke liye) ───
interface ProgressLayoutProps {
  isOpen: boolean;
  currentFileIndex: number;    // e.g., 23
  totalFiles: number;          // e.g., 30
  currentFileName: string;     // e.g., "Screenshot-2026-04-08.png"
  currentFileSize?: string;    // e.g., "209.85 KB" (Optional)
  progressPercentage: number;  // e.g., 74
  statusText?: string;         // e.g., "Processing", "Converting", "Uploading"
}

export default function ProgressLayout({
  isOpen,
  currentFileIndex,
  totalFiles,
  currentFileName,
  currentFileSize,
  progressPercentage = 0,
  statusText = "Processing"
}: ProgressLayoutProps) {
  
  // Agar active nahi hai to screen par kuch nahi dikhega
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[99999] flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
      
      {/* ─── MAIN WHITE CARD CONTENT ─── */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl flex flex-col w-full max-w-md text-center border border-slate-100 dark:border-zinc-800 transform transition-all">
        
        {/* 1. File Count Headline */}
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight">
          {statusText === "Uploading" ? "Uploading" : "Converting"} file {currentFileIndex} of {totalFiles}
        </h3>
        
        {/* 2. Current File Name & Size Metadata */}
        <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 font-medium mb-5 truncate max-w-xs mx-auto">
          {currentFileName} {currentFileSize && <span className="text-slate-400 dark:text-zinc-500 font-normal">({currentFileSize})</span>}
        </p>

        {/* 3. Outer Progress Track Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-4 shadow-inner relative">
          {/* Active Blue Progress Bar */}
          <div 
            className="h-full bg-[#4a85f6] rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* 4. Big Percentage Counter */}
        <div className="text-4xl font-extrabold text-slate-800 dark:text-white line-height-1 mb-1 tracking-tight">
          {progressPercentage}%
        </div>
        
        {/* 5. Bottom Status Tag */}
        <span className="text-[11px] font-bold text-[#4a85f6] letter-spacing: 0.05em tracking-wider uppercase">
          {statusText}
        </span>
      </div>

    </div>
  );
} 