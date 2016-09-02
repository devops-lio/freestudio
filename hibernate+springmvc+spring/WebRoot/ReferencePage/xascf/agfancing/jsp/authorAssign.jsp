<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Insert title here</title>
		<script type="text/javascript" src="xascf/agfancing/js/authorAssignNew.js"></script>
	</head>
	<body>
		<div class="form-search">
			<form id="authorAssignForm" style="margin: 0;">
				<div class="widget-box" style="margin-bottom: 0px;">
				<div class="widget-body">
					<div class="widget-form" style="padding: 0px;">
						<div class="row-fluid">
							<div style="height: 400px; overflow: auto;">
								<div id="tree" class="ztree"></div>
							</div>
							<input type="hidden" name="solutionPid" id="solutionPid" value="${solutionPid}">	
						</div>
					</div>
				</div>
			</div>
			</form>
			<div class="form-search-btn">
				<a class="btn btn-primary"
					href="javascript:void(0)" onclick="AuthorSet.save()">保存</a>
				<a class="btn btn-primary"
					href="javascript:void(0)" onclick="AuthorSet.cancle()">取消</a>
			</div>
		</div>
	</body>
</html>