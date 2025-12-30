import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "danger" | "warning" | "success";
  description?: string;
}

const KPICard = ({ title, value, icon: Icon, trend, variant = "default", description }: KPICardProps) => {
  const iconStyles = {
    default: "bg-primary/10 text-primary",
    danger: "bg-destructive/10 text-destructive",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  };

  return (
    <div className="kpi-card group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span className="text-sm">{trend.isPositive ? "↓" : "↑"}</span>
              {Math.abs(trend.value)}% {description || "from last week"}
            </p>
          )}
          {!trend && description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl transition-transform group-hover:scale-110", 
          iconStyles[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
