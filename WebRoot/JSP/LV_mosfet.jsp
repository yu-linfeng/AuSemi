<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.LvMosfetDao" %>
<%@ page import="com.ausemi2.bean.LvMosfet"%>
<jsp:useBean id="lvMosfetBean" class="com.ausemi2.bean.LvMosfet"></jsp:useBean>


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
		LvMosfetDao lvMosfetDao = new LvMosfetDao();
		List<LvMosfet> allLvMosfet = new ArrayList<LvMosfet>();
		allLvMosfet = lvMosfetDao.allLvMosfet();
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
                    <td align="left" valign="top" width="300">
                    	<img src="../Img/product_mosfet.jpg">
                        <div >
                            <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="mosfet.jsp" style="text-decoration:none;font-size:15px">High-Voltage Super_Juction Mosfet</a>
                        </div>
                        <div>
                        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="LV_mosfet.jsp" style="text-decoration:none;color:#FF0000;font-size:15px" >Low_Medium Voltage Trench mosfet</a>
                        </div>
                        <div>
						<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="VD_mosfet.jsp" style="text-decoration:none;font-size:15px">VD Mosfet</a>
                        </div>
                    </td>
                    <td >
                        <div align="center">
                            <p>&nbsp;</p>
                            <div align="center">
                                <div align="center">
                                    <p class="headline2">Trench mosfet</p>
                                </div>
                                <div>
                                    <hr align="center" width="650" size="1">
                                </div>
                                <div align="center">
                                    <table width="650" border="1" cellpadding="0" cellspacing="0">
                                          <tr style="font-size: 16px;">
                                              <td height="31" colspan="9">
                                                  <div align="left">Low_Medium Voltage Trench mosfet(N)</div>
                                              </td>
                                          </tr> 
                                          <tr class="tableContent" style="background-color: #ccccff ; color:#003366">
											<td rowspan="2">
												<div align="center">Product Name.</div>
											</td>
											<td rowspan="2">
												<div align="center" >Type</div>
											</td>
											<td rowspan="2">Vdss</td>
											<td rowspan="2">Id(max)</td>
											<td  rowspan="2">Pd(max)</td>
											<td rowspan="2">Vgs(max)</td>
											<td >RdSon(typ)</td>
											<td >RdSon(typ)</td>
											<td rowspan="2">Package</td>
										</tr>
										<tr class="tableContent" style="background-color: #ccccff ; color:#003366">
											<td>(@10V)</td>
											<td>(@4.5V)</td>
										</tr>
										<%
											for(int i = allLvMosfet.size() - 1; i >= 0 ; i--){
												lvMosfetBean = allLvMosfet.get(i);
												if (lvMosfetBean.getVtype().equals("P")){
													continue;
												}
										%>
										<tr class="tableContent">
											<td align="center"><%=lvMosfetBean.getPartNo()%></td>
											<td align="center"><%=lvMosfetBean.getVtype() %></td>
											<td align="center"><%=lvMosfetBean.getVvdss()%></td>
											<td align="center"><%=lvMosfetBean.getVid() %></td>
											<td align="center"><%=lvMosfetBean.getVpd() %></td>
											<td align="center"><%=lvMosfetBean.getVvgs() %></td>
											<td align="center"><%=lvMosfetBean.getRdsontyp10()%></td>
											<td align="center"><%=lvMosfetBean.getRdsontyp4() %></td>
											<td align="center"><a href="/File/<%=lvMosfetBean.getProductPackage() + ".html"%>" style="color:#0000CD"><%=lvMosfetBean.getProductPackage() %></a></td>
											</tr>
										<%} %>
										
                                          <tr style="font-size: 16px;">
                                              <td height="31" colspan="9">
                                                  <div align="left">Low_Medium Voltage Trench mosfet(P)</div>
                                              </td>
                                          </tr>
                                          <tr class="tableContent" style="background-color: #ccccff ; color:#003366">
											<td rowspan="2">
												<div align="center">Product Name.</div>
											</td>
											<td rowspan="2">
												<div align="center" >Type</div>
											</td>
											<td rowspan="2">Vdss</td>
											<td rowspan="2">Id(max)</td>
											<td rowspan="2">Pd(max)</td>
											<td rowspan="2">Vgs(max)</td>
											<td>RdSon(typ)</td>
											<td>RdSon(typ)</td>
											<td rowspan="2">Package</td>
										</tr>
										<tr class="tableContent" style="background-color: #ccccff ; color:#003366">
											<td>(@10V)</td>
											<td>(@4.5V)</td>
										</tr>
										<%
											for(int i = allLvMosfet.size() - 1; i >= 0 ; i--){
												lvMosfetBean = allLvMosfet.get(i);
												if (lvMosfetBean.getVtype().equals("N")){
													continue;
												}
										%>
										<tr class="tableContent">
											<td align="center"><%=lvMosfetBean.getPartNo()%></td>
											<td align="center"><%=lvMosfetBean.getVtype() %></td>
											<td align="center"><%=lvMosfetBean.getVvdss()%></td>
											<td align="center"><%=lvMosfetBean.getVid() %></td>
											<td align="center"><%=lvMosfetBean.getVpd() %></td>
											<td align="center"><%=lvMosfetBean.getVvgs() %></td>
											<td align="center"><%=lvMosfetBean.getRdsontyp10()%></td>
											<td align="center"><%=lvMosfetBean.getRdsontyp4() %></td>
											<td align="center"><a href="../File/<%=lvMosfetBean.getProductPackage() + ".html"%>" style="color:#0000CD"><%=lvMosfetBean.getProductPackage() %></a></td>
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
</body>
<div align="center">
</br></br></br></br></br>
    <img src="../Img/foot.jpg">
</div>

</html>
