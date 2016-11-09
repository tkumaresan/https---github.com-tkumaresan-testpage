<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<ul class="page-numbers clearfix">
	<c:if test="${not companyPage.firstPage}">
		<li><a class="prev"><img
				src="/resources/images/pagination_left.png" /></a></li>
	</c:if>
	<c:forEach begin="${pgStart}" end="${pgEnd-1}" var="i">

		<c:choose>
			<c:when test="${companyPage.number eq i}">
				<li class="page-active">${i}</li>
			</c:when>
			<c:otherwise>
				<li><a class="pageNum ${i}">${i}</a></li>
			</c:otherwise>
		</c:choose>
	</c:forEach>

	<c:if test="${not companyPage.lastPage}">
		<li><a class="next"><img
				src="/resources/images/pagination_right.png" /></a></li>
	</c:if>
</ul>
