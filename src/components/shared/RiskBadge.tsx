import { cn } from "@/lib/utils";

type RiskLevel = "high" | "medium" | "low";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1";
  
  const levelStyles = {
    high: "bg-destructive/10 text-destructive border border-destructive/20",
    medium: "bg-warning/10 text-warning border border-warning/20",
    low: "bg-success/10 text-success border border-success/20",
  };

  const labels = {
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
  };

  return (
    <span className={cn(baseClasses, levelStyles[level], className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        level === "high" && "bg-destructive",
        level === "medium" && "bg-warning",
        level === "low" && "bg-success"
      )} />
      {labels[level]}
    </span>
  );
};

export default RiskBadge;
