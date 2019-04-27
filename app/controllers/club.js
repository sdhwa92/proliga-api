'use strict';

class ClubController {
  constructor(log, clubService, httpStatus) {
    this.log = log;
    this.clubService = clubService;
    this.httpStatus = httpStatus;
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.clubService.createClub(body);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async get(req, res) {
    try {
      const { clubname } = req.params;
      const result = await this.clubService.getClub(clubname);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.clubService.getAllClubs();

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }
}

module.exports = ClubController;
