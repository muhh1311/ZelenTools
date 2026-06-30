import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass } from "@/components/ui/ToolSidebar";
import { splitImages } from "@/logic/ImageTools/ImageSplitter";

export default function ImageSplitter() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Split Images"
      statusText="Splitting"
      resultTitle="Split Complete"
      getResultDescription={(count) => `${count} image piece${count !== 1 ? "s" : ""} created`}
      downloadLabel={(count) =>
        count === 1 ? "Download piece" : "Download all as ZIP"
      }
      zipDownloadName="split-images.zip"
      sidebarOptions={
        <ToolSidebar title="Split Options" fileCount={fileCount}>
          <ToolField label="Rows">
            <input
              type="number"
              min={1}
              max={10}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Columns">
            <input
              type="number"
              min={1}
              max={10}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return splitImages(files, { rows, cols }, onProgress);
      }}
    />
  );
}
