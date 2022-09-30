import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import PropTypes from "prop-types";

const modalRoot = document.getElementById('root');

function Modal({ onClose, picture }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    };

    const handleClickAway = e => {
      if (e.target.className.includes('Modal_overlay')) {
        return onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickAway);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickAway);
    };
  });

  return createPortal(
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={picture} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
};

export default Modal;