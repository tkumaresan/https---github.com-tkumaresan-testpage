coalesceModule.controller("myalert", function($scope, $rootScope, $sce, HTTPConnection, URL, DateUtils) {
	
	$scope.fromDate = DateUtils.before(7);
	$scope.toDate = DateUtils.now();
	//1 years
	$scope.minDate = DateUtils.before(365);
	$scope.maxDate = DateUtils.now();
	$scope.format = DateUtils.format;

	$scope.errorMessage; // display error message based on the flag
	$scope.loadingResults = false; // flag to check if the alert is being loaded
	$scope.isFromOpened = false;
	$scope.isToOpened = false;
	$scope.dateOptions = {
			    startingDay: 1
			  };
	// by default page number is zero	
	$scope.pageNumber = 0;
	$scope.companies = [];
	$scope.tempStoreCompanies = null;
	var filter;

	$scope.isPositive = function(val) {
		return !(val.indexOf("-") > -1);
	};

	// https://github.com/angular-ui/ui-select/wiki/FAQs - Error: [$sce:unsafe]
	$scope.trustAsHtml = function(value) {
		  return $sce.trustAsHtml(value);
		};
		
	// used by the date picker
	$scope.open = function($event, text) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    if(text == "from") {
		    	$scope.isFromOpened = true;
		    	$scope.isToOpened = false;
		    } else {
		    	$scope.isToOpened = true;
		    	$scope.isFromOpened = false;
		    }
		  };

	// filters dropdown in the UI
    // filters the result based on the selection
	$scope.filter = function(filterOption) {
		filter = filterOption;
		if(angular.equals(filterOption, "salesforce")) {
			angular.forEach($scope.companies, function(company, key) {
					if(!company.salesforce) {
						company.hide = true;
					} else {
						company.hide = false;
					}
				});
		} else if(angular.equals(filterOption, "fav")) {
			angular.forEach($scope.companies, function(company, key) {
				if(!company.favorite) {
					company.hide = true;
				} else {
					company.hide = false;
				}
			});
		} else {
			angular.forEach($scope.companies, function(company, key) {
				company.hide = false;
			});
		}
		updateIndex();
	}
	
	// Update index for the companies so that they can be displayed in the UI in order
	function updateIndex() {
		var index = 0;
		angular.forEach($scope.companies, function(company, key) {
			if(!company.hide) {
				company.index = ++index;
				angular.forEach(company.alerts, function(alert, key) {
					angular.forEach(alert.otherAlerts, function(otherAlert, key) {
						if(otherAlert.alertType == 'LinkedIn Employee Count' && angular.isUndefined(otherAlert.employeeUplift)) {
							company.employeeUplift = otherAlert.uplift;
						}
						if(otherAlert.alertType == 'LinkedIn Job Count' && angular.isUndefined(otherAlert.jobPostingUplift)) {
							company.jobPostingUplift = otherAlert.uplift;
						}
					});
				});
			}
		});
	}
	
	function companyListSuccess(response) {
		// to retian while click all option
		if($scope.tempStoreCompanies == null) {
			$scope.tempStoreCompanies = $scope.companies;
		}
		$scope.companies = [response.data.companyAlertDTO];
	}
	$scope.loadCompanyInfo = function($item, $model) {
		var companyId = $item.companyId;
		var selText = $('#' + companyId).text();
		if(companyId == 0) {
			if($scope.tempStoreCompanies) {
				$scope.companies = $scope.tempStoreCompanies; 
				$scope.tempStoreCompanies = null;
				$scope.selectedCompany = null;
			}
			return true;
		}
		HTTPConnection.get(URL.SEARCH_BY_COMPANY_ID+companyId, companyListSuccess);
	}
	
	// mark the company as favorite
	$scope.markAsFav = function(companyId, booleanValue) {
		function markAsFavSuccess() {
			if($scope.companies) {
				// moved the marked company to the top
				var selectedCompany = null;
				angular.forEach($scope.companies, function(company, key) {
					if(company.companyId == companyId) {
						selectedCompany = company;
					}
				});
				angular.forEach($scope.companies, function(company, key) {
					if(company.companyId == selectedCompany.companyId) {
						company.index = 1;
						// turn on the favorite flag
						company.favorite = true;
					} else if(company.index <= selectedCompany.index) {
						company.index = company.index + 1;
					}
				});
			}
		}
		function markAsUnFavSuccess() {
			if($scope.companies) {
				// moved the marked company to the top
				var selectedCompany = null;
				var selectedCompanyIndex = 0;
				var movetoIndex = 0;
				angular.forEach($scope.companies, function(company, key) {
					if(company.companyId == companyId) {
						selectedCompany = company;
						selectedCompanyIndex = company.index;
					}
					if(company.favorite == false && movetoIndex==0) {
						movetoIndex = company.index - 1;
					}
				});
				
				angular.forEach($scope.companies, function(company, key) {
					if(company.companyId == selectedCompany.companyId) {
						company.index = movetoIndex;
						company.favorite = false;
					}
					if(company.index > selectedCompanyIndex && company.index <= movetoIndex && company.companyId != selectedCompany.companyId){
						company.index = company.index - 1;
					}
				});
			}
		}
		function markAsFavFavFailure() {
			alert("Unable to mark the company as favorite");
		}
		function markAsUnFavFailure() {
			alert("Unable to mark the company as Unfavorite");
		}
		var data = {
				"companyId" : companyId	
			};
		if(!booleanValue){
			HTTPConnection.post(URL.ALERT_MARK_FAV, data, markAsFavSuccess, markAsFavFavFailure);
		}
		else{
			HTTPConnection.post(URL.ALERT_MARK_UNFAV, data, markAsUnFavSuccess, markAsUnFavFailure);
		}
	}
	
	// mark the company as blocked 
	$scope.markAsBlocked = function(companyId) {
		
		function markAsBlockSucess() {
			//Remove the blocked company from UI
			angular.forEach($scope.companies, function(company, key) {
				if(company.companyId == companyId) {
					$scope.companies.splice(key,1);
				}
			});
			updateIndex();
		}
		function markAsBlockFailure() {
			alert("Unable to block the company");
		}

		var data = {
			"companyId" : companyId	
		};
		HTTPConnection.post(URL.ALERT_MARK_BLOCKED, data, markAsBlockSucess, markAsBlockFailure);
	}
	
	function validateInput() {
		if(!$scope.fromDate || !$scope.fromDate) {
			$scope.errorMessage = "Please provide a valid date range.";
		} else if (DateUtils.isBefore($scope.toDate, $scope.fromDate)) {
			$scope.errorMessage = "Please provide a valid date range. End date is before start date.";
		} else {
			$scope.errorMessage = null;
		}
	}
	
	function success(response) {
		if($scope.pageNumber == 1) {
			$scope.companies = response.data.companyAlertHolderDTO.companyAlertDTOs;
		} else {
			// append the results
			$scope.companies = $scope.companies.concat(response.data.companyAlertHolderDTO.companyAlertDTOs);
			// if the data is empty means there is no more data to dispaly
			if(response.data.companyAlertHolderDTO.companyAlertDTOs.length == 0) {
				$scope.reachedLastPage = true;
			}
		}
		$scope.loadingResults = false;
		if($scope.companies.length == 0) {
			$scope.errorMessage = "No alerts found for the selected date range.";
		} else {
			$scope.filter(filter);
			$scope.errorMessage = null;
		}
	}
	
	function companyListInitialSuccess(response) {
		var dataArray = response.data.simpleCompanyDTOList.sort(function(a, b){return a.companyName.localeCompare(b.companyName)});
		// on the initial load list of companies will be available in the 
		$scope.companyList = [{"companyName" : "All", "companyId" : 0}].concat(dataArray);
	}
	
	// search based on the selected date
	$scope.search = function(pageNum) {
		if(pageNum == 1){
			loadCompanyList();
		}
		// restrict concurrent search
		if(!$scope.loadingResults) {
			validateInput();
			if(!$scope.errorMessage) {
				// if page number is sent then use that
				// page number will be available only when the search icon is clicked
				if(pageNum) {
					$scope.pageNumber = pageNum;
					$scope.reachedLastPage = false;
				} else {
					// if reachedLastPage is true then make no more calls. Since data will nor available
					if($scope.reachedLastPage) {
						return true;
					}
					$scope.pageNumber = $scope.pageNumber + 1;
				}
				$scope.loadingResults = true;
				HTTPConnection.get(URL.getAlertList($scope.fromDate, $scope.toDate, $scope.pageNumber), success);
			}
		}
	}
	
	function loadCompanyList(){
		HTTPConnection.get(URL.getAlertCompanyList($scope.fromDate, $scope.toDate), companyListInitialSuccess);
	}
	
	loadCompanyList();
	
});