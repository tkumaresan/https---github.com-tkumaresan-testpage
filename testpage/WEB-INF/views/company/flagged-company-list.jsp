<!doctype html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="l" uri="/WEB-INF/tld/linkStatus.tld"%>

<html>
<head>
<meta charset="utf-8">
<title>Aspire ATG</title>
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link
	href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600'
	rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css"
	href="/resources/css/new_style.css" />
<script src="/resources/js/jquery-1.10.2.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/update.js"></script>
<script type="text/javascript" id="sourcecode">
	var currentPage = '${companyPage.number}';
	var pageSize = '${companyPage.size}';
	(function($) {
		$(window).load(
				function() {
					$("#rfcpaginator").next(".holder").text(
							'${companyPage.size}');
					$('#rfcpaginator option:contains("${companyPage.size}")')
							.prop('selected', true);
				});
	})(jQuery);
</script>
</head>
<body>
	<div class="content">
		<!-- header block -->
		<jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>
		<nav>
			<div class="wrapper">
				<ul>
					<li class="home-active"><a href="/company/list">Home</a></li>
					<li class="red-flag-active active"><a href="#">Red Flag
							Company<span class="count">${ companyPage.totalElements }</span>
					</a></li>
					<li class="upload"><a href="/bulkUpload">Bulk Upload</a></li>
					<li class="settings"><a href="/apiconfig/listAll">Settings</a></li>
					<li class="faq"><a href="/faq">FAQ</a></li>
				</ul>
			</div>
		</nav>
		<section>
			<div class="wrapper">
				<div class="main">
					<div class="fleft">
						<h2>Red Flag Company List</h2>
					</div>

					<table cellpadding="0" cellspacing="0" id="myTable"
						class="tablesorter hovertable">
						<thead>
							<tr>
								<th><span title="Name">Name</span></th>
								<th><span title="Website">Website</span></th>
								<th><span title="Location">Location</span></th>
								<th><span title="Theme">Theme</span></th>
								<th><div class="Employee-add"></div>
									<span title="Stage"> Stage</span></th>
								<th><span title="Owner">Owner</span></th>
								<th class="coloum_split">
									<table>
										<tr>
											<th colspan="6"><span title="Data Extraction Status">Data
													Extraction Status</span></th>
										</tr>
										<tr>
											<td>FB</td>
											<td>CB</td>
											<td>LN</td>
											<td>TT</td>
											<td>IOS</td>
											<td>GP</td>
										</tr>
									</table>
								</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="flaggedCompany" items="${companyPage.content}">
								<tr>
									<td><a
										href="javascript:update(${flaggedCompany.companyId })"> <img
											src="/resources/images/edit.png" alt="edit" /></a>&nbsp;${flaggedCompany.name}</td>
									<td>${flaggedCompany.website}</td>
									<td>${flaggedCompany.location}</td>
									<td>${flaggedCompany.theme}</td>
									<td>${flaggedCompany.stage}</td>
									<td>${flaggedCompany.owner}</td>
									<td class="inner_table">
										<table>
											<tr>
												<td><l:linkstatus
														status="${flaggedCompany.facebookDeStatus}" /></td>
												<td><l:linkstatus
														status="${flaggedCompany.crunchbaseDeStatus}" /></td>
												<td><l:linkstatus
														status="${flaggedCompany.linkedinDeStatus}" /></td>
												<td><l:linkstatus
														status="${flaggedCompany.twitterDeStatus}" /></td>
												<td><l:linkstatus
														status="${flaggedCompany.iosDeStatus}" /></td>
												<td><l:linkstatus status="${flaggedCompany.gpDeStatus}" /></td>
											</tr>
										</table>
									</td>
									<!-- <td>12-04-14</td> -->
								</tr>
							</c:forEach>

						</tbody>
					</table>
					<div class="pagination clearfix">
						<jsp:include page="/WEB-INF/views/pagination.jsp"></jsp:include>
						<ul class="info">
							<li class="rfcSelectPage"><select id="rfcpaginator">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
							</select></li>
							<li class="rfcDisplayPage">${((companyPage.number-1)*companyPage.size)
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

	<form method="POST" onsubmit="return validate();"
		id="updateCompanyForm">
		<div id="popup-box"></div>

	</form>
</body>
</html>