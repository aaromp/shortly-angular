angular.module('Shortly',['ngRoute'])

.config(
  function($routeProvider) {
    $routeProvider
      .when('/links', {
        templateUrl: '/client/templates/home.html',
        controller: 'ShowLinksController'
      })
      .when('/create', {
        templateUrl: '/client/templates/shorten.html',
        controller: 'ShortenLinkController'
      })
      .otherwise({
        redirectTo: '/links'
      });
  })

.controller('ShowLinksController', function($scope, $http) {
  $http({method: 'GET', url: '/links'})
    .success(function(data, status, headers, config) {
      $scope.links = data;
    })
    .error(function(data, status, headers, config) {
      $scope.links = 'DANGER WILL ROBINSON';
      console.log(data, status, headers, config);
    });
})

.controller('ShortenLinkController', function($scope, $http) {
  $scope.validUrl = "/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i";

  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/links',
      // dataType: 'json',
      data: JSON.stringify({url: $scope.url}),
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config) {
    });
  };

});
