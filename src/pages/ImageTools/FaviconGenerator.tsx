import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { generateFavicons } from "@/logic/ImageTools/FaviconGenerator";

export default function FaviconGenerator() {
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Generate Favicons"
      statusText="Generating"
      resultTitle="Favicons Ready"
      getResultDescription={(count) => `${count} favicon file${count !== 1 ? "s" : ""} generated`}
      downloadLabel={(count) =>
        count === 1 ? "Download favicon" : "Download all as ZIP"
      }
      zipDownloadName="favicons.zip"
      sidebarOptions={
        <ToolSidebar title="Favicon Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Generates 16×16, 32×32, 48×48, and 180×180 PNG favicons from each image.
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return generateFavicons(files, onProgress);
      }}
    />
  );
}
