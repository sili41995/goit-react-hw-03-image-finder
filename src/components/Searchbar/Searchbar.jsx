import { Formik, Form, Field } from 'formik';
import validateQuery from 'utils/validateQuery';
import Notification from 'components/Notification';

const Searchbar = ({ onSubmit }) => {
  return (
    <header>
      <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
        {({ errors }) => (
          <Form>
            <button type='submit'>
              <span>Search</span>
            </button>
            <Field
              validate={validateQuery}
              name='query'
              type='text'
              autoComplete='off'
              placeholder='Search images and photos'
            />
          </Form>
        )}
      </Formik>
      <Notification />
    </header>
  );
};

export default Searchbar;
