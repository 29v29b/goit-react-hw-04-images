import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';


export default class ImageGallery extends Component {
    state = {
        showModal: false,
        largeImage: null,
    }

    toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
    }

    componentDidMount() {
        document.addEventListener('click', event => {
          if (event.target.nodeName !== 'IMG') {
            this.setState({ showModal: false });
            return;
          } else {
            let picture = this.props.images.filter(obj => {
              return obj.id === parseInt(event.target.alt);
            });
            this.setState({ largeImage: picture[0].largeImageURL });
          }
        });
      }

      render() {
        const { showModal, largeImage } = this.state;
        return (
          <>
            <ul className={css.gallery} onClick={this.toggleModal}>
              {this.props.images.map(img => {
                return (
                <ImageGalleryItem
                key={nanoid()}
                preview={img.webformatURL}
                id={img.id}
                />);
                })}
            </ul>

            {showModal && largeImage && (<Modal onClose={this.toggleModal} picture={largeImage} />)}
          </>
        );
      }
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