import React from "react";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
  label?: string;
}

export default function DownloadButton({ onClick, label = "Download converted images" }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg md:text-xl font-semibold text-white bg-[#4285F4] hover:bg-[#3572DB] rounded-xl shadow-[0_4px_14px_0_rgba(66,133,244,0.4)] hover:shadow-[0_6px_20px_0_rgba(66,133,244,0.5)] active:scale-[0.99] transition-all duration-200 tracking-wide"
    >
      <Download size={24} strokeWidth={2.5} className="animate-pulse" />
      {label}
    </button>
  );
}