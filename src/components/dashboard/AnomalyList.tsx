import { AnomalyResult } from "@/types/log";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { 
  AlertTriangle, 
  Clock, 
  Cpu, 
  HardDrive, 
  Activity,
  Database
} from "lucide-react";

interface AnomalyListProps {
  anomalies: AnomalyResult[];
}

const typeIcons: Record<string, typeof AlertTriangle> = {
  error_spike: AlertTriangle,
  response_time: Clock,
  cpu_spike: Cpu,
  memory_spike: HardDrive,
  traffic_anomaly: Activity,
  slow_query: Database,
};

const typeLabels: Record<string, string> = {
  error_spike: "Error Spike",
  response_time: "Response Time",
  cpu_spike: "CPU Spike",
  memory_spike: "Memory Spike",
  traffic_anomaly: "Traffic Anomaly",
  slow_query: "Slow Query",
};

export function AnomalyList({ anomalies }: AnomalyListProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="font-semibold text-foreground mb-4">Recent Anomalies</h3>
      
      <div className="space-y-3">
        {anomalies.map((anomaly, index) => {
          const Icon = typeIcons[anomaly.type] || AlertTriangle;
          
          return (
            <div 
              key={anomaly.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border/30 transition-all hover:border-border/50 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2.5 rounded-lg ${
                anomaly.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
                anomaly.severity === 'warning' ? 'bg-warning/20 text-warning' :
                'bg-success/20 text-success'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">
                    {typeLabels[anomaly.type]}
                  </span>
                  <Badge 
                    variant={
                      anomaly.severity === 'critical' ? 'critical' :
                      anomaly.severity === 'warning' ? 'warn' : 'normal'
                    }
                  >
                    {anomaly.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {anomaly.description}
                </p>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="font-mono">
                    Score: {anomaly.score}
                  </span>
                  <span>
                    {format(parseISO(anomaly.timestamp), "HH:mm:ss")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
