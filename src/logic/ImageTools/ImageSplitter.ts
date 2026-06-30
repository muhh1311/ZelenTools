import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
} from "./imageUtils";

export interface SplitOptions {
  rows: number;
  cols: number;
}

export async function splitImages(
  files: File[],
  options: SplitOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const allPieces: ProcessedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);

    const img = await loadImageFromFile(file);
    const baseName = getBaseName(file.name);
    const pieceW = Math.floor(img.naturalWidth / options.cols);
    const pieceH = Math.floor(img.naturalHeight / options.rows);

    for (let row = 0; row < options.rows; row++) {
      for (let col = 0; col < options.cols; col++) {
        const canvas = document.createElement("canvas");
        canvas.width = pieceW;
        canvas.height = pieceH;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(
          img,
          col * pieceW,
          row * pieceH,
          pieceW,
          pieceH,
          0,
          0,
          pieceW,
          pieceH
        );
        const blob = await canvasToBlob(canvas, "image/png");
        allPieces.push({
          blob,
          fileName: `${baseName}-part-${row + 1}-${col + 1}.png`,
          originalName: file.name,
          size: blob.size,
        });
      }
    }

    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }

  return allPieces;
}
