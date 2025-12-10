import { AppLayout } from "@/components/layout/AppLayout";
import { DiagnosisCard } from "@/components/diagnosis/DiagnosisCard";
import { Timeline } from "@/components/diagnosis/Timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDiagnosis } from "@/lib/mockData";
import { 
  Brain, 
  AlertTriangle, 
  Wrench, 
  Download, 
  Server,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Diagnosis = () => {
  const handleExport = (format: 'pdf' | 'json') => {
    // Simulate export
    const data = JSON.stringify(mockDiagnosis, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnosis-report.${format}`;
    a.click();
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-up">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                AI Auto-Diagnosis
              </h1>
              <Badge variant="critical" className="text-sm">
                {mockDiagnosis.priority.toUpperCase()}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Automated root cause analysis and recommendations
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('json')}>
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
            <Button variant="default" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Diagnosis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Root Cause */}
          <DiagnosisCard
            title="Root Cause"
            icon={<Brain className="h-5 w-5" />}
            variant="destructive"
            className="animate-fade-up delay-100"
          >
            <p className="text-foreground leading-relaxed">
              {mockDiagnosis.root_cause}
            </p>
          </DiagnosisCard>

          {/* Impact Summary */}
          <DiagnosisCard
            title="Impact Summary"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="warning"
            className="animate-fade-up delay-200"
          >
            <p className="text-foreground leading-relaxed">
              {mockDiagnosis.impact_summary}
            </p>
          </DiagnosisCard>

          {/* Affected Services */}
          <DiagnosisCard
            title="Affected Services"
            icon={<Server className="h-5 w-5" />}
            variant="default"
            className="animate-fade-up delay-300"
          >
            <div className="flex flex-wrap gap-2">
              {mockDiagnosis.affected_services.map((service, index) => (
                <Badge key={index} variant="info" className="text-sm">
                  {service}
                </Badge>
              ))}
            </div>
          </DiagnosisCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Fixes */}
          <DiagnosisCard
            title="Recommended Fixes"
            icon={<Wrench className="h-5 w-5" />}
            variant="success"
            className="animate-fade-up delay-400"
          >
            <ul className="space-y-3">
              {mockDiagnosis.recommended_fixes.map((fix, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-foreground">{fix}</span>
                </li>
              ))}
            </ul>
          </DiagnosisCard>

          {/* Incident Timeline */}
          <DiagnosisCard
            title="Incident Timeline"
            icon={<ArrowRight className="h-5 w-5" />}
            className="animate-fade-up delay-500"
          >
            <Timeline items={mockDiagnosis.incident_timeline} />
          </DiagnosisCard>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-5 animate-fade-up delay-500">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">
              <CheckCircle className="h-4 w-4 mr-2" />
              Apply Recommended Index
            </Button>
            <Button variant="outline">
              Restart Order Service
            </Button>
            <Button variant="outline">
              Increase Pool Size
            </Button>
            <Button variant="ghost">
              View Full Logs
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Diagnosis;
