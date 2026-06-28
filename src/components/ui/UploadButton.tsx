// src/components/ui/UploadButton.tsx
import React from "react";

interface UploadButtonProps {
  onClick?: () => void;
  title: string;
}

export default function UploadButton({ onClick, title }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center px-12 py-5 text-xl md:text-2xl font-semibold text-white bg-[#4285F4] hover:bg-[#3572DB] rounded-2xl shadow-[0_4px_14px_0_rgba(66,133,244,0.4)] hover:shadow-[0_6px_20px_0_rgba(66,133,244,0.5)] active:scale-[0.99] transition-all duration-200 min-w-[280px] md:min-w-[350px] tracking-wide select-none cursor-pointer"
    >
      {title}
    </button>
  );
}