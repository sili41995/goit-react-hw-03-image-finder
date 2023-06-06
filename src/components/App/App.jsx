import { Component } from 'react';
import ImagesApiService from 'services/images-api-service';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import css from 'components/App/App.styled';

const { Container, ErrorText } = css;

const imagesApiService = new ImagesApiService();

class App extends Component {
  state = {
    images: [],
    totalHits: null,
    status: 'idle',
    error: null,
  };

  onSubmit = async (value) => {
    try {
      this.setState({ status: 'pending' });
      const searchQuery = value.trim();
      imagesApiService.searchQuery = searchQuery;
      imagesApiService.resetPage();
      const response = await imagesApiService.fetchImages();
      const images = response.hits;
      if (!images.length) {
        throw new Error(`${imagesApiService.searchQuery} not found`);
      }
      const totalImages = response.totalHits;
      this.setState({
        images: [...images],
        totalHits: totalImages,
        status: 'resolved',
      });
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
    }
  };

  onLoadMore = async () => {
    this.setState({ status: 'pending' });
    const response = await imagesApiService.fetchImages();
    const images = response.hits;
    this.setState(({ images: prevImages }) => ({
      images: [...prevImages, ...images],
      status: 'resolved',
    }));
  };

  render() {
    if (this.state.status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.onSubmit} />
          {!!this.state.images.length && (
            <ImageGallery items={this.state.images} />
          )}
        </Container>
      );
    }

    if (this.state.status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.onSubmit} />
          {!!this.state.images.length && (
            <ImageGallery items={this.state.images} />
          )}
          <Loader />
        </Container>
      );
    }

    if (this.state.status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.onSubmit} />
          {!!this.state.images.length && (
            <ImageGallery items={this.state.images} />
          )}
          {this.state.images.length !== this.state.totalHits && (
            <Button onBtnClick={this.onLoadMore} />
          )}
        </Container>
      );
    }

    if (this.state.status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.onSubmit} />
          {!!this.state.images.length && (
            <ImageGallery items={this.state.images} />
          )}
          <ErrorText>{this.state.error}</ErrorText>
        </Container>
      );
    }

    //
    //
    //
  }
}

export default App;
