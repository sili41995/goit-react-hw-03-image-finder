import React, { Component } from 'react';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onImgClick = () => {
    this.setState({ showModal: true });
  };

  hideModal = (e) => {
    if (e.code === 'Escape' || e.type === 'click') {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;

    return (
      <>
        <li key={id} onClick={this.onImgClick}>
          <img src={webformatURL} alt={tags} />
        </li>
        {showModal && (
          <Modal
            largeImage={largeImageURL}
            tags={tags}
            hideModal={this.hideModal}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
