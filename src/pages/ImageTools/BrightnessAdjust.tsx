import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, rangeClass } from "@/components/ui/ToolSidebar";
import { adjustBrightness } from "@/logic/ImageTools/ImageFilters";

export default function BrightnessAdjust() {
  const [amount, setAmount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Apply Brightness"
      statusText="Processing"
      resultTitle="Brightness Adjusted"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} updated`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="brightness-images.zip"
      sidebarOptions={
        <ToolSidebar title="Brightness Options" fileCount={fileCount}>
          <ToolField label={`Brightness: ${amount > 0 ? "+" : ""}${amount}`}>
            <input
              type="range"
              min={-100}
              max={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return adjustBrightness(files, amount, onProgress);
      }}
    />
  );
}
