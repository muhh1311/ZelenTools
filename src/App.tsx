import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

import Index from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import ImageConverter from "./pages/ImageTools/ImageConverter";
import FaviconGenerator from "./pages/ImageTools/FaviconGenerator";
import CompressImage from "./pages/ImageTools/CompressImage";
import ResizeImage from "./pages/ImageTools/ResizeImage";
import ImageSplitter from "./pages/ImageTools/ImageSplitter";
import CropImage from "./pages/ImageTools/CropImage";
import RotateImage from "./pages/ImageTools/RotateImage";
import FlipImage from "./pages/ImageTools/FlipImage";
import BrightnessAdjust from "./pages/ImageTools/BrightnessAdjust";
import ContrastAdjust from "./pages/ImageTools/ContrastAdjust";
import SaturationAdjust from "./pages/ImageTools/SaturationAdjust";
import BlurImage from "./pages/ImageTools/BlurImage";
import GrayscaleImage from "./pages/ImageTools/GrayscaleImage";
import SepiaFilter from "./pages/ImageTools/SepiaFilter";
import BackgroundRemover from "./pages/ImageTools/BackgroundRemover";
import ImageWatermark from "./pages/ImageTools/ImageWatermark";
import TextToImage from "./pages/ImageTools/TextToImage";
import MemeGenerator from "./pages/ImageTools/MemeGenerator";
import PassportPhoto from "./pages/ImageTools/PassportPhoto";
import ImageOCR from "./pages/ImageTools/ImageOCR";
import ColorPicker from "./pages/ImageTools/ColorPicker";
import RemoveExif from "./pages/ImageTools/RemoveExif";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/terms" element={<Terms />} />

                {/* Image Tools */}
                <Route path="/convert-image" element={<ImageConverter />} />
                <Route path="/favicon-generator" element={<FaviconGenerator />} />
                <Route path="/compress-image" element={<CompressImage />} />
                <Route path="/resize-image" element={<ResizeImage />} />
                <Route path="/image-splitter" element={<ImageSplitter />} />
                <Route path="/crop-image" element={<CropImage />} />
                <Route path="/rotate-image" element={<RotateImage />} />
                <Route path="/flip-image" element={<FlipImage />} />
                <Route path="/brightness-adjust" element={<BrightnessAdjust />} />
                <Route path="/contrast-adjust" element={<ContrastAdjust />} />
                <Route path="/saturation-adjust" element={<SaturationAdjust />} />
                <Route path="/blur-image" element={<BlurImage />} />
                <Route path="/grayscale-image" element={<GrayscaleImage />} />
                <Route path="/sepia-filter" element={<SepiaFilter />} />
                <Route path="/background-remover" element={<BackgroundRemover />} />
                <Route path="/image-watermark" element={<ImageWatermark />} />
                <Route path="/text-to-image" element={<TextToImage />} />
                <Route path="/meme-generator" element={<MemeGenerator />} />
                <Route path="/passport-photo" element={<PassportPhoto />} />
                <Route path="/image-to-text" element={<ImageOCR />} />
                <Route path="/color-picker" element={<ColorPicker />} />
                <Route path="/remove-exif" element={<RemoveExif />} />

                <Route path="/tool/universal-image-converter" element={<Navigate to="/convert-image" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
