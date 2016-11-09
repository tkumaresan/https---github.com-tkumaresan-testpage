coalesceModule.service('DataConversionService', function($rootScope){
	
	this.getFundRaiseChartData = function(data, totalFundRaise){
		var resultData = [];
		var chartColor = ["#1B6395","#C5C4C4", "#6DE2E2","#05395D","#EE7E34","#56D8CA","#149AE3", ];
		var colorCount = 0;
		if(data.length==1 && data[0].currentValue == "0"){
			resultData = [];
		}else{
			var raisedFund = 0;
			var unRaisedFund = 0;
			$.each(data, function(key, value){
				raisedFund += $rootScope.toMillion(parseInt(value.currentValue)) 
				var raisedFundObj = {
						"name": value.createdDate,
						"y":$rootScope.toMillion(parseInt(value.currentValue))?$rootScope.toMillion(parseInt(value.currentValue)):0,
						"color":chartColor[colorCount++]
				};
				resultData.push(raisedFundObj);
			});
			//Adding the data of unRaised fund to the chart
			unRaisedFund = $rootScope.toMillion(parseInt(totalFundRaise)) - raisedFund;
			var unRaisedFundObj = {
				"name": "Previous Rounds",
				"y":(unRaisedFund?unRaisedFund:0),
				"color":chartColor[colorCount++]
			}
			resultData.push(unRaisedFundObj);
		}
		return resultData;
	};
	
	this.getCompanyScaleChartData = function(data){
		var resultData = {};
	    var xAxisData = [];
	    var values = [];
		$.each(data, function(key, value){
			xAxisData.push(value.createdDate);
			values.push(parseInt(value.currentValue));
		})
	    
	    resultData['xAxisData'] = xAxisData;
	    resultData['data'] = values;
	    
		return resultData;
	};
})