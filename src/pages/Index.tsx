import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AnomalyChart } from "@/components/dashboard/AnomalyChart";
import { AnomalyList } from "@/components/dashboard/AnomalyList";
import { mockDashboardStats, mockTimeSeriesData, mockAnomalies } from "@/lib/mockData";
import { 
  FileText, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Clock,
  HardDrive
} from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time log analytics and anomaly detection
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Logs"
            value={mockDashboardStats.total_logs.toLocaleString()}
            icon={<FileText className="h-5 w-5" />}
            trend="up"
            trendValue="+12%"
            variant="primary"
            className="animate-fade-up delay-100"
          />
          <StatCard
            title="Total Errors"
            value={mockDashboardStats.total_errors}
            icon={<AlertTriangle className="h-5 w-5" />}
            trend="down"
            trendValue="-8%"
            variant="destructive"
            className="animate-fade-up delay-200"
          />
          <StatCard
            title="Anomalies Today"
            value={mockDashboardStats.anomalies_today}
            icon={<Activity className="h-5 w-5" />}
            trend="up"
            trendValue="+3"
            variant="warning"
            className="animate-fade-up delay-300"
          />
          <StatCard
            title="CPU Peak"
            value={`${mockDashboardStats.highest_cpu_spike}%`}
            icon={<Cpu className="h-5 w-5" />}
            variant="warning"
            className="animate-fade-up delay-400"
          />
          <StatCard
            title="Avg Response"
            value={`${mockDashboardStats.avg_response_time}ms`}
            icon={<Clock className="h-5 w-5" />}
            variant="success"
            className="animate-fade-up delay-500"
          />
          <StatCard
            title="Memory Peak"
            value={`${mockDashboardStats.memory_peak}%`}
            icon={<HardDrive className="h-5 w-5" />}
            variant="default"
            className="animate-fade-up delay-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up delay-200">
            <AnomalyChart
              data={mockTimeSeriesData}
              dataKey="error_count"
              title="Error Count"
              color="hsl(var(--destructive))"
              threshold={30}
            />
          </div>
          <div className="animate-fade-up delay-300">
            <AnomalyChart
              data={mockTimeSeriesData}
              dataKey="response_time"
              title="Response Time"
              color="hsl(var(--warning))"
              unit="ms"
              threshold={500}
            />
          </div>
          <div className="animate-fade-up delay-400">
            <AnomalyChart
              data={mockTimeSeriesData}
              dataKey="cpu_usage"
              title="CPU Usage"
              color="hsl(var(--primary))"
              unit="%"
              threshold={80}
            />
          </div>
          <div className="animate-fade-up delay-500">
            <AnomalyChart
              data={mockTimeSeriesData}
              dataKey="memory_usage"
              title="Memory Usage"
              color="hsl(var(--chart-5))"
              unit="%"
              threshold={85}
            />
          </div>
        </div>

        {/* Anomaly List */}
        <div className="animate-fade-up delay-300">
          <AnomalyList anomalies={mockAnomalies} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
