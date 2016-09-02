<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/userQuery.js"></script>


<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:userQuery.query();"><i class=""></i>查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:userQuery.clearQueryForm();"><i class=""></i>重置<br /></a>
            </div>
			<form id="userQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							登录名
						</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.loginName">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label">
							员工姓名
						</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.userNameCn">
						</div>
					</div>
				</div>
			</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->

<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>员工用户列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="userQuery.add()"><i class=""></i>新增</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="userQuery.editor()"><i class=""></i>编辑</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="userQuery.deleteUser()"><i class=""></i>删除</a> 
			<a  class="btn btn-primary" onclick="userQuery.userSystem();" href="javascript:void(0)">系统分配</a> 
			<a  class="btn btn-primary" onclick="userQuery.userResetPws();" href="javascript:void(0)" style="display: none;">重置密码</a>  
		</div>	
		<!-- mmGrid -->
		<table id="user_mmg" class="mmg">
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div> 
<!-- 新增弹出框 --> 
<div class="row-fluid">
    <div class="win span6" id="pop_up_delay">
        <div class="win-header">
            <span id="check_span">员工信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_show_content">
        </div> 
    </div>
</div> 
<script id="pop_up_staff" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex">
			<input type="hidden" value="{{customersubPid}}" name="customerOrderEntity.customerSubItemView.customersubPid" 
				id="customersubPid">
	 		<div class="row-fluid"> 
				<div class="span6 control-group full">
					<label class="control-label"><span style="color: red;">*</span>员工编号</label>
					<div class="controls txt">  
						<input type="text" data-required="编号不能为空！" placeholder="请输入" id="userNo"
							name="userModel.userNo" value="${userModel.userNo}">
					</div>
				</div>  
				<div class="span6 control-group full">
					<label class="control-label"><span style="color: red;">*</span>登录名</label>
					<div class="controls txt">
						<input type="hidden" id="id" name="userModel.id" value="${userModel.id}">
						<input type="hidden" id="userPid" name="userModel.userPid" value="${userModel.userPid}"  />
						<input type="text" data-required="登录名不能为空！"  id="loginName" placeholder="请输入"
							name="userModel.loginName" value="${userModel.loginName}">
					</div>
				</div>  
			</div> 
			<div class="row-fluid"> 
				<div class="span6 control-group full">
					<label class="control-label"><span style="color: red;">*</span>员工姓名</label>
					<div class="controls txt">
						<input type="text" data-required="员工姓名不能为空！"	data-maxlength="员工姓名不能超过30位" placeholder="请输入"
								data-maxlength-param="30" maxlength=30 id="userNameCn" 
								name="userModel.userNameCn" value="${userModel.userNameCn}">
					</div>
				</div>
	            <div class="span6 control-group full">
						<label class="control-label">邮箱</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入有效邮箱"	data-myEmail="邮箱地址格式不正确！" id="email" 
								name="userModel.email" value="${userModel.email}">
						</div>
				</div>
			</div> 
	 		<div class="row-fluid">
	            <div class="span6 control-group full">
						<label class="control-label">手机</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入"
									id="mobile" data-mobile="手机输入有误!"  maxlength=11 
								name="userModel.mobile" value="${userModel.mobile}">
						</div>
				</div>
	            <div class="span6 control-group full">
						<label class="control-label"><span style="color: red;">*</span>是否激活</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="userModel.isenable" 
										optionsType="IS_YES_NO" value="Y">
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="是否激活不能为空！"</slt:outHTML>
								<slt:outHTML>id="isenable"</slt:outHTML>	
							</slt:select>
						</div>
				</div>
			</div> 
           <div class="row-fluid"> 
				<div class="span6 control-group full">
					<label class="control-label"><span id="loginPwdSpan" style="color: red;">*</span>登录密码</label>
					<div class="controls txt">  
						<input type="password" id="loginPwd" data-required="登录密码不能为空！" data-minlength="密码最少为6位" placeholder="请输入" data-minlength-param="6"
							name="userModel.loginPwd" value="123456">
					</div>
					<div id="pwdTip" style="float:left;margin-left:70px">
									<span style="color: red; font-size:10px;">默认密码为“123456”</span>
								</div>
				</div> 
				<div class="span6 control-group full">
					<label class="control-label"><span id="checkPwdSpan" style="color: red;">*</span>确认密码</label>
					<div class="controls txt">  
						<input type="password"  name="checkPassword" id="checkPwd" data-minlength="密码最少为6位" placeholder="请输入" data-minlength-param="6" 
							data-equalTo="和登录密码不一致" data-equalTo-param="#loginPwd"
							value="123456" >
					</div>
				</div> 
                
                </div> 
 
		</form>
		<div class="row-fluid">
	    	<div class="form-search-btn">
	        	<a class="btn btn-primary save" href="javascript:void(0)" onclick="userQuery.saveUser();"><i class=""></i>保存</a>
	        
	        	<a class="btn btn-primary save" href="javascript:void(0)" onclick="userQuery.canclePurchase()"><i class=""></i>取消</a>
	    	</div>
		</div>
	</div>  
   
</script>

<div class="row-fluid">
	<div class="win span7" id="tabwin_add_system">
		<div class="win-header">
			<span>用户系统分配</span>
			<i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_system_content">
		</div>
	</div>
</div>