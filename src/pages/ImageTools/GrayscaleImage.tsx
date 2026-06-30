import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar } from "@/components/ui/ToolSidebar";
import { grayscaleImages } from "@/logic/ImageTools/BlurImage";

export default function GrayscaleImagePage() {
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Convert to Grayscale"
      statusText="Processing"
      resultTitle="Grayscale Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} converted`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="grayscale-images.zip"
      sidebarOptions={
        <ToolSidebar title="Grayscale Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Converts images to black and white.
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return grayscaleImages(files, onProgress);
      }}
    />
  );
}
