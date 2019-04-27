'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('logger', () => {
  return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('httpStatus', () => {
  return require('http-status');
});

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register('errs', () => {
  return require('restify-errors');
});

serviceLocator.register('playerService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const PlayerService = require('../services/player');

  return new PlayerService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('clubService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const ClubService = require('../services/club');

  return new ClubService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('playerController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const playerService = serviceLocator.get('playerService');
  const PlayerController = require('../controllers/player');

  return new PlayerController(log, playerService, httpStatus);
});

serviceLocator.register('clubController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const clubService = serviceLocator.get('clubService');
  const ClubController = require('../controllers/club');

  return new ClubController(log, clubService, httpStatus);
});

module.exports = serviceLocator;