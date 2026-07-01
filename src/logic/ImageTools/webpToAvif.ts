import { convertImage, ConvertedImage } from "./ImageConverter";

export async function convertWebpToAvif(file: File): Promise<ConvertedImage> {
  return convertImage(file, "webp", 0.85);
}
