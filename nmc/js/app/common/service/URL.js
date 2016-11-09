coalesceModule.service('URL', ['DateUtils', function(DateUtils) {
	
	this.BASE_URL = "/";
	
	this.ALERT_LIST = this.BASE_URL + "alert/list.json?";
	this.ALERT_COMPANY_LIST = this.BASE_URL + "alert/getAlertCompanyList.json?";
	this.ALERT_MARK_FAV = this.BASE_URL + "alert/markCompanyAsFavorite.json";
	this.ALERT_MARK_UNFAV = this.BASE_URL + "alert/markCompanyAsUnFavorite.json";
	this.ALERT_MARK_BLOCKED = this.BASE_URL + "alert/markCompanyAsBlocked.json";
	this.SEARCH_COMPANY = this.BASE_URL + "search/company.json";
	this.SEARCH_BY_COMPANY_ID = this.BASE_URL + "search/companyById.json?companyId=";
	this.SEARCH_BY_COMPANY_NAME = this.BASE_URL + "search/companyByName.json?companyName=";
	this.SEARCH_FIELDS = this.BASE_URL + "userPreference/getSearchFields.json";
	this.CHANGE_PASSWORD = this.BASE_URL + "user/changePassword.json";
	this.GET_PREFERENCE_PROFILE_GROUPS = this.BASE_URL + "userPreference/getCompanyProfileGroup.json";
	this.ASK_WATSON = this.BASE_URL + "askwatson/answer.json?"
	this.SEND_VERIFICATION_CODE = this.BASE_URL + "sendVerificationEmail.json";
	this.CONFIRM_VERIFICATION_CODE = this.BASE_URL + "confirmVerificationEmail.json";
	this.LOGOUT = "j_spring_security_logout";
	
	/* User Model Urls*/
	this.USER_CONFIGURE_SEARCH = this.BASE_URL + "model/search.json";
	this.CREATE_MODEL = this.BASE_URL + "model/train.json"; 
	this.GET_MODEL_DETAILS = this.BASE_URL + "model/list.json";
	this.VALIDATE_MODEL_DETAILS = this.BASE_URL + "model/validate.json";
	this.UPDATE_MODEL_DETAILS = this.BASE_URL + "model/edit.json";
	this.DELETE_MODEL_DETAILS = this.BASE_URL + "model/delete.json";
	this.USER_CONFIGURE_SEARCH_TRAIN_MODEL = this.BASE_URL + "configureSearch/trainModel.json";
	
	/* Source related URLs */
	this.SOURCE_LIST = this.BASE_URL + "model/source.json"; 
	
	this.GET_PREFERENCE_BY_CATEGORY = this.BASE_URL + "preference/getByCategoryName.json";
	this.GET_ALL_PREFERENCES = this.BASE_URL + "userPreference/getAllPreferences.json"; 
	this.UPDATE_ALL_PREFERENCES = this.BASE_URL + "userPreference/updatePreferences.json";  
	this.UPDATE_PREFERENCE = this.BASE_URL + "userPreference/updatePreference.json";  
	
	
	this.buildURL = function(url, paramName, paramValue) {
		if(url.slice(-1) == "?") {
			return url + paramName + "=" + encodeURIComponent(paramValue);
		} else {
			return url + "&" + paramName + "=" + encodeURIComponent(paramValue);
		}
	}
	
	this.getAlertList = function(fromDate, toDate, pageNumber) {
		var url = this.ALERT_LIST;
		url = this.buildURL(url, "fromDate", DateUtils.formatForRequest(fromDate));
		url = this.buildURL(url, "toDate", DateUtils.formatForRequest(toDate));
		url = this.buildURL(url, "pageNumber", pageNumber);
		return url;
	}
	
	this.getAlertCompanyList = function(fromDate, toDate) {
		var url = this.ALERT_COMPANY_LIST;
		url = this.buildURL(url, "fromDate", DateUtils.formatForRequest(fromDate));
		url = this.buildURL(url, "toDate", DateUtils.formatForRequest(toDate));
		return url;
	}
	
	this.getAskWatson = function(question) {
		var url = this.ASK_WATSON;
		url = this.buildURL(url, "question", question);
		return url;
	}
	
}]);


indexModule.service('URL', function() {
	
	this.BASE_URL = "/";
	this.USER_PREFERENCE_LIST = this.BASE_URL + "user/preference/list.json";
	this.UPDATE_USER_PREFERENCE_LIST = this.BASE_URL + "user/preference/update.json";
	this.SEARCH_COMPANY_BY_ID = this.BASE_URL + "search/companyById.json";
	this.USER_PREFERENCE_LIST = this.BASE_URL + "user/preference/list.json";
	
});