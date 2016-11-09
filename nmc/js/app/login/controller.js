indexModule.service('NetworkService', ['$http', '$q',function($http, $q) {
	
	function getOptions(request) {
		var options = {
	            headers: {"Authorization":request},
	        };
		return options;
	}
	
	this.authenticate = function(url, success, failure, request){
		// $http returns a promise, which has a then function, which also returns a promise
       var options = getOptions(request);
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.get(url, options).then(function (response) {
			success(response, deferred);
		}, function(response) {
			failure(response, deferred);
        }).catch(function(e) {
        });
      
		// Return the promise to the data service
		return deferred.promise;
	};
	
	this.get = function(url, success, failure){
		// $http returns a promise, which has a then function, which also returns a promise
       var options = {};
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.get(url, options).then(function (response) {
			success(response, deferred);
		}, function(response) {
			failure(response, deferred);
        }).catch(function(e) {
        });
      
		// Return the promise to the data service
		return deferred.promise;
	};
	

	
}]);

//Controller for login activities
indexModule.controller("loginController", function($scope, $window, NetworkService) {
	$scope.loginError = false;
	
	//Clearing the local storage
    localStorage.clear();
	
	//When the response is successful
	$scope.success = function(data){
		$scope.loginError = false;
		//Setting the username and role in local storage
	    localStorage.setItem('userName', data.data.responseDTO.user.username);
	    localStorage.setItem('displayName', data.data.responseDTO.user.displayName);
	    localStorage.setItem('userRole', data.data.responseDTO.user.role);
		//Redirecting to home page
		$window.location = "main.html";
	}
	
	//When the response is a failure
	$scope.failure = function(response){
		$scope.loginError = true;
		if(response.data.responseMessage){
			$scope.errorMsg = response.data.responseMessage;
		}else{
			$scope.errorMsg = "Something went wrong. Please try again later!";
		}
	}
	//Function to execute when login button is clicked
	$scope.loginSubmit = function(){
		var user = $scope.username;
		var password = $scope.password;
		
		var tok = user + ':' + password;
		var hash = btoa(tok);
		var request = "Basic " + hash;
		
		NetworkService.authenticate("/login.json", $scope.success, $scope.failure, request).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		}).catch(function(e){

		});
	};
});

//Controller for forgot password activities
indexModule.controller("forgotPasswordController", function($scope, $window, NetworkService, $window) {
	$scope.showError = false;
	
	//When the response is successful
	$scope.success = function(data){
		$scope.showError = true;
		$scope.errorMsg = "Password has been reset and sent to your registered email id.";
		//Redirecting to index page
		setTimeout(function(){
			$window.location = "index.html";
		},10000); 
		
	}
	
	//When the response is a failure
	$scope.failure = function(data){
		$scope.showError = true;
		if(data.status == 500){
			$scope.errorMsg = "Email Id is not registered.";
		}else if(data.status == 400){
			$scope.errorMsg = "Email Id is not registered.";
		}
		else{
			$scope.errorMsg = "Network error";
		}
	}
	//Function to execute when reset password button is clicked
	$scope.resetPasswordSubmit = function(){
		NetworkService.get("/forgotPassword.json?emailId="+$scope.email, $scope.success, $scope.failure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		}).catch(function(e){

		});
	}
});