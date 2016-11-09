// DEVNOTE: review and remove this code
// JavaScript Document
$(document).ready(function() {
    
//	menudisplay();
//	
//	function menudisplay(){
//		$("#user_icon").click(function(e){
//			e.stopPropagation();		
//			$(this).toggleClass("samp");
//			
//		});
//		
//   
//	}

	/*
	//datepicker
	$('.datepicker').datepicker({
      format: 'mm-dd-yyyy'
    });
	*/
	
	// Custom Select
	var select = $('select');
	select.each(function() {
			var firstSelectedText = $(this).find(':selected').text();
			$(this).wrap('<div class="selectWrapper"/>');
			selectWrapper = $(this).parent();
			customSelectCont = $('<span class="customSelectCont"/>').appendTo(selectWrapper);      
			customSelectCont.text(firstSelectedText);
			$(this).change(function() {
				var newOption = $(this).find('option:selected').text()
				$(this).next(customSelectCont).text(newOption);
		  })             		
	});
	
	$(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
	

 
});


