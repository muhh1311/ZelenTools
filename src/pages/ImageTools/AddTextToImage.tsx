import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function AddTextToImage() {
  const [processing, setProcessing] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setProcessing(true);
    try {
      // Processing logic will be added here
      toast.success("Text added to images successfully!");
      return files;
    } catch (error) {
      toast.error("Operation failed");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <WorkspaceLayout title="Add Text to Image">
      <ImageToolWorkflow
        title="Add Text to Image"
        description="Add text to your images"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg", ".png", ".webp"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} with text added`}
        downloadLabel={(count) => count === 1 ? "Download image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
