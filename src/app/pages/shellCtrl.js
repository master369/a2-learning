(function () {
	'use strict';

	angular.module('app')
		.controller('shellCtrl',

		function ($scope, dataService, $location, $state, $stateParams, modalService){
			var vm = this;
			vm.todos = [];
			vm.pages = [];
			vm.selectedPage = 0;
			vm.show = false;
			$scope.$state = $state;//eslint-disable-line

			init();
			///
			vm.delete = function (data) {
				modalService.confirm({ header: 'Confirm', body: 'Delete category "' + data.name + '"?' })
					.then(function () {
						dataService.deleteCategory(data.id);
					});
			};

			vm.add = function (data) {
				var name = vm.newCategoryItem;
				dataService.addSubCategory(data, name);
				vm.newCategoryItem = '';
			};

			vm.addPrimaryCategory = function () {
				dataService.addCategory(vm.newCategoryItem);
				vm.newCategoryItem = '';
			};

			vm.deleteTodo = function (data) {
				modalService.confirm({ header: 'Confirm', body: 'Delete task "' + data.name + '"?' })
					.then(function () {
						dataService.deleteTodo(data);
					});
			};

			vm.addTodo = function (data) {
				dataService.addTask(data);
				vm.data = '';
			};

			vm.isAddButtonDisabled = function () {
				return !vm.data;
			};

			vm.categoryAddButtonDisabled = function () {
				return !vm.newCategoryItem;
			};

			vm.changeButton = function () {
				return !$state.includes('shell.details') && !$state.includes('shell.categorywithtodo');
			};

			vm.addTaskToCategory = function (categoryId) {
				var id,
					path = $location.path();
				path = path.toString();
				id = path.substr(path.length - 1);
				dataService.addTaskToCategoryById(+id, categoryId);
			};
			vm.editCategory = function (item) {
				dataService.updateCategory(item, vm.newCategoryItem);
				vm.newCategoryItem = '';
			};
			vm.categorySelected = function (categoryId) {
				return ($state.includes('shell.category') ||
				$state.includes('shell.categorywithtodo')) && +$state.params.id === categoryId;// == is necessary for type comparation
			};

			function init() {
				vm.todos = dataService.getTasksList();
				vm.categories = dataService.getCategoryList();
			}


		});

}());
