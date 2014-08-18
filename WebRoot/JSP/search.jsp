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
        $('#ok').click(function(){
     //   	window.location.href="search.jsp";
        	$.ajax({
      		  type:"post",
      		  url:"../search",
      		  dataType:"json",
      		  data:{
      			search:$('#search').val()
      		  },
      	  success : function(data) {
				//alert(data);
				if (data.length == 0){
					$('#no').show();
					$('#yes').hide();
				}else{
					$('#yes').show();
					$('#no').hide();
					var j = 1;
					for (var i=0; i < data.length; i++){
						$('#result').append("<tr>");
						for (var key in data[i]){
							j++;
							if (j % 2 == 0){
								//$('#result').append("<td>"+data[i][key]+"</td>");
								$('#result').append("<td><a style=\"color:#0000CD\" href=\"../File/"+data[i][key]+".html\">" + data[i][key] + "</td>");
							}else{
								$('#result').append("<td>"+data[i][key]+"</td>");
							}
							//alert(key+":" + data[i][key]);
								//$('#result').append("<td>"+data[i][key]+"</td>");
							//alert("<tr><td>"+key+"</td><td>"+data[i][key]+"</td></tr>");
						}
						$('#result').append("<tr>");
					}
				}
      	  },
      	  error:function(data){
      		  alert("查询失败!...");
      	  }
      	  });
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
    <table class="content" cellpadding="20px">
        <tr>
	        <td class="headline"><img src="../Img/arrow.png">Search</td>
	        <td align="left" style=" font-size:15px;color:#CD3278">
	            Please input the Part No. keyword:<br><input id="search" type="text" name="search" size="30"/>
	            <button id="ok" type="submit">submit</button>
	        	
	        	<div id="no" style="display:none"><br>Sorry,We have not the product information now!</div>
	        	<div id="yes" style="display:none"><br>
	        		<table border="1">
	        		<tbody id="result">
						<tr>
	        			<td>Package</td>
	        			<td>Part No.</td>
	        			</tr>	        		
	        		</tbody>
	        		</table>
	        	</div>
	        </td>
	        
        </tr>
    </table>
</div>

<div align="center">
</br></br></br></br></br>
    <img src="../Img/foot.jpg">
</div>
</body>
</html>
