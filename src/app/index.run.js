(function() {
  'use strict';

  angular
    .module('stocksApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
