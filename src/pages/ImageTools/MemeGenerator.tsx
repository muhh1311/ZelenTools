import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { generateMemes } from "@/logic/ImageTools/MemeGenerator";

export default function MemeGenerator() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(36);
  const [fileCount, setFileCount] = useState(0);

  return (
    <ImageToolWorkflow
      multiple={false}
      actionButtonText="Generate Meme"
      statusText="Processing"
      resultTitle="Meme Ready"
      getResultDescription={() => "Your meme has been created"}
      downloadLabel={() => "Download meme"}
      showAddFiles={false}
      uploadTitle="Select Image"
      sidebarOptions={
        <ToolSidebar title="Meme Options" fileCount={fileCount}>
          <ToolField label="Top text">
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="TOP TEXT"
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Bottom text">
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="BOTTOM TEXT"
              className={inputClass}
            />
          </ToolField>
          <ToolField label={`Font size: ${fontSize}px`}>
            <input
              type="range"
              min={16}
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
        return generateMemes(files, { topText, bottomText, fontSize }, onProgress);
      }}
    />
  );
}
