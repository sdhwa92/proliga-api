'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
  clubname: joi.string().alphanum().min(4).max(15).required(),
  teamname: joi.string().required(),
  foundeddate: joi.date().required()
}).required();