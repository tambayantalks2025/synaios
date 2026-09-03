import React, { useState } from 'react';
import { X, Camera, Check } from 'lucide-react';
import { PhotoUpload } from './PhotoUpload';
import { useData } from '../context/DataContext';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  initialPhoto: string;
  onSave: (newPhoto: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  title = 'Upload & Update Photo',
  initialPhoto,
  onSave,
}) => {
  const [photo, setPhoto] = useState(initialPhoto);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(photo);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A1A1A] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#064E3B]"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-gray-300">
              PHOTO MANAGEMENT
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors"
            aria-label="Close photo modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#064E3B] block mb-1">
              IMAGE ASSET
            </span>
            <h3 className="text-xl font-black tracking-tight text-[#1A1A1A] uppercase">
              {title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Select or drop an image from your device. Changes take effect immediately across all site sections.
            </p>
          </div>

          <PhotoUpload
            value={photo}
            onChange={setPhoto}
            label="Upload from Computer or Choose Preset"
            helperText="Drag & drop your photo file directly, click to browse, or paste an image URL."
            aspectRatio="portrait"
          />

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#064E3B] flex items-center gap-2">
              <Check className="w-4 h-4" /> Photo saved and updated successfully!
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#064E3B] hover:bg-black transition-colors"
            >
              Save Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
