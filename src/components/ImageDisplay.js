import React from 'react';

function ImageDisplay({ images }) {
  const handleSaveImage = (imageData, index) => {
    const blob = new Blob([imageData], { type: 'image/png' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.download = `generated_image_${index + 1}.png`;
    a.href = url;
    a.style.display = 'none'; // Hide the anchor element

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Trigger a click event on the anchor element to initiate the download
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);

    // Revoke the Blob URL
    URL.revokeObjectURL(url);
  };
  console.log('Generated Images:', images); // Log the contents of the generatedImages array

  return (
    <div className='ImageDisplay'>
      {images.map((imageData, index) => (
        <div key={index}>
          <img src={`${imageData}`} alt={`Generated Image ${index + 1}`} />
          <button onClick={() => handleSaveImage(imageData)}>Save Image</button>
        </div>
      ))}
    </div>
  );
}

export default ImageDisplay;
