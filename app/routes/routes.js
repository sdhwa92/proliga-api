'use strict';

module.exports.register = (server, serviceLocator) => {

  server.post(
    {
      path: '/clubs',
      name: 'Create Club',
      version: '1.0.0',
      validation: {
        body: require('../validations/create_club')
      }
    },
    (req, res, next) => {
      serviceLocator.get('clubController').create(req, res, next);
    }
  );

  server.get(
    {
      path: '/clubs/:clubname',
      name: 'Get Club',
      version: '1.0.0',
      validation: {
        params: require('../validations/get_player-club')
      }
    },
    (req, res, next) => {
      serviceLocator.get('clubController').get(req, res, next);
    }
  );

  server.get(
    {
      path: '/clubs',
      name: 'Get  All Club',
      version: '1.0.0',
    },
    (req, res, next) => {
      serviceLocator.get('clubController').getAll(req, res, next);
    }
  );

  server.get(
    {
      path: '/players/:clubname',
      name: 'Get Player',
      version: '1.0.0',
      validation: {
        params: require('../validations/get_player-club')
      }
    },
    (req, res, next) => {
      serviceLocator.get('playerController').listAll(req, res, next);
    }
  );

  server.post(
    {
      path: '/players/:clubname',
      name: 'Create Player',
      version: '1.0.0',
      validation: {
        body: require('../validations/create_player')
      }
    },
    (req, res, next) => {
      serviceLocator.get('playerController').create(req, res, next);
    }
  );
};
