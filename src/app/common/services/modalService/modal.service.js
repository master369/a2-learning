(function () {
    'use strict';
    angular.module('app.common')
        .service('modalService', modalService);
    modalService.$inject = ['$uibModal'];
    function modalService($uibModal) {
        this.confirm = function (config) {
            return $uibModal.open({
                templateUrl: './app/pages/modal/confirmModal.html',
                controller: 'confirmModalCtrl',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    header: function () {
                        return config.header;
                    },
                    body: function () {
                        return config.body;
                    }
                }
            }).result;
        };

    }
}());

