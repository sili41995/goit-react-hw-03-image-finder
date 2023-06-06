import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.styled';

const { Item, Image } = css;

class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal: prevStatus }) => ({ showModal: !prevStatus }));
    document.addEventListener('keydown', this.onPressEscape);
  };

  onPressEscape = (e) => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
      document.removeEventListener('keydown', this.onPressEscape);
    }
  };

  render() {
    return (
      <Item>
        <Image
          src={this.props.item.webformatURL}
          alt={this.props.item.tags}
          onClick={() => this.toggleModal()}
        />
        {this.state.showModal && (
          <Modal
            link={this.props.item.largeImageURL}
            desc={this.props.item.tags}
            toggleModalWin={this.toggleModal}
          />
        )}
      </Item>
    );
  }
}

export default ImageGalleryItem;
