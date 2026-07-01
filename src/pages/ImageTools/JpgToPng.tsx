import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { convertImages, downloadConvertedImage, downloadConvertedImagesAsZip } from "@/logic/ImageTools/ImageConverter";
import { convertJpgToPng } from "@/logic/ImageTools/jpgToPng";

export default function JpgToPng() {
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
          return convertJpgToPng(file);
        })
      );
      
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else if (results.length > 1) {
        await downloadConvertedImagesAsZip(results, "jpg-to-png.zip");
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
    <WorkspaceLayout title="JPG to PNG Converter">
      <ImageToolWorkflow
        title="JPG to PNG Converter"
        description="Convert JPG images to PNG format"
        onProcessImages={handleProcessImages}
        allowMultiple={true}
        fileTypes={[".jpg", ".jpeg"]}
        resultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to PNG`}
        downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      />
    </WorkspaceLayout>
  );
}
      />
    </WorkspaceLayout>
  );
}
