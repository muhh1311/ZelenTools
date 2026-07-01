import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertWebpToPng(file: File): Promise<ConvertedImage> {
  return convertImage(file, "png", 0.92);
}
