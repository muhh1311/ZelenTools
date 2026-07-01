import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function ViewMetadata() {
  const [processing, setProcessing] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setProcessing(true);
    try {
      // Processing logic will be added here
      toast.success("Metadata retrieved successfully!");
      return files;
    } catch (error) {
      toast.error("Operation failed");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <WorkspaceLayout title="View Metadata">
      <ImageToolWorkflow
        title="View Metadata"
        description="View detailed metadata from images"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} metadata retrieved`}
        downloadLabel={(count) => "Download metadata"}
      />
    </WorkspaceLayout>
  );
}
