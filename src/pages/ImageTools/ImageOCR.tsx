import { useState } from "react";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import { ToolSidebar } from "@/components/ui/ToolSidebar";
import { extractTextFromImages, type OcrResult } from "@/logic/ImageTools/ImageOCR";

export default function ImageOCR() {
  const [fileCount, setFileCount] = useState(0);
  const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);

  return (
    <ImageToolWorkflow
      actionButtonText="Extract Text"
      statusText="Scanning"
      resultTitle="OCR Complete"
      getResultDescription={(count) =>
        `Text extracted from ${count} image${count !== 1 ? "s" : ""}`
      }
      downloadLabel={(count) =>
        count === 1 ? "Download text file" : "Download all as ZIP"
      }
      zipDownloadName="extracted-text.zip"
      hideResultThumbnails
      sidebarOptions={
        <ToolSidebar title="OCR Options" fileCount={fileCount}>
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
            Extracts readable text from images using OCR (English).
          </p>
        </ToolSidebar>
      }
      renderResultExtra={() => (
        <div className="text-left max-w-2xl mx-auto mb-8 space-y-4">
          {ocrResults.map((result, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                {result.originalName}
              </p>
              <pre className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-xl text-sm whitespace-pre-wrap text-slate-700 dark:text-gray-300">
                {result.text || "(No text detected)"}
              </pre>
            </div>
          ))}
        </div>
      )}
      onProcess={async (files, onProgress) => {
        setFileCount(files.length);
        const results = await extractTextFromImages(files, onProgress);
        setOcrResults(results);
        return results;
      }}
      onReset={() => setOcrResults([])}
    />
  );
}
