myApp.controller('appleController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', 'newsFactory', function($scope, rParams, $location, $controller, jobFactory, newsFactory){
  $scope.news = [];

  $scope.news = [];
  $scope.news2 = [];
  var unique = {}
  var index = function () {

    newsFactory.index("Apple", function(data){
      $scope.news = data.data.result;

      for (var i = 0; i < $scope.news.length; i++){
        unique[$scope.news[i].url] = $scope.news[i]
      }
      for (var key in unique){
        $scope.news2.push(unique[key])

      }
      console.log(unique)
      console.log($scope.news2)
    })
  }

  index();


}])
