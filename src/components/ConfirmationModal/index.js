import React, { Component } from 'react';
import './style.css';

class ConfirmationModal extends Component {
  render() {
    const {open, header, handleClose, handleConfirm, children} = this.props;
    return open ? (
      <div className="confirmation-modal">
        <header className="confirmation-modal__header">
          <span>{header}</span>
        </header>
        <div className="confirmation-modal__content">{children}</div>
        <div className="confirmation-modal__footer">
          <button onClick={() => handleClose()} type="button" aria-label="close" className="confirmation-modal__footer__button--close">No</button>
          <button onClick={() => handleConfirm()} type="button" aria-label="confirm" className="confirmation-modal__footer__button--confirm">Yes</button>
        </div>
      </div>
    ) : null;
  }
}

export default ConfirmationModal;