import SearchForm from 'components/SearchForm/SearchForm';

const Searchbar = (props) => {
  return (
    <header>
      <SearchForm {...props} />
    </header>
  );
};

export default Searchbar;
