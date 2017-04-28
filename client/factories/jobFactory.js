myApp.factory('jobFactory', function($http){
  var jobs = []
  var factory = {};


  factory.index = function(company, callback){
    console.log(`/jobs/${company}`)

  $http.get(`/jobs/${company}`).then(function(data){
    callback(data);
  })
  }

  factory.getReq = function(id, callback){
    console.log(id)
  $http.get(`/jobs/facebook/${id}`).then(function(data){

    callback(data);
  })
  }



  // factory.create = function(new_customer, callback){
  //   console.log('factory says hi ', new_customer)
  //   $http.post('/customers', {name : new_customer}).then(function(data){
  //     if(data.data.msg == 'error'){
  //       console.log("error in creating")
  //     } else {
  //       console.log(data.data);
  //       callback();
  //
  //     }
  //   })
  //
  // }



  return factory;
});
