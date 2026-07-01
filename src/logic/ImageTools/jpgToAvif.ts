import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertJpgToAvif(file: File): Promise<ConvertedImage> {
  return convertImage(file, "webp", 0.85);
}
