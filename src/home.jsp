<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.OverviewDao" %>
<jsp:useBean id="overviewBean" class="com.ausemi2.bean.Overview"></jsp:useBean>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>AuSemi</title>
    <link rel="stylesheet" href="CSS/base.css" />
	<link rel="stylesheet" href="CSS/style.css" />
	<script src="JS/jquery-1.9.1.min.js"></script>
	<script>
	//导航动画
    $(document).ready(function() {
        $( '.dropdown' ).hover(
            function(){
                $(this).children('.sub-menu').slideDown(400);
            },
            function(){
                $(this).children('.sub-menu').slideUp(400);
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
  	//overviewBean.setOverview("test");
  %>
    <div id="wrapper">
		<header>
		    <div style="background-image:url(Img/logo2.jpg);height:200px;width:auto;background-repeat:no repeat;"></div>
		</header>

<nav>
    <ul class="navContent clearfix">
        <li><a href="home.jsp"id="home">Home</a></li>
        <li class="dropdown">
            <a href="JSP/product.jsp">Product</a>
            <ul class="sub-menu">
                <li><a href="JSP/mosfet.jsp">Mosfet</a></li>
                <li><a href="JSP/SR.jsp">SR Control Module</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a href="JSP/about.jsp">About us</a>
            <ul class="sub-menu">
                <li><a href="JSP/about.jsp">Company overview</a></li>
                <li><a href="JSP/quality.jsp">Quality</a></li>
                <li><a href="JSP/culture.jsp">Ausemi Culture</a></li>
                <li><a href="JSP/carrers.jsp">Careers</a></li>
                <li><a href="JSP/news.jsp">News Centre</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a href="#">Contact us</a>
            <ul class="sub-menu">
                <li><a href="JSP/contact.jsp">Contact us</a></li>
                <li><a href="JSP/agent.jsp" id="agent">Agent</a></li>
            </ul>
        </li>
        <li><a href="JSP/suggestion.jsp">Suggestion</a></li>
        <li><a href="JSP/search.jsp">Search</a></li>
    </ul>
</nav>

<div id="main" >
    <table class="content" border="0">
        <tr><td><img src="Img/overview.jpg"></td></tr>
        <tr style="background-color:#FFF8DC; font-size:18px;color:#CD3278">
        	<td><%=overviewBean.getOverview() %>
            </td>
		</tr>
    </table>
</div>

<footer>
<div align="center">
</br></br></br></br></br>
    <img src="Img/foot.jpg">
</div>
</footer>

</div>
  </body>
</html>
