/**
 * Created by Milan on 12.12.2014.
 */
'use strict';
angular.module('musicLibrary-client', ['datatables', 'musicLibrary-client.services', 'musicLibrary-client.controllers', 'ngRoute'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/albums', {templateUrl: 'resources/albums.html', controller: 'AlbumController'});
        $routeProvider.otherwise({redirectTo: 'resources/index.html'});

        /* CORS... */
        /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });