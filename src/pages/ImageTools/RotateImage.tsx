import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass } from "@/components/ui/ToolSidebar";
import { rotateImages, type RotateDegrees } from "@/logic/ImageTools/RotateImage";

export default function RotateImagePage() {
  const [degrees, setDegrees] = useState<RotateDegrees>(90);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Rotate Images"
      statusText="Rotating"
      resultTitle="Rotation Complete"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} rotated`}
      downloadLabel={(count) =>
        count === 1 ? "Download rotated image" : "Download all as ZIP"
      }
      zipDownloadName="rotated-images.zip"
      sidebarOptions={
        <ToolSidebar title="Rotate Options" fileCount={fileCount}>
          <ToolField label="Rotation">
            <select
              value={degrees}
              onChange={(e) => setDegrees(Number(e.target.value) as RotateDegrees)}
              className={inputClass}
            >
              <option value={90}>90° clockwise</option>
              <option value={180}>180°</option>
              <option value={270}>270° clockwise</option>
            </select>
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return rotateImages(files, degrees, onProgress);
      }}
    />
  );
}
