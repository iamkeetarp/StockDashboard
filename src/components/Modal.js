// Modal.js
import React from "react";

const Modal = ({ closeModal, modalContent }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
