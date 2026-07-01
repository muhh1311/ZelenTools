import { useState } from "react";
import { toast } from "sonner";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { convertPngToJpg } from "@/logic/ImageTools/pngToJpg";

export default function PngToJpg() {
  const [converting, setConverting] = useState(false);

  // Iske signature ko explicit 'any' ya generic as Promise<any> kardia taake type clash na ho
  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ): Promise<any> => {
    setConverting(true);
    try {
      const blobs = await Promise.all(
        files.map((file, index) => {
          onProgress?.(index, 0, file);
          return convertPngToJpg(file);
        })
      );
      
      toast.success("Images converted successfully!");
      
      return blobs.map((blob, index) => ({
        blob,
        fileName: files[index].name.replace(/\.[^/.]+$/, "") + ".jpg",
        size: blob.size
      }));
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  return (
    <ImageToolWorkflow
      uploadTitle="Select PNG Images"
      actionButtonText={converting ? "Converting..." : "Convert to JPG"}
      statusText="Converting your PNG images..."
      resultTitle="Conversion Complete!"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to JPG`}
      downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      multiple={true}
      zipDownloadName="png-to-jpg.zip"
      onProcess={handleProcessImages}
      sidebarOptions={
        <div className="text-sm text-slate-500">
          <p className="font-semibold mb-2">Options</p>
          <p>Converting input files into high quality JPG format.</p>
        </div>
      }
    />
  );
}