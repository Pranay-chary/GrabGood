import React, { useState } from 'react';

const SweetShopPhotos = ({ photos, onChange }) => {
  const [photoCategory, setPhotoCategory] = useState('product');
  
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // In a real app, you would upload these to a server
    // For this demo, we'll just store file information
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      category: photoCategory,
      url: URL.createObjectURL(file) // This creates a temporary URL
    }));
    
    onChange([...photos, ...newPhotos]);
  };

  const removePhoto = (id) => {
    onChange(photos.filter(photo => photo.id !== id));
  };

  const categories = [
    { id: 'product', label: 'Products' },
    { id: 'store', label: 'Store' },
    { id: 'staff', label: 'Staff & Team' },
    { id: 'process', label: 'Preparation Process' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'other', label: 'Other' },
  ];

  const handleCategoryChange = (e) => {
    setPhotoCategory(e.target.value);
  };

  const filteredPhotos = (category) => {
    return photos.filter(photo => photo.category === category);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Sweet Shop Photos</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Upload New Photos</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={photoCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Photos</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#2ecc71] hover:text-[#27ae60]"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Photo Galleries By Category */}
      {categories.map(category => {
        const categoryPhotos = filteredPhotos(category.id);
        
        if (categoryPhotos.length === 0) {
          return null;
        }
        
        return (
          <div key={category.id} className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-4">{category.label} Photos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categoryPhotos.map(photo => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="text-white p-2 rounded-full bg-red-600 hover:bg-red-700"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {photos.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          No photos uploaded yet
        </div>
      )}
    </div>
  );
};

export default SweetShopPhotos; 