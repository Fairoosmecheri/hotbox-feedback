var express = require("express");
var router = express.Router();
var responseModel = require("../models/response");

const verifyLogin = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};
router.get("/login", (req, res) => {
  res.render("admin/login", { admin: true });
});

router.post("/login", (req, res) => {
  if (req.body.Email === "admin@gmail.com" && req.body.Password == "admin") {
    req.session.admin = req.body.Email;
    req.session.adminLoggedIn = true;
    res.redirect("/admin/");
  } else {
    res.render("admin/login", { admin: true, loginErr: true });
  }
});

router.get("/logout", async (req, res) => {
  
  
  req.session.admin = null;
  res.redirect("/admin");
});

router.get("/", verifyLogin, async (req, res) => {

  var percentage = {}
  
  var qualityGood = await responseModel.countDocuments({quality: 'good'})
  var qualityBad = await responseModel.countDocuments({quality: 'bad'})
  var qualityPoor = await responseModel.countDocuments({quality: 'poor'})
  var qualityAverage = await responseModel.countDocuments({quality: 'average'})
  var qualityExcellent = await responseModel.countDocuments({quality: 'excellent'})
  var consistencyGood = await responseModel.countDocuments({consistency: 'good'})
  var consistencyBad = await responseModel.countDocuments({consistency: 'bad'})
  var consistencyPoor = await responseModel.countDocuments({consistency: 'poor'})
  var consistencyAverage = await responseModel.countDocuments({consistency: 'average'})
  var consistencyExcellent = await responseModel.countDocuments({consistency: 'excellent'})
  var tasteGood = await responseModel.countDocuments({taste: 'good'})
  var tasteBad = await responseModel.countDocuments({taste: 'bad'})
  var tastePoor = await responseModel.countDocuments({taste: 'poor'})
  var tasteAverage = await responseModel.countDocuments({taste: 'average'})
  var tasteExcellent = await responseModel.countDocuments({taste: 'excellent'})
  var serviceGood = await responseModel.countDocuments({service: 'good'})
  var serviceBad = await responseModel.countDocuments({service: 'bad'})
  var servicePoor = await responseModel.countDocuments({service: 'poor'})
  var serviceAverage = await responseModel.countDocuments({service: 'average'})
  var serviceExcellent = await responseModel.countDocuments({service: 'excellent'})
  var orderAgainYes = await responseModel.countDocuments({orderAgain: 'yes'})
  var orderAgainNo = await responseModel.countDocuments({orderAgain: 'no'})
  var qualitySum = qualityGood + qualityBad + qualityPoor + qualityAverage + qualityExcellent
  var consistencySum = consistencyGood + consistencyBad + consistencyPoor + consistencyAverage + consistencyExcellent
  var tasteSum = tasteGood + tasteBad + tastePoor + tasteAverage + tasteExcellent
  var serviceSum = serviceGood + serviceBad + servicePoor + serviceAverage + serviceExcellent
  var orderAgainSum = orderAgainNo + orderAgainYes

  percentage.qualityGood = ( qualityGood / qualitySum ) * 100  
  percentage.qualityBad = ( qualityBad / qualitySum ) * 100 
  percentage.qualityPoor = ( qualityPoor / qualitySum ) * 100 
  percentage.qualityAverage = ( qualityAverage / qualitySum ) * 100 
  percentage.qualityExcellent = ( qualityExcellent / qualitySum ) * 100 

  percentage.tasteGood = ( tasteGood / tasteSum ) * 100 
  percentage.tasteBad = ( tasteBad / tasteSum ) * 100 
  percentage.tastePoor = ( tastePoor / tasteSum ) * 100 
  percentage.tasteAverage = ( tasteAverage / tasteSum ) * 100 
  percentage.tasteExcellent = ( tasteExcellent / tasteSum ) * 100 

  percentage.consistencyGood = ( consistencyGood / consistencySum ) * 100 
  percentage.consistencyBad = ( consistencyBad / consistencySum ) * 100 
  percentage.consistencyPoor = ( consistencyPoor / consistencySum ) * 100 
  percentage.consistencyAverage = ( consistencyAverage / consistencySum ) * 100 
  percentage.consistencyExcellent = ( consistencyExcellent / consistencySum ) * 100 

  percentage.serviceGood = ( serviceGood / serviceSum ) * 100 
  percentage.serviceBad = ( serviceBad / serviceSum ) * 100 
  percentage.servicePoor = ( servicePoor / serviceSum ) * 100 
  percentage.serviceAverage = ( serviceAverage / serviceSum ) * 100 
  percentage.serviceExcellent = ( serviceExcellent / serviceSum ) * 100 
  
  percentage.orderAgainNo = ( orderAgainNo / orderAgainSum ) * 100 
  percentage.orderAgainYes = ( orderAgainYes / orderAgainSum ) * 100 


  console.log(percentage)
  
  
  res.render("admin/dashboard", {
    admin: true,
    adminLoggedIn: req.session.adminLoggedIn,
    percentage
  });
});

router.get('/feedback', verifyLogin,async (req, res) => {
  
  var feedbacks = await responseModel.find()
  res.render('admin/feedback', {
    admin: true,
    adminLoggedIn: req.session.adminLoggedIn,
    feedbacks

  })
})
module.exports = router;
