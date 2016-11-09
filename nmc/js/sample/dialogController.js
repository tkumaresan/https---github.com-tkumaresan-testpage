var app = angular.module('dialogApp',['ngDialog']);

app.controller('dialogController',function($scope,$rootScope,ngDialog){
	$scope.sampleSubject = "Welcome Dialog";
	$scope.description = "Sample Description about the usage of angular dialog";
	$scope.dialogInformation = "To learn more about ngDialog go to";
	$scope.confirmClose = "To close click 'X' ";
	$rootScope.jsonData = '{"foo": "bar"}';
	$rootScope.theme = 'ngdialog-theme-default';
	$scope.dialogModel = {
			message : 'Data obtained from the controller file'
		};
	$scope.openConfirm = function () {
		ngDialog.openConfirm({
			template: 'modalDialogId',
			className: 'ngdialog-theme-default'
		}).then(function (value) {
			//console.log('Modal promise resolved.', value);
		}, function () {
			//console.log('Modal promise rejected.');
		});
	};
	$scope.openDialog = function(){
		ngDialog.openConfirm({
			template : 'sampleId',
			className : 'ngdialog-theme-default',
			scope: $scope
		});
	};
	$scope.openSecond = function () {
		ngDialog.open({
			template: '<p><a href="" class="dialog-padding" ng-click="closeSecond()">Close all by click here!</a></p>',
			plain: true,
			closeByEscape: false,
			closeByDocument: false,
			controller: 'SecondModalCtrl'
		});
	};
	$scope.openTimed = function () {
		var dialog = ngDialog.open({
			template: '<p class="dialog-padding">Just passing through! I will be closed automatically</p>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false
		});
		setTimeout(function () {
			dialog.close();
		}, 3000);
	};
	
});
app.controller('SecondModalCtrl', function ($scope, ngDialog) {
	$scope.closeSecond = function () {
		ngDialog.close();
	};
});