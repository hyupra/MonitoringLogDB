import { LogEntry, AnomalyResult, DiagnosisResult, DashboardStats, TimeSeriesData } from '@/types/log';

// Generate realistic timestamps for the last 24 hours
const generateTimestamps = (count: number): string[] => {
  const now = new Date();
  const timestamps: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000); // 15 minute intervals
    timestamps.push(time.toISOString());
  }
  return timestamps;
};

const timestamps = generateTimestamps(96); // 24 hours of 15-min intervals

export const mockTimeSeriesData: TimeSeriesData[] = timestamps.map((timestamp, i) => {
  // Create some anomaly patterns
  const isAnomalyPeriod = i >= 40 && i <= 45;
  const isSecondAnomalyPeriod = i >= 70 && i <= 73;
  
  return {
    timestamp,
    error_count: isAnomalyPeriod ? Math.floor(Math.random() * 150 + 100) : Math.floor(Math.random() * 20 + 5),
    response_time: isAnomalyPeriod ? Math.floor(Math.random() * 2000 + 1500) : Math.floor(Math.random() * 200 + 80),
    cpu_usage: isSecondAnomalyPeriod ? Math.floor(Math.random() * 30 + 70) : Math.floor(Math.random() * 30 + 20),
    memory_usage: isSecondAnomalyPeriod ? Math.floor(Math.random() * 20 + 75) : Math.floor(Math.random() * 25 + 40),
    request_count: Math.floor(Math.random() * 500 + 200),
    is_anomaly: isAnomalyPeriod || isSecondAnomalyPeriod,
  };
});

export const mockDashboardStats: DashboardStats = {
  total_logs: 24847,
  total_errors: 342,
  anomalies_today: 7,
  highest_cpu_spike: 94,
  avg_response_time: 187,
  memory_peak: 89,
};

export const mockAnomalies: AnomalyResult[] = [
  {
    id: '1',
    timestamp: timestamps[42],
    type: 'error_spike',
    severity: 'critical',
    score: 92,
    metric_value: 156,
    threshold: 30,
    description: 'Error rate increased 5x above normal threshold',
  },
  {
    id: '2',
    timestamp: timestamps[43],
    type: 'response_time',
    severity: 'critical',
    score: 88,
    metric_value: 2340,
    threshold: 500,
    description: 'Response time exceeded 2000ms',
  },
  {
    id: '3',
    timestamp: timestamps[71],
    type: 'cpu_spike',
    severity: 'warning',
    score: 75,
    metric_value: 94,
    threshold: 80,
    description: 'CPU usage spiked to 94%',
  },
  {
    id: '4',
    timestamp: timestamps[72],
    type: 'memory_spike',
    severity: 'warning',
    score: 68,
    metric_value: 89,
    threshold: 85,
    description: 'Memory usage reached 89%',
  },
  {
    id: '5',
    timestamp: timestamps[44],
    type: 'slow_query',
    severity: 'critical',
    score: 85,
    metric_value: 8500,
    threshold: 1000,
    description: 'Database query took 8.5 seconds',
  },
];

export const mockDiagnosis: DiagnosisResult = {
  id: '1',
  timestamp: new Date().toISOString(),
  root_cause: 'Database connection pool exhaustion caused by unoptimized query pattern. The query on table `orders` performed a full table scan without proper indexing, leading to connection timeout cascade.',
  impact_summary: 'Service degradation affected 2,340 users over 45 minutes. API response times increased by 400%, causing 156 failed transactions and potential revenue loss of ~$12,000.',
  recommended_fixes: [
    'Add composite index on orders(user_id, created_at) to optimize query performance',
    'Increase connection pool size from 10 to 25 connections',
    'Implement query timeout of 5 seconds with circuit breaker pattern',
    'Enable query result caching with 5-minute TTL for frequently accessed data',
    'Consider implementing read replicas for heavy read operations',
  ],
  priority: 'critical',
  affected_services: ['API Gateway', 'Order Service', 'Payment Service', 'Database'],
  incident_timeline: [
    { time: '14:23:00', event: 'Initial slow query detected on orders table' },
    { time: '14:25:30', event: 'Connection pool utilization reached 80%' },
    { time: '14:27:00', event: 'First API timeout errors reported' },
    { time: '14:28:15', event: 'Error rate spike detected - 5x normal' },
    { time: '14:30:00', event: 'Connection pool exhausted - new connections rejected' },
    { time: '14:32:00', event: 'Payment service cascade failure initiated' },
    { time: '14:45:00', event: 'Auto-recovery triggered after pool timeout' },
  ],
};

export const mockLogEntries: LogEntry[] = [
  {
    id: '1',
    timestamp: timestamps[42],
    log_level: 'ERROR',
    message: 'Database connection timeout after 30000ms',
    error_code: 'DB_TIMEOUT_001',
    response_time: 30012,
    cpu_usage: 45,
    memory_usage: 67,
    request_count: 234,
    service: 'order-service',
    anomaly_score: 92,
    is_anomaly: true,
  },
  {
    id: '2',
    timestamp: timestamps[43],
    log_level: 'CRITICAL',
    message: 'Connection pool exhausted - cannot acquire connection',
    error_code: 'POOL_EXHAUSTED',
    response_time: 0,
    cpu_usage: 78,
    memory_usage: 82,
    request_count: 456,
    service: 'database',
    anomaly_score: 95,
    is_anomaly: true,
  },
  {
    id: '3',
    timestamp: timestamps[44],
    log_level: 'ERROR',
    message: 'Payment gateway request failed - upstream timeout',
    error_code: 'PAYMENT_TIMEOUT',
    response_time: 8500,
    cpu_usage: 52,
    memory_usage: 71,
    request_count: 189,
    service: 'payment-service',
    anomaly_score: 78,
    is_anomaly: true,
  },
];

export const generateSampleCSV = (): string => {
  const headers = 'timestamp,log_level,message,error_code,response_time,cpu_usage,memory_usage,request_count\n';
  const rows = mockLogEntries.map(entry => 
    `${entry.timestamp},${entry.log_level},"${entry.message}",${entry.error_code || ''},${entry.response_time || ''},${entry.cpu_usage || ''},${entry.memory_usage || ''},${entry.request_count || ''}`
  ).join('\n');
  return headers + rows;
};
