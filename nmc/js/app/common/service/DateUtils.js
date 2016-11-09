coalesceModule.service('DateUtils', [function() {
	this.format = 'MM-dd-yyyy';
	
	this.now = function() {
		var now = moment();
		now.format(this.format)
		return now.toDate();
	}
	
	this.before = function(day) {
		var now = moment();
		now.format(this.format);
		now.subtract(day, 'days');
		return now.toDate();
	}
	
	//formats the date that the server expects
	this.formatForUI = function(date) {
		return moment(date).format("MM-DD-YYYY");
	}
	
	//formats the date that the server expects
	this.formatForRequest = function(date) {
		return moment(date).format("YYYY-MM-DD");
	}
	
	this.isBefore = function(start, end) {
		var startMom = moment(start);
		startMom.format(this.format);
		var endMom = moment(end);
		endMom.format(this.format);
		return startMom.isBefore(endMom);
	}
	this.getMomentFromResponse = function(date) {
		return moment(date);
	}
	
}]);