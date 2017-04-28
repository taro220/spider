myApp.controller('facebookReqController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', function($scope, rParams, $location, $controller, jobFactory){
  $scope.job = {};

  var index = function () {

    jobFactory.getReq(rParams.id, function(data){
      $scope.job = data.data.result;
      console.log('controller says', data)
    })
  }

  index();


}])
