<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
<meta charset="utf-8">
<title>Aspire ATG</title>
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/custom.css" />
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' rel='stylesheet' type='text/css'>
<script src="/resources/js/jquery-1.10.2.js"></script>
<script src="/resources/js/common.js"></script>
</head>
<body onload='document.loginForm.username.focus();'>
    <div class="content">
        <header>
            <div class="wrapper">
                <h1>
                    <a href="#" title="Aspire ATG">Aspire ATG</a>
                </h1>
            </div>
        </header>
        <form name='loginForm' action="<c:url value='j_spring_security_check' />" method='POST'>
            <section class="border-top">
                <div class="wrapper">
                    <div class="login">
                        <img src="/resources/images/login.png" class="fleft">
                        <h2 class="fleft">User Login</h2>
                        <div class="input clear">
                            <label><img src="/resources/images/login-ub.png" /></label> <input type="text" name="username">
                        </div>
                        <div class="input">
                            <label><img src="/resources/images/login-ps.png" /></label> <input type="password" name="password">
                        </div>
                        <div class="submit clearfix">
                            <input type="submit" value="Login">
                        </div>
                        <c:if test="${not empty error}">
                            <div class="error">${error}</div>
                        </c:if>
                        <c:if test="${not empty msg}">
                            <div class="msg">${msg}</div>
                        </c:if>
                    </div>
                </div>
            </section>
        </form>
        <footer>
            <div class="wrapper about-footer">© Copyright, Aspire Systems 1996 - 2014</div>
        </footer>
    </div>
</body>
</html>