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
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/links',
      // dataType: 'json',
      data: JSON.stringify({url: $scope.url}),
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config) {
      alert('You did it!');
    });
  };
});
