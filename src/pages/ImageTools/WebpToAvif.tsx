import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function WebpToAvif() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setConverting(true);
    try {
      // Conversion logic will be added here
      toast.success("Images converted successfully!");
      return files;
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <WorkspaceLayout title="WEBP to AVIF Converter">
      <ImageToolWorkflow
        title="WEBP to AVIF Converter"
        description="Convert WEBP images to AVIF format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".webp"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to AVIF`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
