myApp.controller('googleController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', 'newsFactory', function($scope, rParams, $location, $controller, jobFactory, newsFactory){
  $scope.news = [];
  $scope.news2 = [];
  var unique = {}
  var index = function () {

    newsFactory.index("Google", function(data){
      $scope.news = data.data.result;

      for (var i = 0; i < $scope.news.length; i++){
        unique[$scope.news[i].title] = $scope.news[i]
      }
      for (var key in unique){
        $scope.news2.push(unique[key])

      }
      for(var j = 0; j <$scope.news2.length; j++){
        if(!$scope.news2[j].date){
          $scope.news2[j].date = new Date();
        } else {
          $scope.news2[j].date = new Date($scope.news2[j].date)
          console.log($scope.news2[j].date)
        }
      }

      console.log(unique)
      console.log($scope.news2)
    })
  }

  index();


}])
