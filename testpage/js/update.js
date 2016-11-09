//function to display company details based on companyId
function update(companyId){

	$.ajax({

		type : "GET",
		url : "/company/" + companyId,

		success : function(response) {

			var data = $(response).contents();
			$('#popup-box').html(data);
			 $('#updateCompanyForm').attr("action", "/company/update/" + companyId);

			// open the pop up
			$('#popup-box').fadeIn("fast");
			$('.popup').css({'margin-top':-($('.popup').outerHeight())/2});
		},
		error : function(e) {
			console.log('Error while getting company details: URI: /company/update/' + companyId);
		}
	});
}

//function to validate website in edit company form
function validate(){
	var website = document.getElementById('website').value;
	if(website.length == 0){
		document.getElementById('lblWebsite').innerHTML="Company website address is required";
		$('#lblWebsite').css("color","red");
		$('#lblWebsite').css("font-size","x-small");
		$('#lblWebsite').css("color","red");
		$('.website').css("border","1px solid red");
		return false;
	}else{
		document.getElementById('lblWebsite').innerHTML="";
		return true;
	}
}

