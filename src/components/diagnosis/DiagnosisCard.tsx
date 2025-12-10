import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DiagnosisCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  variant?: "default" | "destructive" | "warning" | "success";
  className?: string;
}

const variantStyles = {
  default: "border-border/50",
  destructive: "border-destructive/30 bg-destructive/5",
  warning: "border-warning/30 bg-warning/5",
  success: "border-success/30 bg-success/5",
};

const iconStyles = {
  default: "bg-secondary text-muted-foreground",
  destructive: "bg-destructive/20 text-destructive",
  warning: "bg-warning/20 text-warning",
  success: "bg-success/20 text-success",
};

export function DiagnosisCard({ 
  title, 
  icon, 
  children, 
  variant = "default",
  className 
}: DiagnosisCardProps) {
  return (
    <div className={cn(
      "glass-card border overflow-hidden",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center gap-3 p-4 border-b border-border/30">
        <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
