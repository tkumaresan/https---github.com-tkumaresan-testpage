var coalesceModule = angular.module('coalesce', ['ngRoute', 'angular.filter', 'ngAnimate', 'infinite-scroll', 'ui.select', 'ui.slider', 'ui.bootstrap','angular-growl']);

coalesceModule.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
}]);

coalesceModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

// Routing Config
coalesceModule.config(function ($routeProvider) {
    $routeProvider
      .when('/home.html', {
      	title : 'Home',
        templateUrl: 'home.html',
        controller: 'Home'
      })
      .when('/myalerts', {
    	title : 'Alerts',
        templateUrl: 'my-alerts.html',
        controller: 'Home'
      })
      .when('/advanced-search-result', {
      	title : 'Find Deals',
        templateUrl: 'advanced-search-result.html',
        controller: 'SearchResult'
      })
      .when('/search/:searchValue', {
    	title : "Search",
        templateUrl: 'search.html'
      })
      .when('/company-profile-summary', {
      	title : 'Deal Profiles',
        templateUrl: 'company-profile-summary.html'
      })
      .when('/company-profile-detail', {
      	title : 'Ask Watson',
        templateUrl: 'company-profile-detail.html',
        controller: 'CompanyProfileDetail'
      })
      .when('/user-model', {
      	title : 'Model',
    	 templateUrl: 'user-model.html'
      })
      .otherwise({
        redirectTo: '/home.html'
      });
});

coalesceModule.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);

coalesceModule.controller("Root", function($rootScope, $scope, $location, $timeout, $modal, Custom, constants, $window, DateUtils, HTTPConnection, URL) {
	
	// Modal instance
	var modalInstance;
	$scope.blue = true;
	$scope.$on('preferenceChange', function(evnt, args){
		loadAllPreferences();
	});
	$scope.switchTheme = function() {
		$scope.blue = !$scope.blue;
	}
	$scope.changeTheme = function(){
		if(localStorage.getItem("preferences")) {
			var preferences = JSON.parse(localStorage.getItem("preferences"));
			$scope.blue = true;
			if(preferences[constants.THEMES]) {
				if(preferences[constants.THEMES][constants.WHITE]) {
					$scope.blue = false;
				}
			}
		}
	}
	
	// listen to router
	$scope.$on('$routeChangeSuccess', function () {
		$scope.isHomePage = $location.path().indexOf("home.html") > -1;
	});

	$scope.$on('$viewContentLoaded', function () {
		// customize the  UI on DOM ready
		// should be executed after the angular template is rendered
		// Refer http://stackoverflow.com/questions/27129829/angularjs-viewcontentloaded-fired-before-partial-view-appears 
		$timeout(function() {Custom.customUI();}, 0);
	});
	
	$scope.mainHtmlUrlClicked = function(pageName){
		$scope.thisPage =  pageName;
	}
	
	if(localStorage.getItem('userName')){
        $scope.username = localStorage.getItem('userName');
        $scope.displayName = localStorage.getItem('displayName');
	}
	
	$scope.logout = function(){
	   $window.location = URL.LOGOUT;
	};
	
	$scope.open = function() {
	  $scope.showModal = true;
	};

	$scope.ok = function() {
	  $scope.showModal = false;
	};

	$scope.cancel = function() {
	  $scope.showModal = false;
	};
	
	//When searching on the text field on the top right - home page
	$scope.searchCompany = function(){
		if(!$scope.searchString){
			return false;
		}
		$rootScope.loadingSearchResults = true;
		window.location.href = "#search/"+$scope.searchString;
	}
	
	//Company profile group list success function
	$scope.companyProfileListSuccess = function(result){
		if(result.data.companyProfileGroupDTOList)
			localStorage.setItem('profileGroupList', JSON.stringify(result));
	}
	
	$scope.responseFailure = function(result){
	}
	
	var loadCompanyProfileGroupList = function(){
		HTTPConnection.get(URL.GET_PREFERENCE_PROFILE_GROUPS, $scope.companyProfileListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		});
	};
	
	loadCompanyProfileGroupList();
	
	$scope.allPreferencesSuccess = function(response){
		localStorage.setItem("preferences", JSON.stringify(response.data));
		$scope.changeTheme();
	}
	
	var loadAllPreferences = function(){
		HTTPConnection.get(URL.GET_ALL_PREFERENCES, $scope.allPreferencesSuccess, $scope.responseFailure);
	}
	
	loadAllPreferences();
	
	// Utils for modal
	$rootScope.openModal = function(templatePath) {
		if(modalInstance) {
			// Do nothing when a popup is already open.
		} else{
			modalInstance = $modal.open({
			      templateUrl: templatePath
			});
			modalInstance.result.then(function () {
			    }, function () {
			    	modalInstance = null;
			    });
		}
	}
	
	$rootScope.closeModal = function() {
		modalInstance.dismiss('cancel');
		modalInstance = null;
	}
	
	//Utils required for UI
	$rootScope.nullToNA = function(value) {
		if(value) {
			return value;
		}
		return "na";
	}
	
	$rootScope.nullToEmpty = function(value) {
		if(value) {
			return value;
		}
		return "";
	}
	
	$rootScope.toMillion = function(value) {
		if(value) {
			return Math.round(value / 1000000);
		}
		return 0;
	}
	
	$rootScope.toMonthAndYear = function(date) {
		if(date) {
			var moment = DateUtils.getMomentFromResponse(date);
			var date = moment.format("MMM, YY")
			return date;
		}
	}
	
	$rootScope.appendProtocol = function(url) {
		if(url.indexOf("http://") === 0 ) {
			return url;
		} else if(url.indexOf("https://") === 0 ) {
			return url;
		} else {
			return "http://"+url;
		}
	};
	
	$rootScope.truncateProtocol = function(url){
		if(url.indexOf("http://") === 0){
			url = url.split("//")[1];
		}
		if(url.indexOf("www.") === 0){
			url = url.split("www.")[1];
		}
		return url;
	}
	
	$rootScope.getInitials = function(names) {
		if(names) {
			var namesAsArray = names.split(";");
			var initials;
			angular.forEach(namesAsArray, function(name, key) {
				var firstAndLastName = name.split(" ");
				var initial = "";
				angular.forEach(firstAndLastName, function(flName, key) {
					initial += flName.charAt(0);
				});
				if(initials) {
					initials += ", ";
					initials += initial;
				} else {
					initials = initial;
				}
			});
			return initials;
		}
	}
	
	$rootScope.convertToJSDate = function(timestamp) {
		if(timestamp) {
			return timestamp.replace(" ", "T");
		}
	}
	
	$rootScope.toTop = function() {
		$('html, body').animate({scrollTop:0}, 'slow');
	}
	
	$rootScope.toggle = function(element) {
		$('#' + element).slideToggle('slow');
	}
	
	$rootScope.hasPath = function(url) {
		return $location.path().indexOf(url) > -1;
	}
	
	$rootScope.toggle("dropDownContainer");
	
	$scope.changeTheme();
});


coalesceModule.controller("navLinkController",function($rootScope, $scope, $location, $timeout){
	$rootScope.$on('$routeChangeSuccess', function(evt, cur, prev) {
		$scope.thisPage =  cur.loadedTemplateUrl;
	});
	
});

var indexModule = angular.module('coalesceLogin', ['ngRoute']);

indexModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '../html/login/login.html',
      }).
      when('/forgot-password', {
        templateUrl: '../html/login/forgot-password.html',
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

var userPreferenceModule = angular.module('userPreference', ['ngRoute','coalesceLogin']);

var companySearchModule = angular.module('companySearch', ['ngRoute','coalesceLogin']);

var userCreateModelModule = angular.module('userCreateModel', ['ngRoute','coalesceLogin','ui.bootstrap','angular-growl', 'dialogs']);