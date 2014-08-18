<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

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
    <table id="productHref" class="content" cellpadding="20px">
        <tr>
            <td class="productTree" align="left" valign="top"><img src="../Img/arrow_product.jpg"></td>
            <td width="800" >
                <div class="headline3" style="font-size:20px">
                    </br></br>
                    <img src="../Img/product_logo.jpg">
                    <a class="hrefContent" href="mosfet.jsp"style="text-decoration:none">Mosfet</a>
                </div>
                <div class="headline3">
                    </br>
                    &nbsp;&nbsp;&nbsp;
                    <img src="../Img/arrow_right.png">
                    <a class="hrefContent" href="mosfet.jsp" style="text-decoration:none">High-Voltage Super_Juction Mosfe</a>
                    &nbsp;&nbsp;&nbsp;
                    <img src="../Img/arrow_right.png">
                    <a class="hrefContent" href="LV_mosfet.jsp" style="text-decoration:none">Low_Medium Voltage Trench mosfet</a>
                    </br>
                    &nbsp;&nbsp;&nbsp;
                    <img src="../Img/arrow_right.png">
                    <a class="hrefContent" href="VD_mosfet.jsp" style="text-decoration:none">VD Mosfet</a>
                </div>
                <div class="headline3" style="font-size:20px">
                    </br></br>
                    <img src="../Img/product_logo.jpg">
                    <a class="hrefContent" href="SR.jsp"style="text-decoration:none">SR Control Module</a>
                </div>
            </td>
        </tr>
    </table>
</div>

<div align="center">
</br></br></br></br></br>
    <img src="../Img/foot.jpg">
</div>
</div>
</body>
</html>
