import React from 'react';
import './modal.css'

const Modal = ({ isOpen, toggleModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-overlay" onClick={toggleModal} />
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
