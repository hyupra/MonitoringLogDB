import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "destructive" | "warning" | "success";
  className?: string;
}

const variantStyles = {
  default: "from-secondary/50 to-secondary/20",
  primary: "from-primary/20 to-primary/5",
  destructive: "from-destructive/20 to-destructive/5",
  warning: "from-warning/20 to-warning/5",
  success: "from-success/20 to-success/5",
};

const iconBgStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  destructive: "bg-destructive/20 text-destructive",
  warning: "bg-warning/20 text-warning",
  success: "bg-success/20 text-success",
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass-card-hover p-5 relative overflow-hidden group", className)}>
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-70",
        variantStyles[variant]
      )} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          </div>
          <div className={cn("rounded-xl p-3", iconBgStyles[variant])}>
            {icon}
          </div>
        </div>
        
        {trend && trendValue && (
          <div className="mt-4 flex items-center gap-1.5">
            {trend === "up" && (
              <TrendingUp className="h-4 w-4 text-success" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            {trend === "neutral" && (
              <Minus className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={cn(
              "text-sm font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground"
            )}>
              {trendValue}
            </span>
            <span className="text-sm text-muted-foreground">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
}
