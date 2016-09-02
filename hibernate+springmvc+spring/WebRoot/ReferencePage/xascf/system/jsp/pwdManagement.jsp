<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/pwdManagement.js"></script>        
<div class="row-fluid">
	<div class="span12">
		<form class="form-horizontal" id="changePwdForm">
			<div class="">
				<div  id="alert-area" class="alert alert-error hide">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<h4>Wrong!</h4>
					<p></p>
				</div>
			</div>
			<div class="control-group">
		 		<label class="control-label" for="oldPassword">原密码</label>
				<div class="controls">
					<input id="oldPassword" name="oldPassword" type="password"
						data-required="不能为空！" />
					<span class="help-inline"></span>
				</div>
			</div>
			
			<div class="control-group">
		 		<label class="control-label" for="newPassword">新密码</label>
				<div class="controls">
					<input id="newPassword" name="newPassword" type="password" data-minlength="新密码最少为6位" data-minlength-param="6"
						data-required="不能为空！" />
					<span class="help-inline"></span>
				</div>
			</div>
			
			<div class="control-group">
		 		<label class="control-label" for="checkPassword">确认密码</label>
				<div class="controls">
					<input id="checkPassword" name="checkPassword" type="password" data-minlength="确认密码最少为6位" data-minlength-param="6"
						data-required="不能为空！" data-equalTo="和新密码不一致" data-equalTo-param="#newPassword"/>
					<span class="help-inline"></span>
				</div>
			</div>
			
			<div class="control-group">
				<div class="controls">
					<a onclick="PwdManagement.submit();" class="btn btn-primary">提交</a>
					<a onclick="PwdManagement.reset();" class="btn btn-primary">重置</a>
				</div>
			</div>
		</form>
	</div>
</div>