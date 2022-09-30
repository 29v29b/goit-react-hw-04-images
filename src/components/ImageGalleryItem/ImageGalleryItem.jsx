import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

 function ImageGalleryItem({ preview, id }) {
      return (
        <li className={css.galleryItem}>
          <img src={preview} className={css.image} alt={id} />
        </li>
      );
  }
  
  
  ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
  };

  export default ImageGalleryItem;