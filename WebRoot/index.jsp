<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
  <head>  
    <title>Ausemi后台管理</title>
  	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="JS/Ext/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="CSS/bgStyle.css" />
	<script type="text/javascript" src="JS/Ext/ext-all-debug.js"></script>
	<script type="text/javascript" src="JS/Ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="JS/home.js"></script>
	<script type="text/javascript" src="JS/treeNodes.js"></script>
	<script type="text/javascript" src="JS/treeListener.js"></script>
	<script type="text/javascript" src="JS/overview.js"></script>
	<script type="text/javascript" src="JS/quality.js"></script>
	<script type="text/javascript" src="JS/culture.js"></script>
	<script type="text/javascript" src="JS/careers.js"></script>
	<script type="text/javascript" src="JS/model.js"></script>
	<script type="text/javascript" src="JS/message.js"></script>
	<script type="text/javascript" src="JS/news.js"></script>
	<script type="text/javascript" src="JS/lvMosfet.js"></script>
	<script type="text/javascript" src="JS/hvMosfet.js"></script>
	<script type="text/javascript" src="JS/vdMosfet.js"></script>
	<script type="text/javascript" src="JS/srModule.js"></script>
	<script type="text/javascript" src="JS/checkInfo.js"></script>
	<script type="text/javascript" src="JS/editInfo.js"></script>
	<script type="text/javascript" src="JS/agent.js"></script>
  </head>
  <%
  	String username = (String)session.getAttribute("username");
  	String userpass = (String)session.getAttribute("userpass");
  	if (username == null || userpass == null){
  		response.sendRedirect("aadmin.jsp");
  	}
   %>
</html>
