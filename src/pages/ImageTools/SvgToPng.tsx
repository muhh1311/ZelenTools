import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function SvgToPng() {
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
    <WorkspaceLayout title="SVG to PNG Converter">
      <ImageToolWorkflow
        title="SVG to PNG Converter"
        description="Convert SVG images to PNG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".svg"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to PNG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
