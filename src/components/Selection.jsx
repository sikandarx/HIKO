import React, { useState, useEffect } from 'react';
import './Selection.css';

const Selection = ({ category, images, selectedImage, onImageSelect }) => {

  const [value, setValue] = useState(5);

  useEffect(() => {
    const updateValue = () => {
      if (window.innerWidth < 768) {
        setValue(3);
      } else {
        setValue(5);
      }
    };

    updateValue();
    window.addEventListener('resize', updateValue);

    return () => {
      window.removeEventListener('resize', updateValue);
    };
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const imagesPerPage = value;

  const handlePrevClick = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - imagesPerPage, 0));
  };

  const handleNextClick = () => {
    setStartIndex(prevIndex => Math.min(prevIndex + imagesPerPage, images.length - imagesPerPage));
  };

  // Ensure "none" is included in the images array if not already present
  const updatedImages = category !== "Eyes" && category !== "Mouth" && category !== "Body" && category !== "Backgrounds"
    ? ["none", ...images.filter(image => image !== "none")]
    : images;

  const displayedImages = updatedImages.slice(startIndex, startIndex + imagesPerPage);

  return (
    <>
      <div className="selection">
        <div className='hdd'>{category.charAt(0).toUpperCase() + category.slice(1)}</div>

        <div className='imgfl'>
          <button className="arrow arrow-left" onClick={handlePrevClick} disabled={startIndex === 0}>
            &lt;
          </button>
          <div className="image-options">
            {displayedImages.map(image => (
              <div
                key={image}
                className={image === "none" ? (selectedImage === "none" ? 'selected none-box' : 'none-box') : ''}
                onClick={() => onImageSelect(category, image)}
              >
                {image === "none" ? (
                  <span>NONE</span>
                ) : (
                  <div className={selectedImage === image ? 'image-wrapper selected' : 'image-wrapper'}>
                    <img
                      src={`/pfp-assets/${category}/${image}`}
                      alt={image}
                      className={selectedImage === image ? 'selected' : ''}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="arrow arrow-right" onClick={handleNextClick} disabled={startIndex + imagesPerPage >= updatedImages.length}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Selection;
