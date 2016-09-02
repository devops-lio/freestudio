<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/common/js/memberList.js"></script>


<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:memberList.query();"><i class=""></i>查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:memberList.clearQueryForm();"><i class=""></i>重置<br /></a>
            </div>
			<form id="memberQueryForm" class="form-horizontal">
				<div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							账号
						</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.loginName">
						</div>
					</div> 
					<div class="span4 control-group full">
						<label class="control-label">
							账号类型
						</label>
						<div class="controls">
							<select data-placeholder="请选择..." class="chzn-select span12 self-select" 
							style="display: none;" name="condition.userType">
								<option></option>
								<option value="1">平台管理员</option>
								<option value="2">企业会员</option>
							</select> 
						</div>
					</div>
				</div>
			</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->

<div class="widget-box">
   <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
		</div>
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="memberList.editor()"><i class=""></i>编辑</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="memberList.deleteMamIncom()"><i class=""></i>删除</a> 
			<a id="userRoleAssignBtn" class="btn btn-primary" href="javascript:void(0)" onclick="memberList.userRoleAssign()">角色分配</a>
		</div>	
		<!-- mmGrid -->
		<table id="member_mmg" class="mmg">
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>
<div class="widget-box">
   <div class="widget-body">
   		<div class="widget-main padding-6" style="margin-top:20px;margin-left: 0px;">
			<form id="memberEditorForm" class="form-horizontal">
				<div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">企业名称<span style="color: red;">*</span></label>
						<div class="controls xwin" > 
							<input type="hidden" id="customersubPid" name="comInModel.sscoPid" value="${comInModel.sscoPid}" />
							<input type="text" data-required="企业名称不能为空！"	data-maxlength="企业名称不能超过30位"
									data-maxlength-param="30" maxlength=30 id="customerName" data-xwin-params="commonComapanyPop"
									name="comInModel.companyName" value="${comInModel.companyName}">
							<i></i>
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">账号<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" data-required="账号不能为空！"  id="loginName"
								name="comInModel.loginName" value="${comInModel.loginName}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">用户名<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" data-required="初始金额不能为空！"	data-maxlength="初始金额不能超过30位"
									data-maxlength-param="30" maxlength=30 id="userNameCn" 
									name="comInModel.userNameCn" value="${comInModel.userNameCn}">
						</div>
					</div>				
				</div>
				<div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">密码<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="password" data-required="密码不能为空！"	data-maxlength="密码不能超过30位"
									data-maxlength-param="30" maxlength=30 id="loginPwd"
									name="comInModel.loginPwd" value="${comInModel.loginPwd}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">确认密码<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="password" data-required="确认密码不能为空！"	data-maxlength="确认密码不能超过30位"
									data-maxlength-param="30" maxlength=30 id="confirPassWord">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">邮箱<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" data-required="邮箱不能为空！"	data-maxlength="邮箱不能超过30位"
									data-maxlength-param="30" maxlength=30 id="email"
								name="comInModel.email" value="${comInModel.email}">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">手机<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" data-required="邮箱不能为空！"	data-maxlength="邮箱不能超过30位"
									data-maxlength-param="30" maxlength=30 id="mobile"
								name="comInModel.mobile" value="${comInModel.mobile}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">账号类型<span style="color: red;">*</span></label>
						<div class="controls">
							<select data-placeholder="请选择..." class="chzn-select span12 self-select" data-required="角色不能为空!"
							style="display: none;" name="comInModel.userType" value="${comInModel.userType}" id="userType" >
								<option></option>
								<option value="1">平台管理员</option>
								<option value="2">企业会员</option>
							</select> 
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">是否激活</label>
						<div class="controls">
							<select data-placeholder="请选择..." class="chzn-select span12 self-select" data-required="状态不能为空!"
							style="display: none;" name="comInModel.isenable" value="${comInModel.isenable}" id="isenable" >
								<option></option>
								<option value="1">锁定</option>
								<option value="2">已启用</option>
							</select>  
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span10 control-group full offset2">
						<div class="btn-toolbar" style="margin-left: 215px;">
							<a class="btn btn-primary"  onclick="javascript:memberList.saveComInMember();">保存</a>
							<a id="reSetBtn" class="btn btn-primary"  onclick="javascript:memberList.clearEditorForm();">重置</a>
						</div>
					</div>
				</div>		
			</form>
		</div> 
	</div>
</div>
<!-- 角色分配弹出框 -->
<div class="row-fluid">
    <div class="win span8" id="tabwin_add_role">
        <div class="win-header">
            <span>角色分配</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_role_content">
        </div>
    </div>
</div>