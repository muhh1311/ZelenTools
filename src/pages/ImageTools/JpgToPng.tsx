import { useState } from "react";
import { toast } from "sonner";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { convertJpgToPng } from "@/logic/ImageTools/jpgToPng";

export default function JpgToPng() {
  const [converting, setConverting] = useState(false);

  // Iske signature ko bhi explicit 'any' ya generic as Promise<any> kardia
  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void
  ): Promise<any> => {
    setConverting(true);
    try {
      const blobs = await Promise.all(
        files.map((file, index) => {
          onProgress?.(index, 0, file);
          return convertJpgToPng(file);
        })
      );
      
      toast.success("Images converted successfully!");
      
      return blobs.map((blob, index) => ({
        blob,
        fileName: files[index].name.replace(/\.[^/.]+$/, "") + ".png",
        size: blob.size
      }));
    } catch (error) {
      toast.error("Conversion failed");
      throw error;
    } finally {
      setConverting(false);
    }
  };

  // ... baqi upar ka code handleProcessImages tak bilkul same rahega

  return (
    <ImageToolWorkflow
      uploadTitle="Select JPG Images"
      actionButtonText={converting ? "Converting..." : "Convert to PNG"}
      statusText="Converting your JPG images..."
      resultTitle="Conversion Complete!"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted to PNG`}
      downloadLabel={(count) => count === 1 ? "Download converted image" : "Download all as ZIP"}
      multiple={true}
      zipDownloadName="jpg-to-png.zip"
      onProcess={handleProcessImages}
      sidebarOptions={
        <div className="text-sm text-slate-500">
          <p className="font-semibold mb-2">Options</p>
          <p>Converting input files into high quality PNG format.</p>
        </div>
      }
    />
  );
}
