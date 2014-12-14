/**
 * Created by Milan on 12.12.2014.
 */

var services = angular.module('musicLibrary-client.services', ['ngResource']);

var baseUrl = "http://localhost:8080/pa165/albums";

services.factory('AlbumsFactory', function ($resource) {
    return $resource(baseUrl, {}, {
        getAll: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        update: {method: 'PUT'}
    });
});

services.factory('AlbumFactory', function ($resource) {
    return $resource(baseUrl + "/:id", {}, {
        get: {method: 'GET', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    })
});