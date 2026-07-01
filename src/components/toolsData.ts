import { 
  FileText, Image, FileImage, Layers, RotateCw, 
  Maximize2, Scissors, Crop, Share2, 
  Sun, Contrast, Sliders, EyeOff, Type, 
  Copy, ScanLine, Pipette, ShieldCheck, 
  Smile, FileDigit, FlipHorizontal, Eye
} from 'lucide-react';

export const toolsList = [
  // Convert Tools
  { name: "Image Converter", to: "/convert-image", icon: Image, category: "convert" },
  { name: "Favicon Generator", to: "/favicon-generator", icon: Smile, category: "convert" },
  { name: "JPG to PNG", to: "/jpg-to-png", icon: Image, category: "convert" },
  { name: "PNG to JPG", to: "/png-to-jpg", icon: Image, category: "convert" },
  { name: "JPG to WEBP", to: "/jpg-to-webp", icon: Image, category: "convert" },
  { name: "PNG to WEBP", to: "/png-to-webp", icon: Image, category: "convert" },
  { name: "WEBP to JPG", to: "/webp-to-jpg", icon: Image, category: "convert" },
  { name: "WEBP to PNG", to: "/webp-to-png", icon: Image, category: "convert" },
  { name: "JPG to GIF", to: "/jpg-to-gif", icon: Image, category: "convert" },
  { name: "PNG to GIF", to: "/png-to-gif", icon: Image, category: "convert" },
  { name: "WEBP to GIF", to: "/webp-to-gif", icon: Image, category: "convert" },
  { name: "GIF to JPG", to: "/gif-to-jpg", icon: Image, category: "convert" },
  { name: "GIF to PNG", to: "/gif-to-png", icon: Image, category: "convert" },
  { name: "SVG to PNG", to: "/svg-to-png", icon: Image, category: "convert" },
  { name: "JPG to AVIF", to: "/jpg-to-avif", icon: Image, category: "convert" },
  { name: "PNG to AVIF", to: "/png-to-avif", icon: Image, category: "convert" },
  { name: "WEBP to AVIF", to: "/webp-to-avif", icon: Image, category: "convert" },
  { name: "Font Awesome to PNG", to: "/font-awesome-to-png", icon: Image, category: "convert" },
  { name: "HEIC to JPG", to: "/heic-to-jpg", icon: Image, category: "convert" },
  { name: "HEIC to PNG", to: "/heic-to-png", icon: Image, category: "convert" },
  { name: "HEIC to AVIF", to: "/heic-to-avif", icon: Image, category: "convert" },
  { name: "PDF to JPG", to: "/pdf-to-jpg", icon: FileImage, category: "convert" },
  { name: "PNG to SVG", to: "/png-to-svg", icon: Image, category: "convert" },
  { name: "JPG to SVG", to: "/jpg-to-svg", icon: Image, category: "convert" },
  { name: "GIF to MP4", to: "/gif-to-mp4", icon: Image, category: "convert" },
  { name: "GIF to APNG", to: "/gif-to-apng", icon: Image, category: "convert" },
  
  // Optimize Tools
  { name: "Compress Image ", to: "/compress-image", icon: FileDigit, category: "optimize" },
  { name: "Resize Image", to: "/resize-image", icon: Maximize2, category: "optimize" },
  { name: "Image Splitter", to: "/image-splitter", icon: Layers, category: "optimize" },
  
  
  // Edit Tools
  { name: "Crop Image ", to: "/crop-image", icon: Crop, category: "edit" },
  { name: "Rotate Image", to: "/rotate-image", icon: RotateCw, category: "edit" },
  { name: "Flip Image", to: "/flip-image", icon: FlipHorizontal, category: "edit" },
  { name: "Brightness Adjust", to: "/brightness-adjust", icon: Sun, category: "edit" },
  { name: "Contrast Adjust", to: "/contrast-adjust", icon: Contrast, category: "edit" },
  { name: "Saturation Adjust", to: "/saturation-adjust", icon: Sliders, category: "edit" },
  { name: "Blur Image", to: "/blur-image", icon: Eye, category: "edit" },
  { name: "Grayscale Image", to: "/grayscale-image", icon: EyeOff, category: "edit" },
  { name: "Sepia Filter", to: "/sepia-filter", icon: Sliders, category: "edit" },
  { name: "Background Remover", to: "/background-remover", icon: Scissors, category: "edit" },
  { name: "Image Watermark", to: "/image-watermark", icon: Copy, category: "edit" },
  { name: "Add Text to Image", to: "/add-text-to-image", icon: Type, category: "edit" },
  { name: "Add Border to Image", to: "/add-border-to-image", icon: Layers, category: "edit" },
  { name: "Pixelate Image", to: "/pixelate-image", icon: Sliders, category: "edit" },
  
  // Create Tools
  { name: "Text to Image Maker", to: "/text-to-image", icon: Type, category: "create" },
  { name: "Meme Generator", to: "/meme-generator", icon: Smile, category: "create" },
  { name: "Passport Photo Maker", to: "/passport-photo", icon: FileImage, category: "create" },
  { name: "Combine Images", to: "/combine-images", icon: Layers, category: "create" },
  { name: "Profile Photo Maker", to: "/profile-photo-maker", icon: FileImage, category: "create" },
  { name: "Collage Maker", to: "/collage-maker", icon: Layers, category: "create" },
  { name: "Add Images", to: "/add-images", icon: Layers, category: "create" },
  
  // Security Tools
  { name: "Extract Text from Image (OCR)", to: "/image-to-text", icon: ScanLine, category: "security" },
  { name: "Color Picker from Image", to: "/color-picker", icon: Pipette, category: "security" },
  { name: "Remove EXIF Metadata", to: "/remove-exif", icon: ShieldCheck, category: "security" },
  { name: "View Metadata", to: "/view-metadata", icon: ScanLine, category: "security" }
];

export const tabs = [
  { id: "all", label: "All" },
  { id: "optimize", label: "Optimize" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "convert", label: "Convert" },
  { id: "security", label: "Security" },
];