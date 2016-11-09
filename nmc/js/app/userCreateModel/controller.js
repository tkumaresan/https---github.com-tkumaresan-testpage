coalesceModule.controller("userModelController", function($scope, $rootScope, URL, HTTPConnection, growl, Custom) {
	$scope.showCreateModelButton = false;
	$scope.showSourceDropdown = false;
	$scope.modelSelected = [{"name":"Create Model","selected":true, "criteriaName":"Add Criteria"},{"name":"Validate Model","selected":false, "criteriaName":"Edit Criteria"},
	                        {"name":"Update Model","selected":false, "criteriaName":"Edit Criteria"},{"name":"Delete Model","selected":false, "criteriaName":"Delete Criteria"}];
	$scope.modelSelectedName = $scope.modelSelected[0].name;
	$scope.criteriaName =  $scope.modelSelected[0].criteriaName;
	var oldModelId = -1;
	var oldSourceId = -1;
	$scope.showListDropdown = false;
	$scope.showSaveModelButton = false;
	$scope.showSourceDropdown = false;
	$scope.modelDropDownText = "--Select a model--";
	$scope.validateRowCount = {};
	$scope.showValidateSaveBtn = false;
	$scope.showdeleteModelButton = false;
	var validateReqModel = {};
	$scope.validateRowCount.rowCount = 10;
	$scope.rowCount = 10;
	
	$scope.changeModelSelected = function(index){
		$scope.selectedModel({}, true);
		$.each($scope.modelSelected, function(key, value){
			value.selected = false;
			if(key == index){
				value.selected = true;
				$scope.modelSelectedName = value.name;
				$scope.criteriaName = value.criteriaName;
			}
		})
	}
	$scope.selectedSource = function(source){
		$scope.selectedSourceName = source.name;
	}
	$scope.sourceListSuccess = function(response){
		$scope.sourceListName = response.data.sourceDTOList;
		$scope.selectedSource($scope.sourceListName[0]);
	}
	$scope.yesNoOptionClicked = function(companySolrId){
		if($scope.modelSelected[0].selected){
			$.each($scope.configureSearchList.model.modelParagraphs, function(key, value){
				if($scope.configureSearchList.model.modelParagraphs[key].solrId == companySolrId){
					$scope.configureSearchList.model.modelParagraphs[key].flag = $scope.configureSearchList.model.modelParagraphs[key].flag == "YES"? "NO":"YES";
				}
			})
		}else{
			$.each($scope.selectedModelDetails.modelParagraphs, function(key, value){
				if($scope.selectedModelDetails.modelParagraphs[key].solrId == companySolrId){
					$scope.selectedModelDetails.modelParagraphs[key].flag = $scope.selectedModelDetails.modelParagraphs[key].flag == "YES"? "NO":"YES";
				}
			})
		}
	}
	
	$scope.mayBeOptionClicked = function(companySolrId){
		if($scope.modelSelected[0].selected){
			$.each($scope.configureSearchList.model.modelParagraphs, function(key, value){
				if($scope.configureSearchList.model.modelParagraphs[key].solrId == companySolrId){
					$scope.configureSearchList.model.modelParagraphs[key].flag = "MAY_BE_LATER";
				}
			})
		}else{
			$.each($scope.selectedModelDetails.modelParagraphs, function(key, value){
				if($scope.selectedModelDetails.modelParagraphs[key].solrId == companySolrId){
					$scope.selectedModelDetails.modelParagraphs[key].flag = "MAY_BE_LATER";
				}
			})
		}
	}
	
	function disableButtons(){
		 $scope.showValidateSaveBtn = false;
		 $scope.showSaveModelButton = false;
		 $scope.showdeleteModelButton = false;
	}
	
	$scope.selectedModel = function(modelDetails, resetModel){
		$scope.selectedModelRowCount = "";
		$scope.selectedModelDetails = [];
		if(resetModel == true){
			$scope.modelDropDownText = "--Select a model--";
			disableButtons();
			return false;
		}
		 $scope.modelDropDownText = modelDetails.name;
		 $scope.selectedModelFileName = modelDetails.modelFileLocation;
		 $scope.showdeleteModelButton = true;
		 $scope.showValidateSaveBtn = false;
		 $scope.showSaveModelButton = false;
		 if($scope.modelSelected[1].selected){
			 validateReqModel = modelDetails;
			 $scope.validateModel();
		 }
		 if($scope.modelSelected[2].selected){
			 $scope.selectedModelDetails = modelDetails;
			 $scope.selectedModelRowCount = modelDetails.modelParagraphs.length;
			 $scope.selectedSource(modelDetails.source);
			 $scope.showSaveModelButton = true;
		 }
	}
	
	$scope.validateModelSuccess = function(result){
		$scope.selectedModelDetails = result.data.model;
		$scope.selectedSource(result.data.model.source);
		$scope.showValidateSaveBtn = true;
		growl.success("Model Validated successfully");
	}
	$scope.configureSearchListSuccess = function(result){
		$scope.configureSearchList = result.data;
		if($scope.configureSearchList.model.modelParagraphs){
			$scope.showCreateModelButton = true;
		}
			}
	$scope.saveModelSuccess = function(result){
		$rootScope.$broadcast("loadModelList");
		growl.success("Model updated successfully");
	}
	
	
	$scope.getUpdateListSuccess = function(response){
		$scope.showListDropdown = true;
		$scope.modelNameList =  response.data.modelDTOList;
	}
	$scope.createModelSuccess = function(result){
		growl.success("Model created successfully");
		$rootScope.$broadcast("loadModelList");
	}
	
	$scope.responseFailure = function(result){
		$scope.selectedModelDetails = [];
		disableButtons();
		if(result.data.error.errors.length){
			growl.error(result.data.error.errors[0].cause);
		}else{
			growl.error("Something went wrong. Please try again later.");
		}
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
	
	
	$scope.configureSearch = function(){
		$scope.configureSearchList = [];
		$scope.showCreateModelButton = false;
		if($scope.rowCount < 5){
			growl.warning("No.of rows should be greater than or equal to 5")
			return false;
		}
		if(!$scope.includeKeywords || !$scope.modelName){
			growl.warning("Please enter model name and keywords to include!")
			return false;
		}
		
		var requestData = {
				"start":0,
				"rows":$scope.rowCount,
				"model":{
				"name":$scope.modelName,
				"source":{
				"name":$scope.selectedSourceName
				},
				"keywordsInclude":$scope.includeKeywords,
				"keywordsExclude":$scope.excludeKeywords,
				"modelParagraphs":[
				]
				}
				};
		HTTPConnection.post(URL.USER_CONFIGURE_SEARCH,requestData, $scope.configureSearchListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	};
	
	$scope.createModel = function(){
		var requestData = $scope.configureSearchList;
		HTTPConnection.post(URL.CREATE_MODEL, requestData, $scope.createModelSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	};
	 $scope.validateModel = function(){
		 var rowCount = 10;
		 if($scope.validateRowCount.rowCount){
			 rowCount = $scope.validateRowCount.rowCount;
		 }
		 if(rowCount < 5){
				growl.warning("No.of rows should be greater than or equal to 5")
				return false;
			}
		// $scope.selectedModelDetails.source.name = $scope.selectedSourceName;
		 var requestData = {
				 "start":0,
				 "rows": rowCount,
				 "model": validateReqModel
				 };
		HTTPConnection.post(URL.VALIDATE_MODEL_DETAILS, requestData, $scope.validateModelSuccess, $scope.responseFailure).then(function(result){
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
				if(success instanceof Function)
					success(result);
			});
		}
	 
	 $scope.saveUpdatedModel = function(){
		 var selectedSourceObj = {};
		 $.each($scope.sourceListName, function(key, value){
				if(value.name == $scope.selectedSourceName){
					selectedSourceObj = $scope.sourceListName[key];
				}
			})
		 $scope.selectedModelDetails.source = selectedSourceObj;
		 var requestData = $scope.selectedModelDetails;
		 HTTPConnection.post(URL.UPDATE_MODEL_DETAILS, requestData, $scope.saveModelSuccess, $scope.responseFailure).then(function(result){
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
				if(success instanceof Function)
					success(result);
			})
		}
	 
	 $scope.deleteModel = function(){
			var requestData = {
					"modelFileName":$scope.selectedModelFileName
			};
		HTTPConnection.post(URL.DELETE_MODEL_DETAILS, requestData, $scope.deleteModelSuccess, $scope.responseFailure).then(function(result){
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
				if(success instanceof Function)
					success(result);
			})
		}
	 
		$scope.deleteModelSuccess = function(result){
			growl.success("Model deleted successfully");
			$scope.modelDropDownText = "--Select a model--";
			$rootScope.$broadcast("loadModelList");
		}
	 
	function getModelList(){
		HTTPConnection.get(URL.GET_MODEL_DETAILS, $scope.getUpdateListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	}
	function getAvailableSourceList(){
		HTTPConnection.get(URL.SOURCE_LIST, $scope.sourceListSuccess, $scope.responseFailure).then(function(result){
			if(!result)
				throw {message: "No Response from Server!", type: "internal"};
			if(success instanceof Function)
				success(result);
		})
	}
	getAvailableSourceList();
    getModelList();
	$rootScope.$on("loadModelList", getModelList);

});
