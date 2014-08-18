<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ausemi2.dao.VdMosfetDao" %>
<%@ page import="com.ausemi2.bean.VdMosfet" %>
<jsp:useBean id="vdMosfetBean" class="com.ausemi2.bean.VdMosfet"></jsp:useBean>

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
	<%--取得VDMosfet数据 --%>
	<%
		VdMosfetDao vdMosfetDao = new VdMosfetDao();
		List<VdMosfet> allVdMosfet = new ArrayList<VdMosfet>();
		allVdMosfet = vdMosfetDao.allVdMosfet();
	%>
    <div id="wrapper">
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
                    <td align="left" valign="top"  width="300"><img src="../Img/product_mosfet.jpg">
                        <div >
                            <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="mosfet.jsp" style="text-decoration:none;font-size:15px">High-Voltage Super_Juction Mosfet</a>
                        </div>
                        <div>
							<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="LV_mosfet.jsp" style="text-decoration:none;font-size:15px" >Low_Medium Voltage Trench mosfet</a>
                        </div>
                        <div>
							<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                            <img src="../Img/arrow_right.png">
                            <a class="hrefContent" href="VD_mosfet.jsp" style="text-decoration:none;color:#FF0000;font-size:15px">VD Mosfet</a>
                        </div>
                    </td>
                    <td>
                        <div align="center">
                            <p>&nbsp;</p>
                            <div align="center">
                                <div align="center">
                                    <p class="headline2">VD mosfet</p>
                                </div>
                                <div>
                                    <hr align="center" width="650" size="1">
                                </div>
                                <div align="center">
                                    <table width="650" border="1" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td height="31" colspan="11">
                                                  <div align="left" style="font-size: 16px;">VD Mosfet</div>
                                              </td>
                                          </tr> 
                                          <tr class="tableContent" class="tableContent" style="background-color: #ccccff; color:#003366">
											<td width=60 rowspan="2">
												<div align="center">Part No.</div>
											</td>
											<td width="96" rowspan="2">
												<div align="center">Specification Description</div>
											</td>
											<td width="44">VDSS</td>
											<td width="31">VGS</td>
											<td width="27" colspan="2">VTH</td>
											<td width="37">IDS</td>
											<td width="36" colspan="2">RDS</td>
											<td width="28">PD</td>
											<td width="61" rowspan="2">Package</td>
										</tr>
										<tr class="tableContent" class="tableContent" style="background-color: #ccccff; color:#003366">
											<td>V</td>
											<td>V</td>
											<td>Min</td>
											<td>Max</td>
											<td>V</td>
											<td>10V</td>
											<td>0V</td>
											<td>uA</td>
										</tr>
										<%
											for(int i = allVdMosfet.size() - 1; i >= 0 ; i--){
												vdMosfetBean = allVdMosfet.get(i);
										%>
										<tr class="tableContent">
											<td align="center"><%=vdMosfetBean.getVpartNo()%></td>
											<td align="center"><%=vdMosfetBean.getVdescription() %></td>
											<td align="center"><%=vdMosfetBean.getVvdss()%></td>
											<td align="center"><%=vdMosfetBean.getVvgs() %></td>
											<td align="center"><%=vdMosfetBean.getVvth_min() %></td>
											<td align="center"><%=vdMosfetBean.getVvth_max() %></td>
											<td align="center"><%=vdMosfetBean.getVids() %></td>
											<td align="center"><%=vdMosfetBean.getVrds_10() %></td>
											<td align="center"><%=vdMosfetBean.getVrds_0() %></td>
											<td align="center"><%=vdMosfetBean.getVpd() %></td>
											<td align="center"><a href="/File/<%=vdMosfetBean.getVproductPackage() + ".html"%>" style="color:#0000CD"><%=vdMosfetBean.getVproductPackage() %></a></td>
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
</br></br></br></br></br>
    <img src="../Img/foot.jpg">
</div>
</footer>


</html>
