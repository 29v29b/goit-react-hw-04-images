import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

function ImageGallery({images}) {

    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState(null)

    const toggleModal = () => {
    setShowModal(prevShow => !prevShow);
    }

    useEffect(() => {
      document.addEventListener('click', event => {
        if (event.target.nodeName !== 'IMG') {
          return;
          } 

        let picture = images.filter(obj => {
            return obj.id === parseInt(event.target.alt);
          });      
        if (!picture.length) {
          return;
        }
        setLargeImage(picture[0].largeImageURL)});
      }, [largeImage, images]);
    
    
        return (
          <>
            <ul className={css.gallery} onClick={toggleModal}>
              {images.map(img => {
                return (
                <ImageGalleryItem
                key={nanoid()}
                preview={img.webformatURL}
                id={img.id}
                />);
                })}
            </ul>

            {showModal && largeImage && (<Modal onClose={toggleModal} picture={largeImage} />)}
          </>
        );
      };

    ImageGallery.propTypes = {
        images: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
          })
        ),
      };

    export default ImageGallery;