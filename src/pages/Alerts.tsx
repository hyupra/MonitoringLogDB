import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Mail, 
  Webhook, 
  Settings, 
  Plus,
  Trash2,
  Check
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Alerts = () => {
  const [thresholdScore, setThresholdScore] = useState(70);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your alert configuration has been updated.",
    });
  };

  const recentAlerts = [
    { id: 1, time: "14:32:00", message: "Critical anomaly detected: Error spike", severity: "critical" },
    { id: 2, time: "14:28:00", message: "Warning: CPU usage above 80%", severity: "warning" },
    { id: 3, time: "14:25:00", message: "Warning: Response time degradation", severity: "warning" },
    { id: 4, time: "14:23:00", message: "Critical: Database connection timeout", severity: "critical" },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Alert Configuration
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure alert thresholds and notification channels
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert Settings */}
          <div className="glass-card p-6 animate-fade-up delay-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Alert Settings</h3>
            </div>

            <div className="space-y-6">
              {/* Threshold */}
              <div className="space-y-3">
                <Label>Anomaly Score Threshold</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={thresholdScore}
                    onChange={(e) => setThresholdScore(Number(e.target.value))}
                    min={0}
                    max={100}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">
                    Alert when score exceeds {thresholdScore}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-success via-warning to-destructive"
                    style={{ width: `${thresholdScore}%` }}
                  />
                </div>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                </div>
                <Switch
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>

              {/* Webhook */}
              <div className="space-y-3 p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Webhook className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Webhook Integration</p>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack/Telegram</p>
                    </div>
                  </div>
                  <Switch
                    checked={webhookEnabled}
                    onCheckedChange={setWebhookEnabled}
                  />
                </div>
                
                {webhookEnabled && (
                  <div className="pt-3">
                    <Label className="text-sm">Webhook URL</Label>
                    <Input
                      placeholder="https://hooks.slack.com/services/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleSave} className="w-full">
                <Check className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="glass-card p-6 animate-fade-up delay-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <Bell className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground">Recent Alerts</h3>
              </div>
              <Badge variant="destructive">{recentAlerts.length} Active</Badge>
            </div>

            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-colors animate-fade-up ${
                    alert.severity === 'critical' 
                      ? 'bg-destructive/10 border-destructive/30' 
                      : 'bg-warning/10 border-warning/30'
                  }`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={alert.severity === 'critical' ? 'critical' : 'warn'}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Alerts;
