'use strict';

const joi = require('joi');

module.exports = {
  clubname: joi.string().alphanum().min(4).max(30).required()
};