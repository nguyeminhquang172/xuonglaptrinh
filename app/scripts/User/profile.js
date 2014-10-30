angular .module('app')
		.controller('profileCtr', ['$scope', 'getUser', '$modal', '$log',
      function($scope, getUser, $modal, $log){
        getUser.getData().then(function (data) {
          $scope.userProfile = data;
          console.log($scope.userProfile.name);
        });
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function () {

          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm'
            /*resolve: {
              items: function () {
                return $scope.items;
              }
            }*/
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };
    }])
		.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', /*'items',*/ function ($scope, $modalInstance, items) {

  /*$scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };*/

  $scope.ok = function () {
    // $modalInstance.close($scope.selected.item);
    console.log('ok');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
    console.log('cancel');
  };
}]);
