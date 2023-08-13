import React, { Component } from 'react';
import fetchImages from 'service/fetchImages';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import statuses from 'constants/statuses';
import initialState from 'constants/initialState';

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
    } catch (error) {
      this.setState({ error: error.message, status: statuses.rejected });
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
        <ImageGallery images={images} />
        {status === statuses.pending && <Loader />}
        {(status === statuses.resolved || status === statuses.rejected) && (
          <Button onLoadMoreBtnClick={this.onLoadMoreBtnClick} />
        )}
      </>
    );
  }
}

export default App;
