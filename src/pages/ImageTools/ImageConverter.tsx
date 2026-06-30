import { useState } from "react";
import { toast } from "sonner";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ImageToolWorkflow from "@/components/ui/ImageToolWorkflow";
import {
  type OutputFormat,
  type ConvertedImage,
  formatFileSize,
  convertImages,
  downloadConvertedImage,
  downloadConvertedImagesAsZip,
} from "@/logic/ImageTools/ImageConverter";


export default function ImageConverter() {
  const [targetFormat, setTargetFormat] = useState<OutputFormat>("png");

  const handleProcessImages = async (
    files: File[],
    onProgress?: (fileIndex: number, percent: number, file: File) => void,
    format?: OutputFormat
  ) => {
    if (!format) throw new Error("Output format not specified");
    return convertImages(files, format, onProgress);
  };

  const downloadLabel = (resultCount: number) =>
    resultCount === 1 ? "Download converted image" : "Download all as ZIP";

  const getResultDescription = (resultCount: number) =>
    `${resultCount} image${
      resultCount !== 1 ? "s" : ""
    } converted to ${targetFormat.toUpperCase()}`;

  const sidebarOptions = (
    <div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        Convert Options
      </h3>
      <div className="mb-4">
        <label
          htmlFor="convert-format"
          className="text-sm font-semibold text-slate-600 dark:text-gray-300 block mb-1"
        >
          Convert To:
        </label>
        <select
          id="convert-format"
          value={targetFormat}
          onChange={(e) => setTargetFormat(e.target.value as OutputFormat)}
          className="w-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-2.5 text-sm"
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WebP</option>
          <option value="bmp">BMP</option>
          <option value="ico">ICO</option>
        </select>
      </div>
    </div>
  );

  const onReset = () => {
    setTargetFormat("png");
  };

  return (
    <ImageToolWorkflow
      actionButtonText="Convert Images"
      statusText="Converting"
      resultTitle="Conversion Complete"
      getResultDescription={getResultDescription}
      downloadLabel={downloadLabel}
      sidebarOptions={sidebarOptions}
      onProcess={handleProcessImages}
      selectedFormat={targetFormat}
      onReset={onReset}
    />
  );
}
