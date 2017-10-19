/*jslint node: true */
'use strict';

angular.module('confusionApp', ['ngRoute'])
        // to correct use, and eliminate "!" from URL
        .config(['$locationProvider', function($locationProvider) {
            
            $locationProvider.hashPrefix('');
            
        }])

        .config(function($routeProvider) {
        $routeProvider
            // route for the contactus page
            .when('/contactus', {
                templateUrl : 'contactus.html',
                controller  : 'ContactController'
            })
            // route for the menu page
            .when('/menu', {
                templateUrl : 'menu.html',
                controller  : 'MenuController'
            })
            // route for the dish details page
            .when('/menu/:id', {
                templateUrl : 'dishdetail.html',
                controller  : 'DishDetailController'
            })
            .otherwise('/contactus');
    });
