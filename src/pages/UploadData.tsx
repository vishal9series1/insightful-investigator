import { useState } from "react";
import { Upload, FileText, CreditCard, Mail, Check, Loader2, File, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  records?: number;
}

const uploadTypes = [
  {
    id: "transactions",
    title: "Transactions",
    description: "Upload CSV files containing transaction data",
    icon: CreditCard,
    formats: ["CSV", "XLSX"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "invoices",
    title: "Invoices",
    description: "Upload PDF or image invoices for analysis",
    icon: FileText,
    formats: ["PDF", "PNG", "JPG"],
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "emails",
    title: "Emails",
    description: "Upload email archives in JSON or text format",
    icon: Mail,
    formats: ["JSON", "TXT", "EML"],
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const UploadData = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "transactions_jan2024.csv", type: "Transactions", status: "completed", progress: 100, records: 1250 },
    { id: "2", name: "invoices_batch_001.pdf", type: "Invoices", status: "processing", progress: 65 },
  ]);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleUpload = (typeId: string) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: `sample_${typeId}_${Date.now()}.csv`,
      type: uploadTypes.find(t => t.id === typeId)?.title || typeId,
      status: "uploading",
      progress: 0,
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles(prev => 
        prev.map(f => f.id === newFile.id ? { ...f, progress, status: progress >= 100 ? "processing" : "uploading" } : f)
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? { ...f, status: "completed", records: Math.floor(Math.random() * 1000) + 100 } : f)
          );
        }, 2000);
      }
    }, 200);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis Started",
      description: "Your data is being analyzed for fraud patterns. This may take a few minutes.",
    });
  };

  const completedFiles = uploadedFiles.filter(f => f.status === "completed").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Upload Data</h1>
        <p className="text-muted-foreground mt-1">Connect your data sources for fraud analysis</p>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {uploadTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={cn(
                "upload-zone relative",
                dragOver === type.id && "border-primary bg-primary/5"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOver(type.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => { e.preventDefault(); setDragOver(null); handleUpload(type.id); }}
              onClick={() => handleUpload(type.id)}
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4", type.bgColor)}>
                <Icon className={cn("w-7 h-7", type.color)} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
              <div className="flex items-center justify-center gap-2">
                {type.formats.map((format) => (
                  <span key={format} className="px-2 py-0.5 bg-muted rounded text-xs font-medium">
                    {format}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Upload className="w-5 h-5" />
                  Drop files or click to upload
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Uploaded Files</h2>
            <span className="text-sm text-muted-foreground">
              {completedFiles} of {uploadedFiles.length} ready
            </span>
          </div>
          
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border">
                  <File className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{file.name}</p>
                    <span className="px-2 py-0.5 bg-background rounded text-xs">{file.type}</span>
                  </div>
                  
                  {file.status === "uploading" || file.status === "processing" ? (
                    <div className="mt-2">
                      <Progress value={file.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {file.status === "uploading" ? `Uploading... ${file.progress}%` : "Processing..."}
                      </p>
                    </div>
                  ) : file.records ? (
                    <p className="text-sm text-muted-foreground mt-1">{file.records.toLocaleString()} records</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "completed" && (
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                  )}
                  {(file.status === "uploading" || file.status === "processing") && (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {completedFiles > 0 && (
            <Button 
              className="w-full mt-6" 
              size="lg"
              onClick={handleAnalyze}
            >
              <Play className="w-4 h-4 mr-2" />
              Analyze Data ({completedFiles} files)
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadData;
