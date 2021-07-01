const express = require('express');
const router = express.Router();
const BioInfo = require('../models/bioInfo')

router.get("/miranda", async (req, res, next) => {
  res.locals.bios = await BioInfo.findOne({name: "Miranda Sullivan"});
  res.render('biotemplate');
})

router.get("/steven", async (req, res, next) => {
  res.locals.bios = await BioInfo.findOne({name: "Steven Hightower"});
  res.render('biotemplate');
})

router.get("/adharsh", async (req, res, next) => {
  res.locals.bios = await BioInfo.findOne({name: "Adharsh Ravi"});
  res.render('biotemplate');
})

router.get("/matt", async (req, res, next) => {
  res.locals.bios = await BioInfo.findOne({name: "Matthew Merovitz"});
  res.render('biotemplate');
})

router.get("/millan", async (req, res, next) => {
  res.locals.bios = await BioInfo.findOne({name: "Millan Shenoy"});
  res.render('biotemplate');
})

module.exports = router;
