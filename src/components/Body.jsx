import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import GIF from '../assets/hiko-pfp-gif.gif';
import Tlgicon from '../assets/telegram-icon.png';
import Rnicon from '../assets/random-icon.png';
import Rsicon from '../assets/reset-icon.png';
import Doicon from '../assets/download-icon.png';
import Selection from './Selection';

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const Body = () => {
  const [selectedImages, setSelectedImages] = useState({
    Eyes: '1.png',
    Mouth: '1.png',
    Hats: 'none',
    Body: '1.png',
    Costume: 'none',
    Accessory: 'none',
    Backgrounds: '1.png'
  });

  const [assets, setAssets] = useState({
    Eyes: [],
    Mouth: [],
    Hats: [],
    Body: [],
    Costume: [],
    Accessory: [],
    Backgrounds: []
  });

  useEffect(() => {
    const loadAssets = async () => {
      const eyes = import.meta.glob('/public/pfp-assets/Eyes/*.png', { eager: true });
      const mouth = import.meta.glob('/public/pfp-assets/Mouth/*.png', { eager: true });
      const hats = import.meta.glob('/public/pfp-assets/Hats/*.png', { eager: true });
      const body = import.meta.glob('/public/pfp-assets/Body/*.png', { eager: true });
      const costume = import.meta.glob('/public/pfp-assets/Costume/*.png', { eager: true });
      const accessory = import.meta.glob('/public/pfp-assets/Accessory/*.png', { eager: true });
      const backgrounds = import.meta.glob('/public/pfp-assets/Backgrounds/*.png', { eager: true });

      const parseFiles = (files) => Object.keys(files).map((key) => key.split('/').pop())
        .filter((filename) => filename !== 'none.png')
        .sort((a, b) => {
          const numA = parseInt(a.replace('.png', ''), 10);
          const numB = parseInt(b.replace('.png', ''), 10);
          return numA - numB;
        });

      setAssets({
        Eyes: parseFiles(eyes),
        Mouth: parseFiles(mouth),
        Hats: ['none', ...parseFiles(hats)],
        Body: parseFiles(body),
        Costume: ['none', ...parseFiles(costume)],
        Accessory: ['none', ...parseFiles(accessory)],
        Backgrounds: parseFiles(backgrounds)
      });
    };

    loadAssets();
  }, []);

  const handleSelectionChange = (category, image) => {
    setSelectedImages(prevState => ({
      ...prevState,
      [category]: image
    }));
  };

  const handleReset = () => {
    setSelectedImages({
      Eyes: '1.png',
      Mouth: '1.png',
      Hats: 'none',
      Body: '1.png',
      Costume: 'none',
      Accessory: 'none',
      Backgrounds: '1.png'
    });
  };

  const handleRandomize = () => {
    setSelectedImages({
      Backgrounds: getRandomItem(assets.Backgrounds),
      Body: getRandomItem(assets.Body),
      Eyes: getRandomItem(assets.Eyes),
      Mouth: getRandomItem(assets.Mouth),
      Accessory: getRandomItem(assets.Accessory),
      Hats: getRandomItem(assets.Hats),
      Costume: 'none'
    });
  };

  const ImagePreview = ({ selectedImages }) => {
    const imageContainerRef = useRef(null);

    const handleDownload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const images = imageContainerRef.current.querySelectorAll('img');

      const width = images[0].naturalWidth;
      const height = images[0].naturalHeight;

      canvas.width = width;
      canvas.height = height;

      for (const img of images) {
        if (img.complete) {
          ctx.drawImage(img, 0, 0);
        } else {
          await new Promise((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
              resolve();
            };
          });
        }
      }

      const dataUrl = canvas.toDataURL('image/jpeg');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'hiko-pfp.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div>
        <div ref={imageContainerRef} className="image-preview">
          <img src={`/pfp-assets/Backgrounds/${selectedImages.Backgrounds}`} alt="Background" className='bg'/>
          <img src={`/pfp-assets/Mouth/${selectedImages.Mouth}`} alt="Mouth" className='mo'/>
          <img src={`/pfp-assets/Eyes/${selectedImages.Eyes}`} alt="Eyes" className='ey'/>
          <img src={`/pfp-assets/Body/${selectedImages.Body}`} alt="Lower Body" className='cl'/>
          {selectedImages.Costume !== 'none' && <img src={`/pfp-assets/Costume/${selectedImages.Costume}`} alt="Costume" className='co'/>}
          {selectedImages.Hats !== 'none' && <img src={`/pfp-assets/Hats/${selectedImages.Hats}`} alt="Hats" className='ha'/>}
          {selectedImages.Accessory !== 'none' && <img src={`/pfp-assets/Accessory/${selectedImages.Accessory}`} alt="Accessory" className='ac'/>}
        </div>
        <button onClick={handleDownload} className='dnbtn'>
          <div className='bt2'>
            <img src={Doicon} alt="Download icon" className='dnicn' />
            <div>Download PFP</div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className='tp'>
        <div className='fttl1'>
          <div className='ttl1'>HIK</div>
          <img src={GIF} alt="Cat gif" className='gif' />
        </div>
        <div className='ttl2'>PFP MAKER</div>
        <div className='pr1'>
          <div>Create your own HIKO and use it as your profile picture on social media.</div>
          <div>You’re now a cat. You’re now one of us.</div>
        </div>
        <button className="gradient-border-button mt-4">
          <div className='bt1'>
            <div>Request a trait</div>
            <img src={Tlgicon} alt="Send icon" className='icn1' />
          </div>
        </button>
      </div>
      <div className="bd2">
        <div className='bx1'>
          <ImagePreview selectedImages={selectedImages} />
          <div className="controls">
            <button onClick={handleReset} className="gradient-border-button">
              <div className='bt1'>
                <img src={Rsicon} alt="Reset icon" className='icn2' />
                <div>Reset Hiko</div>
              </div>
            </button>
            <button onClick={handleRandomize} className="gradient-border-button">
              <div className='bt1'>
                <img src={Rnicon} alt="Randomize icon" className='icn1' />
                <div>Randomize</div>
              </div>
            </button>
          </div>
        </div>
        <div className="selections">
          {Object.keys(assets).map(category => (
            <Selection
              key={category}
              category={category}
              images={assets[category]}
              selectedImage={selectedImages[category]}
              onImageSelect={handleSelectionChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Body;
