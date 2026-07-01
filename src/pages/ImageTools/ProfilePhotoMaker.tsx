import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function ProfilePhotoMaker() {
  const [processing, setProcessing] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setProcessing(true);
    try {
      // Processing logic will be added here
      toast.success("Profile photo created successfully!");
      return files;
    } catch (error) {
      toast.error("Operation failed");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <WorkspaceLayout title="Profile Photo Maker">
      <ImageToolWorkflow
        title="Profile Photo Maker"
        description="Create professional profile photos"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg", ".png", ".webp"]}
        resultDescription={(count) => `${count} profile photo${count !== 1 ? "s" : ""} created`}
        downloadLabel={(count) => count === 1 ? "Download photo" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
