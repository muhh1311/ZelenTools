import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { addWatermark } from "@/logic/ImageTools/ImageWatermark";

export default function ImageWatermark() {
  const [text, setText] = useState("© ZelenTools");
  const [opacity, setOpacity] = useState(70);
  const [fontSize, setFontSize] = useState(32);
  const [position, setPosition] = useState<"center" | "bottom-right" | "bottom-left">(
    "bottom-right"
  );
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      actionButtonText="Add Watermark"
      statusText="Processing"
      resultTitle="Watermark Added"
      getResultDescription={(count) => `${count} image${count !== 1 ? "s" : ""} watermarked`}
      downloadLabel={(count) =>
        count === 1 ? "Download image" : "Download all as ZIP"
      }
      zipDownloadName="watermarked-images.zip"
      sidebarOptions={
        <ToolSidebar title="Watermark Options" fileCount={fileCount}>
          <ToolField label="Watermark text">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Position">
            <select
              value={position}
              onChange={(e) =>
                setPosition(e.target.value as "center" | "bottom-right" | "bottom-left")
              }
              className={inputClass}
            >
              <option value="center">Center</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </ToolField>
          <ToolField label={`Opacity: ${opacity}%`}>
            <input
              type="range"
              min={10}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
          <ToolField label={`Font size: ${fontSize}px`}>
            <input
              type="range"
              min={12}
              max={72}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>
      }
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        return addWatermark(
          files,
          { text, opacity, fontSize, position },
          onProgress
        );
      }}
    />
  );
}
