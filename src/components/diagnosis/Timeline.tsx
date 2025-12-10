import { cn } from "@/lib/utils";

interface TimelineItem {
  time: string;
  event: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-warning to-destructive" />
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className="relative pl-10 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Dot */}
            <div className={cn(
              "absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background",
              index === 0 && "bg-primary",
              index > 0 && index < items.length - 1 && "bg-warning",
              index === items.length - 1 && "bg-success"
            )} />
            
            <div className="glass-card p-3 hover:border-primary/30 transition-colors">
              <span className="font-mono text-xs text-primary">{item.time}</span>
              <p className="text-sm text-foreground mt-1">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
