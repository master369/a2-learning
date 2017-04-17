(function () {
	'use strict';

	angular.module('app')
		.controller('confirmModalCtrl',

		function (header, body, $uibModalInstance) {
			var vm = this;
            vm.header = header;
            vm.body = body;

            vm.ok = function () {
                $uibModalInstance.close();
            };
            vm.cancel = function () {
                 $uibModalInstance.dismiss();
            };
		});

}());
