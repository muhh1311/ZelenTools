import { useState } from "react";
import { toast } from "sonner";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { downloadConvertedImage, downloadConvertedImagesAsZip } from "@/logic/ImageTools/ImageConverter";
import { convertWebpToPng } from "@/logic/ImageTools/webpToPng";
import { ProcessedImage } from "@/logic/ImageTools/imageUtils";

export default function WebpToPng() {
  const [converting, setConverting] = useState(false);

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ): Promise<ProcessedImage[]> => {
    setConverting(true);
    try {
      const results = await Promise.all(
        files.map((file, index) => {
          onProgress?.(index, 0, file);
          return convertWebpToPng(file);
        })
      );
      
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else if (results.length > 1) {
        await downloadConvertedImagesAsZip(results, "webp-to-png.zip");
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
    <ImageToolWorkflow
      uploadTitle="WEBP to PNG Converter"
      actionButtonText={converting ? "Converting..." : "Convert Images"}
      statusText="Converting WEBP to PNG..."
      resultTitle="Conversion Complete!"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to PNG`}
      downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      sidebarOptions={
        <div className="text-sm text-slate-500">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Converter Settings</h3>
          <p>Files will be automatically processed and prepared for download as PNG format.</p>
        </div>
      }
      onProcess={handleProcessImages}
      multiple={true}
    />
  );
}