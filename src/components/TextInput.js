import React, { useState } from 'react';

function TextInput({ onGenerateImage }) {
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleGenerateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('prompt', text);
      formData.append('style_id', '30'); // Replace with the desired style_id

      const response = await fetch(
        'https://api.vyro.ai/v1/imagine/api/generations',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer vk-i%2FQjuNbmbdut0iEo%2FMMWykIvn9zT5G18QKp51mNuD4M%3D',
            Accept: 'image/png', // Request PNG images explicitly
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorMessage}`
        );
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image/png')) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        onGenerateImage([imageUrl]);
      } else {
        const data = await response.json();
        const generatedImages = data?.images || [];
        onGenerateImage(generatedImages);
      }
    } catch (error) {
      console.error('API request error:', error.message);
    }
  };

  return (
    <div className='TextInput'>
      <textarea
        placeholder='Enter your text prompt...'
        value={text}
        onChange={handleInputChange}
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
    </div>
  );
}

export default TextInput;
