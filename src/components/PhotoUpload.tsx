import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check, Camera, RefreshCw } from 'lucide-react';

interface PhotoUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'portrait' | 'square';
  id?: string;
}

// Preset professional portraits for fast selection
const PRESET_PORTRAITS = [
  {
    name: 'Bryan Belen (Founding Strategist)',
    url: '/src/assets/images/synaios_founder_1788399835345.jpg',
  },
  {
    name: 'Executive Studio 1',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Executive Studio 2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Executive Studio 3',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
];

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  value,
  onChange,
  label = 'Upload Photo',
  helperText = 'Upload from your computer (PNG, JPG, WEBP) or paste an image URL.',
  aspectRatio = 'portrait',
  id = 'photo-upload',
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress image using HTML5 Canvas to prevent LocalStorage quota overflow
  const processImageFile = (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }

    // Validate max size (max 10MB raw)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Max dimension 1000px for efficient storage in localStorage
          const maxDim = 1000;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            // Fallback to raw data url
            const rawData = e.target?.result as string;
            onChange(rawData);
            setUrlInput(rawData);
            setUploadSuccess(`Uploaded "${file.name}" successfully!`);
            setIsProcessing(false);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

          onChange(compressedDataUrl);
          setUrlInput(compressedDataUrl);
          setUploadSuccess(`Uploaded "${file.name}" successfully!`);
        } catch (err) {
          console.error('Error compressing image:', err);
          const rawData = e.target?.result as string;
          onChange(rawData);
          setUrlInput(rawData);
          setUploadSuccess(`Uploaded "${file.name}" successfully!`);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setUploadError('Failed to read image file. Please try another image.');
        setIsProcessing(false);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setUploadError('Error reading file.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setUploadError('Please enter an image URL.');
      return;
    }
    onChange(urlInput.trim());
    setUploadSuccess('Image URL applied successfully.');
    setUploadError(null);
  };

  const handleClearPhoto = () => {
    onChange('');
    setUrlInput('');
    setUploadSuccess(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = (presetUrl: string) => {
    onChange(presetUrl);
    setUrlInput(presetUrl);
    setUploadSuccess('Preset portrait selected.');
    setUploadError(null);
  };

  return (
    <div id={id} className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            {label}
          </label>
          {value && (
            <button
              type="button"
              onClick={handleClearPhoto}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          )}
        </div>
      )}

      {/* Mode Selector Tabs */}
      <div className="flex border border-gray-200 bg-gray-50 p-0.5 text-xs font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveMode('upload')}
          className={`flex-1 py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
            activeMode === 'upload'
              ? 'bg-white text-[#064E3B] shadow-xs border border-gray-200'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('url')}
          className={`flex-1 py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
            activeMode === 'url'
              ? 'bg-white text-[#064E3B] shadow-xs border border-gray-200'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image URL</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('presets')}
          className={`flex-1 py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
            activeMode === 'presets'
              ? 'bg-white text-[#064E3B] shadow-xs border border-gray-200'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Presets</span>
        </button>
      </div>

      {/* Mode 1: Drag & Drop + Click File Upload */}
      {activeMode === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#064E3B] bg-[#064E3B]/5 scale-[1.01]'
              : 'border-gray-300 hover:border-[#064E3B] bg-gray-50/50 hover:bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center rounded-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                {isProcessing ? 'Processing image...' : 'Click to browse or drag & drop photo here'}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                PNG, JPG, WEBP, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Direct URL Input */}
      {activeMode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-gray-300 focus:border-[#064E3B] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#064E3B] text-white hover:bg-black transition-colors"
            >
              Apply
            </button>
          </div>
          <p className="text-[11px] text-gray-500">
            Paste a public direct link to an image file.
          </p>
        </div>
      )}

      {/* Mode 3: Presets */}
      {activeMode === 'presets' && (
        <div className="space-y-2">
          <p className="text-[11px] text-gray-500 font-medium">
            Select a high-resolution executive portrait:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_PORTRAITS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p.url)}
                className={`group relative border overflow-hidden text-left aspect-3/4 transition-all ${
                  value === p.url
                    ? 'border-[#064E3B] ring-2 ring-[#064E3B]'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={p.url}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-[9px] font-bold text-white truncate">
                  {p.name}
                </div>
                {value === p.url && (
                  <div className="absolute top-1 right-1 bg-[#064E3B] text-white p-0.5 rounded-full">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Success / Error Messages */}
      {uploadError && (
        <div className="p-2 bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {uploadError}
        </div>
      )}

      {uploadSuccess && (
        <div className="p-2 bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#064E3B] flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> {uploadSuccess}
        </div>
      )}

      {/* Live Preview Bar */}
      {value && (
        <div className="p-3 bg-gray-50 border border-gray-200 flex items-center gap-3">
          <div
            className={`w-14 shrink-0 bg-gray-200 overflow-hidden border border-gray-300 ${
              aspectRatio === 'portrait' ? 'aspect-3/4' : 'aspect-square'
            }`}
          >
            <img
              src={value}
              alt="Uploaded photo preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B] block">
              Active Photo
            </span>
            <p className="text-xs font-medium text-gray-700 truncate">
              {value.startsWith('data:')
                ? 'Uploaded local image file (Ready to save)'
                : value}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-bold uppercase tracking-wider text-gray-600 hover:text-black flex items-center gap-1 mt-1"
            >
              <RefreshCw className="w-3 h-3" /> Change Photo File
            </button>
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400">{helperText}</p>
    </div>
  );
};
