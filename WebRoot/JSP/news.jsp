<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.NewsDao" %>
<%@ page import="com.ausemi2.bean.News" %>
<jsp:useBean id="newsBean" class="com.ausemi2.bean.News"></jsp:useBean>

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
	<%
		NewsDao newsDao = new NewsDao();
		newsBean = newsDao.allNews();
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
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="about.jsp" >Company overview</a>
                    </div>
                    <div>
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="quality.jsp">Quality</a>
                    </div>
                    <div>
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="culture.jsp">Ausemi Culture</a>
                    </div>
                    <div>
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="carrers.jsp">Careers</a>
                    </div>
                    <div>
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="news.jsp" style="color:#FF0000">News Centre</a>
                    </div>
                </td>
                <td align="left">
                    <div>
                        <img src="../Img/news.jpg">
                    </div>
                    <div width="655" style=" font-size:15px;color:#262626">
                   			<%=newsBean.getNews() %>
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
</html>
