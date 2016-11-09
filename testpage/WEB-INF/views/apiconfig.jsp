<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/apistyle.css" />" />
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/new_style.css" />
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' rel='stylesheet' type='text/css'>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>API config</title>
</head>
<body>
    <!-- header block -->
    <jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>
    <nav>
    <div class="wrapper">
        <ul>
            <li class="home-active"><a href="/company/list">Home</a></li>
            <li class="red-flag"><a href="/company/listflagged">Red Flag Company</a></li>
            <li class="upload"><a href="/bulkUpload">Bulk Upload</a></li>
            <li class="settings active"><a href="#">Settings</a></li>
            <li class="faq"><a href="/faq">FAQ</a></li>
        </ul>
    </div>
    </nav>
    <section class="border-top">
    <div class="wrapper">
        <div class="main">
            <fmt:setBundle basename="apiconfig" var="lang" />
            <form method="POST" action="/apiconfig/create">
            <div class="fleft">
					<h2>API Configuration</h2>
					</div>
					<c:if test="${requestScope.linkedin_url != null}">
						<div class="fright">
			        			<a target="_blank" href='<c:out value="${requestScope.linkedin_url}"/>' ><input type="button" id="submit" value="Generate LinkedIn Access Token"/></a>
						</div>
					</c:if>

					<br/><br/>
                <div id="apiconfig">
                    <label id="statusMessage">${statusMessage}</label>
                    <table id="apiTable">
                    	<thead>
	                        <tr align="center">
	                            <th>KEY</th>
	                            <th>VALUE</th>
	                        </tr>
                        </thead>
                        <tbody>
	                        <c:forEach var="items" items="${apiMap}">
	                            <tr>
	                                <td><label id="${items.key}"><fmt:message key="${items.key}" bundle="${lang}" /></label></td>
	                                <td><input type="text" id="${items.value}" name="${items.key}" value="${items.value}"></td>
	                            </tr>
	                        </c:forEach>
                        </tbody>
                    </table>
                    <div align="center" id="buttons">
                        <input type="submit" id="submit" name="submit" value="SAVE"> <a href="" id="cancel">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </section>
    <footer>
    <div class="wrapper">© Copyright, Aspire Systems 1996 - 2014</div>
    </footer>
</body>
</html>