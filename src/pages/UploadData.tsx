import { useState, useRef, useCallback } from "react";
import { Upload, FileText, CreditCard, Mail, Check, Loader2, File, X, Play, Sparkles, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { FileList } from "@/components/upload/FileList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UploadData = () => {
  const { toast } = useToast();
  const { files, addFiles, removeFile, retryFile, clearCompleted, completedCount, isUploading } = useFileUpload();

  const handleAnalyze = () => {
    toast({
      title: "Analysis Started",
      description: `Analyzing ${completedCount} files for fraud patterns. This may take a few minutes.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Data</h1>
          <p className="text-muted-foreground mt-1">Connect your data sources for AI-powered fraud analysis</p>
        </div>
        {files.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {completedCount} of {files.length} files ready
            </span>
            {completedCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearCompleted}>
                Clear completed
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FileDropZone category="transactions" onFilesAdded={addFiles} />
        <FileDropZone category="invoices" onFilesAdded={addFiles} />
        <FileDropZone category="emails" onFilesAdded={addFiles} />
      </div>

      {/* Upload Stats */}
      {files.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Uploaded Files</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {isUploading ? "Processing files..." : `${completedCount} files ready for analysis`}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileList files={files} onRemove={removeFile} onRetry={retryFile} />

            {completedCount > 0 && !isUploading && (
              <Button 
                className="w-full h-14 text-base font-semibold mt-4" 
                size="lg"
                onClick={handleAnalyze}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze {completedCount} Files with AI
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No files uploaded yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Drag and drop files onto the upload zones above, or click to browse. 
              We support transactions, invoices, and email data.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadData;
