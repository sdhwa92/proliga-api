'use strict';

class PlayerService {
  /**
   * The constructor method initialise all the dependencies passed to it from your dependency
   * injection file when creating the object.
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
   * The createPlayer method fetches the club that made the request,
   * then saves the username with the firstname, lastname and birthdate
   * and returns the result to the Player controller completing the request.
   *
   * @param clubname
   * @param body
   * @return {Promise<*>}
   */
  async createPlayer(clubname, body) {
    const Clubs = this.mongoose.model('Clubs');
    const club = await Clubs.findOne({clubname});
    const {username, firstname, lastname, birthdate} = body;

    if (!club) {
      const err = new this.errs.NotFoundError(
        `Club with clubname - ${clubname} does not exists`
      );
      return err;
    }

    club.players.push({
      username,
      firstname,
      lastname,
      birthdate: this.formatBirthdate(birthdate)
    });

    return club.save();
  }

  formatBirthdate(date) {
    return new Date(date);
  }

  /**
   * The getPlayers method gets all the players of the club that made the request and
   * returns the result to the Player controller.
   *
   * @param clubname
   * @return {Promise<*>}
   */
  async getPlayers(clubname) {
    const Clubs = this.mongoose.model('Clubs');
    const club = await Clubs.findOne({clubname});

    if (!club) {
      const err = new this.errs.NotFoundError(
        `Club with clubname - ${clubname} does not exists`
      );
      return err;
    }

    return club.players;
  }
}

module.exports = PlayerService;