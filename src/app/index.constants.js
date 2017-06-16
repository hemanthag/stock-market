(function () {
  'use strict';

  angular
    .module('stocksApp')
    .constant('stocksAppConstants', {
      "BASE_PATH": "/assets/rest",
      "API_COMPANY_DETAILS": "/companyDetails",
      "API_COMPANY_STOCKS": "/companyStocks"
    });

})();
