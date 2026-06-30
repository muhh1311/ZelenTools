import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, rangeClass } from "@/components/ui/ToolSidebar";
import { cropImages } from "@/logic/ImageTools/CropImage";

export default function CropImage() {
  const [xPercent, setXPercent] = useState(10);
  const [yPercent, setYPercent] = useState(10);
  const [widthPercent, setWidthPercent] = useState(80);
  const [heightPercent, setHeightPercent] = useState(80);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Crop Images"
      statusText="Cropping"
      resultTitle="Crop Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} cropped`}
      downloadLabel={(count) =>
        count === 1 ? "Download cropped image" : "Download all as ZIP"
      }
      zipDownloadName="cropped-images.zip"
      sidebarOptions={
        <ToolSidebar title="Crop Options" fileCount={fileCount}>
          <ToolField label={`X offset: ${xPercent}%`}>
            <input
              type="range"
              min={0}
              max={90}
              value={xPercent}
              onChange={(e) => setXPercent(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Y offset: ${yPercent}%`}>
            <input
              type="range"
              min={0}
              max={90}
              value={yPercent}
              onChange={(e) => setYPercent(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Width: ${widthPercent}%`}>
            <input
              type="range"
              min={10}
              max={100}
              value={widthPercent}
              onChange={(e) => setWidthPercent(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Height: ${heightPercent}%`}>
            <input
              type="range"
              min={10}
              max={100}
              value={heightPercent}
              onChange={(e) => setHeightPercent(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return cropImages(
          files,
          { xPercent, yPercent, widthPercent, heightPercent },
          onProgress
        );
      }}
    />
  );
}
