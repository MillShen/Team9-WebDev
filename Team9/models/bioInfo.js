'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var bioInfoSchema = Schema( {
  name: String,
  app_name: String,
  about: String,
  address: String,
  x: Number,
  y: Number
});

module.exports = mongoose.model( 'BioInfo', bioInfoSchema );
