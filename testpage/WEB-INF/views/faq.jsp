<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Aspire ATG</title>
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' rel='stylesheet' type='text/css'>
<script src="/resources/js/jquery-1.10.2.js"></script>
<script src="/resources/js/common.js"></script>
</head>
<body>
    <div class="content">
        <!-- header block -->
        <jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>
        <nav>
            <div class="wrapper">
                <ul>
                    <li class="home-active"><a href="/company/list">Home</a></li>
                    <li class="red-flag"><a href="/company/listflagged">Red Flag Company</a></li>
                    <li class="upload"><a href="/bulkUpload">Bulk Upload</a></li>
                    <li class="settings"><a href="/apiconfig/listAll">Settings</a></li>
                    <li class="faq active"><a href="#">FAQ</a></li>
                </ul>
            </div>
        </nav>
        <section>
            <div class="wrapper">
                <%--<jsp:include page="/html/faq-content.html"></jsp:include> --%>
                <%@include file="/html/faq-content.html"%>
            </div>
        </section>
        <footer>
            <div class="wrapper">© Copyright, Aspire Systems 1996 - 2014</div>
        </footer>
    </div>
</body>
</html>