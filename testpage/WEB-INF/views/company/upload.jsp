<!doctype html>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Company bulk upload</title>
<link rel="stylesheet" type="text/css" href="/resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/style.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/upload.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/custom.css" />
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' rel='stylesheet' type='text/css'>
</head>
<body>

    <!-- header block -->
    <jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>
    <nav>
        <div class="wrapper">
            <ul>
                <li class="home-active"><a href="/company/list">Home</a></li>
                <li class="red-flag"><a href="/company/listflagged">Red Flag Company</a></li>
                <li class="upload active"><a href="#">Bulk Upload</a></li>
                <li class="settings"><a href="/apiconfig/listAll">Settings</a></li>
                <li class="faq"><a href="/faq">FAQ</a></li>
            </ul>
        </div>
    </nav>

    <section class="border-top">
        <div class="wrapper">
            <div class="main">
                <div class="fleft">
                    <h2>Bulk Upload</h2>
                </div>
                <br />
                <br />
                <br />
                <c:if test="${error != null}">
                    <div align="center" class="error">&nbsp;${error}</div>
                </c:if>
                <c:if test="${success != null}">
                    <div align="center"class="msg clearfix">&nbsp;${success}</div>
                </c:if>
                <form method="POST" action="/company/uploadFile" enctype="multipart/form-data">
                    <table class="uploadTable">
                        <tr>
                            <td align="right"><label>File to Upload:</label></td>
                            <td><input type="file" name="file"></td>
                        </tr>
                        <tr>
                            <td align="right"><input type="submit" value="Upload" class="upload-button"></td>
                            <td><a href="javascript:clearFile();" title="Clear">&nbsp;&nbsp;&nbsp;&nbsp;Clear</a></td>
                        </tr>
                        <tr>
                        </tr>
                    </table>
                </form>
                <br />
                <br /> <label id="note">Note:</label> <br />
                <br />
                <ul class="note">
                    <li>Excel files of format xlsx only can be uploaded.</li>
                    <li>File should contain data in the same order mentioned below.</li>
                    <li>Sample file for format can be dowloaded
                    		<a href="/Sample.xlsx" alt="Download" title="Download" class="download">here</a>.
                    		<!-- <img src="/resources/images/icon_download.png" /> -->

                        <!-- <table class="format">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Company Owner</th>
                                    <th>Location</th>
                                    <th>Theme</th>
                                    <th>Website</th>
                                    <th>Company Record Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jiangsu Wangsheng</td>
                                    <td>Anupam</td>
                                    <td>India</td>
                                    <td>Mobile Enterprise</td>
                                    <td>www.jiw.com</td>
                                    <td>Monitor</td>
                                </tr>
                                <tr>
                                    <td>UCloud</td>
                                    <td>Lu Guo</td>
                                    <td>China</td>
                                    <td>Location & Commerce</td>
                                    <td>www.ucl.com</td>
                                    <td>For Discussion</td>
                                </tr>
                                <tr>
                                    <td>WQ Mobile</td>
                                    <td>Vivek</td>
                                    <td>India</td>
                                    <td>Other</td>
                                    <td>www.wqm.com</td>
                                    <td>For Discussion</td>
                                </tr>
                            </thead>
                        </table> -->
                    </li>
                </ul>

            </div>
        </div>
    </section>
    <footer>
        <div class="wrapper">© Copyright, Aspire Systems 1996 - 2014</div>
    </footer>
</body>
</html>