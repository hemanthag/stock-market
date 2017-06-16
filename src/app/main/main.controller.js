(function () {
  'use strict';

  angular
    .module('stocksApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $q, $log, companyService) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled = false;

    // list of `state` value/display objects
    self.companies = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for companies... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
      var results = query ? self.companies.filter(createFilterFor(query)) : self.companies,
        deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + angular.toJson(item));
      // fetch company details and stocks

      if (item) {
        companyService.getCompanyDetails(item.id).then(function (response) {
          $log.info(response);
          self.companyDetails = response;
        }, function (error) {
          $log.error(error);
        });

        companyService.getCompanyStocks(item.id).then(function (response) {
          $log.info(response);
          self.companyStocks = response;
          // set graph
          setGraph(self.companyStocks.stocksLast5Days);
        }, function (error) {
          $log.error(error);
        });
      } else {
        // clear
        self.companyDetails = "";
        self.companyStocks = "";
      }

    }

    function setGraph(graphData) {
      self.trendingChart = {
        data: {
          type: 'area',
          json: graphData,
          keys: {
            // x: 'name', // it's possible to specify 'x' when category axis
            value: ['value']
          }
        },
        axis: {
          x: {
            // type: 'category'
          }
        }
      };
    }

    /**
     * Build `companies` list of key/value pairs
     */
    function loadAll() {
      return [
        {
          "name": "Amazon",
          "id": 1
        },
        {
          "name": "Google",
          "id": 2
        },
        {
          "name": "Microsoft",
          "id": 3
        },
        {
          "name": "Twitter",
          "id": 4
        }
      ];
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(company) {
        return (angular.lowercase(company.name).indexOf(lowercaseQuery) === 0);
      };

    }
  }
})();
