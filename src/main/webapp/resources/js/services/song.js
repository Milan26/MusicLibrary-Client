/**
 * Created by Milan on 19.12.2014.
 */

var songsBaseUrl = "http://localhost:8080/pa165/songs";

services.factory('SongsFactory', function ($resource) {
    return $resource(songsBaseUrl, {}, {
        getAll: {method: 'GET', isArray: true},
        create: {method: 'POST'}
    });
});

services.factory('SongFactory', function ($resource) {
    return $resource(songsBaseUrl + "/:id", {}, {
        get: {method: 'GET', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    })
});

services.factory('SongUpdateFactory', function ($resource) {
    return $resource(songsBaseUrl + "/:album_id/:artist_id", {}, {
        update: {method: 'PUT', params: {album_id: '@album_id', artist_id: '@artist_id'}}
    })
});

services.factory('GenreFactory', function ($resource) {
    return $resource(songsBaseUrl + "/genres", {}, {
        getAll: {method: 'GET', isArray: true}
    })
});