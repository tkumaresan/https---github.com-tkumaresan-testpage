/**
 * Common functions used by different modules
 */
coalesceModule.service('UtilitiesService', [function() {
	
	// breaks up the data into multiple array.	
	this.splitBySize = function(arr, size){
		var newArr = [];
	      for (var i=0; i<arr.length; i+=size) {
	          newArr.push(arr.slice(i, i+size));
	      }
	   return newArr;
	}
	
}]);