/**
 * Created by Milan on 19.12.2014.
 */

var artistsBaseUrl = "http://localhost:8080/pa165/artists";

services.factory('ArtistsFactory', function ($resource) {
    return $resource(artistsBaseUrl, {}, {
        getAll: {method: 'GET', isArray: true}
    });
});
