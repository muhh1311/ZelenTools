import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertSvgToPng(file: File): Promise<ConvertedImage> {
  return convertImage(file, "png", 0.92);
}
