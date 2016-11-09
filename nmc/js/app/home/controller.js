coalesceModule.controller("Home", function($scope, $rootScope, HTTPConnection, $timeout, URL) {

});

coalesceModule.controller("changePasswordController", function($scope, $rootScope, HTTPConnection, $timeout, URL) {
	$scope.showSuccess = false;
	//for validating the passwords
	var validatePasswords = function(){
		$scope.successMsg = "";
		if($scope.newPassword == $scope.oldPassword){
			$scope.pwdsNotSame = false;
			$scope.changePasswordError = true;
			$scope.errorMsg = "Old password and new password must not be equal";
		}else if($scope.newPassword != $scope.confirmPassword){
			$scope.pwdsDoNotMatch = false;
			$scope.changePasswordError = true;
			$scope.errorMsg = "New password does not match the confirm password";
		}else{
			loadChangePasswordDetails();
		}
	}
	
	$scope.changePasswordSuccess = function(response){
		$scope.changePasswordError = true;
		$scope.showSuccess = true;
		$scope.successMsg = response.data.responseDTO.message;
		$timeout( function(){
			$rootScope.closeModal();
		}, 3000);
		  
	}

	$scope.changePasswordFailure = function(response){
		$scope.successMsg = "";
		$scope.changePasswordError = true;
		if(response.data.error.errors.length > 1)
			$scope.errorMsg = "Password should consist of 7-30 characters with alpha numeric and at least one special character.";
		else if (response.data.error.errors[0])
			$scope.errorMsg = response.data.error.errors[0].cause;
		else
			$scope.errorMsg = "Problem in changing password. Please try again later.";
	}
	
	
	//function executed when 'change' is clicked
	$scope.changePasswordSubmit = function(){
		$scope.pwdsNotSame = true;
		$scope.pwdsDoNotMatch = true;
		$scope.changePasswordError = false;
		validatePasswords();
	}

	//Function to execute after validation of passwords
	var loadChangePasswordDetails = function(){
		$scope.showSuccess = false;
		if(localStorage.getItem('userName')){
			var username = localStorage.getItem('userName');
		}
		var changePasswordRequest = {
				"username": username,
				"oldPassword": $scope.oldPassword,
				"newPassword": $scope.newPassword,
				"confirmPassword": $scope.confirmPassword
		}
		HTTPConnection.post(URL.CHANGE_PASSWORD, changePasswordRequest, $scope.changePasswordSuccess, $scope.changePasswordFailure, true);
	};
});


coalesceModule.controller("themeSelectionController", function($scope, $rootScope, HTTPConnection, $timeout, URL, growl) {
	
	$scope.themeDropDownText = "--Select a theme--";
	$scope.themesResultSuccess = function(response){
		$scope.themeList = response.data;
	}
	if(localStorage.getItem("preferences")){
		$scope.allPreferences = JSON.parse(localStorage.getItem("preferences"));
	}
	
	$scope.saveThemeSuccess = function(){
		growl.success("Theme saved successfully");
		$rootScope.$broadcast('preferenceChange');
		$rootScope.closeModal();
	}
	$scope.responseFailure = function(result){
		if(result.data.error.errors.length){
			growl.error(result.data.error.errors[0].cause);
		}else{
			growl.error("Something went wrong. Please try again later.");
		}
	}

	$scope.selectedTheme = function(theme){
		$scope.errorMsg = "";
		$scope.selectedThemeDetails = theme;
		$scope.themeDropDownText = theme.preferenceDisplayName;
	}
	
	$scope.changeThemeSubmit = function(){
		if(!$scope.selectedThemeDetails){
			$scope.errorMsg = "Select a theme";
			return false;
		}
		$scope.themeChangeRequest = {};
		$.each($scope.allPreferences.THEMES, function(key, value){
			value.preference = $scope.selectedThemeDetails;
			$scope.themeChangeRequest = value;
		})
		saveSelectedTheme();
	}
	
	$scope.allPreferencesSuccess = function(response){
		localStorage.setItem("preferences", JSON.stringify(response.data));
		$rootScope.changeTheme();
	}
	
	var loadAllPreferences = function(){
		HTTPConnection.get(URL.GET_ALL_PREFERENCES, $scope.allPreferencesSuccess, $scope.responseFailure);
	}
	
	var saveSelectedTheme = function(){
		HTTPConnection.post(URL.UPDATE_PREFERENCE, $scope.themeChangeRequest, $scope.saveThemeSuccess, $scope.responseFailure);
	}
	
	var loadAvailableThemes = function(){
		HTTPConnection.get(URL.GET_PREFERENCE_BY_CATEGORY+"?name=themes", $scope.themesResultSuccess, $scope.responseFailure);
	}
	loadAvailableThemes();
});



coalesceModule.controller('updateEmail', function ($scope, $rootScope, HTTPConnection, URL, growl) {
	  
	$scope.verificationCodeSent = false;
	$scope.newCode = true;
	$scope.existingCode = false;
	$scope.showError = false;
	
	$scope.email = {
	  "text" : "",
	  "code" : ""
	};
	  
	function failure(response) {
		  $scope.showError = true;
		  if(response.data.error.errors.length){
				$scope.errorMsg = response.data.error.errors[0].cause;
			}else{
				$scope.errorMsg = "Something went wrong. Please try again later.";
			}
	}
	
	$scope.sendVerificationCode = function(myForm) {
		$scope.showError = false;
		function success(response) {
			$scope.showError = false;
			if(response.data.responseDTO.status) {
				$scope.verificationCodeSent = true;
			} else {
				growl.error("Invalid email id");
			}
		}

		if(!myForm.$invalid) {
			var data = {
					"emailId" : $scope.email.text  
			};
			HTTPConnection.post(URL.SEND_VERIFICATION_CODE, data, success, failure);

		} else {
			growl.warning("Please enter the required field.");
		}
	};
	
	$scope.switchElement = function () {
		$scope.verificationCodeSent = true;
		$scope.showError = false;
		$scope.newCode = false;
		$scope.existingCode = true;
	};
	
	$scope.confirmVerificationCode = function(myForm) {
		  $scope.showError = false;
	  function success(response) {
		  $scope.showError = false;
		  if(response.data.responseDTO.status) {
			  $rootScope.closeModal();
			  growl.success("Your email id has been updated successfully. Hereafter all the communication mails will be send to the newly updated mail id.");
		  } else {
			  growl.error("Invalid Verification Code. Please try once again with a valid code.");
		  }
	  }
	  
	  
	
	  if(!myForm.$invalid) {
		  var data = {
			"emailId" : $scope.email.text,
			"code" : $scope.email.code
		  };
		  HTTPConnection.post(URL.CONFIRM_VERIFICATION_CODE, data, success, failure);
	  }
	};
});