import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar } from "@/components/ui/ToolSidebar";
import { removeExifMetadata } from "@/logic/ImageTools/RemoveExif";

export default function RemoveExif() {
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Remove EXIF Data"
      statusText="Processing"
      resultTitle="EXIF Removed"
      getResultDescription={(count) =>
        `${count} image${count !== 1 ? "s" : ""} stripped of metadata`
      }
      downloadLabel={(count) =>
        count === 1 ? "Download clean image" : "Download all as ZIP"
      }
      zipDownloadName="no-exif-images.zip"
      sidebarOptions={
        <ToolSidebar title="EXIF Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Re-exports images without EXIF metadata (location, camera info, etc.).
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return removeExifMetadata(files, onProgress);
      }}
    />
  );
}
