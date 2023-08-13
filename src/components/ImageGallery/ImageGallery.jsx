import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul class='gallery'>
      {images.map((img) => (
        <ImageGalleryItem image={img} />
      ))}
    </ul>
  );
};

export default ImageGallery;
