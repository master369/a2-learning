(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('todoitem', createTodoItem);

    function createTodoItem($state) {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: '/app/pages/partials/todoitem.html',
            scope: {
                index: '@',
                item: '=',
                deleteTodo: '&'
            },
            link: function(scope) {
                scope.checkRoute = function () {
                return !$state.includes('shell.category');
            };
            }
        };
        return directive;
    }

}());
