(function () {
    'use strict';

    angular.module('app')
        .controller('categoryCtrl',

        function ($scope, dataService, $stateParams, $state) {
            var vm = this;

            vm.getTasks = function(id) {
                if (id) {
                    var tasks = dataService.getTasks(id);
                    vm.todos = tasks;
                }
            };
            vm.addTodo = function (text) {
                var id = +$stateParams.id;
                dataService.addTaskToCategory(text, id);
                vm.getTasks(id);
            };
            vm.checkRoute = function () {
                return !$state.includes('shell.category');
            };

            init();
            function init() {
            var id = +$stateParams.id;
                vm.getTasks(id);
            }
        });

}());
