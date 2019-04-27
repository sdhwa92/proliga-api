'use strict';

const serviceLocator = require('../lib/service_locator');

class PlayerController {
  constructor(log, playerService, httpStatus) {
    this.log = log;
    this.playerService = playerService;
    this.httpStatus = httpStatus;
  }

  async create(req, res) {
    try {
      const {body} = req;
      const {clubname} = req.params;
      const result = await this.playerService.createPlayer(clubname, body);
      if (result instanceof Error)
        res.send(result);
      else res.send(`${body.username}'s club saved successfully!`);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async listAll(req, res) {
    try {
      const {clubname} = req.params;
      const result = await this.playerService.getPlayers(clubname);
      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }
}

module.exports = PlayerController;