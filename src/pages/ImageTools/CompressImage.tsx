import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { compressImages } from "@/logic/ImageTools/CompressImage";

export default function CompressImage() {
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [quality, setQuality] = useState(80);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Compress Images"
      statusText="Compressing"
      resultTitle="Compression Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} compressed`}
      downloadLabel={(count) =>
        count === 1 ? "Download compressed image" : "Download all as ZIP"
      }
      zipDownloadName="compressed-images.zip"
      sidebarOptions={
        <ToolSidebar title="Compress Options" fileCount={fileCount}>
          <ToolField label={`Max file size: ${maxSizeMB} MB`}>
            <input
              type="range"
              min={0.1}
              max={5}
              step={0.1}
              value={maxSizeMB}
              onChange={(e) => setMaxSizeMB(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Max dimension: ${maxDimension}px`}>
            <input
              type="range"
              min={480}
              max={3840}
              step={10}
              value={maxDimension}
              onChange={(e) => setMaxDimension(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Quality: ${quality}%`}>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return compressImages(
          files,
          { maxSizeMB, maxWidthOrHeight: maxDimension, quality },
          onProgress
        );
      }}
    />
  );
}
