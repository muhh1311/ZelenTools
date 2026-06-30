import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { removeBackground } from "@/logic/ImageTools/BackgroundRemover";

export default function BackgroundRemover() {
  const [threshold, setThreshold] = useState(80);
  const [targetColor, setTargetColor] = useState("#ffffff");
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Remove Background"
      statusText="Processing"
      resultTitle="Background Removed"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} processed`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="no-bg-images.zip"
      sidebarOptions={
        <ToolSidebar title="Background Options" fileCount={fileCount}>
          <ToolField label="Background color">
            <input
              type="color"
              value={targetColor}
              onChange={(e) => setTargetColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </ToolField>
          <ToolField label={`Tolerance: ${threshold}`}>
            <input
              type="range"
              min={10}
              max={200}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <p className="text-xs text-slate-500 dark:text-zinc-400 text-center">
            Removes pixels similar to the selected background color.
          </p>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return removeBackground(files, { threshold, targetColor }, onProgress);
      }}
    />
  );
}
