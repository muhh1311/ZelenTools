import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { downloadConvertedImage, downloadConvertedImagesAsZip } from "@/logic/ImageTools/ImageConverter";
import { convertJpgToWebp } from "@/logic/ImageTools/jpgToWebp";

export default function JpgToWebp() {
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
          return convertJpgToWebp(file);
        })
      );
      
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else if (results.length > 1) {
        await downloadConvertedImagesAsZip(results, "jpg-to-webp.zip");
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
    <WorkspaceLayout title="JPG to WEBP Converter">
      <ImageToolWorkflow
        title="JPG to WEBP Converter"
        description="Convert JPG images to WEBP format for better compression"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to WEBP`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
