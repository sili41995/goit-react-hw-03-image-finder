import Searchbar from 'components/Searchbar/Searchbar';
import { Component } from 'react';

class App extends Component {
  state = {
    images: [],
    status: 'idle',
    // 'idle'
    //   'pending'
    // 'resolved'
    // 'rejected'
  };
  onSubmit = (value) => {
    console.log(value.trim());
  };

  render() {
    return <Searchbar onSubmit={this.onSubmit} />;
  }
}

export default App;
