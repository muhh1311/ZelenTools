import { 
  FileText, Image, FileImage, Layers, RotateCw, 
  Maximize2, Scissors, Crop, Share2, 
  Sun, Contrast, Sliders, EyeOff, Type, 
  Copy, ScanLine, Pipette, ShieldCheck, 
  Smile, FileDigit, FlipHorizontal, Eye
} from 'lucide-react';

export const toolsList = [
  // Convert Tools
      { name: "Universal Image Converter", to: "/convert-image", icon: Image, category: "convert" },
  { name: "Favicon Generator", to: "/favicon-generator", icon: Smile, category: "convert" },
  
  // Optimize Tools
  { name: "Compress Image (Auto / Target Size)", to: "/compress-image", icon: FileDigit, category: "optimize" },
  { name: "Resize Image", to: "/resize-image", icon: Maximize2, category: "optimize" },
  { name: "Image Splitter", to: "/image-splitter", icon: Layers, category: "optimize" },
  { name: "Social Media Resizer", to: "/social-resizer", icon: Share2, category: "optimize" },
  
  // Edit Tools
  { name: "Crop Image (Square / Circle)", to: "/crop-image", icon: Crop, category: "edit" },
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
  
  // Create Tools
  { name: "Text to Image Maker", to: "/text-to-image", icon: Type, category: "create" },
  { name: "Meme Generator", to: "/meme-generator", icon: Smile, category: "create" },
  { name: "Passport Photo Maker", to: "/passport-photo", icon: FileImage, category: "create" },
  
  // Security Tools
  { name: "Extract Text from Image (OCR)", to: "/image-to-text", icon: ScanLine, category: "security" },
  { name: "Color Picker from Image", to: "/color-picker", icon: Pipette, category: "security" },
  { name: "Remove EXIF Metadata", to: "/remove-exif", icon: ShieldCheck, category: "security" }
];

export const tabs = [
  { id: "all", label: "All" },
  { id: "optimize", label: "Optimize" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "convert", label: "Convert" },
  { id: "security", label: "Security" },
];