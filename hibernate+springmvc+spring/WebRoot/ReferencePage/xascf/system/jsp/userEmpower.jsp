<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/system/js/userEmpower.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="UserEmpower.load();">查询</a>
				<a class="btn btn-primary" onclick="UserEmpower.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="userSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">登录名</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.loginName">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">员工姓名</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.userNameCn">
						</div>
						<input type="hidden" id="systemPid" name="condition.systemPid"  value=${systemPid }>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>查询结果列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar">
                <a id="userRoleAssignBtn" class="btn btn-primary" href="javascript:void(0)">角色分配</a>
            </div>
			<!-- mmGrid -->
			<div id="mmg-users" class="mmg">
			</div>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span5" id="tabwin_add">
        <div class="win-header">
            <span>用户信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content">
        </div>
    </div>
</div>	
<div class="row-fluid">
    <div class="win span8" id="tabwin_add_role">
        <div class="win-header">
            <span>角色分配</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_role_content">
        </div>
    </div>
</div>
<div class="row-fluid">
	<div class="win span8" id="tabwin_add_function">
		<div class="win-header">
			<span>用户功能权限分配</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_function_content">
		</div>
	</div>
</div>