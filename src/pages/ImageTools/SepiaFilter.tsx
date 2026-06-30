import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar } from "@/components/ui/ToolSidebar";
import { sepiaImages } from "@/logic/ImageTools/BlurImage";

export default function SepiaFilter() {
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Apply Sepia"
      statusText="Processing"
      resultTitle="Sepia Applied"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} filtered`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="sepia-images.zip"
      sidebarOptions={
        <ToolSidebar title="Sepia Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Applies a classic sepia tone filter.
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return sepiaImages(files, onProgress);
      }}
    />
  );
}
