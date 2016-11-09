

//Controller for login activities
userPreferenceModule.controller("userPrefenceController", function($scope, URL, HTTPConnection) {

	$scope.userPreferenceListSuccess = function(result){
		$scope.userPreferenceList = result.data;
	}
	
	$scope.responseFailure = function(result){
	}
	
	$scope.userPreferenceUpdateSuccess = function(result){
	}
	
	$scope.updateList = function(){
		$.each($scope.userPreferenceList.userPreferenceDTOList, function(key, value){
			if(value.id=="1"){
				$scope.userPreferenceList.userPreferenceDTOList[key].isEnabled = false;
			}
		})
		$scope.request = {
			"userPreferences": $scope.userPreferenceList.userPreferenceDTOList
		}
		updateUserPreferenceList($scope.request);
	}
	
	
	var updateUserPreferenceList = function(requestData){
		HTTPConnection.post(URL.UPDATE_USER_PREFERENCE_LIST, requestData, $scope.userPreferenceUpdateSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	};
	
	var loadUserPreferenceList = function(){
		HTTPConnection.get(URL.USER_PREFERENCE_LIST, $scope.userPreferenceListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	};
	loadUserPreferenceList();
});
