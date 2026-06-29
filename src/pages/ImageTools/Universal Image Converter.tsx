// src/pages/ImageTools/Universal Image Converter.tsx
import React, { useState } from 'react';
import UploadButton from '../../components/ui/UploadButton';
import WorkspaceLayout from '../../components/ui/WorkspaceLayout';

export default function UniversalConverter() {
  // ⚡ State: Jab tak image upload nahi hogi yeh false rahega
  const [hasUploaded, setHasUploaded] = useState(false);

  // Jab user button par click karega (Fake upload handle karne ke liye)
  const handleUploadClick = () => {
    console.log('File selection triggered!');
    setHasUploaded(true); // Is se layout change ho jayega
  };

  // ⚙️ Sidebar Options ka Content (Jo right side par aayega)
  // ⚙️ Sidebar Options Content (Ab bina description text ke hai)
  const converterOptions = (
    <div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        Convert Options
      </h3>
      <div className="mb-4">
        <label className="text-sm font-semibold text-slate-600 dark:text-gray-300 block mb-1">
          Convert To:
        </label>
        <select className="w-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-2.5 text-sm">
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WebP</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* CONDITION: Agar image upload NAHI hui, toh normal bada button dikhao */}
      {!hasUploaded ? (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4">
          <UploadButton title="Select Images" onClick={handleUploadClick} />
        </div>
      ) : (
        
        /* 🚀 LINKED WORKSPACE: Jab image upload ho jaye, toh yeh layout active ho */
        <WorkspaceLayout 
          sidebarOptions={converterOptions}
          actionButtonText="Convert IMAGES"
          onActionClick={() => console.log("Converting process started...")}
        >
          {/* Left Side: Uploaded Image Card Card Preview */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm max-w-[200px] text-center flex flex-col items-center relative group">
            
            {/* Remove File Button (❌) */}
            <button 
              onClick={() => setHasUploaded(false)} // Wapas normal screen par le jayega
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90"
            >
              ✕
            </button>

            {/* Fake Image Placeholder Box */}
            <div className="rounded-xl mb-3 h-36 w-36 bg-blue-50/50 dark:bg-zinc-800 flex items-center justify-center text-3xl select-none">
              🖼️
            </div>
            
            <p className="text-xs text-slate-500 dark:text-gray-400 truncate w-full font-medium">
              uploaded-image.jpg
            </p>
            
            <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded mt-2 text-slate-600 dark:text-gray-400 font-bold">
              1239 x 665
            </span>
          </div>

        </WorkspaceLayout>
      )}
    </>
  );
}