(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogEntriesController', BlogEntriesController);

    BlogEntriesController.$inject = ['$scope', '$routeParams', '$sce', 'dataService'];

    function BlogEntriesController($scope, $routeParams, $sce, dataService) {
        var vm = this;

        vm.entityDataStore = 'blogEntries';
        vm.blogEntries = [];

        activate();

        function activate() {
            var blogEntriesSearchCriteria = {
                page: 1,
                perPage: 30,
                sort: null,
                search: null,
                searchFields: null,
                expand: 'author',
                q: null,
                fields: null
            };

            getBlogEntries(blogEntriesSearchCriteria);
        }

        function getBlogEntries(searchCriteria) {
            return dataService.searchEntities(vm.entityDataStore, searchCriteria).then(function (data) {
                vm.blogEntries = data;

                for(var i = 0; i < vm.blogEntries.length; i++) {
                    vm.blogEntries[i].safeBlogBodySummaryHtml = $sce.trustAsHtml(vm.blogEntries[i].blogBodySummaryHtml);
                }

                return vm.blogEntries;
            });
        }

    }

})();