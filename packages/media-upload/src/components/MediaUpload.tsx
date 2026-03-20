import React from "react";
import { Upload } from "lucide-react";

export const MediaUpload: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-3xl font-bold text-foreground">Media Upload</h1>
        <p className="mt-2 text-muted-foreground">
          Upload media files to R2 storage.
        </p>
      </div>
    </div>
  );
};
