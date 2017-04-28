myApp.controller('synopsysController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', function($scope, rParams, $location, $controller, jobFactory){
  $scope.jobs = [];
  $scope.jobs2 = [];
  var unique = {}
  var index = function () {

    jobFactory.index("Synopsys", function(data){
      $scope.jobs = data.data.result;

      for (var i = 0; i < $scope.jobs.length; i++){
        unique[$scope.jobs[i].title] = $scope.jobs[i]
      }
      for (var key in unique){
        $scope.jobs2.push(unique[key])

      }
      console.log(unique)
      console.log($scope.jobs2)
    })
  }

  index();


}])
