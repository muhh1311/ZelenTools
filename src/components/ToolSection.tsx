import { ReactNode } from "react";

interface ToolSectionProps {
  title: string;
  children: ReactNode;
}

const ToolSection = ({ title, children }: ToolSectionProps) => {
  return (
    <div>
      <h2 className="font-mono font-bold text-base text-foreground pb-2 border-b border-border mb-1">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export default ToolSection;
