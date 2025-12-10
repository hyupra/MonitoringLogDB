export interface LogEntry {
  id: string;
  timestamp: string;
  log_level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'CRITICAL';
  message: string;
  error_code?: string;
  response_time?: number;
  cpu_usage?: number;
  memory_usage?: number;
  request_count?: number;
  service?: string;
  anomaly_score?: number;
  is_anomaly?: boolean;
}

export interface AnomalyResult {
  id: string;
  timestamp: string;
  type: 'error_spike' | 'response_time' | 'cpu_spike' | 'memory_spike' | 'traffic_anomaly' | 'slow_query';
  severity: 'normal' | 'warning' | 'critical';
  score: number;
  metric_value: number;
  threshold: number;
  description: string;
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  root_cause: string;
  impact_summary: string;
  recommended_fixes: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  affected_services: string[];
  incident_timeline: {
    time: string;
    event: string;
  }[];
}

export interface DashboardStats {
  total_logs: number;
  total_errors: number;
  anomalies_today: number;
  highest_cpu_spike: number;
  avg_response_time: number;
  memory_peak: number;
}

export interface TimeSeriesData {
  timestamp: string;
  error_count: number;
  response_time: number;
  cpu_usage: number;
  memory_usage: number;
  request_count: number;
  is_anomaly?: boolean;
}
