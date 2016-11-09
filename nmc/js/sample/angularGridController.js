var app = angular.module('gridApp',['ngGrid']);

app.controller('gridController',function($scope){
	$scope.gridData = [{
        "li_type":"Privately Held",
        "li_logo_url":"https://media.licdn.com/media/p/2/000/289/2bc/2a49e0f.png",
        "domain_name":"vanillaforums.com",
        "li_job_count":0,
        "sf_next_step":"",
        "id":"13757",
        "li_is_active":true,
        "sf_revenue_range":"$0 - 10M",
        "sf_last_activity_date":"",
        "name":"Vanilla Forums",
        "li_founded":"2009",
        "li_linkedin_company_id":1531758,
        "li_size":"11-50 employees",
        "sf_last_activity_type":"",
        "sf_salesforce_account_id":"0013400001Jspo5",
        "li_description":"Vanilla Forums allows you to create an online community that your customers or audience will love. Thousands of companies use our open source and hosted products to increase loyalty, brand advocacy and reduce customer service costs. Vanilla's customers are made of a broad group of organizations from around the world.",
        "sf_is_active":true,
        "li_emp_count":20,
        "sf_billing_city_state":"Montreal - QC",
        "li_speciality":"Online Community, Hosted Forum, Social Community, Social Customer Service, Forum Software, Social Community",
        "sf_is_profiled":false,
        "sf_interest_level":"Uninteresting Now",
        "sf_follow_up_date":"6/15/2016",
        "website":"http://vanillaforums.com",
        "is_active":true,
        "sf_description":"Marketing.",
        "li_is_agency":false,
        "li_industry":"Internet",
        "sf_investment_summary":"6/15\" 20 ees",
        "sf_deal_type":"VC Backed",
        "_version_":1505581752567988237},
      {
        "li_type":"Privately Held",
        "li_logo_url":"https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAJBAAAAJDVkZTFlMzc4LTJhZTMtNGRjMy1hNWI4LWVkMWFkZjhjOGQ2ZQ.png",
        "sf_investment_summary_sentiment_score":0.307071,
        "li_status":"Operating",
        "domain_name":"mardenkane.com",
        "sf_next_step":"",
        "id":"6685",
        "li_is_active":false,
        "sf_revenue_range":"$0 - 10M",
        "sf_last_activity_date":"10/1/2014",
        "name":"Marden-Kane",
        "li_founded":"1957",
        "li_linkedin_company_id":104481,
        "li_size":"11-50",
        "sf_last_activity_type":"Completed Calls",
        "sf_salesforce_account_id":"0013000000IQIs9",
        "li_description":"Marden Kane is a full service promotion marketing agency specializing in the development and implementation of sweepstakes, contests, and instant win games.  We offer strategic consultation, creative, technical and administration services to client companies as well as other marketing service providers.",
        "sf_is_active":false,
        "sf_billing_city_state":"Manhasset - NY",
        "li_speciality":"Promotion Rules | Prize Fulfillment | Promotion Administration | Online Promotions | Microsites | Facebook Apps | Mobile Apps | Judging Tools | Moderation Tools | Data Security",
        "sf_is_profiled":true,
        "sf_investment_summary_sentiment":"positive",
        "sf_interest_level":"Uninteresting to Group",
        "sf_follow_up_date":"2/1/2013",
        "website":"http://www.mardenkane.com",
        "is_active":false,
        "sf_description":"Promotions marketing",
        "li_is_agency":false,
        "li_industry":"Marketing & Advertising ",
        "sf_investment_summary":"10/14: promotional agency, pure services",
        "sf_deal_type":"VC-Backed",
        "_version_":1505581751471177760}];
	
	$scope.mySelections = [];
	
	$scope.gridOptions = {
			data : 'gridData',
			enableCellSelection: true,
	        enableRowSelection: true,
	        enableCellEditOnFocus: true,
	        columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true}, 
	                     {field:'age', displayName:'Age', enableCellEdit: true}],
			jqueryUITheme: false,
			selectedItems: $scope.mySelections,
		    multiSelect: false
	};
});