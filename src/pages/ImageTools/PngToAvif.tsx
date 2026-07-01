import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { downloadConvertedImage, downloadConvertedImagesAsZip } from "@/logic/ImageTools/ImageConverter";
import { convertPngToAvif } from "@/logic/ImageTools/pngToAvif";

export default function PngToAvif() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ) => {
    setConverting(true);
    try {
      const results = await Promise.all(
        files.map((file, index) => {
          onProgress?.(index, 0, file);
          return convertPngToAvif(file);
        })
      );
      
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else if (results.length > 1) {
        await downloadConvertedImagesAsZip(results, "png-to-avif.zip");
      }
      
      toast.success("Images converted successfully!");
      return results;
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <WorkspaceLayout title="PNG to AVIF Converter">
      <ImageToolWorkflow
        title="PNG to AVIF Converter"
        description="Convert PNG images to AVIF format for best compression"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".png"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to AVIF`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
