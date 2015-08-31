angular.module('starter.directives')

.directive('mediaListItem', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      mediaItem: '=',
      mini: '=',
      today: '=',
      yesterday: '='
    }, 
    templateUrl: 'js/directives/mediaListItem.html' 
  }; 
});