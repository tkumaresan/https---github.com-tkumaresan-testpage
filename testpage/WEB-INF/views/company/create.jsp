<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<script src="<c:url value="/resources/js/form-validator/jquery.form-validator.min.js" />"></script>
<script src="<c:url value="/resources/js/custom.js" />"></script>
<script src="<c:url value="/resources/js/jquery.form.js" />"></script>
<script src="<c:url value="/resources/js/loading-overlay.js" />"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/custom.css" />" />

<script>
$(document).ready(function() {

	$(":submit").click(function(event) {
    	var formId = "#add_company_form";
	    var initiatingElement = event.target;

		$.validate({
			form : formId,
			modules : 'location, date, security, file',
			onError : function() {
				$('#responseStatus').removeClass('success_msg').empty();
			},
			onSuccess : function() {
				ajaxFormSubmit(formId, initiatingElement.id);
				return false; // Will stop the submission of the form
			}
		});
	});

});
</script>

<div class="popup">
    <h4>
        Add Company<a href="#" title="Close" class="close-popup close-popup1">close</a>
    </h4>
    <form:form method="POST" action="/company/create.json" commandName="addCompanyDTO" id="add_company_form">
    <div class="form-block" id="add_company_section">
        <h5>Details</h5>

            <ul>
                <li>
                    <div class="fleft control-group controls">
                        <label for="Company Name" class="control-label">Company Name<span class="required">*</span></label>
                        <form:input path="name" id="company_name" data-validation="required length" data-validation-length="min3" data-validation-error-msg="Company name should be minimum 3 characters" />
                    </div>
                    <div class="control-group controls">
                        <label for="Website">Website<span class="required">*</span></label>
                        <form:input path="website" id="company_website" data-validation="required length" data-validation-length="min3" data-validation-error-msg="Company website address is required" />
                    </div>
                </li>
                <li>
                    <div class="fleft control-group controls">
                        <label for="Location">Location<span class="required">*</span></label> <span class="select-wrapper">
                        <form:select path="location" id="company_location" name="company_location" data-validation="required length" data-validation-length="min2" data-validation-error-msg="Please select one">
                            <form:option value="0" label="Select location" />
                            <form:option value="China" label="China" />
                            <form:option value="Europe" label="Europe" />
                            <form:option value="India" label="India" />
                            <form:option value="USA" label="USA" />
                            <form:option value="Others" label="Others" />
                        </form:select>
                        </span>
                    </div>
                    <div class="control-group controls">
                        <label for="Theme">Theme<span class="required">*</span></label> <span class="select-wrapper">
                        <form:select path="theme" id="company_theme" data-validation="required length" data-validation-length="min2" data-validation-error-msg="Please select one">
                            <form:option value="0" label="Select Theme" />
                            <form:option value="Advertisement & Analytics" label="Advertisement & Analytics" />
                            <form:option value="Connected Car" label="Connected Car" />
                            <form:option value="Hardware" label="Hardware" />
                            <form:option value="Location & Commerce" label="Location & Commerce" />
                            <form:option value="Media & Entertainment" label="Media & Entertainment" />
                            <form:option value="Mobile Enterprise" label="Mobile Enterprise" />
                        </form:select>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="fleft control-group controls">
                        <label for="Stage">Stage<span class="required">*</span></label> <span class="select-wrapper">
                        <form:select path="stage" id="company_stage" data-validation="required length" data-validation-length="min2" data-validation-error-msg="Please select one">
                            <form:option value="0" label="Select stage" />
                            <form:option value="Candidate" label="Candidate" />
                            <form:option value="Decline" label="Decline" />
                            <form:option value="Discussion" label="Discussion" />
                            <form:option value="Monitor" label="Monitor" />
                            <form:option value="Portfolio" label="Portfolio" />
                        </form:select>
                        </span>
                    </div>
                    <div class="control-group controls">
                        <label for="Owner">Owner<span class="required">*</span></label> <span class="select-wrapper">
                        <form:select path="owner" id="company_owner" data-validation="required length" data-validation-length="min2" data-validation-error-msg="Please select one">
                            <form:option value="0" label="Select owner" />
                            <form:option value="Annie" label="Annie" />
                            <form:option value="Anupam" label="Anupam" />
                            <form:option value="Bo" label="Bo" />
                            <form:option value="David" label="David" />
                            <form:option value="John" label="John" />
                            <form:option value="Kevin" label="Kevin" />
                            <form:option value="Lu" label="Lu" />
                            <form:option value="Paul" label="Paul" />
                            <form:option value="Upal" label="Upal" />
                            <form:option value="Vivek" label="Vivek" />
                            <form:option value="Walter" label="Walter" />
                            <form:option value="Yao" label="Yao" />
                        </form:select>
                        </span>
                    </div>
                </li>
            </ul>
            <h5>Social Media Links</h5>
            <ul>
                <li>
                    <div class="fleft">
                        <label for="Facebook">Facebook</label>
                        <form:input path="facebook" id="company_facebook" />
                    </div>
                    <div>
                        <label for="Crunchbase">Crunchbase</label>
                        <form:input path="crunchbase" id="company_crunchbase" />
                    </div>
                </li>
                <li>
                    <div class="fleft">
                        <label for="linkedIn">linkedIn</label>
                        <form:input path="linkedin" id="company_linkedin" />
                    </div>
                    <div>
                        <label for="Twitter">Twitter</label>
                        <form:input path="twitter" id="company_twitter" />
                    </div>
                </li>
                <li>
                    <div class="fleft">
                        <label for="iTune Store App">iTune Store App</label>
                        <form:input path="iosAppName" id="company_itune_store_app" />
                    </div>
                    <div>
                        <label for="Google Play App">Google Play App</label>
                        <form:input path="gpAppName" id="company_google_play_app" />
                    </div>
                </li>
                <li>
                    <div class="fleft"><span id="responseStatus"></span>&nbsp;</div>
                    <div>
                    <div>
                        <input type="submit" value="Create" class="blue-button" id="company_create">
                        <input type="submit" value="Create and Add another" class="grey-button" id="company_create_another">
                        <a href="#" title="Cancel" class="close-popup1">Cancel</a>
                    </div>
                    </div>
                </li>
            </ul>
<!--             <div id="target"></div>
            <p class="loading-spinner">
                <span class="loading-icon"></span> <span class="loading-text">loading</span>
            </p> -->
        </div>

    </form:form>
</div>
