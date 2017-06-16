(function () {
  'use strict';

  angular
    .module('stocksApp')
    .factory('companyService', companyService);

  var companyDetails, companyStocks;

  /** @ngInject */
  function companyService($http, stocksAppConstants, $log, $q) {

    return {

      getCompanyDetails: function (id) {
        var deferred = $q.defer();
        if(!companyDetails) {
          $http.get(stocksAppConstants.BASE_PATH + stocksAppConstants.API_COMPANY_DETAILS).then(function (results) {
            $log.info(results.data);
            companyDetails = results.data;
            deferred.resolve(getDetailsByCompanyId(id));
          }, function (error) {
            $log.error(error);
            deferred.reject(error);
          });
        } else {
          deferred.resolve(getDetailsByCompanyId(id));
        }
        return deferred.promise;
      },

      getCompanyStocks: function (id) {
        var deferred = $q.defer();
        if(!companyStocks) {
          $http.get(stocksAppConstants.BASE_PATH + stocksAppConstants.API_COMPANY_STOCKS).then(function (results) {
            $log.info(results.data);
            companyStocks = results.data;
            deferred.resolve(getStocksByCompanyId(id));
          }, function (error) {
            $log.error(error);
            deferred.reject(error);
          });
        } else {
          deferred.resolve(getStocksByCompanyId(id));
        }
        return deferred.promise;
      },

    };

    function getDetailsByCompanyId(id) {
      for(var i=0; i<companyDetails.length; i++) {
        if(companyDetails[i].id == id) return companyDetails[i];
      }
      return false;
    }

    function getStocksByCompanyId(id) {
      for(var i=0; i<companyStocks.length; i++) {
        if(companyStocks[i].id == id) return companyStocks[i];
      }
      return false;
    }

  }
})();
