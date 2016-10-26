(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {
        // Configure the security token bearer interceptor.
        $httpProvider.interceptors.push('authInterceptorService');

        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/user/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .when('/view-blog-entry/:blogEntryId', {
                templateUrl: 'app/blog-entry/view-blog-entry.html',
                controller: 'ViewBlogEntryController',
                controllerAs: 'vm'
            })
            .when('/blog-entries', {
                templateUrl: 'app/blog-entry/blog-entries.html',
                controller: 'BlogEntriesController',
                controllerAs: 'vm'
            })
            .when('/home', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: 'home' });

    }

})();