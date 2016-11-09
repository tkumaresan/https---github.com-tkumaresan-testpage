'use strict';

var app = angular.module('chartsApp', [ 'highcharts-ng' ]);

app.controller('dataController', function($scope) {

	$scope.chartData = [{
				"id": "line",
				"type" : "line"
			}, {"id": "bar",
				"type" : "bar"
			}, {"id": "pie",
				"type" : "pie"
			}];
	
	$scope.chartdata = {
			"type":"bar",
			"title":"Testing",
			"subtitle" : "Testing subtitle",
			"chartSeries": [ {
					"name" : "Greg",
					"data" : [ 1,2,4 ],
				}, {
					"name" : "Wolf",
					"data" : [ 3,5,6],
				}, {
					"name" : "Steve",
					"data" : [ 4,6,6 ],
				}],
			"exportFeature" : true,
	};

	$scope.chartConfig = {
		options : {
			chart : {
				type : $scope.chartdata.type
			},
			plotOptions : {
				series : {
					stacking : ''
				}
			},
		},
		series : $scope.chartdata.chartSeries,
		title : {
			text : $scope.chartdata.title
		},
		credits : {
			enabled : true
		},
		subtitle: {
			text : $scope.chartdata.subtitle
		},
		loading : false,
		exporting : {
			enabled : $scope.chartdata.exportFeature
		}
	};
});