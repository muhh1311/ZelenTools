import { useRef, useState } from "react";
import { toast } from "sonner";
import DownloadButton from "@/components/ui/DownloadButton";
import { ToolSidebar, ToolField, inputClass, rangeClass } from "@/components/ui/ToolSidebar";
import { generateTextImage } from "@/logic/ImageTools/TextToImage";
import { type ProcessedImage, downloadProcessedImage } from "@/logic/ImageTools/imageUtils";

export default function TextToImage() {
  const lastResultRef = useRef<ProcessedImage | null>(null);
  const [text, setText] = useState("Hello World");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);
  const [backgroundColor, setBackgroundColor] = useState("#1e40af");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(48);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateTextImage({
        text,
        width,
        height,
        backgroundColor,
        textColor,
        fontSize,
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      lastResultRef.current = result;
      setPreviewUrl(URL.createObjectURL(result.blob));
      toast.success("Image generated");
    } catch {
      toast.error("Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!lastResultRef.current) return;
    downloadProcessedImage(lastResultRef.current);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex bg-slate-50/50 dark:bg-background">
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center">
        {previewUrl ? (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
            <img src={previewUrl} alt="Generated text" className="max-w-full max-h-[50vh] object-contain" />
          </div>
        ) : (
          <p className="text-slate-500 dark:text-zinc-400">Preview will appear here</p>
        )}
        {previewUrl && (
          <div className="mt-8">
            <DownloadButton onClick={handleDownload} label="Download image" />
          </div>
        )}
      </div>

      <div className="w-[85vw] sm:w-[380px] xl:w-[420px] bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between min-h-[calc(100vh-80px)]">
        <ToolSidebar title="Text to Image">
          <ToolField label="Text">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Width (px)">
            <input
              type="number"
              min={100}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Height (px)">
            <input
              type="number"
              min={100}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={inputClass}
            />
          </ToolField>
          <ToolField label="Background">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </ToolField>
          <ToolField label="Text color">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </ToolField>
          <ToolField label={`Font size: ${fontSize}px`}>
            <input
              type="range"
              min={12}
              max={120}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className={rangeClass}
            />
          </ToolField>
        </ToolSidebar>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-[#4a85f6] hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-all text-[17px]"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </button>
      </div>
    </div>
  );
}
