import { useState, useRef, useCallback } from "react";
import { Upload, FileText, CreditCard, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  category: "transactions" | "invoices" | "emails";
  onFilesAdded: (files: FileList | File[], category: string) => void;
  accept?: string;
}

const categoryConfig = {
  transactions: {
    title: "Transactions",
    description: "Upload CSV or Excel files containing transaction data",
    icon: CreditCard,
    formats: ["CSV", "XLSX", "XLS"],
    accept: ".csv,.xlsx,.xls",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary",
  },
  invoices: {
    title: "Invoices",
    description: "Upload PDF or image invoices for AI analysis",
    icon: FileText,
    formats: ["PDF", "PNG", "JPG", "JPEG"],
    accept: ".pdf,.png,.jpg,.jpeg",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning",
  },
  emails: {
    title: "Emails",
    description: "Upload email archives in JSON or text format",
    icon: Mail,
    formats: ["JSON", "TXT", "EML"],
    accept: ".json,.txt,.eml",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success",
  },
};

export const FileDropZone = ({ category, onFilesAdded }: FileDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const config = categoryConfig[category];
  const Icon = config.icon;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFilesAdded(files, category);
    }
  }, [category, onFilesAdded]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesAdded(files, category);
      e.target.value = "";
    }
  };

  return (
    <div
      className={cn(
        "relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:scale-[1.02]",
        isDragOver 
          ? `${config.borderColor} bg-${category === 'transactions' ? 'primary' : category === 'invoices' ? 'warning' : 'success'}/5 scale-[1.02]` 
          : "border-border hover:border-primary/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={config.accept}
        multiple
        onChange={handleFileChange}
      />

      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110",
        config.bgColor
      )}>
        <Icon className={cn("w-8 h-8", config.color)} />
      </div>

      <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-[200px] mx-auto">
        {config.description}
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {config.formats.map((format) => (
          <span
            key={format}
            className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
          >
            {format}
          </span>
        ))}
      </div>

      <div className={cn(
        "absolute inset-0 flex items-center justify-center rounded-2xl transition-opacity",
        "bg-gradient-to-br from-primary/10 to-primary/5",
        isDragOver ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Upload className="w-5 h-5 animate-bounce" />
          Drop files here
        </div>
      </div>
    </div>
  );
};
