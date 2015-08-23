app.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data/datahc.json').success(function(data) {
      $scope.items = data.heroes;
      $scope.whichitem=$state.params.iId;
      $scope.data = {};
    });

    $scope.toggleStar = function(item) {
      item.star = !item.star;
    }

}]);