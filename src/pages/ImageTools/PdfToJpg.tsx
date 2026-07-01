import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";

export default function PdfToJpg() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setConverting(true);
    try {
      // Conversion logic will be added here
      toast.success("PDFs converted successfully!");
      return files;
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <WorkspaceLayout title="PDF to JPG Converter">
      <ImageToolWorkflow
        title="PDF to JPG Converter"
        description="Convert PDF documents to JPG images"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".pdf"]}
        resultDescription={(count) => `${count} page${count !== 1 ? "s" : ""} converted to JPG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
