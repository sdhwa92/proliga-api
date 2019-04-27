'use strict';

class ClubService {
  /**
   * The constructor initialises all the dependencies passed to it from your dependency injection file when creating the object.
   *
   * @param log
   * @param mongoose
   * @param httpStatus
   * @param errs
   */
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  /**
   * The createClub method checks if the club with the clubname in the request body exists
   * then throws an error that 'Club with clubname already exists' already exists.\
   * Otherwise, it proceeds to save the club and returns the result to the controller.
   *
   * @param body
   * @return {Promise<*>}
   */
  async createClub(body) {
    const Clubs = this.mongoose.model('Clubs');
    const {clubname} = body;
    const club = await Clubs.findOne({clubname});

    if (club) {
      const err = new this.errs.InvalidArgument('Club with clubname already exists');
      return err;
    }

    let newClub = new Clubs(body);
    newClub.foundeddate = new Date(body.foundeddate);
    newClub = await newClub.save();

    this.log.info('Club Created Successfully');
    return newClub;
  }

  /**
   * The getClub method fetches the club that matches the clubname provided and returns the result to the controller.
   *
   * @param clubname
   * @return {Promise<*|NotFoundError>}
   */
  async getClub(clubname) {
    const Clubs = this.mongoose.model('Clubs');
    const club = await Clubs.findOne({clubname});

    if (!club) {
      const err = new this.errs.NotFoundError(
        `Club with clubname - ${clubname} does not exists`
      );
      return err;
    }

    this.log.info('Club fetched Successfully');
    return club;
  }

  /**
   * The getAllClubs method fetches the all clubs and returns the result to the controller.
   *
   * @return {Promise<*>}
   */
  async getAllClubs() {
    const Clubs = this.mongoose.model('Clubs');
    const clubs = await Clubs.find({});

    if (!clubs) {
      const err = new this.errs.NotFoundError(
        `Clubs are not existing.`
      );
      return err;
    }

    this.log.info('Club fetched Successfully');
    return clubs;
  }
}

module.exports = ClubService;
