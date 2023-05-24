import React, { useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setImages(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleImageUpdate = (index, newImage) => {
    const updatedImages = [...images];
    updatedImages[index] = newImage;
    setImages(updatedImages);

    const updatedPreviews = updatedImages.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : file
    );
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = () => {
    // Assuming you have an API endpoint to handle file upload and update in the database
    // You can send the 'images' array to the server and update the corresponding database entry
    // Example code: fetch('/api/upload', { method: 'POST', body: images });

    // Reset the component state after submitting
    setImages([]);
    setPreviewImages([]);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      
      {previewImages.map((preview, index) => (
        <div key={index}>
          <img src={preview} alt={`Preview ${index}`} height="100" />
          <input
            type="file"
            onChange={(event) => handleImageUpdate(index, event.target.files[0])}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
