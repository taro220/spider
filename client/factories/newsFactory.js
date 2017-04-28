myApp.factory('newsFactory', function($http){
  var news = []
  var factory = {};


  factory.index = function(company, callback){
    // console.log(`/news/${company}`)

  $http.get(`/news/${company}`).then(function(data){
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
