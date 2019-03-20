const FormatError = require('easygraphql-format-error');

const authDefinitions = require('./definitions/auth');

const prepareErrorsDefinition = (errorsObject) => {
  const errorsDefinition = [];
  Object.keys(errorsObject).forEach(key => {
    errorsDefinition.push({
      name: key,
      message: errorsObject[key],
      statusCode: 400
    });
  })
  return errorsDefinition;
}

module.exports = new FormatError(prepareErrorsDefinition({
  ...authDefinitions
}));


