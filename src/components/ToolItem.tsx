import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolItemProps {
  icon: LucideIcon;
  name: string;
  to?: string;
}

const ToolItem = ({ icon: Icon, name, to }: ToolItemProps) => {
  const content = (
    <div className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer hover:bg-muted transition-colors duration-150">
      <Icon size={18} className="text-primary shrink-0" strokeWidth={1.5} />
      <span className="text-[15px] font-medium text-foreground">{name}</span>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

export default ToolItem;
