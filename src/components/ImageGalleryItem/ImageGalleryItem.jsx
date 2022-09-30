import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
    render() {
      return (
        <li className={css.galleryItem}>
          <img src={this.props.preview} className={css.image} alt={this.props.id} />
        </li>
      );
    }
  }
  
  
  ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
  };