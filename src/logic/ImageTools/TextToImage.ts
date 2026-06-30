import { type ProcessedImage, canvasToBlob } from "./imageUtils";

export interface TextToImageOptions {
  text: string;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
}

export async function generateTextImage(options: TextToImageOptions): Promise<ProcessedImage> {
  const canvas = document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = options.textColor;
  ctx.font = `bold ${options.fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(options.text, canvas.width / 2, canvas.height / 2);

  const blob = await canvasToBlob(canvas, "image/png");
  return {
    blob,
    fileName: "text-image.png",
    originalName: "text-image",
    size: blob.size,
  };
}
