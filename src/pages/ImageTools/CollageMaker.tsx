import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function CollageMaker() {
  const [processing, setProcessing] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setProcessing(true);
    try {
      // Processing logic will be added here
      toast.success("Collage created successfully!");
      return files;
    } catch (error) {
      toast.error("Operation failed");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <WorkspaceLayout title="Collage Maker">
      <ImageToolWorkflow
        title="Collage Maker"
        description="Create beautiful collages from multiple images"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg", ".png", ".webp"]}
        resultDescription={(count) => `Collage created from ${count} image${count !== 1 ? "s" : ""}`}
        downloadLabel={(count) => "Download collage"}
      />
    </WorkspaceLayout>
  );
}
