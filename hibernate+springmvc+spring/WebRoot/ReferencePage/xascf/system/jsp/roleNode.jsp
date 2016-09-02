<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Insert title here</title>
		<script type="text/javascript" src="xascf/system/js/roleNode.js"></script>
	</head>
	<body>
  		<div class="widget-form">
  			<input type="hidden" id="rolePid" value="${rolePid}">	
  			<input type="hidden" id="nodePids" value="${nodePids}">	
      		<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="roleNode.roleNodeSave();">保存</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="roleNode.cancel();">取消</a>
			</div>
		</div>
		<div class="widget-box">
			<div class="widget-body">
				<div class="widget-grid">
					<!-- mmGrid -->
					<table id="mmg_node" class="mmg">
					</table>
					<div id="pg" style="text-align: right;">
					</div>
				</div>
			</div>
		</div> 
		
	</body>
</html>