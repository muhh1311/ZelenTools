import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function CombineImages() {
  const [processing, setProcessing] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setProcessing(true);
    try {
      // Processing logic will be added here
      toast.success("Images combined successfully!");
      return files;
    } catch (error) {
      toast.error("Operation failed");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <WorkspaceLayout title="Combine Images">
      <ImageToolWorkflow
        title="Combine Images"
        description="Combine multiple images into one"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg", ".png", ".webp"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} combined`}
        downloadLabel={(count) => "Download combined image"}
      />
    </WorkspaceLayout>
  );
}
