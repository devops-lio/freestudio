<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Insert title here</title>
		<script type="text/javascript" src="xascf/system/js/roleMenu.js"></script>
	</head>
	<body>
		<div class="form-search">
			<form id="roleMenuForm" style="margin: 0;">
				<div class="widget-box" style="margin-bottom: 0px;">
				<div class="widget-body">
					<div class="widget-form" style="padding: 0px;">
						<div class="row-fluid">
							<div style="height: 400px; overflow: auto;">
								<div id="tree" class="ztree"></div>
							</div>
							<input type="hidden" name="condition.rolePid" id="rolePid" value="${rolePid}">	
							<input type="hidden" name="condition.systemPid" id="systemPid2" value="${systemPid }">								
							<!--  
							<div class="span5" id="resourceOperationDiv"
								style="height: 400px;margin-left: 0px;margin-right: 0px;">
								<input type="hidden"  id="resourcePid" name="condition.resourcePid" >
								<input type="hidden" name="condition.rolePid" id="rolePid" value="${rolePid }">
								<div class="widget-box" style="margin-top: 0px;margin: -1px -1px 0 0" >
									<div class="widget-header">
										<span class="widget-title"><i class="icon-list"></i>菜单操作列表</span>
										<span class="widget-toolbar"><a href="#"
											data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
									</div>
									<div class="widget-body">
										<div class="widget-grid">
											<table id="roleMenu_mmg" class="mmg">
											</table>
										</div>
									</div>
								</div>
							</div>
							-->
						</div>
					</div>
				</div>
			</div>
			</form>
			<div class="form-search-btn">
				<a id="roleMenuSaveBtn" class="btn btn-primary"
					href="javascript:void(0)">保存</a>
				<a id="roleMenuCancelBtn" class="btn btn-primary"
					href="javascript:void(0)">取消</a>
			</div>
		</div>
	</body>
</html>