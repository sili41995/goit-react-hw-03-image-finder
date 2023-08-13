import React, { Component } from 'react';
import fetchImages from 'service/fetchImages';
import statuses from 'constants/statuses';
import initialState from 'constants/initialState';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Container from 'components/Container';
import Notification from 'components/Notification';
import { errorToast, successToast } from 'utils/toasts';

class App extends Component {
  state = {
    ...initialState,
    status: statuses.idle,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    const isUpdate =
      prevState.searchQuery !== searchQuery || prevState.page !== page;
    if (isUpdate) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async (searchQuery, page) => {
    try {
      this.setState({ status: statuses.pending });
      const { hits: newImages } = await fetchImages(searchQuery, page);
      this.setState(({ images }) => ({
        images: [...images, ...newImages],
      }));
      this.setState({ status: statuses.resolved });
      successToast('Images uploaded');
    } catch (error) {
      this.setState({ error: error.message, status: statuses.rejected });
      errorToast(error.message);
    }
  };

  onSubmitForm = ({ query }) => {
    this.setState({
      ...initialState,
      status: statuses.pending,
      searchQuery: query,
    });
  };

  onLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />
        <Container>
          {!!images.length && <ImageGallery images={images} />}
          {status === statuses.pending && <Loader />}
          {!!images.length &&
            (status === statuses.resolved || status === statuses.rejected) && (
              <Button onLoadMoreBtnClick={this.onLoadMoreBtnClick} />
            )}
        </Container>
        <Notification />
      </>
    );
  }
}

export default App;
