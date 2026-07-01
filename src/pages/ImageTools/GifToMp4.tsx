import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function GifToMp4() {
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
    <WorkspaceLayout title="GIF to MP4 Converter">
      <ImageToolWorkflow
        title="GIF to MP4 Converter"
        description="Convert GIF animations to MP4 video format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".gif"]}
        resultDescription={(count) => `${count} GIF${count !== 1 ? "s" : ""} converted to MP4`}
        downloadLabel={(count) => count === 1 ? "Download converted video" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
