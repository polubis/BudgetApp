const extractErrors = (errors) => Object.values(errors).map(({message}) => message).join('|');

module.exports = handleValidation = (entity) => new Promise((resolve, reject) => {
    entity.validate(err => {
    if (err) {
      reject(extractErrors(err.errors));
    }
    else 
      resolve();
  })
});
