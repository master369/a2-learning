(function () {
    'use strict';
    angular.module('app.common')
        .factory('dataService', dataService);

    function dataService() {
        var lastCategoryId = 0,
            categoryList = [],
            taskList = [];

        init();

        return {
            getCategoryList: getCategoryList,
            addCategory: addCategory,
            deleteCategory: deleteCategory,
            addSubCategory: addSubCategory,
            getTasks: getTasks,
            getTasksList: getTasksList,
            getTask: getTask,
            deleteTodo: deleteTodo,
            addTaskToCategory: addTaskToCategory,
            addTask: addTask,
            addTaskToCategoryById: addTaskToCategoryById,
            updateTask: updateTask,
            updateCategory: updateCategory
        };

        function getCategoryList() {
            return categoryList;
        }

        function getTasksList() {
            return taskList;
        }
        function deleteTodo(item) {
            var index = taskList.indexOf(item);
            taskList.splice(index, 1);
        }
        function addCategory(name, tasks) {
            var id = getNextCategoryId();

            categoryList.unshift(new Category(id, name, tasks));
        }

        function addSubCategory(item, itemName) {
            var category = findCategory(item.id),
                name;

            if (!category) {
                return false;
            }

            name = itemName;
            category.subCategories.push(
                new Category(
                    getNextCategoryId(),
                    name
                )
            );
        }

        function deleteCategory(id) {
            var category = findCategory(id);

            if (!category) {
                return false;
            }

            deleteRecuriveCategory(categoryList, id);
        }

        function deleteRecuriveCategory(categories, id) {
            for (var i = 0, l = categories.length; i < l; i += 1) {
                var item = categories[i];

                if (item.id === id) {
                    categories.splice(i, 1);
                    return true;
                }

                if (item.subCategories.length > 0) {
                    if (deleteRecuriveCategory(item.subCategories, id)) {
                        return true;
                    }
                }
            }

            return false;
        }

        function findCategory(id) {
            return findRecursiveCategory(categoryList, id);
        }

        function findRecursiveCategory(categories, id) {
            var category,
                item,
                i,
                categoriesLength = categories.length;

            for (i = 0; i < categoriesLength; i++) {
                item = categories[i];
                if (item.id === id) {
                    return item;
                }
                /*eslint-disable*/
                if (item.subCategories.length > 0) {
                    if (category = findRecursiveCategory(item.subCategories, id)) {
                        return category;
                    }
                }
            }
            /*eslint-enable*/
            return null;
        }

        function getNextCategoryId() {
            lastCategoryId += 1;
            return lastCategoryId;
        }

        ///task
        function addTask(name, description) {
            var id = taskList.length;

            taskList.push(new Task(id, name, description));
        }

        function getTask(id) {
            return taskList.find(function (task) {
                return task.id === id;
            });
        }

        function updateTask(item) {
            var taskInList = taskList.find(function (task) {
                return task.id === item.id;
            }),
            index = taskList.indexOf(taskInList);
            taskList[index] = item;
        }

        function updateCategory(item, newName) {
            var categoryInList = categoryList.find(function (category) {
                return category.id === item.id;
            }),
            index = categoryList.indexOf(categoryInList);
            categoryList[index].name = newName;
        }

        function getTaskByName(name) {
            return taskList.find(function (task) {
                return task.name === name;
            });
        }
        function getTasks(categoryId) {
            var category = findCategory(categoryId);

            if (!category) {
                return [];
            }

            return taskList.filter(function (task) {
                return category.tasks.indexOf(task.id) >= 0;
            });
        }

        function addTaskToCategory(task, categoryId) {
            var item,
                category = findCategory(categoryId);
            addTask(task);
            item = getTaskByName(task);
            category.tasks.push(item.id);
        }
        function addTaskToCategoryById(taskId, categoryId) {
            var category;
            category = findCategory(categoryId);
            category.tasks.push(taskId);
        }
        function init() {
            addTask('task1', 'descriprtion1');
            addTask('task2', 'descriprtion2');
            addTask('task3', 'descriprtion3');
            addTask('task4', 'descriprtion4');
            addTask('task5', 'descriprtion5');

            addCategory('category3', [0, 1, 2, 3, 4]);
            addCategory('category2', [3, 4, 5]);
            addCategory('category1');
        }
    }

    function Category(id, name, tasks, subCategories) {
        this.id = id || 0;
        this.name = name || 'Template category name';
        this.subCategories = subCategories || [];
        this.tasks = tasks || [];

        this.expanded = false;
    }

    function Task(id, name, description) {
        this.id = id || 0;
        this.name = name || 'Template task name';
        this.description = description || 'Template task description';
        this.isDone = false;
    }
}());
