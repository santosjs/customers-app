'use strict';

describe('customersApp.title module', function() {

  beforeEach(module('customersApp.title'));

  describe('title controller', function(){
    var scope, TitleCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      TitleCtrl = $controller('TitleCtrl', {$scope: scope});
    }));

    it('should define TitleCtrl', function() {
      expect(TitleCtrl).toBeDefined();
    });

    it('should reset form', function() {
      scope.addCustomer.data = {phone: 1111111};
      scope.addCustomer.reset();

      expect(scope.addCustomer.data.phone).toEqual("");
    });

    it('should add new record', function() {
      var leng = scope.data.length;
      scope.addCustomer.data = {name: "Alex", phone: 1111111, email: "aaa@aaa.net",
        address: { street: "street", city: "city", state: "state", zip: "zip"} };
      scope.addCustomer.save(scope.addCustomer.data);

      expect(scope.data.length).toEqual(leng+1);
      expect(scope.data[leng].name).toEqual("Alex");
      expect(scope.addCustomer.data.email).toEqual("");
    });

    it('should remove the field', function () {
      scope.data.push({name: "Alex", phone: 1111111, email: "aaa@aaa.net",
        address: { street: "street", city: "city", state: "state", zip: "zip"}, $$hashKey: "testHashKey"});
      var dataLen = scope.data.length - 1;
      scope.addCustomer.remove(scope.data[dataLen]);

      expect(scope.data.length).toEqual(dataLen);
    });

    it('should sort users data', function () {
      scope.data = [
        {name: "Alex Higgins", phone: "7443436", address: "799 E Dranstel Suite 5A"},
        {name: "Oprah Silverstone", phone: "0547260", address: "1807 Glenwood St. NE"},
        {name: "Michael Moore", phone: "1184365", address: "70 Alverin 10/2"},
        {name: "Jackie Ilner", phone: "5236232", address: "Broadway 190"},
        {name: "Brian Flinn", phone: "6343432", address: "17 Alabama St."}
      ];
      scope.sortBy("phone");

      expect(scope.data[0].name).toMatch(/Oprah/);
      expect(scope.data[1].phone).toEqual("1184365");
    });

  });
});