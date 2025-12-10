import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { FileUpload } from "@/components/upload/FileUpload";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate processing
    toast({
      title: "Processing started",
      description: "Analyzing logs and detecting anomalies...",
    });

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "Analysis complete!",
      description: "Found 7 anomalies. Redirecting to diagnosis...",
      action: <CheckCircle className="h-5 w-5 text-success" />,
    });

    setIsProcessing(false);
    
    // Navigate to diagnosis page
    setTimeout(() => {
      navigate("/diagnosis");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">
            Upload Log File
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload your server logs for AI-powered anomaly detection and diagnosis
          </p>
        </div>

        {/* Upload Component */}
        <div className="animate-fade-up delay-100">
          <FileUpload 
            onFileUpload={handleFileUpload}
            isProcessing={isProcessing}
          />
        </div>

        {/* Processing Steps */}
        <div className="glass-card p-5 animate-fade-up delay-200">
          <h4 className="font-medium text-foreground mb-4">
            What happens after upload?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Parse & Validate</p>
                <p className="text-sm text-muted-foreground">
                  Logs are parsed and validated for required fields
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Anomaly Detection</p>
                <p className="text-sm text-muted-foreground">
                  AI scans for spikes, patterns, and outliers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Auto Diagnosis</p>
                <p className="text-sm text-muted-foreground">
                  Root cause analysis and fix recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Upload;
