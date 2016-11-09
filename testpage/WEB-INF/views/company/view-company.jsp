<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
<title>Company Details</title>
</head>
<body>
    <h1>Company Details</h1>
<br>
    Name :
    <c:out value="${company.name}"></c:out>
    <br> Owner :
    <c:out value="${company.owner}"></c:out>
    <br> Website :
    <c:out value="${company.website}"></c:out>
    <br> Location :
    <c:out value="${company.location}"></c:out>
    <br> Theme :
    <c:out value="${company.theme}"></c:out>

</body>
</html>
