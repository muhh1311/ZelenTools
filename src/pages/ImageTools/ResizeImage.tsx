import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass } from "@/components/ui/ToolSidebar";
import { resizeImages } from "@/logic/ImageTools/ResizeImage";

export default function ResizeImage() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Resize Images"
      statusText="Resizing"
      resultTitle="Resize Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} resized`}
      downloadLabel={(count) =>
        count === 1 ? "Download resized image" : "Download all as ZIP"
      }
      zipDownloadName="resized-images.zip"
      sidebarOptions={
        <ToolSidebar title="Resize Options" fileCount={fileCount}>
          <ToolField label="Width (px)">
            <input
              type="number"
              value={width}
              min={1}
              onChange={(e) => setWidth(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Height (px)">
            <input
              type="number"
              value={height}
              min={1}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={maintainAspect}
              onChange={(e) => setMaintainAspect(e.target.checked)}
              className="accent-[#4a85f6]"
            />
            Maintain aspect ratio
          </label>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return resizeImages(files, { width, height, maintainAspect }, onProgress);
      }}
    />
  );
}
