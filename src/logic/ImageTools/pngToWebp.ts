import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertPngToWebp(file: File): Promise<ConvertedImage> {
  return convertImage(file, "webp", 0.92);
}
