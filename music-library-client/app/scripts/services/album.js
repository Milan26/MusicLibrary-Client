/**
 * Created by Milan on 12.12.2014.
 */

var albumsBaseUrl = "http://localhost:8080/pa165/albums";

services.factory('AlbumsFactory', function ($resource) {
    return $resource(albumsBaseUrl, {}, {
        getAll: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        update: {method: 'PUT'}
    });
});

services.factory('AlbumFactory', function ($resource) {
    return $resource(albumsBaseUrl + "/:id", {}, {
        get: {method: 'GET', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    })
});