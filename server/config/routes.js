var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var jobs = require('../controllers/jobs.js');

var News = mongoose.model('News');
var news = require('../controllers/news.js');


module.exports = function(app){
//Product Routes

  app.get('/', function (req, res){
    res.sendFile('index.html', {root: __dirname + './../../client'});
  })

  app.get('/scrape/synopsys', function(req, res){
    // console.log('getting all jobs from facebook');
    jobs.scrapeSynopsys(req,res);
  })

  app.get('/jobs/synopsys', function(req,res){
    jobs.showSynopsys(req,res);
  })


  app.get('/scrape/facebook', function(req, res){
    // console.log('getting all jobs from facebook');
    jobs.scrapeFacebook(req,res);
  })

  app.get('/jobs/facebook', function(req,res){
    jobs.showFacebook(req,res);
  })

  app.get('/jobs/facebook/:id', function(req,res){
    jobs.showFacebookReq(req,res);
    console.log(req.params.id)
  })

  app.get('/scrape/news/apple', function(req, res){
    // console.log('getting all jobs from facebook');
    news.scrapeApple(req,res);
  })

  app.get('/news/apple', function(req, res){
    // console.log('getting all jobs from facebook');
    news.showApple(req,res);
  })

  app.get('/scrape/news/google', function(req, res){
    // console.log('getting all jobs from facebook');
    news.scrapeGoogle(req,res);
  })
  app.get('/news/google', function(req, res){
    // console.log('getting all jobs from facebook');
    news.showGoogle(req,res);
  })

  app.get('/feedme', function(req,res){
    jobs.forceFeedFacebook(req,res);
  })



}
