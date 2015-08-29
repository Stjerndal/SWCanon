angular.module('starter.directives')

.directive('mediaListItem', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      mediaItem: '=',
      today: '=',
      yesterday: '='
    }, 
    templateUrl: 'js/directives/mediaListItem.html' 
  }; 
});