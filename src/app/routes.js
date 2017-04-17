(function () {
	'use strict';

	angular
		.module('app')
		.config(routes);

	function routes($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(false);
		$locationProvider.hashPrefix('');
		$stateProvider
			.state('shell', {
				url: '',
				abstract: true,
				controller: 'shellCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/shell.html'
			})
			.state('shell.todo', {
				url: '/todo',
				templateUrl: 'app/pages/todo/todo.html',
				controller: 'shellCtrl',
				controllerAs: 'vm',
				title: 'todo'
			})
			.state('shell.category', {
				url: '/category/:id',
				templateUrl: 'app/pages/todo/todo.html',
				controller: 'categoryCtrl',
				controllerAs: 'vm',
				title: 'category',
				params: {
					id: {
						value: ''
					}
				}
			})
			.state('shell.categorywithtodo', {
				url: '/category/:id/todo/:todoId',
				templateUrl: 'app/pages/details/todoDetail.html',
				controller: 'todoCtrl',
				controllerAs: 'vm',
				title: 'categorysTodo',
				params: {
					id: {
						value: ''
					},
					todoId: {
						value: ''
					}
				}
			})
			.state('shell.details', {
				url: '/todo/:todoId',
				controller: 'todoCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/details/todoDetail.html',
				params: {
					todoId: {
						value: ''
					}
				}
			});

		$urlRouterProvider.otherwise('/todo');
	}
}());
