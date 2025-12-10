import { AppLayout } from "@/components/layout/AppLayout";
import { AnomalyChart } from "@/components/dashboard/AnomalyChart";
import { Badge } from "@/components/ui/badge";
import { mockTimeSeriesData, mockAnomalies } from "@/lib/mockData";
import { format, parseISO } from "date-fns";
import { 
  AlertTriangle, 
  Clock, 
  Cpu, 
  HardDrive, 
  Activity,
  Database,
  TrendingUp
} from "lucide-react";

const typeIcons: Record<string, typeof AlertTriangle> = {
  error_spike: AlertTriangle,
  response_time: Clock,
  cpu_spike: Cpu,
  memory_spike: HardDrive,
  traffic_anomaly: Activity,
  slow_query: Database,
};

const Anomalies = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Anomaly Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of all detected anomalies
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up delay-100">
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-destructive/20">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockAnomalies.filter(a => a.severity === 'critical').length}
              </p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/20">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockAnomalies.filter(a => a.severity === 'warning').length}
              </p>
              <p className="text-sm text-muted-foreground">Warning</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">87</p>
              <p className="text-sm text-muted-foreground">Avg Score</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/20">
              <Activity className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">45min</p>
              <p className="text-sm text-muted-foreground">Avg Duration</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up delay-200">
          <AnomalyChart
            data={mockTimeSeriesData}
            dataKey="error_count"
            title="Error Count Over Time"
            color="hsl(var(--destructive))"
            threshold={30}
          />
          <AnomalyChart
            data={mockTimeSeriesData}
            dataKey="cpu_usage"
            title="CPU Usage Over Time"
            color="hsl(var(--primary))"
            unit="%"
            threshold={80}
          />
        </div>

        {/* Anomaly Table */}
        <div className="glass-card animate-fade-up delay-300">
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold text-foreground">Anomaly Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Value</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Threshold</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {mockAnomalies.map((anomaly, index) => {
                  const Icon = typeIcons[anomaly.type] || AlertTriangle;
                  return (
                    <tr 
                      key={anomaly.id}
                      className="border-b border-border/20 hover:bg-secondary/30 transition-colors animate-fade-up"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground capitalize">
                            {anomaly.type.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={
                            anomaly.severity === 'critical' ? 'critical' :
                            anomaly.severity === 'warning' ? 'warn' : 'normal'
                          }
                        >
                          {anomaly.severity}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-foreground">{anomaly.score}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-foreground">{anomaly.metric_value}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-muted-foreground">{anomaly.threshold}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">
                          {format(parseISO(anomaly.timestamp), "HH:mm:ss")}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <span className="text-sm text-muted-foreground line-clamp-1">
                          {anomaly.description}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Anomalies;
