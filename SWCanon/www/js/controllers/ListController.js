angular.module('starter.controllers')

.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.whatmedia=$state.params.mId;
      $scope.data = {};
    });

    $scope.toggleStar = function(item) {
      item.star = !item.star;
    };

}]);