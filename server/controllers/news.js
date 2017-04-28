var mongoose = require('mongoose');
var News = mongoose.model('News');
var cheerio = require('cheerio');
var request = require('request');

module.exports = {

  scrapeApple: function(req,res){
    request("https://www.apple.com/newsroom/", function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);
      var $ = cheerio.load(body);
      $('div.tile-content a').each(function( index ) {
        var json = { title : "", link : "", date: ""};
        var link = "http://www.apple.com" + $(this).attr('href')
        json.link = link;
        var date = $(this).find('.category-eyebrow__date').text();
        // console.log($(this).find('.category-eyebrow__date').text())
        json.date = date;
        var title = $(this).find('p').text()
        json.title = title;
        if(title !== ""){
            console.log(json);
            News.create({company: "Apple", title: title, url: link, date:date}, function(err, result){
              // console.log(result);
            })
        }

        // fs.appendFileSync('apple.txt', title + '\n' + link);
      });
      // console.log(news)
    });

  },

  showApple: function(req, res){

    News.find({company: "Apple"}, function(err,result){
      if(err){
        res.json({msg: "error"})
      } else {
        res.json({msg: "success", result: result})
      }
    })
  },

  scrapeGoogle: function (req, res){
  request("https://blog.google", function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);
    var $ = cheerio.load(body);
    // console.log("Page title:  " + $('p').text().trim());

    $('div.uni-top-stories-content a').each(function( index ) {
      var json = { title : "", link : ""};
      var link = 'https://blog.google' + $(this).attr('href')
      var title = $(this).find('h2').text()
      var date = $(this).find('.uni-article-item-header').find('time').attr('datetime');
      if (title == "") {
          title = $(this).find('h1').text()
      }
      console.log(link, title, date);
      News.create({company: "Google", title: title, url: link, date: date}, function(err, result){
        console.log(err);
      })

    });

  });

},

showGoogle: function(req,res){
  News.find({company: "Google"}, function(err, result){
    if(err){
      res.json({msg: "error"})
    } else {
      res.json({msg: "sucess", result: result})
    }
  })
}


}
