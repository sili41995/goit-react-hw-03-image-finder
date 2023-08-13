import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { Image, Item } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onImgClick = () => {
    this.setState({ showModal: true });
  };

  hideModal = (e) => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;

    return (
      <>
        <Item onClick={this.onImgClick}>
          <Image src={webformatURL} alt={tags} />
        </Item>
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

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
