import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertPngToJpg(file: File): Promise<ConvertedImage> {
  return convertImage(file, "jpg", 0.92);
}
