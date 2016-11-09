function ajaxFormSubmit(formId, submitId) {
    var options = {
        success: processSuccessResponse(formId, submitId),  // post-submit callback
        clearForm: true,        // clear all form fields after successful submit
        resetForm: true,        // reset the form after successful submit
        // error: processErrorResponse,
        // $.ajax options can be used here too, for example:
        timeout:   3000
    };

    $(formId).ajaxSubmit(options);

    // !!! Important !!!
    // always return false to prevent standard browser submit and page navigation
    return false;
}

function processSuccessResponse(formId, submitId, responseText, statusText, xhr, $form)  {

	// $(formId).find('input:text, select').val('');
	// reset the select boxes

	if (submitId.toString() === 'company_create') {
		// var root = window.location.protocol + '//' + window.location.host;
		// var redirectURL = root + '/company/list';

		// window.location.replace(redirectURL);
		$('#popup-box').fadeOut("fast");
//	    $("#add_company_form")[0].reset();
//	    $('span.holder').text($("select option:first").text());
	}

	$('#responseStatus').html('Saved successfully.').addClass('success_msg');

    // enumerate(responseText);
}

function processErrorResponse(responseText, statusText, xhr, $form) {
	alert('Failed :: status: ' + statusText + '\n\nresponseText: \n' + responseText + '\n');
}

function enumerate(o,s){

    //if s isn't defined, set it to an empty string
    s = typeof s !== 'undefined' ? s : "";

    //iterate across o, passing keys as k and values as v
    $.each(o, function(k,v){

        //if v has nested depth
        if(typeof v == "object"){

            //write the key to the console
            console.log(s+k+": ");

            //recursively call enumerate on the nested properties
            enumerate(v,s+"  ");

        } else {

            //log the key & value
            console.log(s+k+": "+v);
        }
    });
}