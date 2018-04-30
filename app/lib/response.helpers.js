const response = {
  error: (err) => {
    if (!err) {
    // eslint-disable-next-line no-console
      err = new Error('Unknown error');
    }
    const formatted = {
      message: err.message,
    };

    if (err.errors) {
      formatted.errors = {};
      const errors = err.errors;
      Object.keys(errors).forEach((type) => {
        if (errors.hasOwnProperty(type)) {
          formatted.errors[type] = errors[type].message;
        }
      });
    }
    return { status: 'error', error: formatted };
  }, 

  success: (data) => {
    return { status: 'success', data: data };
  }
}

export default response;
