/// <reference path="../testHelpers/_reference.js" />
/// <reference path="shellCtrl.js" />
(function () {
	'use strict';

	describe('shellCtrl', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var vm;

		beforeEach(inject(function ($controller, $location, $state, $stateParams, $rootScope) {
			var mockdataService = {
				deleteCategory: function () {

				},
				addSubCategory: function () {

				},
				addCategory: function () {

				},
				deleteTodo: function () {

				},
				addTask: function () {

				},
				addTaskToCategoryById: function () {

				},
				getTasksList: function () {
					return [{
						name: 'asdasd',
						id: 1,
						description: 'adsdasdasdaasdasdasd',
						isDone: true
					}];
				},
				getCategoryList: function () {
					return [{
						name: 'category',
						id: 1,
						expanded: false
					}];
				}
			};

			vm = $controller('shellCtrl', {
				'dataService': mockdataService,
				'$location': $location,
				'$state': $state,
				'$stateParams': $stateParams
			});

		}));

		it('should propperly initialize', function () {
			// Assert
			expect(vm).toBeDefined();
			expect(vm.todos).toEqual([{
				name: 'asdasd',
				id: 1,
				description: 'adsdasdasdaasdasdasd',
				isDone: true
			}]);
			expect(vm.categories).toEqual([{
				name: 'category',
				id: 1,
				expanded: false
			}]);
			expect(vm.pages).toEqual([]);
			expect(vm.selectedPage).toBe(0);
			expect(vm.show).toBe(false);
		});
	});
}());
