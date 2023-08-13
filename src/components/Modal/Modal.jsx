import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Backdrop } from './Modal.styled';
import { createPortal } from 'react-dom';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.hideModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.hideModal);
  }

  render() {
    const { largeImage, tags, hideModal } = this.props;
    return createPortal(
      <Backdrop onClick={hideModal}>
        <div>
          <img src={largeImage} alt={tags} />
        </div>
      </Backdrop>,
      document.querySelector('#modal-root')
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;
