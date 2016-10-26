(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewBlogEntryController', ViewBlogEntryController);

    ViewBlogEntryController.$inject = ['$scope', '$routeParams', 'dataService'];

    function ViewBlogEntryController($scope, $routeParams, dataService) {
        var vm = this;

        vm.entitiesName = 'blogEntries';
        vm.blogEntries = [];

        activate();

        function activate() {
            var blogEntriesSearchCriteria = {
                page: 1,
                perPage: 30,
                sort: null,
                search: null,
                searchFields: null,
                expand: null,
                q: 'blogEntryId eq ' + $routeParams.blogEntryId,
                fields: null
            };

            getBlogEntries(blogEntriesSearchCriteria);
        }

        function getBlogEntries(searchCriteria) {
            return dataService.searchEntities(vm.entitiesName, searchCriteria).then(function (data) {
                vm.blogEntries = data.value;

                return vm.blogEntries;
            });
        }

    }

})();