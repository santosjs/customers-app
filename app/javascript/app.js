'use strict';

angular.module('customersApp', [
  'ngRoute',
  'ngResource',
  'customersApp.title'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/title', {
    template: '<app-title></app-title>'
  }).
  otherwise({redirectTo: '/title'});
}]);