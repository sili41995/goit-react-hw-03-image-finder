import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  searchQuery: yup.string().trim().required(),
});

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = ({ searchQuery }, { resetForm }) => {
    onSubmit(searchQuery);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        searchQuery: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <button type='submit'>
          <span>Search</span>
        </button>

        <Field
          id='1'
          type='text'
          name='searchQuery'
          // autocomplete='off'
          // autofocus
          // placeholder='Search images and photos'
        />
      </Form>
    </Formik>
  );
};

export default SearchForm;
