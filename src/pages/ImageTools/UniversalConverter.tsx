// src/pages/ImageTools/UniversalConverter.tsx
import React, { useState, useRef } from 'react';
import { Plus, X, ArrowRight } from 'lucide-react';
import UploadButton from '../../components/ui/UploadButton';
import { convertImage, ImageFormat } from '../../logic/ImageTools/universalConverterLogic';

interface UploadedFileItem {
  id: string;
  file: File;
  preview: string;
}

const AVAILABLE_FORMATS: ImageFormat[] = [
  'JPG', 'JPEG', 'PNG', 'WebP', 'GIF', 'BMP', 'ICO', 'SVG', 'TIFF'
];

export default function UniversalConverter() {
  const [images, setImages] = useState<UploadedFileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('JPG');
  const [isConverting, setIsConverting] = useState(false);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const plusFileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (fileList: FileList) => {
    const newItems: UploadedFileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        newItems.push({
          id: `${file.name}-${Date.now()}-${i}`,
          file: file,
          preview: URL.createObjectURL(file)
        });
      }
    }
    setImages((prev) => [...prev, ...newItems]);
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const handlePlusFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const removeImage = (id: string, previewUrl: string) => {
    URL.revokeObjectURL(previewUrl);
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBulkConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);

    try {
      for (const item of images) {
        const convertedUrl = await convertImage(item.file, targetFormat);
        
        const link = document.createElement('a');
        link.href = convertedUrl;
        link.download = `${item.file.name.split('.')[0]}.${targetFormat.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Conversion mein masla hua.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#22252A] flex flex-col">
      
      {images.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-4 min-h-[80vh]">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Convert IMAGE</h1>
            <p className="text-lg md:text-xl text-[#4A4E57] max-w-2xl font-light">
              Convert your images to <span className="font-semibold text-[#4285F4]">JPG, PNG, WebP, GIF, BMP, ICO, SVG, or TIFF</span>.
            </p>
            <div className="mt-4">
              <input 
                ref={mainFileInputRef}
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleMainFileChange} 
                className="hidden" 
                id="main-file-upload"
              />
              <UploadButton title="Select images" onClick={() => mainFileInputRef.current?.click()} />
            </div>
            <p className="text-sm text-[#737885] mt-2">or drop images here</p>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col md:flex-row w-full h-[calc(100vh-64px)] overflow-hidden">
          
          <div className="flex-grow p-6 md:p-10 overflow-y-auto bg-[#ECEFF1]/40 flex flex-wrap gap-6 items-start content-start relative">
            {images.map((item) => (
              <div 
                key={item.id} 
                className="group relative w-40 h-48 md:w-48 md:h-56 bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex flex-col justify-between items-center transition hover:shadow-md"
              >
                <button 
                  onClick={() => removeImage(item.id, item.preview)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow transition opacity-90 md:opacity-0 md:group-hover:opacity-100 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-full flex-grow flex items-center justify-center overflow-hidden rounded bg-slate-50 border border-slate-100 p-1">
                  <img src={item.preview} alt={item.file.name} className="max-w-full max-h-32 object-contain" />
                </div>

                <p className="text-xs text-[#4A4E57] font-medium truncate w-full text-center mt-2 pt-1 border-t border-slate-100">
                  {item.file.name}
                </p>
              </div>
            ))}

            <div className="flex flex-col gap-3 items-center justify-center ml-2">
              <input 
                ref={plusFileInputRef}
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handlePlusFileChange} 
                className="hidden" 
                id="plus-file-upload"
              />
              <button 
                onClick={() => plusFileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-[#4285F4] hover:bg-[#3572DB] text-white flex items-center justify-center shadow-lg transition transform hover:scale-105 group relative"
              >
                <Plus className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 bg-slate-900 border border-white text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {images.length}
                </span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 lg:w-96 bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col justify-between shadow-xl z-20">
            <div className="p-6 flex-grow overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#22252A] mb-6 tracking-tight text-center md:text-left">
                Convert options
              </h2>
              
              <div className="bg-[#E3F2FD] text-[#0D47A1] text-sm p-4 rounded-xl border border-[#BBDEFB] font-medium mb-6">
                All images will be converted to <span className="font-bold">{targetFormat}</span>.
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target Format Selector
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_FORMATS.map((format) => (
                    <button
                      key={format}
                      onClick={() => setTargetFormat(format)}
                      className={`py-2.5 px-4 rounded-xl font-bold text-sm border transition text-center ${
                        targetFormat === format
                          ? 'bg-[#4285F4] border-[#4285F4] text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={handleBulkConvert}
                disabled={isConverting}
                className="w-full bg-[#ff3a59] hover:bg-[#e62645] disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(255,58,89,0.3)] flex items-center justify-center gap-3 tracking-wide"
              >
                <span>{isConverting ? 'Converting...' : `Convert to ${targetFormat}`}</span>
                {!isConverting && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}