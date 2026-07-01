import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertHeicToPng(file: File): Promise<ConvertedImage> {
  return convertImage(file, "png", 0.92);
}
