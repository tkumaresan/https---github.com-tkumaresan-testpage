$(document).ready(function() {

	/* Close Popup */
	$('.close-popup1').click(function() {
		$('#popup-box').fadeOut("fast");
	});
	/* open popup */
	$('.add-employee, .edit').click(function() {
		$('#popup-box').fadeIn("fast");
		$('.popup').css({
			'margin-top' : -($('.popup').outerHeight()) / 2
		});
		return false;
	});

	/* Custom Selectbox */
	$("select").each(function() {
		$(this).wrap("<span class='select-wrapper'></span>");
		$(this).after("<span class='holder'></span>");
	});
	$("select").change(function() {
		var selectedOption = $(this).find(":selected").text();
		$(this).next(".holder").text(selectedOption);
	}).trigger('change');

	$('.column-settings').click(function() {
		if ($('.setting-list').hasClass('hide') == true) {

			$('.setting-list').removeClass('hide');
		} else {
			$('.setting-list').addClass('hide');
		}
	});
	$('.column-expand').click(function() {
		expandColumn($(this).attr('rel'));
	});

	$('.rarrow').click(function(event) {
		rightNavigation($(this).attr('rel'));
	});

	$('.larrow').click(function(event) {
		leftNavigation($(this).attr('rel'));
	});

	$('.column-hide').click(function() {
		hideColumn($(this).attr('rel'));
	});

	$('.number-filter-link').click(function(e) {
		openNumberFilter($(this));
	});

	$('.date-filter-link').click(function() {
		openDateFilter($(this));
	});

	$('.flag a').click(function() {
		openFlagPopUp($(this).position());
	});

	$('input#flag-submit').click(function() {
		flagSubmit();
	});

	$('.sort-az').click(function() {
		sort($(this), 'ASC');
	});

	$('.sort-za').click(function() {
		sort($(this), 'DESC');
	});

	$('.filter-submit').click(function() {
		filterSubmit($(this));
	});

	$('.cancel').click(function() {
		filterCancel($(this));
	});

	$('.setting-list ul li input[type="checkbox"]').click(function() {
		openSettingsList($(this).attr("value"));
	});

	$("#homepaginator").change(function() {
		reloadByPageSize($(this));
	});

	$("#rfcpaginator").change(function() {
		reloadByPageSize($(this));
	});

	$('.setting-list ul li').each(function() {
		$(this).find("input").attr("checked", "true");
	});

	$("body").click(function(e) {
		closePopUps(e);
	});

	$('.filter-link').click(function() {
		openFilter($(this));
	});

	$('.selectAll').click(function() {
		selectAll($(this));
	});

	$('.prev').click(function() {
		navigate(false, true, false, null);
	});
	$('.next').click(function() {
		navigate(false, false, true, null);
	});
	$('.pageNum').click(function() {
		navigate(true, false, false, $(this));
	});

	$('.delete-company').click(function() {
		deleteCompany();
	});
	displayCurrentColumns();
	retainLeftSortFilterValues();

});

function displayCurrentColumns() {
	$('.header-column-value-right.emp1').removeClass('hide');
	$('.header-column-value-right.alexa1').removeClass('hide');
	$('.header-column-value-right.fb1').removeClass('hide');
	$('.header-column-value-right.twitter1').removeClass('hide');
	$('.header-column-value-right.cb1').removeClass('hide');
	$('.header-column-value-right.gp1').removeClass('hide');
	$('.xfund1').removeClass('hide');
}

function openFilter(current) {

	if (current.parent().hasClass('name')) {
		var pos = $('.header-column-left.name').position();
		var top = pos.top - 80;
		var left = pos.left - 6;
		if ($('.name-filter').hasClass('hide') == true) {
			$('.name-filter').removeClass('hide');
			$('.name-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.theme-filter').addClass('hide');
			$('.owner-filter').addClass('hide');
			$('.location-filter').addClass('hide');
			$('.stage-filter').addClass('hide');
		} else {
			$('.name-filter').addClass('hide');

		}
	}

	if (current.parent().hasClass('location')) {
		var pos = $('.header-column-left.location').position();
		var top = pos.top - 80;
		var left = pos.left + 5;
		if ($('.location-filter').hasClass('hide') == true) {
			$('.location-filter').removeClass('hide');
			$('.location-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.theme-filter').addClass('hide');
			$('.owner-filter').addClass('hide');
			$('.name-filter').addClass('hide');
			$('.stage-filter').addClass('hide');
		} else {
			$('.location-filter').addClass('hide');

		}
	}
	if (current.parent().hasClass('theme')) {
		var pos = $('.header-column-left.theme').position();
		var top = pos.top - 80;
		var left = pos.left - 10;
		if ($('.theme-filter').hasClass('hide') == true) {
			$('.theme-filter').removeClass('hide');
			$('.theme-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.name-filter').addClass('hide');
			$('.owner-filter').addClass('hide');
			$('.location-filter').addClass('hide');
			$('.stage-filter').addClass('hide');
		} else {
			$('.theme-filter').addClass('hide');

		}
	}
	if (current.parent().hasClass('owner')) {
		var pos = $('.header-column-left.owner').position();
		var top = pos.top - 80;
		var left = pos.left - 15;
		if ($('.owner-filter').hasClass('hide') == true) {
			$('.owner-filter').removeClass('hide');
			$('.owner-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.conpany-filter').addClass('hide');
			$('.theme-filter').addClass('hide');
			$('.location-filter').addClass('hide');
			$('.stage-filter').addClass('hide');
		} else {
			$('.owner-filter').addClass('hide');

		}
	}
	if (current.parent().hasClass('stage')) {
		var pos = $('.header-column-left.stage').position();
		var top = pos.top - 80;
		var left = pos.left - 15;
		if ($('.stage-filter').hasClass('hide') == true) {
			$('.stage-filter').removeClass('hide');
			$('.stage-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.conpany-filter').addClass('hide');
			$('.theme-filter').addClass('hide');
			$('.location-filter').addClass('hide');
			$('.owner-filter').addClass('hide');
		} else {
			$('.stage-filter').addClass('hide');

		}
	}
}

function closeFilterRight(classname, e) {
	var c = e.target.parentElement.className;
	if ($(e.target).parents(classname).length != 1
			&& datepickerClass.indexOf(c) == -1) {
		// Hide the popup
		$(classname).addClass('hide');
		$(classname + '.input').css('border-color', '#CCCCCC');
	}
}
function closePopUp(classname, e) {
	if ($(e.target).parents(classname).length != 1) {
		// Hide the popup
		$(classname).addClass('hide');

	}
}

function closeFilterLeft(e) {

	if ($(e.target).parents('.name-filter').length != 1) {
		// Hide the popup
		$('.name-filter').addClass('hide');

	} else {
		$('.location-filter').addClass('hide');
		$('.theme-filter').addClass('hide');
		$('.owner-filter').addClass('hide');
		$('.stage-filter').addClass('hide');
	}
	if ($(e.target).parents('.location-filter').length != 1) {
		// Hide the popup
		$('.location-filter').addClass('hide');

	} else {
		$('.name-filter').addClass('hide');
		$('.theme-filter').addClass('hide');
		$('.owner-filter').addClass('hide');
		$('.stage-filter').addClass('hide');
	}
	if ($(e.target).parents('.theme-filter').length != 1) {
		// Hide the popup
		$('.theme-filter').addClass('hide');

	} else {
		$('.location-filter').addClass('hide');
		$('.name-filter').addClass('hide');
		$('.owner-filter').addClass('hide');
		$('.stage-filter').addClass('hide');
	}
	if ($(e.target).parents('.owner-filter').length != 1) {
		// Hide the popup
		$('.owner-filter').addClass('hide');

	} else {
		$('.location-filter').addClass('hide');
		$('.theme-filter').addClass('hide');
		$('.name-filter').addClass('hide');
		$('.stage-filter').addClass('hide');
	}
	if ($(e.target).parents('.stage-filter').length != 1) {
		// Hide the popup
		$('.stage-filter').addClass('hide');

	} else {
		$('.location-filter').addClass('hide');
		$('.theme-filter').addClass('hide');
		$('.name-filter').addClass('hide');
		$('.owner-filter').addClass('hide');
	}
}

function filterCancel(current) {
	var className = current.attr('class').split((/\s+/));
	var filter = className[1];
	if (filter == 'number' || filter == 'date') {
		filter = $('.' + filter + '-filter input.sortBy').val();
	}
	var index = fby.indexOf(filter);
	if (index > -1) {
		fby.splice(index, 1);
		fvalue.splice(index, 1);
	}
	filterBy = fby.join(';');
	filterVal = fvalue.join(';');

	if (filterVal && filterBy) {
		window.location.href = "/company/list?fBy=" + filterBy + "&fValue="
				+ encodeURIComponent(filterVal);
	} else {
		window.location.href = "/company/list";
	}
}

function filterSubmit(current) {
	var color = 'red !important';
	var filterVal = '';
	if (current.hasClass('number')) {
		filterBy = $('.number-filter input.sortBy').attr('value');
		if (!$('.number-filter input.min').val()) {
			$('.number-filter input.min-max.min').css('border-color', color);
			return false;
		} else if (!$('.number-filter input.max').val()) {
			$('.number-filter .input').css('border-color', color);
			return false;
		} else if (isNaN($('.number-filter input.min').val())
				|| isNaN($('.number-filter input.max').val())) {
			$('.number-filter .input').css('border-color', color);
			return false;
		} else {
			filterVal = $('.number-filter input.min').val() + ","
					+ $('.number-filter input.max').val();

		}

	}
	if (current.hasClass('date')) {
		filterBy = $('.date-filter input.sortBy').attr('value');
		if (!$('.date-filter input.from').val()
				&& !$('.date-filter input.to').val()) {
			$('.date-filter .input').css('border-color', color);
			return false;
		} else {
			filterVal = $('.date-filter input.from').val() + ","
					+ $('.date-filter input.to').val();
		}
	}
	if (current.hasClass('name')) {

		filterBy = "companyId";
		filterVal = filterLeftSubmit('.name-filter');
	}
	if (current.hasClass('theme')) {
		filterBy = $('.theme-filter input.sortBy').attr('value');
		filterVal = filterLeftSubmit('.theme-filter');
	}
	if (current.hasClass('location')) {
		filterBy = $('.location-filter input.sortBy').attr('value');
		filterVal = filterLeftSubmit('.location-filter');
	}
	if (current.hasClass('owner')) {
		filterBy = $('.owner-filter input.sortBy').attr('value');
		filterVal = filterLeftSubmit('.owner-filter');
	}
	if (current.hasClass('stage')) {
		filterBy = $('.stage-filter input.sortBy').attr('value');
		filterVal = filterLeftSubmit('.stage-filter');
	}

	updateFilterValues(filterBy, filterVal);
	if (fby.join() && fvalue.join()) {
		window.location.href = "/company/list?" + "fBy=" + fby.join(';')
				+ "&fValue=" + encodeURIComponent(fvalue.join(';'));
	} else {
		window.location.href = "/company/list";
	}

}
function updateFilterValues(filterBy, filterVal) {
	var index = fby.indexOf(filterBy);
	if (index > -1) {
		if (filterVal) {
			fvalue[index] = filterVal;
		} else {
			fby.splice(index, 1);
			fvalue.splice(index, 1);
		}

	} else {
		if ((fby.join() && fvalue.join()) && filterVal) {
			fby = fby.concat(filterBy);
			fvalue = fvalue.concat(filterVal);
		} else {
			fby[0] = filterBy;
			fvalue[0] = filterVal;
		}
	}
}

function filterLeftSubmit(filterName) {
	var filterVal = '';

	$(filterName + ' input.filterCheckBox').each(function() {
		if ($(this).is(':checked')) {
			filterVal = filterVal + $(this).attr('value') + ",";
		}
	});

	return filterVal;
}

// deselets the file to be uploaded
function clearFile() {
	var file = document.getElementById("file");
	file.value = file.defaultValue;
}

function datePicker() {
	$('#filterDate').datepicker({
		maxDate : new Date(),
		changeMonth : true,
		changeYear : true,
		dateFormat : "yy-mm-dd",
		yearRange : "-100:+0"

	});

	$('#tofilterDate').datepicker({
		maxDate : new Date(),
		changeMonth : true,
		changeYear : true,
		dateFormat : "yy-mm-dd",
		yearRange : "-100:+0"

	});

}

function selectAll(current) {

	$('.' + current.val() + '-filter input.filterCheckBox').each(function() {
		if (current.is(':checked')) {
			this.checked = true;
		} else {
			this.checked = false;
		}
	});
}

function sort(current, sortOrder) {

	if (current.parent().hasClass('number')) {
		sortField = $('.number-filter input.sortBy').attr('value');
	}
	if (current.parent().hasClass('date')) {
		sortField = $('.date-filter input.sortBy').attr('value');
	}
	if (current.parent().hasClass('left-filter')) {
		sortField = $(current.parent().parent().find('input.sortBy')).attr(
				'value');
	}

	var pathname = window.location.href;
	if (pathname.indexOf('sBy') != -1) {
		pathname = pathname.substring(0, pathname.indexOf('&sBy'));
	}
	if (pathname.indexOf('?') == -1) {
		window.location.href = pathname + '?sBy=' + sortField + '&sOrder='
				+ sortOrder;
	} else {
		window.location.href = pathname + '&sBy=' + sortField + '&sOrder='
				+ sortOrder;
	}

}

function retainLeftSortFilterValues() {

	if (sOrder == 'ASC') {
		$('.' + sBy + '-filter ul li.sort-az').addClass('active');
	}
	if (sOrder == 'DESC') {
		$('.' + sBy + '-filter ul li.sort-za').addClass('active');
	}
	fby.forEach(function(element, index, array) {
		var fvals = fvalue[index].split(',');
		fvals.forEach(function(ele, valIndex, array) {
			$('.' + fby[index] + '-filter input.filterCheckBox').each(
					function() {
						if ($(this).val() == ele) {
							this.checked = true;
						}
					});
		});
	});
}

function retainRightSortFilterValues(fieldName, isDate) {

	if (fieldName == sBy && sOrder == 'ASC') {
		if (isDate) {
			$('.date-filter ul li.sort-az').addClass('active');
		} else {
			$('.number-filter ul li.sort-az').addClass('active');

		}
	} else if (fieldName == sBy && sOrder == 'DESC') {
		if (isDate) {
			$('.date-filter ul li.sort-za').addClass('active');
		} else {
			$('.number-filter ul li.sort-za').addClass('active');
		}
	}
	fby.forEach(function(element, index, array) {
		var fvals = fvalue[index].split(',');
		if (fieldName == element && isDate) {
			$('.date-filter input.from').val(fvals[0]);
			$('.date-filter input.to').val(fvals[1]);
		} else if (fieldName == element) {
			$('.number-filter input.min-max.min').val(fvals[0]);
			$('.number-filter input.min-max.max').val(fvals[1]);
		}
	});

}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
			.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g,
			" "));
}
function leftNavigation(className) {
	var index = 0;
	var n = $('.' + className + '_months').size();
	if ($('.' + className + 1).hasClass('hide') == false) {
		return false;
	}
	for ( var i = 1; i <= n; i++) {
		if ($('.' + className + i).hasClass('hide') == false) {
			index = i;
			$('.' + className + i).addClass('hide');
		}
	}
	if (index - 3 <= 1) {
		endIndex = 1;
		index = index - 1;

	} else {
		index = index - 3;
		endIndex = (index - 3) + 1;
	}

	for ( var i = index; i >= endIndex; i--) {
		$('.' + className + i).removeClass('hide');

	}

	$(".scroll-pane").mCustomScrollbar("update");
	return true;
}
function rightNavigation(className) {
	var index = 0;
	var n = $('.' + className + '_months').size();
	if ($('.' + className + n).hasClass('hide') == false) {
		return false;
	}
	for ( var i = 1; i <= n; i++) {
		if ($('.' + className + i).hasClass('hide') == false) {
			index = i;
			$('.' + className + i).addClass('hide');
		}
	}

	if (index + 3 <= n) {
		endIndex = index + 3;
		index = index + 1;
	} else {
		endIndex = n;
		index = n - 2;
	}

	for ( var i = index; i <= endIndex; i++) {
		$('.' + className + i).removeClass('hide');

	}

	$(".scroll-pane").mCustomScrollbar("update");
	return true;
}

function expandColumn(className) {
	var n = $('.' + className + '_months').size();
	$('.' + className + '_hide').removeClass('hide');
	$('.' + className + '_show').addClass('hide');
	if (n - 3 > 0) {
		endIndex = 3;
	} else {
		endIndex = n;
	}
	for ( var i = 1; i <= endIndex; i++) {
		$('.' + className + i).removeClass('hide');
	}
	$('.' + className + '-column-value').addClass(className + '_expand_value');
	$('.' + className + '-column-value').removeClass(className + '_hide_value');

	$('.header-column-value-right.' + className).removeClass(
			className + '_hide_value');
	$('.header-column-value-right.' + className).addClass(
			className + '_expand_inner_value');

	$('.header-column-right.' + className).addClass(
			className + '_expand_column');
	$('.header-column-right.' + className).removeClass(
			className + '_hide_column');

	$('.' + className + '-header-months').addClass('header-months-border');

	$(".scroll-pane").mCustomScrollbar("update");
	return false;
}

function hideColumn(className) {
	var n = $('.' + className + '_months').size();
	for ( var i = 1; i <= n; i++) {
		$('.' + className + i).addClass('hide');
	}
	$('.' + className + '_hide').addClass('hide');
	$('.' + className + '_show').removeClass('hide');

	$('.' + className + '-column-value').addClass(className + '_hide_value');
	$('.' + className + '-column-value').removeClass(
			className + '_expand_value');

	if (className != 'xfund') {
		$('.header-column-value-right.' + className).addClass(
				className + '_hide_value');
		$('.header-column-value-right.' + className).removeClass(
				className + '_expand_inner_value');
	}

	$('.header-column-right.' + className).addClass(className + '_hide_column');
	$('.header-column-right.' + className).removeClass(
			className + '_expand_column');
	$('.' + className + '-header-months').removeClass('header-months-border');

	displayCurrentColumns();

	$(".scroll-pane").mCustomScrollbar("update");
	return false;
}

function openNumberFilter(filtObject) {
	var field = filtObject.attr('rel').split(/\s+/);
	var className = filtObject.attr('class').split(/\s+/);
	var pos = $('.' + className[2]).position();
	var top = pos.top + 20;
	var left;
	if (className.toString().search("xfund") > -1) {
		left = pos.left - 32 + $('.mCSB_container').position().left + 89;
	} else {
		left = pos.left - 32 + $('.mCSB_container').position().left;
	}

	if ($('.number-filter').hasClass('hide') == false) {
		if ($('.number-filter input.sortBy').attr('value') == field[1]) {
			$('.number-filter').addClass('hide');
			$('.number-filter .input').css('border-color', '#CCCCCC');
		} else {
			$('.number-filter').css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			$('.number-filter .input').css('border-color', '#CCCCCC');
		}

	} else {
		$('.number-filter').removeClass('hide');
		$('.number-filter').css({
			'top' : top + 'px',
			'left' : left + 'px'
		});
	}

	$('.number-filter input.sortBy').attr('value', field[1]);
	retainRightSortFilterValues(field[1], false);
}

function openDateFilter(filterObj) {
	datePicker();
	var field = filterObj.attr('rel');
	var pos = filterObj.position();
	var top = pos.top + 20;
	var left = pos.left + $('.mCSB_container').position().left - 37;
	if ($('.date-filter').hasClass('hide') == false) {
		$('.date-filter').addClass('hide');
		$('.date-filter .input').css('border-color', '#CCCCCC');

	} else {
		$('.date-filter').removeClass('hide');
		$('.date-filter').css({
			'top' : top + 'px',
			'left' : left + 'px'
		});
	}
	$('.date-filter input.sortBy').attr('value', field);
	retainRightSortFilterValues(field, true);
}

function openFlagPopUp(flagPos) {
	var top = flagPos.top + 20;
	var left = flagPos.left;
	if ($('.flag-list-pop').hasClass('hide') == true) {
		$('.flag-list-pop').removeClass('hide');
		$('.flag-list-pop').css({
			'top' : top + 'px',
			'left' : left + 'px'
		});
	} else {
		$('.flag-list-pop').addClass('hide');
	}
}

function navigate(isPage, isPrevious, isNext, current) {
	var pathname = window.location.href;

	if (pathname.indexOf('pNo') != -1) {
		pathname = pathname.substring(0, pathname.indexOf('&pNo'));
	}
	if (pathname.indexOf('del') != -1) {
		pathname = pathname.substring(0, pathname.indexOf('del'));
	}
	if (isPage) {
		page = current.attr('class').split((/\s+/))[1];
	}
	if (isPrevious) {
		page = parseInt(currentPage) - parseInt(1);
	}
	if (isNext) {
		page = parseInt(currentPage) + parseInt(1);
	}

	if (pathname.indexOf('?') == -1) {
		window.location.href = pathname + '?pNo=' + page + '&pSize=' + pageSize;
	} else {
		window.location.href = pathname + '&pNo=' + page + '&pSize=' + pageSize;
	}
}

function flagSubmit() {
	var name = "";
	$('input#flag').each(function() {
		if ($(this).is(':checked')) {
			name = name + "," + $(this).attr('value');
		}
	});
	if (name) {
		var companyId = $('input#companyId').attr('value');
		var params = {
			companyId : companyId,
			flagStatus : name
		};
		$.ajax({
			contentType : "application/json",
			type : "POST",
			url : "update/flagStatus.json",
			data : JSON.stringify(params),
			async : false,
			cache : false,
			success : function(data) {
				$('.flag-list-pop').addClass('hide');
			}
		});
	}
}

function reloadByPageSize(currentSelector) {
	var selectedOption = currentSelector.find(":selected").text();
    if (currentSelector.attr('id') == 'rfcpaginator') {
            window.location.href = "/company/listflagged?pNo=1&pSize="
                            + selectedOption;
    } else {
            window.location.href = "/company/list?pNo=1&pSize=" + selectedOption;
    }
}

function openSettingsList(className) {
	$('.' + className).each(function() {
		if ($(this).hasClass('hide') == false) {
			$(this).toggle();
		}
	});
	if ($('.' + className).parent().hasClass('header-row-right') == false) {
		if ($(this).prop('checked') == true) {

			var pos = $('.' + className).width();
			var tableleft = $('.table-left').width();
			var tableright = $('.table-right').width();
			$('.table-left').width(tableleft + pos);
			$('.table-right').width(tableright - pos - 1);
		} else {

			var pos = $('.' + className).width();
			var tableleft = $('.table-left').width();
			var tableright = $('.table-right').width();
			$('.table-left').width(tableleft - pos);
			$('.table-right').width(tableright + pos - 1);

		}
	}
	$(".scroll-pane").mCustomScrollbar("update");
}

function closePopUps(e) {
	if ($(e.target).parents(".column-settings").length == 0
			&& !$(e.target).is(".column-settings")) {
		closePopUp('.setting-list', e);

	}
	if ($(e.target).parents(".number-filter-link").length == 0
			&& !$(e.target).is(".number-filter-link")) {
		closeFilterRight('.number-filter', e);

	}
	if ($(e.target).parents('.filter-link').length == 0
			&& !$(e.target).is('.filter-link')) {
		closeFilterLeft(e);

	}
	if ($(e.target).parents('.date-filter-link').length == 0
			&& !$(e.target).is('.date-filter-link')) {
		closeFilterRight('.date-filter', e);
	}

	if ($(e.target).parents('.flag').length == 0 && !$(e.target).is('.flag')) {
		closePopUp('.flag-list-pop', e);

	}

}

function deleteCompany() {
	var companyId = '';
	var companyName = '';
	$('input#delete-companyId').each(function() {
		if ($(this).is(':checked')) {
			companyId = companyId + $(this).attr('value') + ",";
			companyName = companyName + $(this).attr('rel') + ",";
		}
	});
	companyId = companyId.substring(0, companyId.length - 1);
	companyName = companyName.substring(0, companyName.length - 1);
	if (companyId) {
		if (confirm("Are you sure want to delete these companies ? "
				+ companyName)) {
			window.location.href = '/company/delete/' + companyId;
		}
	} else {
		alert("Please select companies to delete");
	}
}

var datepickerClass = [
		'ui-datepicker-prev ui-corner-all ui-state-hover ui-datepicker-prev-hover',
		'ui-datepicker-next ui-corner-all ui-state-hover ui-datepicker-next-hover',
		'ui-datepicker-title',
		'ui-datepicker-next ui-corner-all ui-state-disabled ui-state-hover ui-datepicker-next-hover',
		'ui-datepicker-prev ui-corner-all ui-state-disabled ui-state-hover ui-datepicker-prev-hover' ];

var sBy = getParameterByName('sBy');
var sOrder = getParameterByName('sOrder');
var fby = getParameterByName('fBy').split(';');
var fvalue = getParameterByName('fValue').split(';');