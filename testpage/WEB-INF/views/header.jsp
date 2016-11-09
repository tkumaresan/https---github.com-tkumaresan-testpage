<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<header>
    <div class="wrapper">
        <h1>
            <a href="#" title="Aspire ATG">ASPIRE ATG</a>
        </h1>
        <c:if test="${pageContext.request.userPrincipal.name != null}">
            <c:url value="/j_spring_security_logout" var="logoutUrl" />
            <ul class="top-menu">
                <li><span class=""><img src="/images/profile-thumb.png"></span> <span>Welcome</span> <a title="${pageContext.request.userPrincipal.name}" href="${logoutUrl}">${pageContext.request.userPrincipal.name}</a>
                </li>
            </ul>
        </c:if>
    </div>
</header>