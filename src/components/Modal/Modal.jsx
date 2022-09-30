import React, { Component } from "react";
import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import PropTypes from "prop-types";

const modalRoot = document.getElementById('root');

export default class Modal extends Component {
        
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.picture} alt="" />
        </div>
      </div>, modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
};