import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, rangeClass } from "@/components/ui/ToolSidebar";
import { adjustContrast } from "@/logic/ImageTools/ImageFilters";

export default function ContrastAdjust() {
  const [amount, setAmount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Apply Contrast"
      statusText="Processing"
      resultTitle="Contrast Adjusted"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} updated`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="contrast-images.zip"
      sidebarOptions={
        <ToolSidebar title="Contrast Options" fileCount={fileCount}>
          <ToolField label={`Contrast: ${amount > 0 ? "+" : ""}${amount}`}>
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
        return adjustContrast(files, amount, onProgress);
      }}
    />
  );
}
