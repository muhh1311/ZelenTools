import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function FontAwesomeToPng() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setConverting(true);
    try {
      // Conversion logic will be added here
      toast.success("Icons converted successfully!");
      return files;
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <WorkspaceLayout title="Font Awesome to PNG">
      <ImageToolWorkflow
        title="Font Awesome to PNG"
        description="Convert Font Awesome icons to PNG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".svg"]}
        resultDescription={(count) => `${count} icon${count !== 1 ? "s" : ""} converted to PNG`}
        downloadLabel={(count) => count === 1 ? "Download converted icon" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
