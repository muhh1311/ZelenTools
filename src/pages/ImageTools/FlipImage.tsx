import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass } from "@/components/ui/ToolSidebar";
import { flipImages, type FlipDirection } from "@/logic/ImageTools/FlipImage";

export default function FlipImagePage() {
  const [direction, setDirection] = useState<FlipDirection>("horizontal");
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Flip Images"
      statusText="Flipping"
      resultTitle="Flip Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} flipped`}
      downloadLabel={(count) =>
        count === 1 ? "Download flipped image" : "Download all as ZIP"
      }
      zipDownloadName="flipped-images.zip"
      sidebarOptions={
        <ToolSidebar title="Flip Options" fileCount={fileCount}>
          <ToolField label="Direction">
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as FlipDirection)}
              className={inputClass}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return flipImages(files, direction, onProgress);
      }}
    />
  );
}
