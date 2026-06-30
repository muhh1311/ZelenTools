import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, rangeClass } from "@/components/ui/ToolSidebar";
import { adjustSaturation } from "@/logic/ImageTools/ImageFilters";

export default function SaturationAdjust() {
  const [amount, setAmount] = useState(100);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Apply Saturation"
      statusText="Processing"
      resultTitle="Saturation Adjusted"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} updated`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="saturation-images.zip"
      sidebarOptions={
        <ToolSidebar title="Saturation Options" fileCount={fileCount}>
          <ToolField label={`Saturation: ${amount}%`}>
            <input
              type="range"
              min={0}
              max={200}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return adjustSaturation(files, amount, onProgress);
      }}
    />
  );
}
