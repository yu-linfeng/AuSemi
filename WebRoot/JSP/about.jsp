<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.OverviewDao" %>
<jsp:useBean id="aboutBean" class="com.ausemi2.bean.Overview"></jsp:useBean>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>AuSemi</title>
    <link rel="stylesheet" href="../CSS/base.css" />
	<link rel="stylesheet" href="../CSS/new.css" />
	<script src="../JS/jquery-1.9.1.min.js"></script>
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
  <%--从数据库取出"公司简介"数据 --%>
    <%
  	OverviewDao overviewDao = new OverviewDao();
 	aboutBean = overviewDao.find();
  %>
		<!--logo-->
			<div id="header" align="center"></div>
		<!--导航-->
	<div id="menu" align="center">
		<ul class="navContent clearfix" align="center">
		    <li><a href="../home.jsp"id="home">Home</a></li>
		    <li class="dropdown">
		        <a href="product.jsp">Product <img src="../Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="mosfet.jsp">Mosfet</a></li>
		            <li><a href="SR.jsp">SR Control Module</a></li>
		        </ul>
		    </li>
		    <li class="dropdown">
		        <a href="about.jsp">About us <img src="../Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="about.jsp">Company Overview</a></li>
		            <li><a href="quality.jsp">Quality</a></li>
		            <li><a href="culture.jsp">AuSemi Culture</a></li>
		            <li><a href="carrers.jsp">Careers</a></li>
		            <li><a href="news.jsp">News Centre</a></li>
		        </ul>
		    </li>
		    <li class="dropdown">
		        <a href="contact.jsp">Contact us <img src="../Img/arrow-down.png"></a>
		        <ul class="sub-menu">
		            <li><a href="contact.jsp">Contact us</a></li>
		            <li><a href="agent.jsp" id="agent">Agent</a></li>
		        </ul>
		    </li>
		    <li><a href="suggestion.jsp">Suggestion</a></li>
		    <li><a href="search.jsp">Search</a></li>
		</ul>
	</div>
    <div id="main">
        <table class="content" cellpadding="20px">
            <tr>
                <td align="left" valign="top">
                    <div> 
                        <img src="../Img/about.jpg">
                    </div>
                    <div >
                        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="about.jsp" style="color:#FF0000; font-size:16px">Company overview</a>
                    </div>
                    <div>
						<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="quality.jsp" style="font-size:16px">Quality</a>
                    </div>
                    <div>
						<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="culture.jsp" style="font-size:16px">Ausemi Culture</a>
                    </div>
                    <div>
						<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="carrers.jsp" style="font-size:16px">Careers</a>
                    </div>
                    <div>
						<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="news.jsp" style="font-size:16px">News Centre</a>
                    </div>
                </td>
                <td align="left">
                    <div>
                        <img src="../Img/overview2.jpg">
                    </div>
                    <div width="655" style="font-size:15px;color:#262626">
						<%=aboutBean.getOverview() %>
                    </div>
                </td>
            </tr>
        </table>
    </div>
  </body>
  <div align="center">
	</br></br></br></br></br>
	    <img src="../Img/foot.jpg">
	</div>
</div>
</html>
