'use strict';

angular.module('customersApp.title')
// Quick sort algorithm
.factory('qsort', function(){
    return function q(array, func) {
      if (array.length == 1) return array;
      var left = [], right = [], l = array.length - 1;

      for (var i = 0; i < l; i++) {
        func(array[i], array[l]) ? right.push(array[i]) : left.push(array[i]);
      }

      if (right.length > 0) right = q(right, func);
      if (left.length > 0) left = q(left, func);
      return left.concat(array[l], right);
    }
})
.factory('customers', ['$resource',
  function($resource){
    return $resource('customers_data/:id', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
}]);
