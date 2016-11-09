coalesceModule.controller("Search", function($scope, $rootScope, $window, URL, HTTPConnection, $routeParams, UtilitiesService) {

	$scope.errorMessage;
	$scope.searchValue = $routeParams.searchValue;
	$rootScope.searchString = $routeParams.searchValue; 
	$rootScope.loadingSearchResults = false;
	$rootScope.showAjaxLoader = false;
	
	//Success function for fetching fields initially
	$scope.fieldsSuccess = function(result){
		$scope.fields = result.data.searchFieldDTOList;
	};
	
	$scope.failure = function(result){
		$rootScope.loadingSearchResults = false;
		$rootScope.showAjaxLoader = false;
		
	}; 
	
	$scope.displayResult = false;
	//Success function for search results
	$scope.fieldsSearchsuccess = function(result){
		$scope.errorMessage = "";
		if(result.data.response.docs.length > 0){
			//$scope.data = result.data.response.docs;
			$scope.data = UtilitiesService.splitBySize(result.data.response.docs, 2);
			$scope.displayResult = true;
		}else{
			$scope.errorMessage = "There are no results for the given input.";
			$scope.displayResult = false;
		}
		$rootScope.loadingSearchResults = false;
		$rootScope.showAjaxLoader = false;
		
	};
	
	
	//validate the filter input
	function validate() {
		if($scope.searchValue == "") {
			$scope.errorMessage = "Please provide a value.";
			$scope.displayResult = false;
			return false;
		} 
		return true;
	}
	
	$scope.search = function() {
		$scope.searchValues[0].value = $scope.searchValue;
		if(validate()) {
			$rootScope.loadingSearchResults = true;
			$rootScope.showAjaxLoader = true;
			var data = {
					"operation":"OR", 
					"searchQueries"	: $scope.searchValues
				};
			HTTPConnection.post(URL.SEARCH_COMPANY, data, $scope.fieldsSearchsuccess, $scope.failure);
		}
	}
	
	$scope.searchValues = [{
	            "field" : "li_description,sf_description,mm_description",
	            "operator" : "Containing",
                "value" : $scope.searchValue,
                "importance" : "low",
                "core" : "company",
                "name" : "Description"
			},{
	            "field" : "name",
	            "operator" : "Containing",
                "value" : $scope.searchValue,
                "importance" : "low",
                "core" : "company",
                "name" : "Name"
			}];

	$scope.openURL = function(url) {
		$window.open(url);
	}
	
	$scope.search();
	
});