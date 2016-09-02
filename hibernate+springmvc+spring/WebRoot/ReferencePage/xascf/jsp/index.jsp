<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>	
<%@ taglib uri="/pui-tag" prefix="slt"%>
<!DOCTYPE html>
<html>
	<head>
		<%@ include file="/xascf/common_xascf.jsp" %>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>首页</title>
  		<script src="xascf/js/index.js" type="text/javascript"></script>
  		<script type="text/javascript" src="xascf/credit/js/fileUtil.js"></script>
	</head>
	<body>
		<!-- 头部 -->
		<jsp:include page="/xascf/top.jsp"></jsp:include>
		<div class="main-container container-fluid">
			<!-- menu菜单 -->
            <a href="#" id="menu-toggler" class="menu-toggler">
                <span class="menu-text"></span>
            </a>                
            <div id="sidebar" class="sidebar" style=""></div>
			<!-- 局刷区域：默认配送单跟踪 -->
			<div class="main-content">
				<div id="breadcrumbs" class="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="icon-home home-icon"></i><a href="#">首页</a> <span class="divider"><i class="icon-angle-right arrow-icon"></i></span></li>
						<li class="active"></li>
					</ul>
				</div>
				<!-- 主页 -->
				<div class="page-content" id="xascfMainPanel">
				</div>
				<!-- 共用弹出框 -->
				<jsp:include page="allPop.jsp"></jsp:include>
			</div>
		</div>
		<!-- 底部 -->
		<jsp:include page="/xascf/bottom.jsp"></jsp:include>
		
	</body>
</html>
