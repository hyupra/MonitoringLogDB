import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Zap, 
  Server, 
  RefreshCw, 
  HardDrive,
  Network,
  CheckCircle,
  ArrowRight,
  Cpu
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Add Composite Index on Orders Table",
    category: "Database",
    priority: "critical",
    impact: "High",
    effort: "Low",
    icon: Database,
    description: "Create a composite index on (user_id, created_at) to optimize the frequent query patterns detected.",
    command: "CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);",
    estimatedImprovement: "~400% query performance improvement",
  },
  {
    id: 2,
    title: "Increase Connection Pool Size",
    category: "Configuration",
    priority: "high",
    impact: "High",
    effort: "Low",
    icon: Server,
    description: "Increase database connection pool from 10 to 25 connections to handle peak load.",
    command: "pool_size: 25",
    estimatedImprovement: "Prevent connection exhaustion during spikes",
  },
  {
    id: 3,
    title: "Implement Query Timeout",
    category: "Application",
    priority: "high",
    impact: "Medium",
    effort: "Medium",
    icon: Zap,
    description: "Add 5-second query timeout with circuit breaker pattern to prevent cascade failures.",
    command: "query_timeout: 5000ms",
    estimatedImprovement: "Faster failure recovery",
  },
  {
    id: 4,
    title: "Enable Result Caching",
    category: "Performance",
    priority: "medium",
    impact: "High",
    effort: "Medium",
    icon: RefreshCw,
    description: "Implement Redis caching with 5-minute TTL for frequently accessed order data.",
    command: "cache_ttl: 300",
    estimatedImprovement: "~60% reduction in database load",
  },
  {
    id: 5,
    title: "Add Read Replicas",
    category: "Infrastructure",
    priority: "medium",
    impact: "High",
    effort: "High",
    icon: HardDrive,
    description: "Consider implementing read replicas for heavy read operations to distribute load.",
    command: "replicas: 2",
    estimatedImprovement: "Better read scalability",
  },
  {
    id: 6,
    title: "Optimize Network Latency",
    category: "Network",
    priority: "low",
    impact: "Medium",
    effort: "Medium",
    icon: Network,
    description: "Review and optimize network configuration between services to reduce latency.",
    command: "keep_alive: true",
    estimatedImprovement: "~15% latency reduction",
  },
];

const priorityColors = {
  critical: "critical",
  high: "warn",
  medium: "info",
  low: "normal",
} as const;

const Recommendations = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Recommendations
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-generated optimization suggestions based on detected anomalies
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up delay-100">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-destructive">{recommendations.filter(r => r.priority === 'critical').length}</p>
            <p className="text-sm text-muted-foreground">Critical</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-warning">{recommendations.filter(r => r.priority === 'high').length}</p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-primary">{recommendations.filter(r => r.priority === 'medium').length}</p>
            <p className="text-sm text-muted-foreground">Medium</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-success">{recommendations.filter(r => r.priority === 'low').length}</p>
            <p className="text-sm text-muted-foreground">Low Priority</p>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div 
              key={rec.id}
              className="glass-card-hover overflow-hidden animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    rec.priority === 'critical' ? 'bg-destructive/20 text-destructive' :
                    rec.priority === 'high' ? 'bg-warning/20 text-warning' :
                    rec.priority === 'medium' ? 'bg-primary/20 text-primary' :
                    'bg-success/20 text-success'
                  }`}>
                    <rec.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{rec.title}</h3>
                      <Badge variant={priorityColors[rec.priority as keyof typeof priorityColors]}>
                        {rec.priority}
                      </Badge>
                      <Badge variant="secondary">{rec.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {rec.description}
                    </p>
                    
                    <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm mb-4">
                      <span className="text-muted-foreground"># </span>
                      <span className="text-foreground">{rec.command}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Impact: <span className="text-foreground font-medium">{rec.impact}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Effort: <span className="text-foreground font-medium">{rec.effort}</span>
                        </span>
                        <span className="text-success text-xs">
                          {rec.estimatedImprovement}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Learn More
                        </Button>
                        <Button variant="default" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Apply Fix
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Recommendations;
