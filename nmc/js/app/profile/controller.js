coalesceModule.controller("CompanyProfileSummary", function($scope, $rootScope, URL, HTTPConnection, chartsService, ChartOptionsService, $location, UtilitiesService, DataConversionService) {
	
	$scope.showAlertHistory = false;
	$scope.showOpenJobs = false;
	$scope.collapsed = true;
    $scope.selectedAll = true;
    $scope.noResult = false;
    $scope.showCompanyScaleDetails = false;
    $scope.showFundRaiseDetails = false;
    $scope.showContactHistoryDetails = false;
    $scope.showGeneralInfoDetails = false;
	/*$rootScope.$broadcast("newPageLoaded");*/
    $scope.addClassForMetric = function(metricsName){
    	var className = "fa fa-map little-margin-right";
    	if(metricsName == 'Sub Industry')
    		className = "fa fa-industry little-margin-right";
    	if(metricsName == 'Website')
    		className = "web_icon fa fa-globe little-margin-right";
    	if(metricsName == 'Investment Summary')
    		className = "revenue_icon little-margin-right";
		if(metricsName == 'Link to Salesforce')
    		className = "fa fa-cloud little-margin-right";
		if(metricsName == 'Founded')
    		className = "fa fa-calendar little-margin-right";
		if(metricsName == 'Fundraising History')
    		className = "fa fa-line-chart little-margin-right";
		if(metricsName == 'Company Size / Scale')
    		className = "fa fa-group little-margin-right";
		if(metricsName == 'Contact History')
    		className = "fa fa-phone little-margin-right";
    	return className;
    }
    
	//Company details success function
	$scope.companyListSuccess = function(result){
		$rootScope.showAjaxLoader = false;
		$scope.noResult = false;
		$scope.showCompanyScaleDetails = true;
	    $scope.showFundRaiseDetails = true;
	    $scope.showContactHistoryDetails = true;
	    $scope.showGeneralInfoDetails = true;
		if(result.data.solrCompanyResponse.response.docs.length){
			$scope.companyDetails = result.data.solrCompanyResponse.response.docs[0];
			if(result.data.companyAlertDTO){
				$scope.alertHistory = true;
				$scope.alertHistoryDetails = result.data.companyAlertDTO; 
			}
			$scope.selectedAll = true;
			$scope.checkAllProfileGroups();
		}else{
			$scope.noResult = true;
			return false;
		}
		
		/* ---Chart data for the fund raising history --- */
		if($scope.alertHistoryDetails.otherAlerts['Mattermark Last Fund'])
			fundData = $scope.alertHistoryDetails.otherAlerts['Mattermark Last Fund'];
		else
			fundData = [{"alertType":"Mattermark Last Fund","currentValue":"0","previousValue":"","uplift":"0.0","createdDate":"No data"}];
		chartData = DataConversionService.getFundRaiseChartData(fundData, $scope.companyDetails.mm_total_fund);
	    chartOptions = ChartOptionsService.getFundRaisingChart(chartData, "", "", 250);
		chartOBJ = chartsService.donutChart.call($('#fundRaiseChart'),chartOptions, $scope);
		
		/* ---Chart data for the company scale/ size --- */
		if($scope.alertHistoryDetails.otherAlerts['LinkedIn Employee Count'])
			employeeCountData = $scope.alertHistoryDetails.otherAlerts['LinkedIn Employee Count'];
		else
			employeeCountData = [{"alertType":"LinkedIn Employee Count","currentValue":"0","previousValue":"","uplift":"0.0","createdDate":""}];
		chartData = DataConversionService.getCompanyScaleChartData(employeeCountData);
		chartOptions = ChartOptionsService.companyScaleLineChart(chartData, "", "Employees", 250);
		chartOBJ = chartsService.lineChart.call($('#companyScaleChart'),chartOptions, $scope);
		
		
	}
	var selectAllInitially = function(companyList){
		$.each(companyList, function(key, value){
			value.checked = true;
		})
		return companyList;
	}
	
	var getCompanyProfileList = function(){
		if(localStorage.getItem("profileGroupList")){
			var result = JSON.parse(localStorage.getItem("profileGroupList"));
			$scope.companyGroupList = result.data.companyProfileGroupDTOList;
		}
	}
	
	$scope.searchCompanyByName = function(){
		$scope.companyDetails = [];
		if(!$scope.searchString){
			return false;
		}
		$rootScope.showAjaxLoader = true;
		HTTPConnection.get(URL.SEARCH_BY_COMPANY_NAME+$scope.searchString, $scope.companyListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	}
	
	
	//Company profile group list success function
	$scope.companyProfileListSuccess = function(result){
		$scope.companyGroupList = result.data.companyProfileGroupDTOList;
		$scope.groupNames = [];
	}
	
	$scope.responseFailure = function(result){
		$rootScope.showAjaxLoader = false;
	}
	
	//Function to execute when checkbox is selected
	$scope.selectedCompanyGroup = function(groupList){
		if($scope.noResult){
			return false;
		}
		$.each($scope.companyGroupList, function(key, value){
			//to update the check/uncheck after 
			if($scope.companyGroupList[key].groupName == groupList){
				//$scope.companyGroupList[key].checked = !($scope.companyGroupList[key].checked);
				if(groupList == "Alert History")
					$scope.showAlertHistory = $scope.companyGroupList[key].checked;
				if(groupList == "Open Jobs")
					$scope.showOpenJobs = $scope.companyGroupList[key].checked;
			}
		})
		
		//call to update details in UI
		updateProfileDetails();
	}
	
	//Function to check/ uncheck all profile groups
	$scope.checkAllProfileGroups = function(){
		if($scope.companyDetails){
	        if ($scope.selectedAll) {
	            $scope.selectedAll = true;
	        } else {
	            $scope.selectedAll = false;
	        }
	        
			$.each($scope.companyGroupList, function(key, value){
				value.checked = $scope.selectedAll;
			})
			//call to update details in UI
			updateProfileDetails();
		}
	}
	
	
	//Function for updating the details to be displayed in UI
	var updateProfileDetails = function(){
		$scope.profileGroupArray = [];
		$scope.companyScaleDetails = {};
		$scope.showCompanyScaleDetails = false;
		$scope.showFundRaiseDetails = false;
		$scope.showContactHistoryDetails = false;
	    $scope.showGeneralInfoDetails = false;
		$.each($scope.companyGroupList, function(key, value){
			var profileDetailsList = [];
			if(value.checked == true && value.groupName != "Alert History" &&  value.groupName != "Open Jobs"){
				if(value.groupName == 'Company Size / Scale'){
					$scope.companyScaleDetails = value;
					$scope.showCompanyScaleDetails = true;
				}
				if(value.groupName == 'Fundraising History'){
					$scope.fundRaiseDetails = value;
					$scope.showFundRaiseDetails = true;
				}
				if(value.groupName == 'Contact History'){
					$scope.contactHistoryDetails = value;
					$scope.showContactHistoryDetails = true;
				}
				if(value.groupName == 'General Info'){
					$scope.generalInfoDetails = value;
				    $scope.showGeneralInfoDetails = true;
				}
				$scope.profileGroupArray.push(value);
				$.each(value.fields, function(obj, val){
					var addToData = true;
					$scope.website = $scope.companyDetails["website"];
					if(val.preferenceInternalName == "companyLogo"){
						$scope.generalInfoCompanyLogo = $scope.alertHistoryDetails[val.preferenceInternalName];
						addToData = false;
					}
					if(val.preferenceInternalName == "name"){
						$scope.generalInfoCompanyName = $scope.companyDetails[val.preferenceInternalName];
						addToData = false;
					}
					if(val.preferenceInternalName == "li_description"){
						$scope.generalInfoDescription = $scope.companyDetails[val.preferenceInternalName];
						addToData = false;
					}
					if(val.preferenceInternalName == "sfc_assigned"){
						$scope.generalInfoAccountOwner = $scope.companyDetails[val.preferenceInternalName];
						addToData = false;
					}
					if(val.preferenceInternalName == "sf_billing_city_state"){
						$scope.generalInfoLocation = $scope.companyDetails[val.preferenceInternalName];
						addToData = false;
					}
					if(addToData){
						var tempObj = {
								"displayName": val.preferenceDisplayName,
								"displayValue":$scope.companyDetails[val.preferenceInternalName]
						};
						profileDetailsList.push(tempObj);
						value.displayDetails = profileDetailsList;
					}
				})
			}
		})
	}
	
	var loadCompanyListById = function(companyId){
		$rootScope.showAjaxLoader = true;
		HTTPConnection.get(URL.SEARCH_BY_COMPANY_ID+companyId, $scope.companyListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	};
	
	var getCompanyIdInUrl = function(){
		var urlIndex = $location.search();
		var companyId = urlIndex.companyId;
		if(companyId){
			loadCompanyListById(companyId);
		}
	};
	
	//loadCompanyListById(2700);
	getCompanyProfileList();
	getCompanyIdInUrl();
	
});

coalesceModule.controller("CompanyProfileDetail", function($scope, $rootScope, HTTPConnection, URL) {
	$scope.answers = [];
	$scope.question;
	$scope.loadingResults;
	$scope.noResult = true;
	
	$scope.loadAnswers = function() {
		function success(response) {
			$scope.answers = response.data.answerDTOList;
			$scope.loadingResults = false;
			$scope.noResult = false;
			if($scope.answers.length) {
				$scope.showError = false;
			} else {
				$scope.showError = true;
			}
		}
		function failure(response) {
			$scope.loadingResults = false;
		}
		if($scope.question) {
			if(!$scope.loadingResults)
				HTTPConnection.get(URL.getAskWatson($scope.question), success, failure);
			$scope.noResult = true;
			$scope.loadingResults = true;
		}
		
	}
});
