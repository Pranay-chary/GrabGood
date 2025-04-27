import React, { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { media } from '../utils/api';

const MediaUpload = ({ 
  value = [], 
  onChange, 
  maxFiles = 5,
  acceptedFileTypes = "image/*",
  maxFileSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    // Validate number of files
    if (files.length + value.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    // Validate file types and sizes
    const invalidFiles = files.filter(file => {
      if (!file.type.match(acceptedFileTypes)) {
        setError(`File type ${file.type} is not supported`);
        return true;
      }
      if (file.size > maxFileSize) {
        setError(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`);
        return true;
      }
      return false;
    });

    if (invalidFiles.length > 0) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const result = await media.upload(file, (progress) => {
            // You can handle upload progress here if needed
            console.log(`Upload progress: ${progress}%`);
          });
          return result;
        })
      );

      onChange([...value, ...uploadedFiles]);
    } catch (err) {
      setError(err.message || 'Failed to upload files');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async (fileToRemove) => {
    try {
      if (fileToRemove.id) {
        await media.delete(fileToRemove.id);
      }
      const newFiles = value.filter(file => file.id !== fileToRemove.id);
      onChange(newFiles);
    } catch (err) {
      setError(err.message || 'Failed to remove file');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <PhotoIcon className="w-12 h-12 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedFileTypes.replace('/*', ' files')} (up to {maxFileSize / 1024 / 1024}MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept={acceptedFileTypes}
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      {uploading && (
        <div className="text-sm text-gray-500">
          Uploading...
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((file, index) => (
            <div key={file.id || index} className="relative group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={file.url}
                  alt={file.name}
                  className="object-cover object-center"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(file)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-sm text-gray-500">
          {value.length} of {maxFiles} files uploaded
        </p>
      )}
    </div>
  );
};

export default MediaUpload;
