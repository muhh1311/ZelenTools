// src/components/ui/UploadButton.tsx
import React from "react";

interface UploadButtonProps {
  onClick?: () => void;
  title: string;
}

export default function UploadButton({ onClick, title }: UploadButtonProps) {
  return (
    <div className="w-full pt-16 flex flex-col items-center justify-center px-4">
      
      {/* 🟦 TinyWow Jaisa Bada aur Wide Dashed Box */}
      <div className="flex flex-col items-center justify-center py-12 px-8 border-2 border-dashed border-blue-300 rounded-3xl bg-blue-50/30 max-w-5xl w-full mx-auto transition-colors hover:border-blue-400 min-h-[320px]">
        
        {/* 📄 Elegant Document Icon */}
        <div className="mb-6 text-slate-400/80 opacity-90 select-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.75" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-16 h-16"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        </div>

        {/* 🔘 Main Action Button */}
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold text-white bg-[#1e40af] hover:bg-[#1d4ed8] rounded-xl shadow-sm active:scale-[0.99] transition-all duration-200 min-w-[280px] md:min-w-[320px] tracking-wide select-none cursor-pointer"
        >
          {title === "Select images" ? "Select Images" : title}
        </button>

        {/* 📝 Subtext */}
        <p className="text-base text-slate-500 mt-5 tracking-wide font-medium select-none text-center">
          or Drag Images here
        </p>

      </div>

    </div>
  );
}