import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.styled';

const { List } = css;

const ImageGallery = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};

export default ImageGallery;
