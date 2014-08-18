<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.SrModuleDao" %>
<%@ page import="com.ausemi2.bean.SrModule" %>
<jsp:useBean id="srModuleBean" class="com.ausemi2.bean.SrModule"></jsp:useBean>

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
		SrModuleDao srModuleDao = new SrModuleDao();
		List<SrModule> allSrModule = new ArrayList<SrModule>();
		allSrModule = srModuleDao.all();
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
        <!--content-->
        <div id="main">
            <table class="content">
                <tr>
                    <td align="left" valign="top" width="350"><img src="../Img/SR.jpg">
                    </td>
                    <td >
                        <div align="center">
                            <p>&nbsp;</p>
                            <div align="center">
                                <div align="center">
                                    <p class="headline2">SR Control Module</p>
                                </div>
                                <div>
                                    <hr align="center" width="650" size="1">
                                </div>
                                <div align="center">
                                    <table width="650" border="1" cellpadding="0" cellspacing="0">
                                          <tr style="font-size: 17px;">
                                              <td colspan="7">
                                                  <div align="left">SR Control Module</div>
                                              </td>
                                          </tr> 
                                          <tr class="tableContent" style="background-color: #ccccff; color:#003366">
                                            <td rowspan="3">
                                                <div align="center">Part No.</div>
                                            </td>
                                            <td rowspan="3">
                                                <div align="center">Type</div>
                                            </td>
                                            <td>Iout</td>
                                            <td>VDD</td>
                                            <td>VgsOUT</td>
                                            <td>Frequency</td>
                                            <td rowspan="3">Package</td>
                                          </tr>
                                          <tr class="tableContent" style="background-color: #ccccff; color:#003366">
                                            <td>(Pulsed)</td>
                                            <td>(Max)</td>
                                            <td>(Typ)</td>
                                            <td>(Max)</td>
                                          </tr>
                                          <tr class="tableContent" style="background-color: #ccccff; color:#003366">
                                            <td>A</td>
                                            <td>V</td>
                                            <td>V</td>
                                            <td>KHz</td>
                                          </tr>
                                          <%
											for(int i = 0; i < allSrModule.size() ; i++){
												srModuleBean = allSrModule.get(i);
											%>
										<tr class="tableContent">
											<td align="center"><%=srModuleBean.getSrpartNo()%></td>
											<td align="center"><%=srModuleBean.getStype() %></td>
											<td align="center"><%=srModuleBean.getSiout()%></td>
											<td align="center"><%=srModuleBean.getSvdd() %></td>
											<td align="center"><%=srModuleBean.getSvgs() %></td>
											<td align="center"><%=srModuleBean.getFreq() %></td>
											<td align="center"><a href="/File/<%=srModuleBean.getSrProductPackage() + ".html"%>" style="color:#0000CD"><%=srModuleBean.getSrProductPackage() %></a></td>
											</tr>
										<%} %>
                                          
                                    </table>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
<footer>
<div align="center">
<br><br><br><br><br>
    <img src="../Img/foot.jpg">
</div>
</footer>

</html>
