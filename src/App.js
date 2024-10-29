import React, { useState } from 'react';
import { createGIF } from 'gifshot';

function App() {
  const [progress, setProgress] = useState(0);
  const [gifSrc, setGifSrc] = useState(null);

  const handleClick = () => {
    const images = ['1.png', '2.png', '3.png'];

    const options = {
      images: images,
      gifWidth: 500,
      gifHeight: 300,
      numWorkers: 5,
      frameDuration: 0.2,
      sampleInterval: 10,
      progressCallback: (e) => setProgress(parseInt(e * 100)),
    };

    createGIF(options, (obj) => {
      if (!obj.error) {
        setGifSrc(obj.image); // 设置 GIF 图片的 src
        setProgress(0); // 重置进度
      }
    });
  };

  const handleDownload = () => {
    if (gifSrc) {
      const link = document.createElement('a');
      link.download = 'sample.gif';
      link.href = gifSrc;
      link.click();
    }
  };

  return (
    <div className="App">
      <h3>Create a GIF from images in React</h3>
      <button onClick={handleClick}>Click to create a GIF</button>
      {progress > 0 && <p>Creating GIF... {progress}%</p>}
      {gifSrc && (
        <>
          <img src={gifSrc} alt="Generated GIF" style={{ width: '500px', height: '300px', margin: '20px 0' }} />
          <button onClick={handleDownload}>Download GIF</button>
        </>
      )}
    </div>
  );
}

export default App;
