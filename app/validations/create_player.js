'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
  username: joi.string().min(5).max(60).required(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  birthdate: joi.date()
}).required();