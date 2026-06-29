// src/components/ui/WorkspaceLayout.tsx
import React, { useState } from "react";

interface WorkspaceLayoutProps {
  children: React.ReactNode;      
  sidebarOptions: React.ReactNode; 
  actionButtonText?: string;      
  onActionClick?: () => void;     
  onAddFilesClick?: () => void;   
  showAddFiles?: boolean;         // 👈 Naya boolean prop jo control karega plus button ko
}

export default function WorkspaceLayout({ 
  children, 
  sidebarOptions, 
  actionButtonText = "Process Files",
  onActionClick,
  onAddFilesClick,
  showAddFiles = true             // 👈 Default value true rakhi hai ke agar bulk ho to khud dikhe
}: WorkspaceLayoutProps) {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex bg-slate-50/50 dark:bg-background relative overflow-x-hidden">
      
      {/* 🖼️ MAIN AREA */}
      <div className="flex-1 p-6 md:p-10 flex flex-wrap gap-6 items-start justify-center lg:justify-start overflow-y-auto max-h-[calc(100vh-80px)] pb-28 lg:pb-10">
        {children}

        {/* 🛠️ MOBILE FLOATING BUTTONS */}
        <div className="fixed top-24 right-4 z-40 flex flex-col gap-3 lg:hidden">
          {/* Settings Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-xl border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 animate-spin-slow">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.123 1.123 0 0 0-.417.897v.005c0 .323.155.626.417.897l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a2.08 2.08 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a2.08 2.08 0 0 1-.22-.127c-.324-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.767c.261-.27.416-.573.416-.897v-.005c0-.323-.155-.626-.416-.897l-1.004-.767a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.645-.869L9.594 3.94Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>

          {/* ➕ Plus Add Files Button (Condition Check) */}
          {showAddFiles && (
            <button 
              onClick={onAddFilesClick} 
              className="w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center text-white text-2xl font-bold active:scale-95 transition-transform"
            >
              ＋
            </button>
          )}
        </div>
      </div>

      {/* 🕶️ BACKDROP BACKGROUND */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ⚙️ SIDEBAR SETTINGS PANEL */}
      {/* ⚙️ SIDEBAR SETTINGS PANEL (Topbar height h-14 yani 56px ke sath perfectly fixed) */}
      <div className={`
        fixed lg:sticky 
        top-[56px] lg:top-0 
        h-[calc(100vh-56px)] lg:h-[calc(100vh-80px)] 
        right-0 z-40 lg:z-10
        w-[85vw] sm:w-[380px] xl:w-[420px] 
        bg-white dark:bg-zinc-900 
        border-l border-slate-200 dark:border-zinc-800 shadow-2xl lg:shadow-sm 
        flex flex-col justify-between 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex justify-end lg:hidden mb-2">
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm font-medium border px-3 py-1 rounded-lg">
              Close ✕
            </button>
          </div>
          {sidebarOptions}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-zinc-950/40 border-t border-slate-100 dark:border-zinc-800 sticky bottom-0 w-full">
          <button 
            onClick={onActionClick}
            className="w-full bg-[#4a85f6] hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-all text-[17px] tracking-wide flex items-center justify-center gap-2 select-none cursor-pointer active:scale-[0.98]"
          >
            {actionButtonText}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/80 text-xs font-bold font-mono">→</span>
          </button>
        </div>

      </div>

      {/* 📱 MOBILE FIXED BOTTOM ACTION BUTTON */}
      {!isSidebarOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-30 lg:hidden flex justify-end">
          <button 
            onClick={onActionClick}
            className="w-[70vw] sm:w-[280px] bg-[#4a85f6] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2"
          >
            {actionButtonText}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/80 text-xs font-bold font-mono">→</span>
          </button>
        </div>
      )}

    </div>
  );
}