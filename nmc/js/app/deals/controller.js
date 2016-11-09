coalesceModule.controller("SearchResult", function($scope, $rootScope, $window, DateUtils, URL, HTTPConnection, UtilitiesService) {
	$scope.slider = {
			'options': {
				start: function (event, ui) {  },
				stop: function (event, ui) {  },
			}
	};

	// for dispalying in the UI
	$scope.availableFilters = [];
	// for API call
	$scope.availableFilterValues = [];
	// fields that are available for dropdown
	$scope.fields = null;
	//by default low
	$scope.importance = 1;
	$scope.errorMessage;
	$scope.inputValueType;
	
	function resetValues() {
		$scope.selectedField = null;
		$scope.selectedOperator = null;
		$scope.companyDropDownTxt = "Fields";
		$scope.operatorDropDownTxt = "Operator";
	}
	resetValues();

	//Related to date picker starts
	//1 years
	$scope.minDate = DateUtils.before(365);
	$scope.maxDate = DateUtils.now();
	$scope.valueDate = DateUtils.now();
	$scope.format = DateUtils.format;
	$scope.opened = true;
	$scope.dateOptions = {
		    startingDay: 1
		  };
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.opened = !$scope.opened;
	}
	//Related to date picker ends
	
	//on field dropdown select
	$scope.selectedCompany = function(field) {
		$scope.selectedField = field;
		$scope.companyDropDownTxt = $scope.selectedField.displayName;
		$scope.value = null;
		$scope.valueDate = DateUtils.now();
		$scope.inputValueType = $scope.selectedField.searchFieldType.type.toLowerCase();
	};
	
	//on operator select
	$scope.selectOperator = function(operator){
		$scope.selectedOperator = operator;
		$scope.operatorDropDownTxt = operator.searchOperator.operator;
		$scope.value = null;
		$scope.valueDate = DateUtils.now();
	};

	//Success function for fetching fields initially
	$scope.fieldsSuccess = function(result){
		$scope.fields = result.data.searchFieldDTOList;
	};
	
	$scope.failure = function(result){
		$rootScope.showAjaxLoader = false;
	};
	
	$scope.displayResult = false;
	//Success function for search results
	$scope.fieldsSearchsuccess = function(result){
		$rootScope.showAjaxLoader = false;
		$scope.data = UtilitiesService.splitBySize(result.data.response.docs, 2);
		//$scope.data = result.data.response.docs;
		$scope.displayResult = true;
	};
	
	$scope.convertImportanceToString = function(data) {
		if(data == 1) {
			return "Low";
		} else if (data == 2) {
			return "Medium";
		} else if(data == 3){
			return "High";
		}
	};
	
	//validate the filter input
	function validate() {
		if(!$scope.selectedField) {
			$scope.errorMessage = "Please select a field.";
		} else if (!$scope.selectedOperator){
			$scope.errorMessage = "Please select a operator.";
		} else if(!$scope.value && $scope.selectedField.searchFieldType.type != "date") {
			$scope.errorMessage = "Please provde a value.";
		} else {
			$scope.errorMessage = null;
		}
	}
	
	// Remove the filter from the fields.
	// Available filters should not be displayed in dropdown 
	function hideSelectedField() {
		angular.forEach($scope.fields, function(value, key) {
			if (value.displayName == $scope.selectedField.displayName) {
				value.canShow = false;
		    }
		});
		resetValues();
	}
	
	
	function loadData() {
		if($scope.availableFilterValues && $scope.availableFilterValues.length > 0) {
			$rootScope.showAjaxLoader = true;
			var data = {
					"searchQueries"	: $scope.availableFilterValues
				};
			HTTPConnection.post(URL.SEARCH_COMPANY, data, $scope.fieldsSearchsuccess, $scope.failure);
		} else {
			$scope.data = [];
		}
	}

	//on filter remove
	$scope.removeFilter = function(filterName) {
		angular.forEach($scope.fields, function(value, key) {
			if (value.displayName == filterName) {
				value.canShow = true;
			}
		});
		for (var i = $scope.availableFilters.length - 1; i >= 0; i--) {
			if ($scope.availableFilters[i].field == filterName) {
				$scope.availableFilters.splice(i, 1);
			}
		}
		for (var i = $scope.availableFilterValues.length - 1; i >= 0; i--) {
			if ($scope.availableFilterValues[i].name == filterName) {
				$scope.availableFilterValues.splice(i, 1);
			}
		}
		loadData();
	}

	$scope.addFilter = function() {
		validate();
		if($scope.errorMessage == null) {
			//format date
			if($scope.selectedField.searchFieldType.type == "date") {
				$scope.value =  DateUtils.formatForUI($scope.valueDate);
			}
			$scope.availableFilters.push(
					{
			            "field" : $scope.companyDropDownTxt,
			            "operator" : $scope.operatorDropDownTxt,
		                "value" : $scope.value,
		                "importance" : $scope.convertImportanceToString($scope.importance)
					}
			);
			$scope.availableFilterValues.push(
					{
			            "field" : $scope.selectedField.solrFieldName,
			            "operator" : $scope.selectedOperator.searchOperator.operator,
		                "value" : $scope.value,
		                "importance" : $scope.convertImportanceToString($scope.importance).toLowerCase(),
		                "core" : $scope.selectedField.solrCore,
		                "name" : $scope.companyDropDownTxt
					}
			);
			hideSelectedField();
			loadData();
		}
	};

	function loadInitialData() {
		HTTPConnection.get(URL.SEARCH_FIELDS, $scope.fieldsSuccess, $scope.failure);
	} 
	
	$scope.openURL = function(url) {
		$window.open(url);
	}
	loadInitialData();
});