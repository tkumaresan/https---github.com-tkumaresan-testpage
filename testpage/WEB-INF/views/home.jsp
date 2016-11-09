<!doctype html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta charset="utf-8">
<title>Aspire ATG</title>
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link rel="stylesheet" type="text/css"
	href="/resources/css/new_style.css" />
<link
	href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600'
	rel='stylesheet' type='text/css'>
<script src="/resources/js/jquery-1.10.2.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/jquery.mCustomScrollbar.js"></script>
<link href="/resources/css/jquery.mCustomScrollbar.css" rel="stylesheet" />
<script type="text/javascript"
	src="/resources/js/jquery.jscrollpane.min.js"></script>
<link rel="stylesheet"
	href="/resources/css/jquery-ui-1.10.3.custom.min.css">
<script src="/resources/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" id="sourcecode">
	var currentPage = '${companyPage.number}';
	var pageSize = '${companyPage.size}';

	(function($) {
		$(window).load(
				function() {
					$(".scroll-pane").mCustomScrollbar({
						horizontalScroll : true,
						scrollButtons : {
							enable : true
						},
						advanced : {
							autoExpandHorizontalScroll : true,
							updateOnBrowserResize : true
						},
					});

					$("#homepaginator").next(".holder").text(
							'${companyPage.size}');
					$('#homepaginator option:contains("${companyPage.size}")')
							.prop('selected', true);
				});
	})(jQuery);
</script>

<link type="text/css" href="/resources/css/jquery.jscrollpane.css"
	rel="stylesheet" media="all" />
<style type="text/css" id="page-css">
/* Styles specific to this particular page */
.scroll-pane {
	width: 100%;
	overflow: auto;
}
</style>
</head>
<body>
	<div class="content">
		<!-- header block -->
		<jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>
		<nav>
			<div class="wrapper">
				<ul>
					<li class="home-active active"><a href="#">Home</a></li>
					<li class="red-flag"><a href="/company/listflagged">Red
							Flag Company</a></li>
					<li class="upload"><a href="/bulkUpload">Bulk Upload</a></li>
					<li class="settings"><a href="/apiconfig/listAll">Settings</a></li>
					<li class="faq"><a href="/faq">FAQ</a></li>
				</ul>
			</div>
		</nav>
		<section class="border-top">
			<div class="wrapper">
				<div class="main">
					<div class="clearfix">
						<div class="fleft">
							<h2>Active Company List</h2>
							<p class="updated-date">Last Updated on ${latestDate}</p>
						</div>
						<div class="fright">
							<div class="setting-list hide">
								<span class="arrow-poptop"></span>
								<ul>
									<li><input type="checkbox" value="location" /><label>Location</label></li>
									<li><input type="checkbox" value="theme" /><label>Theme</label></li>
									<li><input type="checkbox" value="owner" /><label>Owner</label></li>
									<li><input type="checkbox" value="stage" /><label>Stage</label></li>
									<li><input type="checkbox" value="emp" /><label>LinkedIn
											Employees</label></li>
									<li><input type="checkbox" value="alexa" /><label>Alexa</label></li>
									<li><input type="checkbox" value="fb" /><label>FB
											likes</label></li>
									<li><input type="checkbox" value="twitter" /><label>Twitter
											Followers</label></li>
									<li><input type="checkbox" value="cb" /><label>Total
											Funding (Crunchbase) </label></li>
									<li><input type="checkbox" value="xfund" /><label>Funding
											details</label></li>
									<li><input type="checkbox" value="gp" /><label>Android
											No. of Ratings (WIP)</label></li>
								</ul>
							</div>
							<a class="export" href="/company/export" title="Export companies"></a>

							<a class="column-settings" title="Column settings"></a> <a
								class="add-employee" href="#">Add New Company</a>
							<div id="popup-box">
								<jsp:include page="/WEB-INF/views/company/create.jsp"></jsp:include>
								<div class="overlay"></div>
							</div>
							<a class="delete-company">Delete Company</a>
						</div>
					</div>
					<div class="statusMessage">${param.deleteMessage}</div>
					<div class="clearfix">
						<div class="new">
							<div class="table-left">
								<div class="flag-list-pop hide">
									<span class="arrow-poptop"></span>
									<ul>
										<li><input type="checkbox" name="flag" id="flag"
											value="fb" /><label>FaceBook</label></li>
										<li><input type="checkbox" name="flag" id="flag"
											value="ln" /><label>LinkedIn</label></li>
										<li><input type="checkbox" name="flag" id="flag"
											value="cb" /><label>CrunchBase</label></li>
										<li><input type="checkbox" name="flag" id="flag"
											value="tt" /><label>Twitter</label></li>
										<li><input type="checkbox" name="flag" id="flag"
											value="ios" /><label>IOS</label></li>
										<li><input type="checkbox" name="flag" id="flag"
											value="gp" /><label>Google Play</label></li>
									</ul>
									<input type="button" value="submit" id="flag-submit" />
								</div>
								<div class="filter-block">
									<div class="pop-hover name-filter companyId-filter hide">
										<span class="arrow-poptop"></span>
										<ul class="sort left-filter">
											<li class="sort-az"><a>Sort Asc to Desc</a></li>
											<li class="sort-za "><a>Sort Desc to Asc</a></li>
										</ul>
										<input type="hidden" class="sortBy" value="name" />

										<div>
											<h4>Filter by company:</h4>
											<div class="select filterChk">

												<input type="checkbox" class="selectAll" value="name">Select
												/DeSelect All
												<c:forEach var="company" items="${companies}">
													<div>
														<input type="checkbox" name="${company.companyId}"
															value="${company.companyId}" class="filterCheckBox"><span>${company.name}</span>
													</div>
													<%-- <option value="${company.name}"><input type="checkbox" name="${company.name}" value="${company.name}" > ${company.name}</option> --%>

												</c:forEach>

											</div>
											<!-- <div class="check">
												<input type="checkbox" /> <label>Include those
													without a date</label>
											</div> -->
											<div class="submit">
												<a class="cancel companyId name">Clear</a> <input
													type="button" value="Apply" class="filter-submit name" />
											</div>
										</div>
									</div>
								</div>

								<div class="filter-block">
									<div class="pop-hover location-filter hide">
										<span class="arrow-poptop"></span>
										<ul class="sort left-filter">
											<li class="sort-az"><a>Sort Asc to Desc</a></li>
											<li class="sort-za "><a>Sort Desc to Asc</a></li>
										</ul>
										<input type="hidden" class="sortBy" value="location" />

										<div>
											<h4>Filter by location:</h4>
											<input type="checkbox" class="selectAll" value="location">Select
											/DeSelect All
											<div class="select filterChk">
												<c:set var="currentLoc" value="" />
												<c:forEach var="company" items="${companies}"
													varStatus="counter">
													<c:set var="contains" value="false" />
													<c:forEach var="item" items="${fn:split(currentLoc,',')}">
														<c:if test="${item eq company.location}">
															<c:set var="contains" value="true" />
														</c:if>
													</c:forEach>
													<c:if test="${not contains}">
														<div>
															<input type="checkbox" name="${company.location}"
																value="${company.location}" class="filterCheckBox"><span>${company.location}</span>
														</div>
													</c:if>
													<c:set var="currentLoc"
														value="${company.location},${currentLoc}" scope="page"></c:set>
												</c:forEach>
											</div>
											<!-- <div class="check">
												<input type="checkbox" /> <label>Include those
													without a date</label>
											</div> -->
											<div class="submit">
												<a class="cancel location">Clear</a> <input type="button"
													value="Apply" class="filter-submit location" />
											</div>
										</div>
									</div>
								</div>
								<div class="filter-block">
									<div class="pop-hover theme-filter hide">
										<span class="arrow-poptop"></span>
										<ul class="sort left-filter">
											<li class="sort-az"><a>Sort Asc to Desc</a></li>
											<li class="sort-za "><a>Sort Desc to Asc</a></li>
										</ul>
										<input type="hidden" class="sortBy" value="theme" />

										<div>
											<h4>Filter by theme:</h4>
											<div class="select filterChk">
												<input type="checkbox" class="selectAll" value="theme">Select
												/DeSelect All
												<c:set var="currenttheme" value="" />
												<c:forEach var="company" items="${companies}"
													varStatus="counter">
													<c:set var="contains" value="false" />
													<c:forEach var="item" items="${fn:split(currenttheme,',')}">
														<c:if test="${item eq company.theme}">
															<c:set var="contains" value="true" />
														</c:if>
													</c:forEach>
													<c:if test="${not contains}">
														<div>
															<input type="checkbox" name="${company.theme}"
																value="${company.theme}" class="filterCheckBox"><span>${company.theme}</span>
														</div>
													</c:if>
													<c:set var="currenttheme"
														value="${company.theme},${currenttheme}" scope="page"></c:set>
												</c:forEach>

											</div>
											<!-- <div class="check">
												<input type="checkbox" /> <label>Include those
													without a date</label>
											</div> -->
											<div class="submit">
												<a class="cancel theme">Clear</a> <input type="button"
													value="Apply" class="filter-submit theme" />
											</div>
										</div>
									</div>
								</div>
								<div class="filter-block">
									<div class="pop-hover owner-filter hide">
										<span class="arrow-poptop"></span>
										<ul class="sort left-filter">
											<li class="sort-az"><a>Sort Asc to Desc</a></li>
											<li class="sort-za "><a>Sort Desc to Asc</a></li>
										</ul>
										<input type="hidden" class="sortBy" value="owner" />

										<div>
											<h4>Filter by owner:</h4>
											<div class="select filterChk">
												<input type="checkbox" class="selectAll" value="owner">Select
												/DeSelect All
												<c:set var="currentOwn" value=""></c:set>
												<c:forEach var="company" items="${companies}"
													varStatus="counter">
													<c:set var="contains" value="false" />
													<c:forEach var="item" items="${fn:split(currentOwn,',')}">
														<c:if test="${item eq company.owner}">
															<c:set var="contains" value="true" />
														</c:if>
													</c:forEach>
													<c:if test="${not contains}">
														<div>
															<input type="checkbox" name="${company.owner}"
																value="${company.owner}" class="filterCheckBox"><span>${company.owner}</span>
														</div>
													</c:if>
													<c:set var="currentOwn"
														value="${company.owner},${currentOwn}" scope="page"></c:set>
												</c:forEach>

											</div>
											<!-- <div class="check">
												<input type="checkbox" /> <label>Include those
													without a date</label>
											</div> -->
											<div class="submit">
												<a class="cancel owner">Clear</a> <input type="button"
													value="Apply" class="filter-submit owner" />
											</div>
										</div>
									</div>
								</div>
								<div class="filter-block">
									<div class="pop-hover stage-filter hide">
										<span class="arrow-poptop"></span>
										<ul class="sort left-filter">
											<li class="sort-az"><a>Sort Asc to Desc</a></li>
											<li class="sort-za "><a>Sort Desc to Asc</a></li>
										</ul>
										<input type="hidden" value="stage" class="sortBy" />
										<div>
											<h4>Filter by stage:</h4>
											<div class="select filterChk">
												<input type="checkbox" class="selectAll" value="stage">Select
												/DeSelect All
												<c:set var="currentStage" value=""></c:set>
												<c:forEach var="company" items="${companies}"
													varStatus="counter">
													<c:set var="contains" value="false" />
													<c:forEach var="item" items="${fn:split(currentStage,',')}">
														<c:if test="${item eq company.stage}">
															<c:set var="contains" value="true" />
														</c:if>
													</c:forEach>
													<c:if test="${not contains}">
														<div>
															<input type="checkbox" name="${company.stage}"
																value="${company.stage}" class="filterCheckBox"><span>${company.stage}</span>
														</div>
													</c:if>
													<c:set var="currentStage"
														value="${company.stage},${currentStage}" scope="page"></c:set>
												</c:forEach>

											</div>
											<!-- <div class="check">
												<input type="checkbox" /> <label>Include those
													without a date</label>
											</div> -->
											<div class="submit">
												<a class="cancel stage">Clear</a> <input type="button"
													value="Apply" class="filter-submit stage" />
											</div>
										</div>
									</div>
								</div>

								<div class="header-row-left">
									<div class="header-column-value-left flag"></div>
									<div class="header-column-left name">
										<span>Name</span><span class="filter filter-link"></span>
									</div>
									<div class="header-column-left location">
										<span>Location</span><span class="filter filter-link"></span>
									</div>
									<div class="header-column-left theme">
										<span>Theme</span><span class="filter filter-link"></span>
									</div>
									<div class="header-column-left owner">
										<span>Owner</span><span class="filter filter-link"></span>
									</div>
									<div class="header-column-left stage">
										<span>Stage</span><span class="filter filter-link"></span>
									</div>
								</div>
								<c:forEach var="company" items="${companyPage.content}"
									varStatus="counter">
									<c:choose>
										<c:when test="${counter.count % 2 == 0}">
											<div class="data-row even">
										</c:when>
										<c:otherwise>
											<div class="data-row">
										</c:otherwise>
									</c:choose>

									<div class="header-column-value-left flag">
										<input type="checkbox" id="delete-companyId"
											value="${company.companyId}" rel="${company.name}"><a><img
											src="/resources/images/icon-flag-small.png" /></a>
									</div>
									<div class="header-column-value-left name">
										<span>${company.name}</span><input type="hidden"
											id="companyId" value="${company.companyId}" />

									</div>
									<div class="header-column-value-left location">
										<span>${company.location}</span>
									</div>
									<div class="header-column-value-left theme">
										<span>${company.theme}</span>
									</div>
									<div class="header-column-value-left owner">
										<span>${company.owner}</span>
									</div>
									<div class="header-column-value-left stage">
										<span>${company.stage}</span>
									</div>
							</div>
							</c:forEach>
						</div>
						<jsp:useBean id="today" class="java.util.Date" scope="page" />
						<fmt:formatDate value="${today}" pattern="YYYYMM"
							var="currentMonthValue" />
						<div class="table-right">
							<div class="filter-block">

								<div class="pop-hover number-filter hide">
									<span class="arrow-poptop"></span>
									<ul class="sort number">
										<li class="sort-az"><a>Sort Smaller to Larger</a></li>
										<li class="sort-za"><a>Sort Larger to Smaller</a></li>
									</ul>
									<input type="hidden" class="sortBy" />
									<div>
										<h4>Filter by range:</h4>
										<div class="input">
											<label>Min</label> <input type="text" class="min-max min"
												maxlength="10" />
										</div>
										<div class="input">
											<label>Max</label> <input type="text" class="min-max max"
												maxlength="10" />
										</div>
										<!-- 										<div class="check">
											<input type="checkbox" /> <label>Include those
												without a value</label>
										</div> -->
										<div class="submit">
											<a class="cancel number">Clear</a> <input type="submit"
												value="Apply" class="filter-submit number" />
										</div>

									</div>
								</div>
							</div>
							<div class="filter-block">
								<div class="pop-hover date-filter hide">
									<span class="arrow-poptop"></span>
									<ul class="sort date">
										<li class="sort-az"><a>Sort Oldest to Newest</a></li>
										<li class="sort-za"><a>Sort Newest to Oldest</a></li>
									</ul>
									<input type="hidden" class="sortBy" />
									<div>
										<h4>Filter by date:</h4>
										<div class="input">
											<label>From</label> <input type="text" class="cal from"
												id="filterDate" maxlength="11" />
										</div>
										<div class="input">
											<label>To</label> <input type="text" class="cal to"
												id="tofilterDate" maxlength="11" />
										</div>
										<!-- 										<div class="check">
											<input type="checkbox" /> <label>Include those
												without a date</label>
										</div>
 -->
										<div class="submit clearfix">
											<a class="cancel date">Clear</a> <input type="button"
												value="Apply" class="filter-submit date" />
										</div>
									</div>
								</div>
							</div>
							<div class="scroll-pane horizontal-only">
								<div class="header-row-right">
									<div class="header-column-right emp emp_hide_column">
										<div class="column-right-label">

											<div class="column-expand emp_show" rel="emp">
												<img src="/resources/images/icon-plus.png" /> LinkedIn
												Employees
											</div>
											<div class="column-hide hide emp_hide" rel="emp">
												<img src="/resources/images/icon_minus.png" /> LinkedIn
												Employees
											</div>

										</div>
										<div class="emp-header-months">
											<div class="arrow emp_hide hide">
												<span class="larrow" rel="emp"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} emp_months hide emp${counter.count}">
													${month}<span
														class="filter number-filter-link emp-${fn:replace(month,' ','')}"
														rel="Employee lnEmpCount${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow emp_hide hide">
												<span class="rarrow" rel="emp"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right alexa alexa_hide_column">
										<div class="column-right-label">
											<div class="column-expand alexa_show" rel="alexa">
												<img src="/resources/images/icon-plus.png" /> Alexa
											</div>
											<div class="column-hide hide alexa_hide" rel="alexa">
												<img src="/resources/images/icon_minus.png" /> Alexa
											</div>
										</div>
										<div class="alexa-header-months">
											<div class="arrow alexa_hide hide">
												<span class="larrow" rel="alexa"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} hide alexa_months alexa${counter.count}">
													${month}<span
														class="filter number-filter-link alexa-${fn:replace(month,' ','')}"
														rel="Alexa alRank${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow alexa_hide hide">
												<span class="rarrow" rel="alexa"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right fb fb_hide_column">
										<div class="column-right-label">
											<div class="column-expand fb_show" rel="fb">
												<img src="/resources/images/icon-plus.png" /> FB Likes
											</div>
											<div class="column-hide hide fb_hide" rel="fb">
												<img src="/resources/images/icon_minus.png" /> FB Likes
											</div>
										</div>
										<div class="fb-header-months">
											<div class="arrow fb_hide hide">
												<span class="larrow" rel="fb"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} hide fb_months fb${counter.count}">
													${month} <span
														class="filter number-filter-link fb-${fn:replace(month,' ','')}"
														rel="FB fbLikes${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow fb_hide hide">
												<span class="rarrow" rel="fb"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right twitter twitter_hide_column">
										<div class="column-right-label">
											<div class="column-expand twitter_show" rel="twitter">
												<img src="/resources/images/icon-plus.png" /> Twitter
												Followers
											</div>
											<div class="column-hide hide twitter_hide" rel="twitter">
												<img src="/resources/images/icon_minus.png" /> Twitter
												Followers
											</div>
										</div>

										<div class="twitter-header-months">
											<div class="arrow twitter_hide hide">
												<span class="larrow" rel="twitter"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} hide twitter_months twitter${counter.count}">
													${month} <span
														class="filter number-filter-link twitter-${fn:replace(month,' ','')}"
														rel="Twitter ttFollows${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow twitter_hide hide">
												<span class="rarrow" rel="twitter"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right cb cb_hide_column">
										<div class="column-right-label">
											<div class="column-expand cb_show" rel="cb">
												<img src="/resources/images/icon-plus.png" /> Total Funding
												(Crunchbase)
											</div>
											<div class="column-hide hide cb_hide" rel="cb">
												<img src="/resources/images/icon_minus.png" /> Total
												Funding (Crunchbase)
											</div>
										</div>

										<div class="cb-header-months">
											<div class="arrow cb_hide hide">
												<span class="larrow" rel="cb"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} hide cb_months cb${counter.count}">
													${month} <span
														class="filter number-filter-link cb-${fn:replace(month,' ','')}"
														rel="CB cbTotalFund${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow cb_hide hide">
												<span class="rarrow" rel="cb"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right xfund xfund_hide_column">
										<div class="column-right-label">
											<div class="column-expand xfund_show" rel="xfund">
												<img src="/resources/images/icon-plus.png" /> Funding
												details
											</div>
											<div class="column-hide hide xfund_hide xfund_column_hide"
												rel="xfund">
												<div class=" xfund1 xfund_column_name_hide">
													<img src="/resources/images/icon_minus.png" />Xth Funding
													details
												</div>
												<c:forEach begin="1" end="9" var="index">
													<div class=" xfund${index+1} hide xfund_column_name_hide">
														<img src="/resources/images/icon_minus.png" />
														(X-${index})Funding details
													</div>
												</c:forEach>

											</div>
										</div>
										<div class="xfund-header-months">
											<div class="arrow xfund_hide hide">
												<span class="larrow" rel="xfund"></span>
											</div>
											<c:forEach begin="0" end="9" var="index">
												<div
													class="hide  xfund${index+1} xfund-column-name xfund_months">
													<div class="header-column-month">
														Date<span class="date-filter-link filter xfund-${index}"
															rel="cbFundDate${index}"></span>
													</div>
													<div class="header-column-month">
														Amount<span
															class="filter number-filter-link xfund-${index}"
															rel="xfund cbFundAmount${index}"></span>
													</div>
													<div class="header-column-month">Investors</div>
												</div>
											</c:forEach>
											<div class="arrow xfund_hide hide">
												<span class="rarrow" rel="xfund"></span>
											</div>
										</div>
									</div>
									<div class="header-column-right gp gp_hide_column">
										<div class="column-right-label">
											<div class="column-expand gp_show" rel="gp">
												<img src="/resources/images/icon-plus.png" /> Android No.
												of Ratings (WIP)
											</div>
											<div class="column-hide hide gp_hide" rel="gp">
												<img src="/resources/images/icon_minus.png" /> Android No.
												of Ratings (WIP)
											</div>
										</div>
										<div class="gp-header-months">
											<div class="arrow gp_hide hide">
												<span class="larrow" rel="gp"></span>
											</div>
											<c:forEach var="month" items="${monthNames}"
												varStatus="counter">
												<div
													class="header-column-month ${fn:replace(month,' ','')} hide gp_months gp${counter.count}">
													${month} <span
														class="filter number-filter-link gp-${fn:replace(month,' ','')}"
														rel="GP gp${counter.count-1}"></span>
												</div>
											</c:forEach>
											<div class="arrow gp_hide hide">
												<span class="rarrow" rel="gp"></span>
											</div>
										</div>
									</div>
								</div>
								<c:forEach var="company" items="${companyPage.content}"
									varStatus="counter">
									<c:choose>
										<c:when test="${counter.count % 2 == 0}">
											<div class="data-row even">
										</c:when>
										<c:otherwise>
											<div class="data-row">
										</c:otherwise>
									</c:choose>
									<div
										class="emp-column-value column-value-right emp emp_hide_value">
										<div class="arrow emp_hide hide">&nbsp;</div>

										<c:forEach var="link" items="${company.noOfEmployees}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<div
														class="header-column-value-right hide emp emp${counter.count} emp_hide_value">
														<fmt:formatNumber pattern="###,###,###"
															value="${link.value}" />
													</div>
												</c:when>
												<c:otherwise>
													<div
														class="header-column-value-right hide emp emp${counter.count} emp_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow emp_hide hide">&nbsp;</div>
									</div>
									<div
										class="alexa-column-value column-value-right alexa alexa_hide_value">

										<div class="arrow alexa_hide hide">&nbsp;</div>
										<c:forEach var="link" items="${company.ranks}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<div
														class="header-column-value-right hide alexa alexa${counter.count} alexa_hide_value">
														<fmt:formatNumber pattern="###,###,###"
															value="${link.value}" />
													</div>
												</c:when>

												<c:otherwise>
													<div
														class="header-column-value-right hide alexa alexa${counter.count} alexa_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow alexa_hide hide">&nbsp;</div>
									</div>
									<div
										class="fb-column-value column-value-right fb fb_hide_value">
										<div class="arrow fb_hide hide">&nbsp;</div>

										<c:forEach var="link" items="${company.likes}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<c:choose>
														<c:when test="${link.value ge 1000000}">
															<c:set var="fblikes">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000000}" />M</c:set>
														</c:when>
														<c:when test="${link.value lt 1000}">
															<c:set var="fblikes">${link.value}</c:set>
														</c:when>
														<c:otherwise>
															<c:set var="fblikes">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000}" />K</c:set>
														</c:otherwise>
													</c:choose>

													<div
														class="header-column-value-right hide fb fb${counter.count} fb_hide_value">${fblikes}</div>
												</c:when>

												<c:otherwise>
													<div
														class="header-column-value-right hide fb fb${counter.count} fb_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow fb_hide hide">&nbsp;</div>
									</div>
									<div
										class="twitter-column-value column-value-right twitter twitter_hide_value">
										<div class="arrow twitter_hide hide ">&nbsp;</div>

										<c:forEach var="link" items="${company.followers}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<c:choose>
														<c:when test="${link.value ge 1000000}">
															<c:set var="ttfollowers">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000000}" />M</c:set>
														</c:when>
														<c:when test="${link.value lt 1000}">
															<c:set var="ttfollowers">${link.value}</c:set>
														</c:when>
														<c:otherwise>
															<c:set var="ttfollowers">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000}" />K</c:set>
														</c:otherwise>
													</c:choose>

													<div
														class="header-column-value-right hide twitter twitter${counter.count} twitter_hide_value">${ttfollowers}</div>
												</c:when>

												<c:otherwise>
													<div
														class="header-column-value-right twitter hide twitter${counter.count} twitter_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow twitter_hide hide">&nbsp;</div>
									</div>
									<div
										class="cb-column-value column-value-right cb cb_hide_value">
										<div class="arrow cb_hide hide">&nbsp;</div>

										<c:forEach var="link" items="${company.totalFunds}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<div
														class="header-column-value-right hide cb cb${counter.count} cb_hide_value">
														$
														<fmt:formatNumber type="number" maxFractionDigits="2"
															value="${link.value / 1000000}" />
														M
													</div>
												</c:when>

												<c:otherwise>
													<div
														class="header-column-value-right hide cb cb${counter.count} cb_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow cb_hide hide">&nbsp;</div>
									</div>
									<div
										class="xfund-column-value column-value-right xfund xfund_hide_value">
										<div class="arrow xfund_hide hide">&nbsp;</div>
										<c:forEach var="link" items="${company.crunchBaseData}"
											varStatus="counter">
											<div class="xfund-column xfund${counter.count} hide xfund">
												<c:choose>
													<c:when test="${not empty link.value.fundedDate}">
														<div class="header-column-value-right xfund">
															<fmt:formatDate type="date" pattern="MMM-yy"
																value="${link.value.fundedDate}" />
														</div>
													</c:when>
													<c:otherwise>
														<div class="header-column-value-right xfund">&nbsp;</div>
													</c:otherwise>
												</c:choose>
												<c:choose>
													<c:when test="${not empty link.value.fundedAmount}">
														<div class="header-column-value-right xfund">
															$
															<fmt:formatNumber type="number" maxFractionDigits="2"
																value="${link.value.fundedAmount / 1000000}" />
															M
														</div>
													</c:when>
													<c:otherwise>
														<div class="header-column-value-right xfund">&nbsp;</div>
													</c:otherwise>
												</c:choose>
												<c:choose>
													<c:when test="${not empty link.value.fundedBy}">
														<div class="header-column-value-right xfund Xfundedby"
															title='${link.value.fundedBy}'>${link.value.fundedBy}</div>
													</c:when>
													<c:otherwise>
														<div class="header-column-value-right xfund">&nbsp;</div>
													</c:otherwise>
												</c:choose>
											</div>
										</c:forEach>
										<div class="arrow xfund_hide hide">&nbsp;</div>
									</div>
									<div
										class="gp-column-value column-value-right gp gp_hide_value">
										<div class="arrow gp_hide hide">&nbsp;</div>

										<c:forEach var="link" items="${company.googlePlayData}"
											varStatus="counter">
											<c:choose>
												<c:when test="${not empty link.value}">
													<c:choose>
														<c:when test="${link.value ge 1000000}">
															<c:set var="gplikes">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000000}" />M</c:set>
														</c:when>
														<c:when test="${link.value lt 1000}">
															<c:set var="gplikes">${link.value}</c:set>
														</c:when>
														<c:otherwise>
															<c:set var="gplikes">
																<fmt:formatNumber type="number" maxFractionDigits="2"
																	value="${link.value / 1000}" />K</c:set>
														</c:otherwise>
													</c:choose>
													<div
														class="header-column-value-right hide gp gp${counter.count} gp_hide_value">${gplikes}

													</div>
												</c:when>

												<c:otherwise>
													<div
														class="header-column-value-right hide gp gp${counter.count} gp_hide_value">&nbsp;</div>
												</c:otherwise>
											</c:choose>
										</c:forEach>
										<div class="arrow gp_hide hide">&nbsp;</div>
									</div>
							</div>
							</c:forEach>
						</div>
					</div>
				</div>
				<div></div>
				<div>

					<div class="pagination clearfix">
						<jsp:include page="/WEB-INF/views/pagination.jsp"></jsp:include>
						<ul class="info">
							<li class="selectPageLi"><select id="homepaginator">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
							</select></li>
							<li class="displayPageLi">${((companyPage.number-1)*companyPage.size)
								+1} -
								${((companyPage.number-1)*companyPage.size)+companyPage.numberOfElements}
								of ${companyPage.totalElements}</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
		<footer>
			<div class="wrapper">© Copyright, Aspire Systems 1996 - 2014</div>
		</footer>
	</div>
</body>
</html>