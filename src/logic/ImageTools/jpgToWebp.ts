import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertJpgToWebp(file: File): Promise<ConvertedImage> {
  return convertImage(file, "webp", 0.92);
}
