import { useState, useCallback } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  category: string;
  status: "pending" | "uploading" | "processing" | "completed" | "error";
  progress: number;
  records?: number;
  error?: string;
  preview?: string;
}

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const addFiles = useCallback((newFiles: FileList | File[], category: string) => {
    const fileArray = Array.from(newFiles);
    
    const uploadedFiles: UploadedFile[] = fileArray.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      category,
      status: "pending" as const,
      progress: 0,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);

    // Simulate upload for each file
    uploadedFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id);
    });

    return uploadedFiles;
  }, []);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: 100, status: "processing" as const }
              : f
          )
        );

        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: "completed" as const,
                    records: Math.floor(Math.random() * 2000) + 100,
                  }
                : f
            )
          );
        }, 1500 + Math.random() * 1000);
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: Math.min(progress, 99), status: "uploading" as const }
              : f
          )
        );
      }
    }, 200);
  };

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.preview && f.status === "completed") {
          URL.revokeObjectURL(f.preview);
        }
      });
      return prev.filter((f) => f.status !== "completed");
    });
  }, []);

  const retryFile = useCallback((fileId: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "pending" as const, progress: 0, error: undefined } : f
      )
    );
    simulateUpload(fileId);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearCompleted,
    retryFile,
    completedCount: files.filter((f) => f.status === "completed").length,
    totalCount: files.length,
    isUploading: files.some((f) => f.status === "uploading" || f.status === "processing"),
  };
};
