import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar } from "@/components/ui/ToolSidebar";
import { createPassportPhotos } from "@/logic/ImageTools/PassportPhoto";

export default function PassportPhoto() {
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      multiple={false}
      actionButtonText="Create Passport Photo"
      statusText="Processing"
      resultTitle="Passport Photo Ready"
      getResultDescription={() => "600×600px passport photo created"}
      downloadLabel={() => "Download passport photo"}
      showAddFiles={false}
      uploadTitle="Select Photo"
      sidebarOptions={
        <ToolSidebar title="Passport Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Crops to square and resizes to 600×600px (2×2 inch at 300 DPI).
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return createPassportPhotos(files, onProgress);
      }}
    />
  );
}
