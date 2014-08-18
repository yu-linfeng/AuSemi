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
	$(document).ready(
			function() {
				$( '.dropdown' ).hover(
				        function(){
				            $(this).children('.sub-menu').slideDown(300);
				        },
				        function(){
				            $(this).children('.sub-menu').slideUp(300);
				        }
				    );
				
				$('#send').click(
						function() {
							//var temp = $('#company').val();
							if ($('#company').val() == ""
									|| $('#name').val() == ""
									|| $('#telephone').val() == ""
									|| $('#mobile').val() == ""
									|| $('#email').val() == ""
									|| $('#region').val() == ""
									|| $('#content').val() == "") {
								alert("Please input the blank with *");
							}else{
								$.ajax({
									type : "post",
									url : "../sendEmail",
									dataType : "json",
									data : {
										company : $('#company').val(),
										department : $('#department').val(),
										name : $('#name').val(),
										telephone : $('#telephone').val(),
										mobile : $('#mobile').val(),
										address : $('#address').val(),
										email : $('#email').val(),
										city : $('#city').val(),
										province : $('#province').val(),
										region : $('#region').val(),
										content : $('#content').val()
									},
									success : function(data) {
										if (data.success) {
											alert("提交成功");
											$('#company').val("");
											$('#department').val("");
											$('#name').val("");
											$('#telephone').val("");
											$('#mobile').val("");
											$('#address').val("");
											$('#email').val("");
											$('#city').val("");
											$('#province').val("");
											$('#region').val("");
											$('#content').val("");
										} else {
											alert("提交失败!");
										}
									},
									error : function(data) {
										alert("2提交失败!");
									}
								});
							}
						});
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
			<table class="content"  cellpadding="20px">
				<tr>
					<td align="left" valign="top">
						<div> 
                        	<img src="../Img/contact_us.jpg">
                    	</div>
                    	<div >
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="contact.jsp" style="color:#FF0000; font-size:16px">Contact</a>
                    </div>
                    <div>
                        <img src="../Img/arrow_right.png">
                        <a class="hrefContentTree" href="agent.jsp" style="font-size:16px">Agent</a>
                    </div>
					</td>
					
					<td align="left"
						style="font-size:15px;color:#CD3278">
						<div>
							Please enter the following information, customer service staff
							will respond to you as soon as possible. services E-mail as below
							</br>Technology support: <a href="mailto:FAE@ausemi.com"
								style="color:#9400D3">FAE@ausemi.com</a> </br>Sales support: <a
								href="mailto:sales@ansemi.com" style="color:#9400D3">sales@ansemi.com</a>
						</div>
						<hr>
						<div width="600">
							<table style="color:#000000">
								<tr>
									<td>*Company:</td>
									<td><input id="company" type="text" name="company"
										size="50" /></td>
								</tr>
								<tr>
									<td>Department:</td>
									<td><input id="department" type="text" name="department"
										size="50" /></td>
								</tr>
								<tr>
									<td>*Name:</td>
									<td><input id="name" type="text" name="name" size="50" /></td>
								</tr>
								<tr>
									<td>*Telephone:</td>
									<td><input id="telephone" type="text" name="telephone"
										size="50" /></td>
								</tr>
								<tr>
									<td>*Mobile:</td>
									<td><input id="mobile" type="text" name="mobile" size="50" /></td>
								</tr>
								<tr>
									<td>Address:</td>
									<td><input id="address" type="text" name="address"
										size="50" /></td>
								</tr>
								<tr>
									<td>*E-Mail:</td>
									<td><input id="email" type="text" name="email" size="50" /></td>
								</tr>
								<tr>
									<td>City:</td>
									<td><input id="city" type="text" name="city" size="50" /></td>
								</tr>
								<tr>
									<td>Province:</td>
									<td><input id="province" type="text" name="province"
										size="50" /></td>
								</tr>
								<tr>
									<td>*Region:</td>
									<td><input id="region" type="text" name="region" size="50" /></td>
								</tr>
								<tr>
									<td>*Content:</td>
									<td><textarea id="content" name="content" rows="5"
											cols="41" style="resize:none"></textarea></td>
								</tr>
								<tr>
									<td align="center" colspan="2"><button id="send"
											type="submit">submit</button></td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>

<div align="center">
	</br>
	</br>
	</br>
	</br>
	</br> <img src="../Img/foot.jpg">
</div>
</body>

</html>
