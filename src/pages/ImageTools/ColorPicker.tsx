import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import UploadButton from "@/components/ui/UploadButton";
import { ToolSidebar, ToolField } from "@/components/ui/ToolSidebar";

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export default function ColorPicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [rgb, setRgb] = useState<string>("");

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFile = (files: FileList | null) => {
    if (!files?.[0]) return;
    const file = files[0];
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setPickedColor(null);
    setRgb("");

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
    };
    img.src = url;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setPickedColor(hex);
    setRgb(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
  };

  const copyColor = () => {
    if (!pickedColor) return;
    navigator.clipboard.writeText(pickedColor);
    toast.success("Color copied to clipboard");
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files);
          e.target.value = "";
        }}
      />

      {!imageUrl ? (
        <div
          className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files);
          }}
        >
          <UploadButton
            title="Select Image"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
      ) : (
        <div className="w-full min-h-[calc(100vh-80px)] flex bg-slate-50/50 dark:bg-background">
          <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center overflow-auto">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="max-w-full max-h-[70vh] cursor-crosshair rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-4">
              Click anywhere on the image to pick a color
            </p>
          </div>

          <div className="w-[85vw] sm:w-[380px] bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 p-6">
            <ToolSidebar title="Color Picker">
              {pickedColor ? (
                <>
                  <div
                    className="w-full h-24 rounded-xl border border-slate-200 dark:border-zinc-700 mb-4"
                    style={{ backgroundColor: pickedColor }}
                  />
                  <ToolField label="HEX">
                    <p className="text-lg font-mono font-bold text-slate-800 dark:text-white">
                      {pickedColor}
                    </p>
                  </ToolField>
                  <ToolField label="RGB">
                    <p className="text-sm font-mono text-slate-600 dark:text-gray-300">{rgb}</p>
                  </ToolField>
                  <button
                    type="button"
                    onClick={copyColor}
                    className="w-full bg-[#4a85f6] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl mt-4"
                  >
                    Copy HEX
                  </button>
                </>
              ) : (
                <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
                  Click on the image to pick a color
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  if (imageUrl) URL.revokeObjectURL(imageUrl);
                  setImageUrl(null);
                  setPickedColor(null);
                }}
                className="w-full mt-6 py-3 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                Choose Another Image
              </button>
            </ToolSidebar>
          </div>
        </div>
      )}
    </>
  );
}
