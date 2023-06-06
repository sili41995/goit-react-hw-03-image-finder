import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.styled';

const { Overlay, ModalWin, Image } = css;

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  static propTypes = {
    toggleModalWin: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  };

  closeModalWin = (e) => {
    const { toggleModalWin } = this.props;

    if (e.target === e.currentTarget) {
      toggleModalWin();
    }
  };

  onEscapePress = (e) => {
    const { toggleModalWin } = this.props;
    if (e.target === e.currentTarget || e.keyCode === 'Escape') {
      toggleModalWin();
    }
  };

  render() {
    return createPortal(
      <Overlay
        onClick={(e) => {
          this.closeModalWin(e);
        }}
      >
        <ModalWin>
          <Image src={this.props.link} alt={this.props.desc} />
        </ModalWin>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
