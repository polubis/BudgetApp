
module.exports = handleValidation = (entity) => new Promise((resolve, reject) => {
    entity.validate(err => {
    if (err) {
      const errors = Object.values(err.errors).map(({message}) => message);
      reject(errors[0]);
    }
    else 
      resolve();
  })
});
