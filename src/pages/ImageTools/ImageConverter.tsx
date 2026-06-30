import { useRef, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import UploadButton from "@/components/ui/UploadButton";
import WorkspaceLayout from "@/components/ui/WorkspaceLayout";
import ProgressLayout from "@/components/ui/ProgressLayout";
import DownloadButton from "@/components/ui/DownloadButton";
import { useToolWorkflow } from "@/hooks/useToolWorkflow";
import {
  type OutputFormat,
  type ConvertedImage,
  formatFileSize,
  convertImages,
  downloadConvertedImage,
  downloadConvertedImagesAsZip,
} from "@/logic/ImageTools/ImageConverter";

export default function ImageConverter() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetFormat, setTargetFormat] = useState<OutputFormat>("png");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [resultPreviewUrls, setResultPreviewUrls] = useState<string[]>([]);

  const {
    stage,
    setStage,
    rawFiles,
    setRawFiles,
    convertedResults,
    setConvertedResults,
    isProcessing,
    setIsProcessing,
    currentFileNum,
    activeFileName,
    activeFileSize,
    globalProgress,
    handleFileSelection,
    updateProgress,
    resetWorkflow,
  } = useToolWorkflow();

  useEffect(() => {
    const urls = rawFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [rawFiles]);

  useEffect(() => {
    const results = convertedResults as ConvertedImage[];
    const urls = results.map((result) => URL.createObjectURL(result.blob));
    setResultPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [convertedResults]);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleAddFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const incoming = Array.from(files);
      if (stage === "UPLOAD") {
        handleFileSelection(files);
      } else {
        setRawFiles((prev) => [...prev, ...incoming]);
        setStage("WORKSPACE");
      }
    },
    [stage, handleFileSelection, setRawFiles, setStage]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAddFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleAddFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    setRawFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) setStage("UPLOAD");
      return next;
    });
  };

  const handleConvert = async () => {
    if (rawFiles.length === 0) return;

    setStage("PROCESSING");
    setIsProcessing(true);

    try {
      const results = await convertImages(rawFiles, targetFormat, (fileIdx, percent, file) => {
        updateProgress(fileIdx, percent, file.name, formatFileSize(file.size));
      });

      setConvertedResults(results);
      setStage("RESULT");
      toast.success(`${results.length} image${results.length > 1 ? "s" : ""} converted successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
      setStage("WORKSPACE");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    const results = convertedResults as ConvertedImage[];
    if (results.length === 0) return;

    try {
      if (results.length === 1) {
        downloadConvertedImage(results[0]);
      } else {
        await downloadConvertedImagesAsZip(results);
      }
    } catch {
      toast.error("Download failed");
    }
  };

  const handleConvertMore = () => {
    resetWorkflow();
    setTargetFormat("png");
  };

  const converterOptions = (
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
          <option value="webp">WebP</option>
        </select>
      </div>
      <p className="text-xs text-slate-500 dark:text-zinc-400 text-center">
        {rawFiles.length} file{rawFiles.length !== 1 ? "s" : ""} selected
      </p>
    </div>
  );

  const results = convertedResults as ConvertedImage[];

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />

      <ProgressLayout
        isOpen={stage === "PROCESSING" && isProcessing}
        currentFileIndex={currentFileNum}
        totalFiles={rawFiles.length}
        currentFileName={activeFileName}
        currentFileSize={activeFileSize}
        progressPercentage={globalProgress}
        statusText="Converting"
      />

      {stage === "UPLOAD" && (
        <div
          className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <UploadButton title="Select Images" onClick={openFilePicker} />
        </div>
      )}

      {stage === "WORKSPACE" && (
        <WorkspaceLayout
          sidebarOptions={converterOptions}
          actionButtonText="Convert Images"
          onActionClick={handleConvert}
          onAddFilesClick={openFilePicker}
        >
          {rawFiles.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm max-w-[200px] text-center flex flex-col items-center relative group"
            >
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90"
              >
                ✕
              </button>

              <div className="rounded-xl mb-3 h-36 w-36 bg-blue-50/50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  src={previewUrls[index]}
                  alt={file.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-gray-400 truncate w-full font-medium">
                {file.name}
              </p>

              <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded mt-2 text-slate-600 dark:text-gray-400 font-bold">
                {formatFileSize(file.size)}
              </span>
            </div>
          ))}
        </WorkspaceLayout>
      )}

      {stage === "RESULT" && (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-4xl text-center">
            <div className="mb-2 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-2xl">
              ✓
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Conversion Complete
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 mb-8">
              {results.length} image{results.length !== 1 ? "s" : ""} converted to{" "}
              {targetFormat.toUpperCase()}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {results.map((result, index) => (
                <div
                  key={result.fileName}
                  className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-3 shadow-sm max-w-[160px] text-center"
                >
                  <div className="rounded-xl mb-2 h-28 w-28 mx-auto bg-blue-50/50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={resultPreviewUrls[index]}
                      alt={result.fileName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate font-medium">
                    {result.fileName}
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                    {formatFileSize(result.size)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadButton
                onClick={handleDownload}
                label={
                  results.length === 1
                    ? "Download converted image"
                    : "Download all as ZIP"
                }
              />
              <button
                type="button"
                onClick={handleConvertMore}
                className="px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Convert More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
