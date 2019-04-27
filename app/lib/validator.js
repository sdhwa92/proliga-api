'use strict';

let httpStatus = require('http-status');
let errors = require('restify-errors');

module.exports.paramValidation = function (log, joi) {

  /**
   * Firstly, the function retrieves the validation property defined in the route spec.
   * Then, you proceed to check if the request object contains a valid property(key e.g. body, query or params).
   * If it does, you validate the value obtained from the request object with the predefined set of rules (schema) for the request path.
   * If the input is invalid, the result will be an Error object.
   */
  return function (req, res, next) {

    // always allow validation to allow unknown fields by default.
    let options = {
      allowUnknown: true
    };

    let validation = req.route.spec.validation; // validation object in route
    if (!validation) {
      return next(); // skip validation if not set
    }

    let validProperties = ['body', 'query', 'params'];

    for (let i in validation) {
      if (validProperties.indexOf(i) < 0) {
        log.debug('Route contains unsupported validation key');
        throw new Error('An unsupported validation key was set in route');
      } else {
        if (req[i] === undefined) {
          log.debug('Empty request ' + i + ' was sent');

          res.send(
            httpStatus.BAD_REQUEST,
            new errors.InvalidArgumentError('Missing request ' + i)
          );
          return;

        }

        let result = joi.validate(req[i], validation[i], options);

        if (result.error) {
          log.debug('validation error - %s', result.error.message);

          res.send(
            httpStatus.BAD_REQUEST,
            new errors.InvalidArgumentError(
              'Invalid request ' + i + ' - ' + result.error.details[0].message
            )
          );
          return;

        } else {
          log.info('successfully validated request parameters');
        }
      }
    }

    next();
  };
};