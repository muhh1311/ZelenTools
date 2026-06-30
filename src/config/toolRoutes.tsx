import type { ReactElement } from "react";
import ImageConverter from "@/pages/ImageTools/ImageConverter";
import FaviconGenerator from "@/pages/ImageTools/FaviconGenerator";
import CompressImage from "@/pages/ImageTools/CompressImage";
import ResizeImage from "@/pages/ImageTools/ResizeImage";
import ImageSplitter from "@/pages/ImageTools/ImageSplitter";
import CropImage from "@/pages/ImageTools/CropImage";
import RotateImage from "@/pages/ImageTools/RotateImage";
import FlipImage from "@/pages/ImageTools/FlipImage";
import BrightnessAdjust from "@/pages/ImageTools/BrightnessAdjust";
import ContrastAdjust from "@/pages/ImageTools/ContrastAdjust";
import SaturationAdjust from "@/pages/ImageTools/SaturationAdjust";
import BlurImage from "@/pages/ImageTools/BlurImage";
import GrayscaleImage from "@/pages/ImageTools/GrayscaleImage";
import SepiaFilter from "@/pages/ImageTools/SepiaFilter";
import BackgroundRemover from "@/pages/ImageTools/BackgroundRemover";
import ImageWatermark from "@/pages/ImageTools/ImageWatermark";
import TextToImage from "@/pages/ImageTools/TextToImage";
import MemeGenerator from "@/pages/ImageTools/MemeGenerator";
import PassportPhoto from "@/pages/ImageTools/PassportPhoto";
import ImageOCR from "@/pages/ImageTools/ImageOCR";
import ColorPicker from "@/pages/ImageTools/ColorPicker";
import RemoveExif from "@/pages/ImageTools/RemoveExif";

export interface ToolRoute {
  path: string;
  element: ReactElement;
}

export const toolRoutes: ToolRoute[] = [
  { path: "/convert-image", element: <ImageConverter /> },
  { path: "/favicon-generator", element: <FaviconGenerator /> },
  { path: "/compress-image", element: <CompressImage /> },
  { path: "/resize-image", element: <ResizeImage /> },
  { path: "/image-splitter", element: <ImageSplitter /> },
  { path: "/crop-image", element: <CropImage /> },
  { path: "/rotate-image", element: <RotateImage /> },
  { path: "/flip-image", element: <FlipImage /> },
  { path: "/brightness-adjust", element: <BrightnessAdjust /> },
  { path: "/contrast-adjust", element: <ContrastAdjust /> },
  { path: "/saturation-adjust", element: <SaturationAdjust /> },
  { path: "/blur-image", element: <BlurImage /> },
  { path: "/grayscale-image", element: <GrayscaleImage /> },
  { path: "/sepia-filter", element: <SepiaFilter /> },
  { path: "/background-remover", element: <BackgroundRemover /> },
  { path: "/image-watermark", element: <ImageWatermark /> },
  { path: "/text-to-image", element: <TextToImage /> },
  { path: "/meme-generator", element: <MemeGenerator /> },
  { path: "/passport-photo", element: <PassportPhoto /> },
  { path: "/image-to-text", element: <ImageOCR /> },
  { path: "/color-picker", element: <ColorPicker /> },
  { path: "/remove-exif", element: <RemoveExif /> },
];
