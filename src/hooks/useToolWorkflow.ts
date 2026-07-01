// src/hooks/useToolWorkflow.ts
import { useState } from 'react';
import type { ToolStage } from '@/types';

export function useToolWorkflow() {
  // 1. Current screen tracker state
  const [stage, setStage] = useState<ToolStage>('UPLOAD');
  
  // 2. Files handling states
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<any[]>([]);

  // 3. Live Progress/Loader states
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFileNum, setCurrentFileNum] = useState(1);
  const [activeFileName, setActiveFileName] = useState("");
  const [activeFileSize, setActiveFileSize] = useState("");
  const [globalProgress, setGlobalProgress] = useState(0);

  // 4. File selection ko handle karne ka function
  const handleFileSelection = (files: FileList | null) => {
    if (files && files.length > 0) {
      setRawFiles(Array.from(files));
      setStage('WORKSPACE'); // Files aate hi automatic workspace khol do
    }
  };

  // 5. Progress bar ko dynamic update karne ka function
  const updateProgress = (fileIdx: number, percent: number, name: string, size: string) => {
    setCurrentFileNum(fileIdx);
    setGlobalProgress(percent);
    setActiveFileName(name);
    setActiveFileSize(size);
  };

  // 6. Reset function (jab user "Convert More" par click kare)
  const resetWorkflow = () => {
    setRawFiles([]);
    setConvertedResults([]);
    setGlobalProgress(0);
    setStage('UPLOAD');
    setIsProcessing(false);
  };

  // Yeh saari cheezein hum return kar rahe hain taake koi bhi page inhein use kar sakay
  return {
    stage,
    setStage,
    rawFiles,
    setRawFiles,
    convertedResults,
    setConvertedResults,
    isProcessing,
    setIsProcessing,
    currentFileNum,
    activeFileName,
    activeFileSize,
    globalProgress,
    handleFileSelection,
    updateProgress,
    resetWorkflow,
  };
}