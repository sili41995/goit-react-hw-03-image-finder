import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.hideModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.hideModal);
  }

  render() {
    const { largeImage, tags, hideModal } = this.props;
    return (
      <div onClick={hideModal}>
        <div>
          <img src={largeImage} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
