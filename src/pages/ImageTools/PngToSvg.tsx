import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function PngToSvg() {
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
    <WorkspaceLayout title="PNG to SVG Converter">
      <ImageToolWorkflow
        title="PNG to SVG Converter"
        description="Convert PNG images to SVG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".png"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to SVG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
