import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { downloadConvertedImage, downloadConvertedImagesAsZip } from "@/logic/ImageTools/ImageConverter";
import { convertHeicToPng } from "@/logic/ImageTools/heicToPng";

export default function HeicToPng() {
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
          return convertHeicToPng(file);
        })
      );
      
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else if (results.length > 1) {
        await downloadConvertedImagesAsZip(results, "heic-to-png.zip");
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
    <WorkspaceLayout title="HEIC to PNG Converter">
      <ImageToolWorkflow
        title="HEIC to PNG Converter"
        description="Convert HEIC/HEIF images from iPhone to PNG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".heic", ".heif"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to PNG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
