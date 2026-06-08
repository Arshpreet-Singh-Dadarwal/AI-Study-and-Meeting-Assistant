import { CloudUpload } from "lucide-react";
import { useState, useCallback } from "react";

const FileUploadZone = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);

      if (onFileSelect) {
        onFileSelect(e.dataTransfer.files);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        if (onFileSelect) {
          onFileSelect(e.target.files);
        }
      }
    },
    [onFileSelect]
  );

  return (
    <div
      className={`relative gradient-border p-8 transition-all duration-300 ${
        isDragging ? "scale-105" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="flex flex-col items-center justify-center cursor-pointer py-8">
        <div className={`relative mb-4 ${isDragging ? "animate-bounce" : ""}`}>
          <CloudUpload className="w-16 h-16 text-accent" />
          <div className="absolute inset-0 blur-xl bg-accent/30" />
        </div>

        <p className="text-foreground font-medium mb-2">
          {files.length > 0
            ? `${files.length} file(s) selected`
            : "Drag & Drop Files Here or Browse"}
        </p>

        <p className="text-muted-foreground text-sm">
          Supports PDF, DOCX, TXT, MP3, MP4
        </p>

        <input
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.docx,.txt,.mp3,.mp4,.pptx"
          onChange={handleFileInput}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2"
            >
              <span className="truncate">{file.name}</span>
              <span className="text-xs">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
