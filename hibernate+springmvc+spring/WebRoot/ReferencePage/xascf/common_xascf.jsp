<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map.Entry"%>
<%@ include file="/jsp/common_head.jsp" %>
<%@ include file="common_resource.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", 0);
%>

<script type="text/javascript" src="<%=basePath %>res/pureui/lib/bootstrap.js"></script>

<script type="text/javascript" src="<%=basePath %>xascf/js/util.js"></script>

<!-- ckeditor配置 -->
<script type="text/javascript" src="<%=basePath %>xascf/ckeditor/ckeditor.js"></script>
<!-- <script type="text/javascript" src="ckfinder/ckfinder.js"></script> -->

<!-- 弹出查询配置 -->
<script type="text/javascript" src="xascf/js/jquery.xwinconfig.js"></script>
<!-- 银行账号校验 -->
<script type="text/javascript" src="xascf/js/luhmCheck.js"></script>
<!-- 图表控件 -->
<script type="text/javascript" src="xascf/jqplot/jquery.jqplot.min.js"></script>
<script type="text/javascript" src="xascf/jqplot/excanvas.js"></script>
<script type="text/javascript" src="xascf/jqplot/plugins/jqplot.highlighter.min.js"></script>
<script type="text/javascript" src="xascf/jqplot/plugins/jqplot.cursor.min.js"></script>
<script type="text/javascript" src="xascf/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script> 
<script type="text/javascript" src="xascf/jqplot/plugins/jqplot.barRenderer.min.js"></script>
<link rel="stylesheet" type="text/css" href="xascf/risk/style/evaluateReport.css?v=2211">
<link href="xascf/jqplot/jquery.jqplot.min.css" rel="stylesheet" media="screen" />
<link rel="stylesheet" type="text/css" href="xascf/style/gloable.css">

