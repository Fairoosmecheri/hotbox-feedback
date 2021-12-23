var express = require("express");
var router = express.Router();
var responseModel = require("../models/response");

router.get("/", async (req, res) => {
  res.render("user/feedback");
});

router.post("/submit-feedback", async (req, res) => {
  await responseModel.create({
    quality: req.body.quality,
    consistency: req.body.consistency,
    taste: req.body.taste,
    service: req.body.service,
    orderAgain: req.body.orderAgain,
    name: req.body.name,
    phone: req.body.phone,
    feedback: req.body.feedback,
  });
  res.send();
});

module.exports = router;
