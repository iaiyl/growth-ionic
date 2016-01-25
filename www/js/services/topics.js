angular.module('starter.services')
  .factory('Topics', function ($resource, $filter) {
    var api = 'http://forum.growth.ren/api';
    var topics = [];
    var res = {};
    var resource = $resource(api + '/discussions');
    var getTopics = function (tab, page, callback) {
      return resource.get({}, function (r) {
        return callback && callback(r);
      });
    };
    return {
      getPostById: function (id) {
        return $filter('filter')(res.included, {type: "posts", id: id})[0];
      },
      getTopicById: function (id) {
        //if (JSON.stringify(res) === '{}') {
        //  this.refresh().$promise.then(function (response) {
        //    res = response;
        //    topics = response.data;
        //    return $filter('filter')(res.data, {type: "discussions", id: id})[0];
        //  })
        //} else {
          return $filter('filter')(res.data, {type: "discussions", id: id})[0];
        //}
      },
      refresh: function () {
        return getTopics({}, function (response) {
          res = response;
          topics = response.data;
        });
      }
    };
  });