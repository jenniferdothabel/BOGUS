import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileArchive, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SmartUploadProps {
  onComplete?: () => void;
}

export function SmartZipUpload({ onComplete }: SmartUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'processing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.name.endsWith('.zip') || file.type.includes('zip') || file.type.includes('compressed')) {
      setFile(file);
      startSimulation();
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a .zip file containing your case documents.",
        variant: "destructive"
      });
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
  };

  const startSimulation = async () => {
    setStatus('analyzing');
    setProgress(0);
    setLogs([]);

    // Simulation steps
    setTimeout(() => {
      addLog("📂 Opening archive...");
      setProgress(10);
    }, 500);

    setTimeout(() => {
      addLog("🔍 Scanning for court documents...");
      setStatus('processing');
      setProgress(30);
    }, 1500);

    setTimeout(() => {
      addLog("📄 Found 'Complaint_2024.pdf' -> Tagging as LEGAL");
      setProgress(50);
    }, 2500);

    setTimeout(() => {
      addLog("🏥 Found 'Medical_Records_Sept.pdf' -> Tagging as MEDICAL");
      setProgress(70);
    }, 3500);

    setTimeout(() => {
      addLog("📝 Found 'Grievance_602.jpg' -> Tagging as GRIEVANCE");
      setProgress(90);
    }, 4500);

    setTimeout(() => {
      addLog("✅ Import complete. 14 documents processed.");
      setStatus('complete');
      setProgress(100);
      if (onComplete) onComplete();
    }, 5500);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                isDragging 
                  ? "border-primary bg-primary/5 scale-[1.02]" 
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".zip,application/zip,application/x-zip-compressed"
                onChange={handleFileSelect}
              />
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <FileArchive className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Case Archive</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag & drop a .zip file here, or click to browse.
                <br />
                <span className="text-xs opacity-70">We'll automatically sort your files into Legal, Medical, and Grievances.</span>
              </p>
              <Button variant="outline" className="pointer-events-none">
                Select File
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                  }`}>
                    {status === 'complete' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {status === 'complete' ? 'Import Successful' : file?.name || 'Processing...'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {status === 'analyzing' && 'Analyzing file structure...'}
                      {status === 'processing' && 'Categorizing documents...'}
                      {status === 'complete' && 'All files have been organized.'}
                    </p>
                  </div>
                  {status === 'complete' && (
                    <Button onClick={onComplete} className="ml-auto">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="mt-6 bg-muted/50 rounded-lg p-4 font-mono text-xs space-y-2 h-32 overflow-y-auto border border-border/50">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-primary/50">➜</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                  {logs.length === 0 && <span className="text-muted-foreground italic">Waiting to start...</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
