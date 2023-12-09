import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery_MYDO = ({ images }) => {
    const customStyles = {
        gallerySlide: {
          width: '300px', 
          height: '200px',
        },
      };
    const customProps = {
        showPlayButton: false,
        showThumbnails: false, 
      };
  return <Gallery items={images} styles={customStyles} {...customProps} />;
};

export default Gallery_MYDO;