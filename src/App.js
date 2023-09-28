// src/App.js

import React, { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [images, setImages] = useState([]);

  const handleGenerateImage = (generatedImages) => {
    // Update the state with the generated images
    setImages(generatedImages);
  };

  return (
    <div className='App'>
      <main>
        <TextInput onGenerateImage={handleGenerateImage} />
        <ImageDisplay images={images} />
      </main>
    </div>
  );
}

export default App;
