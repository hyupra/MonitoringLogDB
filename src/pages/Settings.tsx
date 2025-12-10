import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Database, 
  Key, 
  Globe, 
  Shield,
  Save
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your AIOps dashboard preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Database Configuration */}
          <div className="glass-card p-6 animate-fade-up delay-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Data Retention</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Log Retention (days)</Label>
                  <Input type="number" defaultValue={30} />
                </div>
                <div className="space-y-2">
                  <Label>Anomaly History (days)</Label>
                  <Input type="number" defaultValue={90} />
                </div>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="glass-card p-6 animate-fade-up delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-warning/20">
                <Key className="h-5 w-5 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">API Configuration</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue="/api/v1" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium text-foreground">Enable API Access</p>
                  <p className="text-sm text-muted-foreground">Allow external API calls</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Detection Settings */}
          <div className="glass-card p-6 animate-fade-up delay-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/20">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Detection Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium text-foreground">Auto-diagnosis</p>
                  <p className="text-sm text-muted-foreground">Run AI diagnosis automatically after detection</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium text-foreground">Real-time Monitoring</p>
                  <p className="text-sm text-muted-foreground">Enable live log streaming</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium text-foreground">Pattern Learning</p>
                  <p className="text-sm text-muted-foreground">AI learns from historical patterns</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} size="lg" className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
