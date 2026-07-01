import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertPngToAvif(file: File): Promise<ConvertedImage> {
  return convertImage(file, "webp", 0.85);
}
