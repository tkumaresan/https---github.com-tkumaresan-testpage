
<div id="formdiv">
    <div class="popup">
        <h4>
            ${company.name}<a href="/company/listflagged" title="Close" class="close-popup">close</a>
        </h4>
        <div class="form-block">
            <h5>Details</h5>
            <ul>
                <li>
                    <div class="fleft control-group controls">
                        <label for="Company Name">Company Name<span class="required">&#42;</span></label> <label>${company.name}</label>
                    </div>
                    <div class="control-group controls">
                        <label for="Website">Website<span class="required">&#42;</span></label><input type="text" id="website" name="website"
                            value="${company.website}" /> <label id="lblWebsite"></label>
                    </div>
                </li>

                <li>
                    <div class="fleft control-group controls">
                        <label for="Location">Location<span class="required">&#42;</span></label> <label>${company.location}</label>
                    </div>
                    <div class="control-group controls">
                        <label for="Theme">Theme<span class="required">&#42;</span></label> <label>${company.theme}</label>
                    </div>
                </li>

                <li>
                    <div class="fleft control-group controls">
                        <label for="Stage">Stage<span class="required">&#42;</span></label><label>${company.stage}</label>
                    </div>
                    <div class="control-group controls">
                        <label for="Owner">Owner<span class="required">&#42;</span></label> <label>${company.owner}</label>
                    </div>
                </li>
            </ul>

            <h5>Social Media Links</h5>
            <ul>
                <li>
                    <div class="fleft">
                        <label for="Facebook">Facebook</label> <input type="text" value="${company.facebook}" name="facebook" />
                    </div>
                    <div>
                        <label for="Crunchbase">Crunchbase</label> <input type="text" value="${company.crunchbase}" name="crunchbase" />
                    </div>
                </li>
                <li>
                    <div class="fleft">
                        <label for="linkedIn">linkedIn</label> <input type="text" value="${company.linkedin}" name="linkedin" />
                    </div>
                    <div>
                        <label for="Twitter">Twitter</label> <input type="text" value="${company.twitter}" name="twitter" />
                    </div>
                </li>
                <li>
                    <div class="fleft">
                        <label for="iTune Store App">iTune Store App</label> <input type="text" value="${company.iosAppName}" name="iosAppName" />
                    </div>
                    <div>
                        <label for="Google Play App">Google Play App</label> <input type="text" value="${company.gpAppName}" name="gpAppName" />
                    </div>
                </li>
                <li>
                    <div class="fleft">&nbsp;</div>
                    <div>
                        <div>
                            <input type="submit" value="Update" class="blue-button" /> <a href="/company/listflagged" title="Cancel">Cancel</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="overlay"></div>
</div>
