/**
 * Created by on 2/3/16.
 */
var module = angular.module('offer.services', ['ngResource']);

module.factory('OfferService', ['$http', function ($http) {
    return {
        findAll: function (params) {
            return $http.get('/offer', {params: params});
        },
        findOne: function (id) {
            return $http.get('/offer/' + id);
        },
        save: function (offer) {
            return $http.post('/offer', offer);
        },
        edit: function (id, offer) {
            return $http.put('/offer/' + id, offer);
        },
        delete: function (id) {
            return $http.delete('/offer/' + id);
        }
    }
}]);