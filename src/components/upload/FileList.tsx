import { File, Check, Loader2, X, AlertCircle, RefreshCw, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { UploadedFile } from "@/hooks/useFileUpload";

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "transactions":
      return "bg-primary/10 text-primary";
    case "invoices":
      return "bg-warning/10 text-warning";
    case "emails":
      return "bg-success/10 text-success";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const FileList = ({ files, onRemove, onRetry }: FileListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className={cn(
            "flex items-center gap-4 p-4 rounded-xl border transition-all",
            file.status === "error" 
              ? "bg-destructive/5 border-destructive/20" 
              : "bg-card border-border hover:border-primary/30"
          )}
        >
          {/* Preview / Icon */}
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {file.preview ? (
              <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
            ) : file.type.includes("pdf") ? (
              <File className="w-6 h-6 text-destructive" />
            ) : file.type.includes("image") ? (
              <Image className="w-6 h-6 text-muted-foreground" />
            ) : (
              <File className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium truncate">{file.name}</p>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium capitalize", getCategoryColor(file.category))}>
                {file.category}
              </span>
            </div>

            {file.status === "uploading" || file.status === "processing" ? (
              <div className="space-y-1">
                <Progress value={file.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {file.status === "uploading" 
                    ? `Uploading... ${Math.round(file.progress)}%` 
                    : "Processing with AI..."}
                </p>
              </div>
            ) : file.status === "completed" ? (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{formatFileSize(file.size)}</span>
                {file.records && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-success font-medium">{file.records.toLocaleString()} records detected</span>
                  </>
                )}
              </div>
            ) : file.status === "error" ? (
              <p className="text-sm text-destructive">{file.error || "Upload failed"}</p>
            ) : (
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            )}
          </div>

          {/* Status / Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {file.status === "completed" && (
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
            )}
            {file.status === "uploading" || file.status === "processing" ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : null}
            {file.status === "error" && (
              <Button variant="ghost" size="icon" onClick={() => onRetry(file.id)}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => onRemove(file.id)} className="text-muted-foreground hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
