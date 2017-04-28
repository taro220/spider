var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var cheerio = require('cheerio');
var request = require('request');

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
  return json;
  })
}

module.exports = {
  scrapeSynopsys: function(req, res) {
    var jobs = []
    request("https://sjobs.brassring.com/TGWebHost/home.aspx?partnerid=25235&siteid=5359", function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);
      var $ = cheerio.load(body);
      var count = 0;
      $('#tblTabFJob').each(function( index ) {
        var json = { title : "", location: "", LastUpdated: ""};
        $(this).find('input').each(function( index ) {
            count ++;
        if (count == 2) {
            var title = $(this).attr('value');
            var j = JSON.parse("[" + title+ "]");
            for (var i=0; i < 5; i++){
                var jobtitle = j[0][i].JobTitle;
                var joblocation = j[0][i].FORMTEXT1;
                var jobdate = j[0][i].LastUpdated;
                var start = jobtitle.indexOf('<strong>') + 8;
                var end = jobtitle.indexOf('</strong>');
                var title = jobtitle.slice(start, end);
                json.title = title;
                json.location = joblocation;
                json.LastUpdated = jobdate;

                var start = jobtitle.indexOf('href=') + 5;
                var end = jobtitle.indexOf(' tabindex') - 1;
                json.url = 'https://sjobs.brassring.com/TGWebHost/' + jobtitle.slice(start,end);

                jobs.push(json)
                Job.create({company: "Synopsys", title: title, url: json.url, location: joblocation, last_updated:jobdate }, function(err,result){
                  console.log(result)
                  if(err){
                    jobs.push("error")
                  } else {
                    jobs.push(result)
                  }
                })

            }
          }
        })
      });
      res.json({msg: "success", request: jobs})
    });
  },


  showSynopsys: function(req,res){

      Job.find({company: "Synopsys"}, function(err,result){
        if(err){
          res.json({msg: "error"})
        } else {
        res.json({msg: "success", result: result})
      }
      })




  },

  // scrapeFacebook: function(req,res){
  //
  //
  //
  //   request("http://www.facebook.jobs/california/usa/jobs/", function(error, response, body) {
  //     if(error) {
  //       console.log("Error: " + error);
  //     }
  //     // console.log("Status code: " + response.statusCode);
  //     var $ = cheerio.load(body);
  //     $('h4').each(function( index ) {
  //       var json = { title : "", link: "", require: ""};
  //       var title = $(this).text()
  //       var link = 'http://www.facebook.jobs' + $(this).find('a').attr('href');
  //       Job.create({company: "Facebook", title: title, url: link, location: "Menlo Park, CA"}, function(err,result){
  //         console.log(result)
  //       })
  //       // linkrun(link, json, title);
  //     });
  //   });
  // },

  forceFeedFacebook: function(req,res){

    var facebookData = [

    { title: 'Manager, Hardware Technical Program Management',
      link: 'http://www.facebook.jobs/menlo-park-ca/manager-hardware-technical-program-management/296C19FF04F440D780653CEA55F71949/job/',
      requirement: 'BS in Electrical Engineering, Computer Engineering, or Mechanical Engineering or equivalent experience. '+
      'At least 3 years experience as a program manager working across all of the following areas: electrical, mechanical and software for a consumer electronic device company. '+
      'At least 2 years of experience managing a team of program managers. '+
      'Experience manufacturing methods and processes. '+
      'Experience with project and issue tracking and version control software. '+
      'Experience operating autonomously across multiple teamsUp to 20% travel (10% international, 10% domestic).'
       },

    { title: 'Partner Engineer, Media Products',
      link: 'http://www.facebook.jobs/menlo-park-ca/partner-engineer-media-products/3864AD9CD92B476EA627C9C7602A7C14/job/',
      requirement: 'Knowledge of JavaScript.Knowledge of web technologies (HTML/CSS). '+
      'Familiarity with one or more of the following: PHP, React. '+
      'Ability to write high-performance, reusable code for UI components. '+
      'Experience with performance debugging and benchmarking. '+
      '1+ years of experience building web applications. '+
      'BS or MS degree in Computer Science or a related technical field.'
      },

    { title: 'Strategic Sourcing Manager, Global Marketing Solutions',
      link: 'http://www.facebook.jobs/menlo-park-ca/strategic-sourcing-manager-global-marketing-solutions/5F2BA9307A56426C950CEE1F0902C95E/job/',
      requirement: '8+ years of experience in procurement, sourcing or contracting. '+
      'Proven track record of implementing strategic sourcing and process improvement initiatives. '+
      'Proven track record in fact-based negotiations or equivalent contract analysis experience. '+
      'Experience in handling a variety of marketing related agreements specifically Market Research & Professional Services. '+
      'Ability to prioritize and manage high volume workload. '+
      'Knowledgeable in working with tools including Word, Excel, ERP systems, and contract management tools. '+
      'Ability to thrive in an environment of fast growth and ambiguity.'
      },

    { title: 'University Recruiting Specialist, Recruiting',
      link: 'http://www.facebook.jobs/menlo-park-ca/university-recruiting-specialist-recruiting/970A8A123B38406FA7C1B186A7CC2BD7/job/',
      requirement: '2+ years’ experience in recruitment operations, business intelligence, and/or project management. '+
      '1+ years reporting and analytics experience'
       },

    { title: 'Product Marketing Manager, News Feed',
      link: 'http://www.facebook.jobs/menlo-park-ca/product-marketing-manager-news-feed/23F5A3EC1159430199201B99CD380EA4/job/',
      requirement: '8+ years of experience in Product or Brand Marketing, Public Affairs or Public Policy, or Policy or Crisis Communications. '+
      'Marketing experience working across privacy sensitive/trust issues and products and/or experience working on security and safety. '+
      'Consumer product marketing experience. '+
      'Experience in the Internet and/or technology industry. '+
      'Copywriting skills. '+
      'Experience communicating to internal and external audiences. '+
      'Analytical and problem-solving skills.Experience working with cross-functional teams. '+
      'Project Management skills.'
      },

    { title: 'Director of Software Engineering, Commercial Messaging(WhatsApp)',
      link: 'http://www.facebook.jobs/menlo-park-ca/director-of-software-engineering-commercial-messagingwhatsapp/BEBB0799D2EB409BAA0A22C606656354/job/',
      requirement: 'Ability to be highly technical, hands-on and an effective people manager for technical teams' +
      'Experience leading, technically-challenging, cross-functional infrastructure projects from conception to end '+
      'Familiarity with Unix internals (especially FreeBSD and Linux). '+
      'Familiarity with multi-node cluster handling live traffic.' +
      'Knowledge of TCP/IP, experience with network programmingExperience building and scaling distributed, highly available systems.' +
      '10+ years of relevant work experience in software engineering, including 5+ years of proven hands-on technical management experience of software engineers. ' +
      'BS / MS in Computer Science (In lieu of degree, relevant work experience)'
      },

    { title: 'Edge Network Data Analyst',
      link: 'http://www.facebook.jobs/menlo-park-ca/edge-network-data-analyst/D8E423DFEE3F405F8A4F580939D30FCB/job/',
      requirement: 'Knowledge of network infrastructure and web technologies.' +
      'Demonstrated problem solving ability with experience providing practical business insights from  data sets. ' +
      'Able to communicate with multiple internal customers to collect relevant data and produce comprehensive analyses. ' +
      '2+ years of SQL experience.1+ years of coding such as PHP, C, R, Python, etc.Degree in an analytical field (e.g. Computer Science, Engineering, Mathematics, Statistics, Operations Research, Management Science). ' +
      '2 plus years of industry or graduate work experience'
      },

    { title: 'Business Operations Associate, Games',
      link: 'http://www.facebook.jobs/menlo-park-ca/business-operations-associate-games/6F388EE9DA59423D9F571B853C52DF45/job/',
      requirement: 'BS or MS in business-related or quantitative field (Economics, Math, Statistics, Engineering, or similar discipline). ' +
      '3+ years of experience in business strategy, finance, analytics, or planning. ' +
      'SQL skills. ' +
      'Ability to problem-solve individually or in a group setting. ' +
      'Microsoft Excel and PowerPoint experience. ' +
      'Analytical skills'
    },

    { title: 'Commercial Sourcing Manager, DRAM',
      link: 'http://www.facebook.jobs/menlo-park-ca/commercial-sourcing-manager-dram/8B2E832D568144E8B9CA5B32CB57D97C/job/',
      requirement: 'BA/BS or equivalent in technical or business related field. ' +
      '10+ years’ experience Sourcing Management or Supply Chain Management experience in commercial sourcing in silicon and market-based commodity products.' +
      'Analytical skills and the demonstrated ability to influence and guide teams to deliver results. '+
      'Demonstrated results of improving supply chain and supplier performance, including the use of cost models and objective based performance measures in the semiconductor/memory commodity. ' +
      'Demonstrated success in contracts and contract negotiations, and contract strategy development and execution, within the memory commodity space.'
    },

    { title: 'Commercial Spam Specialist, Community Operations',
      link: 'http://www.facebook.jobs/menlo-park-ca/commercial-spam-specialist-community-operations/0502C91F803849429B6CE5F03D7D1894/job/',
      requirement: 'BA/BS degree1+ year(s) of work experience in role involving strategic/analytical initiatives (operations, project management, consulting experience, data analysis or technical systems). ' +
      'Ability to communicate with a variety of audiences'

      }
]

var jobs = []
for(var i = 0; i < facebookData.length; i++){

  Job.create({company: "Facebook", title: facebookData[i].title, url: facebookData[i].link, location: "Menlo Park, CA", requirement: facebookData[i].requirement }, function(err,result){
    console.log(result)
    if(err){
      jobs.push("error")
    } else {
      jobs.push(result)
    }
  })
}

// res.json({msg: 'success', result: jobs});


  },


  showFacebook: function(req, res){

    Job.find({company: "Facebook"}, function(err,result){
      if(err){
        res.json({msg: "error"})
      } else {
      res.json({msg: "success", result: result})
    }
    })




  },

  showFacebookReq: function(req, res){

    Job.findOne({_id: req.params.id}, function(err,data){
      console.log(data);
      if(err){
        res.json({msg: "error"})
      } else {
        res.json({msg: "success", result: data})
      }
    })
  }


  // scrapeApple: function( function(req, res){
  //
  //   request('https://jobs.apple.com/us/search?#&t=0&sb=req_open_dt&so=1&lo=0', function(error, response, html){
  //     if(!error){
  //       var $ = cheerio.load(html);
  //
  //       var title, release, rating;
  //       var json = { title : "", release : "", rating : ""};
  //       console.log($('#title'));
  //       $('#resultswrap rounded').filter(function(){
  //         var data = $(this);
  //         // title = data.children().first().text();
  //         // release = data.children().last().children().text();
  //         //
  //         // json.title = title;
  //         // json.release = release;
  //       })
  //
  //       $('.star-box-giga-star').filter(function(){
  //         var data = $(this);
  //         // rating = data.text();
  //         //
  //         // json.rating = rating;
  //       })
  //     }
  //
  //   }) ;
  // }),
}
