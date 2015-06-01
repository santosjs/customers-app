'use strict';

angular.module('customersApp.title', ['ngRoute', 'ngResource'])
.controller('TitleCtrl', ['$scope', '$resource', 'qsort', '$http', 'customers', function($scope, $resource, qsort, $http, customers) {
  $scope.data = [];
  $http.get('./customers_data').then(function(res){
    var files = $scope.files = res.data;
    for (var i = 0; i < files.length; i++) {
      $scope.data.push(customers.get({id: files[i]}, function(d) {
        return d;
      }));
    }
  });

  $scope.sortVal = "name";
  $scope.reverse = false;
  $scope.sortBy = function(field) {
    $scope.sortVal = field;
    var sort = angular.copy($scope.sortVal), dir;
    if (sort == field) {
      $scope.reverse = !$scope.reverse;
      dir = -1;
    } else {
      dir = 1;
    }

    $scope.data = qsort($scope.data, function(a, b) {
      if (a[sort] > b[sort]) return dir;
      return 0;
    });
  };
  $scope.addCustomer = {
    show: false,
    editable: false,
    buttonText: "Add new customer",
    toggle: function() {
      var show = this.show;
      var bText = this.buttonText;
      this.show = !show;
      this.buttonText = bText == "Add new customer" ? "Close form" : "Add new customer";
    },
    data: {
      name: "",
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", zip: "" }
    },
    reset: function() {
      this.data.name = "";
      this.data.email = "";
      this.data.phone = "";
      this.data.address = { street: "", city: "", state: "", zip: "" }
    },
    save: function(user) {
      if (this.editable) {
        for (var i = 0; i < $scope.data.length; i++) {
          if (user.$$hashKey === $scope.data[i].$$hashKey) {
            $scope.data.splice(i,1,angular.copy(user));
            break;
          }
        }
        this.editable = false;
      } else {
        user.id = $scope.data.length;
        $scope.data.push(angular.copy(user));
      }
      this.reset();
      this.toggle();
    },
    edit: function(user) {
      this.editable = true;
      this.toggle();
      this.data = user;
    },
    remove: function(user) {
      for (var i = 0; i < $scope.data.length; i++) {
        if (user.$$hashKey === $scope.data[i].$$hashKey) {
          $scope.data.splice(i,1);
          break;
        }
      }
    }
  };
}]);


