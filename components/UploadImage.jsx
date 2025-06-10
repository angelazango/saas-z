"use client";

import { useState } from 'react';

const UploadImage = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onImageUpload) onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {preview && (
        <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm text-gray-500"
      />
    </div>
  );
};

export default UploadImage;
