var app = angular.module('dateCalApp',['ngQuickDate']);
app.config(function (ngQuickDateDefaultsProvider) {
    return ngQuickDateDefaultsProvider.set({
        closeButtonHtml: "<i class='fa fa-times'></i>",
        buttonIconHtml: "<i class='fa fa-clock-o'></i>",
        nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
        prevLinkHtml: "<i class='fa fa-chevron-left'></i>",
        // Take advantage of Sugar.js date parsing
        parseDateFunction: function (str) {
            d = Date.create(str);
            return d.isValid() ? d : null;
        }
    });
});

app.controller("example1Ctrl", function($scope){
	$scope.date1 = new Date();
	return $scope.date2 = null;
});