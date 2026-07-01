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
import JpgToPng from "@/pages/ImageTools/JpgToPng";
import PngToJpg from "@/pages/ImageTools/PngToJpg";
import JpgToWebp from "@/pages/ImageTools/JpgToWebp";
import PngToWebp from "@/pages/ImageTools/PngToWebp";
import WebpToJpg from "@/pages/ImageTools/WebpToJpg";
import WebpToPng from "@/pages/ImageTools/WebpToPng";
import JpgToGif from "@/pages/ImageTools/JpgToGif";
import PngToGif from "@/pages/ImageTools/PngToGif";
import WebpToGif from "@/pages/ImageTools/WebpToGif";
import GifToJpg from "@/pages/ImageTools/GifToJpg";
import GifToPng from "@/pages/ImageTools/GifToPng";
import SvgToPng from "@/pages/ImageTools/SvgToPng";
import JpgToAvif from "@/pages/ImageTools/JpgToAvif";
import PngToAvif from "@/pages/ImageTools/PngToAvif";
import WebpToAvif from "@/pages/ImageTools/WebpToAvif";
import FontAwesomeToPng from "@/pages/ImageTools/FontAwesomeToPng";
import HeicToJpg from "@/pages/ImageTools/HeicToJpg";
import HeicToPng from "@/pages/ImageTools/HeicToPng";
import HeicToAvif from "@/pages/ImageTools/HeicToAvif";
import PdfToJpg from "@/pages/ImageTools/PdfToJpg";
import PngToSvg from "@/pages/ImageTools/PngToSvg";
import JpgToSvg from "@/pages/ImageTools/JpgToSvg";
import GifToMp4 from "@/pages/ImageTools/GifToMp4";
import GifToApng from "@/pages/ImageTools/GifToApng";
import AddTextToImage from "@/pages/ImageTools/AddTextToImage";
import AddBorderToImage from "@/pages/ImageTools/AddBorderToImage";
import PixelateImage from "@/pages/ImageTools/PixelateImage";
import CombineImages from "@/pages/ImageTools/CombineImages";
import ProfilePhotoMaker from "@/pages/ImageTools/ProfilePhotoMaker";
import CollageMaker from "@/pages/ImageTools/CollageMaker";
import AddImages from "@/pages/ImageTools/AddImages";
import ViewMetadata from "@/pages/ImageTools/ViewMetadata";

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
  { path: "/jpg-to-png", element: <JpgToPng /> },
  { path: "/png-to-jpg", element: <PngToJpg /> },
  { path: "/jpg-to-webp", element: <JpgToWebp /> },
  { path: "/png-to-webp", element: <PngToWebp /> },
  { path: "/webp-to-jpg", element: <WebpToJpg /> },
  { path: "/webp-to-png", element: <WebpToPng /> },
  { path: "/jpg-to-gif", element: <JpgToGif /> },
  { path: "/png-to-gif", element: <PngToGif /> },
  { path: "/webp-to-gif", element: <WebpToGif /> },
  { path: "/gif-to-jpg", element: <GifToJpg /> },
  { path: "/gif-to-png", element: <GifToPng /> },
  { path: "/svg-to-png", element: <SvgToPng /> },
  { path: "/jpg-to-avif", element: <JpgToAvif /> },
  { path: "/png-to-avif", element: <PngToAvif /> },
  { path: "/webp-to-avif", element: <WebpToAvif /> },
  { path: "/font-awesome-to-png", element: <FontAwesomeToPng /> },
  { path: "/heic-to-jpg", element: <HeicToJpg /> },
  { path: "/heic-to-png", element: <HeicToPng /> },
  { path: "/heic-to-avif", element: <HeicToAvif /> },
  { path: "/pdf-to-jpg", element: <PdfToJpg /> },
  { path: "/png-to-svg", element: <PngToSvg /> },
  { path: "/jpg-to-svg", element: <JpgToSvg /> },
  { path: "/gif-to-mp4", element: <GifToMp4 /> },
  { path: "/gif-to-apng", element: <GifToApng /> },
  { path: "/add-text-to-image", element: <AddTextToImage /> },
  { path: "/add-border-to-image", element: <AddBorderToImage /> },
  { path: "/pixelate-image", element: <PixelateImage /> },
  { path: "/combine-images", element: <CombineImages /> },
  { path: "/profile-photo-maker", element: <ProfilePhotoMaker /> },
  { path: "/collage-maker", element: <CollageMaker /> },
  { path: "/add-images", element: <AddImages /> },
  { path: "/view-metadata", element: <ViewMetadata /> },
];
