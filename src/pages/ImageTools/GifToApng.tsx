import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function GifToApng() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setConverting(true);
    try {
      // Conversion logic will be added here
      toast.success("GIFs converted successfully!");
      return files;
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <WorkspaceLayout title="GIF to APNG Converter">
      <ImageToolWorkflow
        title="GIF to APNG Converter"
        description="Convert GIF animations to APNG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".gif"]}
        resultDescription={(count) => `${count} GIF${count !== 1 ? "s" : ""} converted to APNG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
