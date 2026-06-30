import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, rangeClass } from "@/components/ui/ToolSidebar";
import { blurImages } from "@/logic/ImageTools/BlurImage";

export default function BlurImagePage() {
  const [radius, setRadius] = useState(5);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Apply Blur"
      statusText="Blurring"
      resultTitle="Blur Applied"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} blurred`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="blurred-images.zip"
      sidebarOptions={
        <ToolSidebar title="Blur Options" fileCount={fileCount}>
          <ToolField label={`Blur radius: ${radius}px`}>
            <input
              type="range"
              min={1}
              max={30}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return blurImages(files, radius, onProgress);
      }}
    />
  );
}
