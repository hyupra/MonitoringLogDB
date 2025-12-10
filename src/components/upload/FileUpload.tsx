import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileUpload, isProcessing }: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const isValidType = file.name.endsWith('.csv') || file.name.endsWith('.json');
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or JSON file",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border/50 hover:border-primary/50 hover:bg-secondary/30",
          isProcessing && "pointer-events-none opacity-60"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <>
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">Processing logs...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Running anomaly detection and AI diagnosis
                </p>
              </div>
            </>
          ) : uploadedFile ? (
            <>
              <div className="h-16 w-16 rounded-2xl bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">File uploaded!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center transition-colors",
                isDragActive ? "bg-primary/20" : "bg-secondary"
              )}>
                <Upload className={cn(
                  "h-8 w-8 transition-colors",
                  isDragActive ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {isDragActive ? "Drop your file here" : "Drag & drop your log file"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports CSV and JSON formats
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                Browse Files
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Expected format info */}
      <div className="glass-card p-5">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Expected Log Format
        </h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-muted-foreground">
{`{
  "timestamp": "2024-01-15T14:23:00Z",
  "log_level": "ERROR",
  "message": "Database connection timeout",
  "error_code": "DB_TIMEOUT_001",
  "response_time": 30012,
  "cpu_usage": 45,
  "memory_usage": 67,
  "request_count": 234
}`}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Required fields: timestamp, log_level, message. Optional: error_code, response_time, cpu_usage, memory_usage, request_count
        </p>
      </div>
    </div>
  );
}
