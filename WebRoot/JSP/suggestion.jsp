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
      //提交留言
      $('#ok').click(function(){
    	  $.ajax({
    		  type:"post",
    		  url:"../message",
    		  dataType:"json",
    		  data:{
    			suggestionTitle:$('#suggestionTitle').val(),
    			suggestionContent:$('#suggestionContent').val(),
    			suggestionEmail:$('#suggestionEmail').val(),
    		  },
    	  success : function(data) {
				if (data.success) {
					alert("提交成功");
					$('#suggestionTitle').val("");
					$('#suggestionContent').val("");
					$('#suggestionEmail').val("");
				}else{
					alert("提交失败!");
				}
    	  },
    	  error:function(data){
    		  alert("2提交失败!");
    	  }
    	  });
      });
      //重置
      $('#cancel').click(function(){
    	  $('#suggestionTitle').val("");
			$('#suggestionContent').val("");
			$('#suggestionEmail').val("");
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
        <td width="200px" align="left" valign="top">
        	<div>
        		<img src="../Img/suggestion.jpg"></td>	
        	</div>
        <td align="left" style="font-size:15px;color:#000000">
            Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" size="30"  id="suggestionTitle" name="suggestionTitle" /><br><br>
            Content:<textarea id="suggestionContent" name="suggestionContent"  rows="10" cols="23" style="resize:none"></textarea><br><br>
            E- Mail:&nbsp;&nbsp;<input type="text" size="30" id="suggestionEmail" name="suggestionEmail"/><br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="ok" type="submit"  value="submit"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="reset" id="cancel" value="reset" />
        </td></tr>
    </table>
</div>

<div align="center">
<br><br><br><br><br>
    <img src="../Img/foot.jpg">
</div>
</body>

</html>
