(function () {
    'use strict';

    angular.module('app')
        .controller('todoCtrl',

        function ($scope, dataService, $stateParams, $location) {
            var vm = this;
            vm.default = {};
            vm.getTask = function (id) {
                var task = dataService.getTask(id);
                vm.default = angular.copy(task);
                vm.item = vm.default;
            };
            vm.submit = function (item) {
                 dataService.updateTask(item);
            };
            vm.reset = function () {
                vm.item = vm.default;
                vm.submit(vm.item);
            };
            function init() {
                var id = +$stateParams.todoId;
                vm.getTask(id);
            }
            init();

        });

}());
