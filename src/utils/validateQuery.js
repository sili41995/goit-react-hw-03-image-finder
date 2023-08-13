function validateQuery(value) {
  let error;
  if (!value.trim()) {
    error = 'Please, enter search query!';
  }
  return error;
}

export default validateQuery;
