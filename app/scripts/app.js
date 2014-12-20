/**
 * Created by Milan on 12.12.2014.
 */
'use strict';
angular.module('musicLibrary-client',
    ['datatables', 'musicLibrary-client.services', 'musicLibrary-client.controllers', 'ngRoute'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/albums', {templateUrl: 'views/albums.html', controller: 'AlbumController'});
        $routeProvider.when('/songs', {templateUrl: 'views/songs.html', controller: 'SongController'});
        $routeProvider.otherwise({redirectTo: '/'});

        /* CORS... */
        /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

var services = angular.module('musicLibrary-client.services', ['ngResource']);
var controllers = angular.module('musicLibrary-client.controllers', []);
