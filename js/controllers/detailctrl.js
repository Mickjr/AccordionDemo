demo.controller('DetailCtrl', [
	"$scope",
	"$log",
	"$rootScope",
	"$firebase",
	"$routeParams",
	function ($scope, $log, $rootScope, $firebase, $routeParams){
		
		  
		  $scope.dynamicPopover = 'Hello, World!';
  		  $scope.dynamicPopoverTitle = 'Title';
  		  
		  $scope.mytime = new Date();

		  $scope.hstep = 1;
		  $scope.mstep = 15;

		  $scope.options = {
		    hstep: [1, 2, 3],
		    mstep: [1, 5, 10, 15, 25, 30]
		  	};

		  $scope.ismeridian = true;

		  $scope.toggleMode = function() {
		    $scope.ismeridian = ! $scope.ismeridian;
		  	};

		  $scope.update = function() {
		    var d = new Date();
		    d.setHours( 14 );
		    d.setMinutes( 0 );
		    $scope.mytime = d;
		  	};

		  $scope.changed = function () {
		    $log.log('Time changed to: ' + $scope.mytime);
		  	}; 	

		  $scope.changed = function () {
    		$log.log('Time changed to: ' + $scope.mytime);
  			};


		$scope.isCollapsed = false;

		var flightRef = new Firebase('https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId);
		$scope.flight = $firebase(flightRef).$asArray();
		var url = 'https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId+'/comments/';
		var commentRef = new Firebase(url);
		$scope.comments = $firebase(commentRef).$asArray();

		$scope.createComment = function(){
			$scope.newComment.user = $rootScope.loginObj.user.thirdPartyUserData.name;
			$scope.newComment.userId = $rootScope.loginObj.user.thirdPartyUserData.id;
			$scope.comments.$add($scope.newComment).then(function()
				{$scope.newComment = {};
			});
			console.info('New Comment Added!');
		}

		$scope.deleteComment = function(commentId){
			var commentRef = new Firebase(url+'/'+commentId);
			commentRef.remove();
		}

	} 
]);