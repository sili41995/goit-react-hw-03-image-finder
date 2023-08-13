import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import validateQuery from 'utils/validateQuery';
import { Header, SearchForm, Button, Input } from './Searchbar.styled';
import { errorToast } from 'utils/toasts';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
        {({ errors }) => (
          <SearchForm>
            <Button type='submit'>
              <FcSearch />
            </Button>
            <Input
              validate={validateQuery}
              name='query'
              type='text'
              autoComplete='off'
              placeholder='Search images and photos'
            />
            {errors.query && errorToast(errors.query)}
          </SearchForm>
        )}
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
