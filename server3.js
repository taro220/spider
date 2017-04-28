var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app  = express();
var jquery = require('jquery');
var bodyparser = require('body-parser');
app.use( bodyparser.json() );
var path = require('path');
var root = __dirname;
var port = process.env.PORT || 8000;
var fs = require('fs');

var symantec = [];


function linkrun(link, json, title){
request(link, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  var $ = cheerio.load(body);
  var text = $('p').text();
  var start = text.indexOf('Minimum Qualifications') + 22;
  var end = text.indexOf('Preferred Qualifications');
  var slice = text.slice(start, end);
  json.require = slice;
  json.title = title;
  json.link = link;
  console.log(json)
  })
}

request("http://www.facebook.jobs/california/usa/jobs/", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  var $ = cheerio.load(body);
  $('h4').each(function( index ) {
    var json = { title : "", link: "", require: ""};
    var title = $(this).text()
    var link = 'http://www.facebook.jobs' + $(this).find('a').attr('href');
    linkrun(link, json, title);
  });
});

// request("https://sjobs.brassring.com/TGWebHost/home.aspx?partnerid=25235&siteid=5359", function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//   var $ = cheerio.load(body);
//   var count = 0;
//   $('#tblTabFJob').each(function( index ) {
//     var json = { title : "", location: "", LastUpdated: ""};
//     $(this).find('input').each(function( index ) {
//         count ++;
//     if (count == 2) {
//         var title = $(this).attr('value');
//         var j = JSON.parse("[" + title+ "]");
//         for (var i=0; i < 5; i++){
//             var jobtitle = j[0][i].JobTitle;
//             var joblocation = j[0][i].FORMTEXT1;
//             var jobdate = j[0][i].LastUpdated;
//             var start = jobtitle.indexOf('<strong>') + 8;
//             var end = jobtitle.indexOf('</strong>');
//             var title = jobtitle.slice(start, end);
//             json.title = title;
//             json.location = joblocation;
//             json.LastUpdated = jobdate;
//             fs.appendFileSync('synopsisjobs.txt', title + '\n' + joblocation + '\n' + jobdate);
//         }
//       }
//     })
//   });
// });


// request("http://www.nasdaq.com/symbol/aapl/real-time", function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//   var $ = cheerio.load(body);
//   $('div#qwidget_lastsale').each(function( index ) {
//     var json = { price : ""};
//     var price = $(this).text()
//     json.price = price;
//     console.log(json)
//     // fs.appendFileSync('apple.txt', title + '\n' + link);
//   });
//
// });


// request("https://www.apple.com/newsroom/", function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//   var $ = cheerio.load(body);
//   $('div.tile-content a').each(function( index ) {
//     var json = { title : "", link : ""};
//     var link = $(this).attr('href')
//     json.link = link;
//     var title = $(this).find('p').text()
//     json.title = title;
//     if(title !== ""){
//         console.log(json);
//     }
//     fs.appendFileSync('apple.txt', title + '\n' + link);
//   });
//
// });

// request("https://blog.google", function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//   var $ = cheerio.load(body);
//   // console.log("Page title:  " + $('p').text().trim());
//
//   $('div.uni-top-stories-content a').each(function( index ) {
//     var json = { title : "", link : ""};
//     var link = $(this).attr('href')
//     json.link = link;
//     var title = $(this).find('h2').text()
//     if (title == "") {
//         var title = $(this).find('h1').text()
//     }
//     json.title = title;
//
//     console.log(json);
//     fs.appendFileSync('google.txt', title + '\n' + link);
//   });
//
// });

// request("https://www.symantec.com/about/newsroom", function(error, response, body) {
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: " + response.statusCode);
//   var $ = cheerio.load(body);
//   // console.log("Page title:  " + $('p').text().trim());
//   // https://blog.google
//   // https://www.symantec.com/about/newsroom
//   // https://www.apple.com/newsroom/
//
//   $('div.content-col').each(function( index ) {
//     var json = { title : "", link : ""};
//     var title = $(this).find('h3').text().trim();
//     json.title = title;
//     var link = $(this).find('a').attr('href');
//     if (link == undefined){
//         $(this).find('a').each(function( index ) {
//             link = $(this).attr('href')
//         })
//     }
//     json.link = link;
//     // symantec.push(json);
//     fs.appendFileSync('symantec.txt', title + '\n' + link);
//   });
//
// });

// app.get('/scrape', function(req, res){
//
// url = 'https://jobs.apple.com/us/search?#&t=0&sb=req_open_dt&so=1&lo=0';
//
// request(url, function(error, response, html){
//     if(!error){
//         var $ = cheerio.load(html);
//
//     var title, release, rating;
//     var json = { title : "", release : "", rating : ""};
//     console.log($('#title'));
//     $('#resultswrap rounded').filter(function(){
//         var data = $(this);
//         // title = data.children().first().text();
//         // release = data.children().last().children().text();
//         //
//         // json.title = title;
//         // json.release = release;
//     })
//
//     $('.star-box-giga-star').filter(function(){
//         var data = $(this);
//         // rating = data.text();
//         //
//         // json.rating = rating;
//     })
// }
//
// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//     console.log('File successfully written! - Check your project directory for the output.json file');
// })
//
// // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
// res.send('Check your console!')
//     }) ;
// })

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
// var routesetter = require('./server/config/routes.js')(app);
app.listen( port, function() {
console.log( `server running on port ${ port }` );
});
