coalesceModule.directive('moreLess', function () {
    return {
    	restrict:'AE',
    	scope:{
    		hmtext : '@',
    		hmlimit : '@'
    	},
        template: 
            "<div ng-show='!hmfulltext'>" +
            	"<p>{{hmtext  | limitTo:hmlimit}}...</p>"+
	            "<a href ng-click=\"toggleValue()\" title=\"more\" class=\"t-margin less-btn\">" +
	            	"<span class=\"r-padding\">More</span>" +
	            	"<span class=\"more-arrow\">&nbsp;</span>" +
	            "</a>" +
            "</div>" +
            "<div ng-show=\"hmfulltext\">" +
        		"<p>{{hmtext}}</p>"+
	            "<a href ng-click=\"toggleValue()\" title=\"less\" class=\"t-margin less-btn\">" +
	            	"<span class=\"r-padding\">Less</span>" +
	            	"<span class=\"less-arrow\">&nbsp;</span>" +
	            "</a>" +
	        "</div>",
        transclude: true,
        controller : function($scope) {
        	  $scope.toggleValue=function() {
                    $scope.hmfulltext = !$scope.hmfulltext;
              };
        }
    };
});

coalesceModule.directive('moreLessPress', function () {
    return {
    	restrict:'AE',
    	scope:{
    		key : '=',
    		value : '='
    	},
        template: 
				"<h2>{{key}} ({{value.length}}) </h2>" +
				"<div ng-repeat=\"pressRelease in value | limitTo:3\" >" +
					"<div class=\"add_cnt\">" +
						"<a href=\"{{pressRelease.pressReleaseUrl}}\"" +
							"title=\"{{pressRelease.pressReleaseTitle}}{{pressRelease.count > 1 ? ' (' + pressRelease.count + ')' : ''}}\"" +
							"target=\"pressrelease_blank\"" +
							"class=\"pressrelease-title\">{{pressRelease.pressReleaseTitle}}{{pressRelease.count > 1 ? ' (' + pressRelease.count + ')' : ''}}</a>" +
						"<span class=\"date\">{{pressRelease.date}}</span>" +
					"</div>" +
				"</div>" +
				"<div ng-if='value.length > 3'>" +
					"<div ng-if= \"$index > 2\" ng-repeat=\"pressRelease in value\" ng-show=\"showFull\">" +
						"<div class=\"add_cnt\" >" +
							"<a href=\"{{pressRelease.pressReleaseUrl}}\"" +
								"title=\"{{pressRelease.pressReleaseTitle}}{{pressRelease.count > 1 ? ' (' + pressRelease.count + ')' : ''}}\"" +
								"target=\"pressrelease_blank\"" +
								"class=\"pressrelease-title\">{{pressRelease.pressReleaseTitle}}{{pressRelease.count > 1 ? ' (' + pressRelease.count + ')' : ''}}</a>" +
							"<span class=\"date\">{{pressRelease.date}}</span>" +
						"</div>" +
					"</div>" +
					"<a href class=\"pull-right\" ng-show=\"showFull\" ng-click=\"toggleValue()\">Less..</a>" +
					"<a href class=\"pull-right\" ng-show=\"!showFull\" ng-click=\"toggleValue()\">More..</a>" +
				"</div>",
        transclude: true,
        controller : function($scope) {
        	  $scope.toggleValue=function() {
                    $scope.showFull = !$scope.showFull;
              };
        }
    };
});


//Adjust the height if the widgets when the ng-repeat is finished
coalesceModule.directive('sameHeight', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                	$('.result-row-wrapper').each(function() {
    	    			var highestBox = 0;
    	    			$('.adjust-widget', this).each(function() {
    	    				if ($(this).height() > highestBox)
    	    					highestBox = $(this).height();
    	    			});
    	    			$('.adjust-widget', this).height(highestBox);
    	    		}); 
                });
            }
        }
    }
});

coalesceModule.directive("scroll", function ($window) {
    return {
        restrict: 'A',
	    link: function(scope, element, attrs) {
	        angular.element($window).bind("scroll", function() {
	             if (this.pageYOffset >= 100) {
	                 scope.scrolled = true;
	             } else {
	                 scope.scrolled = false;
	             }
	            scope.$apply();
	        });
	    }
    }
});
