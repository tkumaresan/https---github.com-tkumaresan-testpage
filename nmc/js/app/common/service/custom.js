/*
 * contains the required jquery customisation
 * this should be converted to angularjs  
 */
coalesceModule.service("Custom", ['$rootScope', function ($rootScope) {
	this.customUI = function () {

	    var checkbox = function () {
	        $("input[type='checkbox']:not('.mycheckbox')").each(function () {
	            $(this).wrap("<span class='check-wrapper'></span>");
	        });
	        $("input[type='checkbox']").change(function () {
	            if (this.checked) {
	                $(this).parent().addClass('checked');
					if($(this).closest('ul').hasClass('search-filter')){
						$(this).parent().next().addClass('bold');
					}
	            }
	            else { 
					$(this).parent().removeClass('checked'); 
					if($(this).closest('ul').hasClass('search-filter')){
						$(this).parent().next().removeClass('bold');
					}			
				}
	        }).trigger('change');
	    };
	
	    var selectbox = function () {
	        $("select").each(function () {
	            $(this).wrap("<span class='select-wrapper'></span>");
	            $(this).after("<span class='holder'></span>");
	        });
	        $("select").change(function () {
	            var selectedOption = $(this).find(":selected").text();
	            $(this).next(".holder").text(selectedOption);
	        }).trigger('change');
	    };
	
	    var selectall = function () {
	        $('.selectall').click(function (event) {
	            if (this.checked) {
	                $(this).closest('div').next().find('.checkbox1').each(function (index) {
	                    this.checked = true;
	                    $(this).parent().addClass('checked');
						$('ul.search-filter > li > label').addClass('bold');
	                });
	            } else {
	                $(this).closest('div').next().find('.checkbox1').each(function () {
	                    this.checked = false;
	                    $(this).parent().removeClass('checked');
						$('ul.search-filter > li > label').removeClass('bold');			
	                });
	            }
	        });
	    };
	    
	    var TogglingContent = function () {
	        $('.add-minus').click(function () {
	            $(this).closest('div').next().slideToggle();
	            $(this).toggleClass('add-icon');
	        });
	    };
		
	    var bootstrapDropdown = function() {
	    	// Display selected value
		    $(".dropdown-menu li a").click(function(){
		    	  var selText = $(this).text();
		    	  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
		    	});
	    }
	    var init = function () {
	        selectall();
	        checkbox();
	        selectbox();
	        TogglingContent();
	        bootstrapDropdown();
	    };
	
	    init();
	};
}]);	

indexModule.service("Custom", ['$rootScope', function ($rootScope) {
	  $('.add-minus').click(function () {
        $(this).closest('div').next().slideToggle();
        $(this).toggleClass('add-icon');
    });
}]);