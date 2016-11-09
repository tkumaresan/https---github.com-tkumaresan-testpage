coalesceModule.service('HTTPConnection', ['$http', '$q',function($http, $q, $window ) {

	// if bypass == true then alert will not be displayed on failure
	this.get = function(url, success, failure, bypass){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.get(url).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(response.status == 901){
				window.location = window.location.hostname +"/html/index.html";
			}
			if(failure) {
				failure(response, deferred);
			} 
			/*if(bypass == undefined || bypass != true) {
				alert("Unable to process the request. Please try again.");
			}*/
        }).catch(function(e) {
        });
		
		return deferred.promise;
	};
	
	// if bypass == true then alert will not be displayed on failure
	this.post = function(url, data, success, failure, bypass){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.post(url, data).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(response.status == 901){
				window.location = window.location.hostname +"/html/index.html";
			}
			if(failure) {
				failure(response, deferred);
			} 
			/*if(bypass == undefined || bypass != true) {
				alert("Unable to process the request. Please try again.");
			}*/
        }).catch(function(e) {
        });
		
		return deferred.promise;
	};
	
}]);

indexModule.service('HTTPConnection', ['$http', '$q',function($http, $q) {
	
	this.get = function(url, success, failure){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.get(url).then(function (response) {
			success(response, deferred);
		}, function(response) {
			failure(response, deferred);
        });
		
		return deferred.promise;
	};
	
	this.post = function(url, data, success, failure){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		// The then function here is an opportunity to modify the response
		var promise = $http.post(url, data).then(function (response) {
			success(response, deferred);
		}, function(response) {
			failure(response, deferred);
        });
		
		return deferred.promise;
	};
	
}]);