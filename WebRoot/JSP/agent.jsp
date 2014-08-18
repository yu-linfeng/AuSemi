<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.AgentDao" %>
<%@ page import="com.ausemi2.bean.Agent" %>
<jsp:useBean id="agentBean" class="com.ausemi2.bean.Agent"></jsp:useBean>


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
	AgentDao agentDao = new AgentDao();
	List<Agent> allAgent = new ArrayList<Agent>();
	allAgent = agentDao.all();
%>
	<!--logo-->
		<div id="header" align="center"></div>
	<!--导航-->
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

    <table class="content" cellpadding="10px">
        <tr>
			<td width="200px" align="left" valign="top" >
				<div> 
                      	<img src="../Img/contact_us.jpg">
                  	</div>
                  	<div >
                      <img src="../Img/arrow_right.png">
                      <a class="hrefContentTree" href="contact.jsp" style=" font-size:18px">Contact</a>
                  </div>
                  <div>
                      <img src="../Img/arrow_right.png">
                      <a class="hrefContentTree" href="agent.jsp" style="color:#FF0000;font-size:18px">Agent</a>
                  </div>
			</td>
       		 <%for(int i = allAgent.size()-1; i >= 0 ; i--){ 
    	    		agentBean = allAgent.get(i);
    	     %>
        	<td align="left" style="font-size:18px;color:#262626">
        	</br><p class="headline2" align="center"><%=agentBean.getArea() %></p></br>
        	<hr>
        	<p class="headline3"><%=agentBean.getCompanyName() %></p>
        	<a class="hrefContent"href="<%=agentBean.getUrl()%>"><%=agentBean.getUrl() %></a></br></br>
        	<%=agentBean.getAgentContent() %>
        	<hr>
        	</td>
        <%}%>
        </tr>
    </table>
</div>

<div align="center">
</br></br></br></br></br>
    <img src="../Img/foot.jpg">
</div>
</body>

</html>
