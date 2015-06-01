'use strict';

angular.module('customersApp.title')
.directive('appTitle', function(){
  return {
    restrict: 'E',
    controller: 'TitleCtrl',
    templateUrl: 'templates/title.html',
    scope: {}
  }
});