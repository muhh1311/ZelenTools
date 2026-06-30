import { type ReactNode } from "react";

interface ToolSidebarProps {
  title: string;
  children: ReactNode;
  fileCount?: number;
}

export function ToolSidebar({ title, children, fileCount }: ToolSidebarProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        {title}
      </h3>
      {children}
      {fileCount !== undefined && (
        <p className="text-xs text-slate-500 dark:text-zinc-400 text-center mt-4">
          {fileCount} file{fileCount !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

export function ToolField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-slate-600 dark:text-gray-300 block mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-2.5 text-sm";

export const rangeClass = "w-full accent-[#4a85f6]";
