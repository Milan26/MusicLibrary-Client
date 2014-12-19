/**
 * Created by Milan on 19.12.2014.
 */

var songsBaseUrl = "http://localhost:8080/pa165/songs";

services.factory('SongsFactory', function ($resource) {
    return $resource(songsBaseUrl, {}, {
        getAll: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        update: {method: 'PUT'}
    });
});

services.factory('SongFactory', function ($resource) {
    return $resource(songsBaseUrl + "/:id", {}, {
        get: {method: 'GET', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    })
});

services.factory('GenreFactory', function ($resource) {
    return $resource(songsBaseUrl + "/genres", {}, {
        getAll: {method: 'GET', isArray: true}
    })
});