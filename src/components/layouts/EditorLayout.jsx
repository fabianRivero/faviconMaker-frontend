import { useState } from 'react';

export default function EditorLayout({ children }) {
  const [imageState, setImageState] = useState({
    hasUploaded: false,
    generatedImage: null,
    uploadedImage: null
  });

  const handleImageUploaded = (imageData) => {
    setImageState({
      hasUploaded: true,
      generatedImage: null,
      uploadedImage: imageData
    });
  };

  const handleImageGenerated = (imageData) => {
    setImageState({
      hasUploaded: false,
      generatedImage: imageData,
      uploadedImage: null
    });
  };

  const resetImages = () => {
    setImageState({
      hasUploaded: false,
      generatedImage: null,
      uploadedImage: null
    });
  };

  return children({
    onImageUploaded: handleImageUploaded,
    onImageGenerated: handleImageGenerated,
    generatedImage: imageState.generatedImage,
    uploadedImage: imageState.uploadedImage,
    resetImages,
    hasImage: imageState.hasUploaded || !!imageState.generatedImage
  });
}