'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const playersSchema = new mongoose.Schema({
  username: {
    type: String,
    trime: true,
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  }
});

const clubSchema = new mongoose.Schema({
  clubname: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  teamname: {
    type: String,
    required: true
  },
  foundeddate: {
    type: Date,
    required: true
  },
  players: [playersSchema],
  won: {
    type: Number
  },
  drawn: {
    type: Number
  },
  lost: {
    type: Number
  },
  gf: {
    type: Number
  },
  ga: {
    type: Number
  },
  gd: {
    type: Number
  },
  league: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Clubs', clubSchema);