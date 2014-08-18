<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.OverviewDao"%>
<jsp:useBean id="overviewBean" class="com.ausemi2.bean.Overview"></jsp:useBean>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>AuSemi</title>
<link rel="stylesheet" href="CSS/base.css" />
<link rel="stylesheet" type="text/css" href="CSS/new.css">
<script src="JS/jquery-1.9.1.min.js"></script>
<script>
//导航动画
$(document).ready(function() {
    $( '.dropdown' ).hover(
        function(){
            $(this).children('.sub-menu').slideDown(300);
        },
        function(){
            $(this).children('.sub-menu').slideUp(300);
        }
    );
}); 
</script>
</head>

<body>
	<%--从数据库取得数据 --%>
	<%
		OverviewDao overviewDao = new OverviewDao();
		overviewBean = overviewDao.find();
	%>
	<!--logo-->
	<div id="header" align="center"></div>
	<!--导航-->
	<div id="menu" align="center">
		<ul class="navContent clearfix" align="center">
		    <li><a href="home.jsp"id="home">Home</a></li>
		    <li class="dropdown">
		        <a href="JSP/product.jsp">Product <img src="Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="JSP/mosfet.jsp">Mosfet</a></li>
		            <li><a href="JSP/SR.jsp">SR Control Module</a></li>
		        </ul>
		    </li>
		    <li class="dropdown">
		        <a href="JSP/about.jsp">About us <img src="Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="JSP/about.jsp">Company Overview</a></li>
		            <li><a href="JSP/quality.jsp">Quality</a></li>
		            <li><a href="JSP/culture.jsp">AuSemi Culture</a></li>
		            <li><a href="JSP/carrers.jsp">Careers</a></li>
		            <li><a href="JSP/news.jsp">News Centre</a></li>
		        </ul>
		    </li>
		    <li class="dropdown">
		        <a href="JSP/contact.jsp">Contact us <img src="Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="JSP/contact.jsp">Contact us</a></li>
		            <li><a href="JSP/agent.jsp" id="agent">Agent</a></li>
		        </ul>
		    </li>
		    <li><a href="JSP/suggestion.jsp">Suggestion</a></li>
		    <li><a href="JSP/search.jsp">Search</a></li>
		</ul>
	</div>
	<!--正文-->
	<div id="main" >
		<br/>
		<div>
				<img src="Img/overview.jpg">
		</div>
		<table class="content" border="0">
			<tr style="font-size:15px;color:#00000">
				<td align="left"><%=overviewBean.getOverview()%></td>
			</tr>
		</table>
	</div>
	<!-- 页脚 -->
	<div align="center">
		</br>
		</br>
		</br>
		</br>
		</br> <img src="Img/foot.jpg">
	</div>
</body>
</html>
