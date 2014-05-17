angular.module('Shortly',[])

.controller('links', function($scope, $http) {
  $http({method: 'GET', url: '/links'})
    .success(function(data, status, headers, config) {
      $scope.links = data;
    })
    .error(function(data, status, headers, config) {
      $scope.links = 'DANGER WILL ROBINSON';
      console.log(data, status, headers, config);
    });
  $scope.thing = 'hello';
});
