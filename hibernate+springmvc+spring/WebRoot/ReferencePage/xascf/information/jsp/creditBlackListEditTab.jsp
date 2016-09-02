<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
	<script id="creditBlackListEdit-template-tab" type="text/x-handlebars-template">
		<form class="form-horizontal" id="creditBlackListEditForm" name="form1" method="post" action="" style="margin-top:50px;">
			 <div class="row-fluid">
				<div class="span10 control-group full" >
					<label class="control-label" >客户名称：<span style="color:red;">*</span></label>
					<div class="controls xwin">
						<input type="hidden" name="creditBlackListModel.customerPid" id="memberPid">
						<input type="text" data-required="客户名称不能为空！"
								id="memberName" data-xwin-params="commonComapanyPop"
								name="creditBlackListModel.customerName">
							<i></i>
					</div>			
				</div>
				<div class="span10 control-group full" style="margin-left:0px">
					<label class="control-label" >原因：<span style="color:red;">*</span></label>
					<div class="controls">
						<textarea  data-maxlength="原因不能超过200个字!" data-maxlength-param="200" rows="350" cols="350" data-required="原因不能为空！"
						style="width: 100%;height: 115px;resize:none;" name="creditBlackListModel.reason" id="reason"></textarea>
					</div>
				</div>
			</div>
			<div class="row-fluid">
				
				<div class="span8 control-group full offset1"  >
					<label class="control-label" style="width:160px">
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:creditBlackList.save();"><i class=""></i>保存<br /></a>
					</label>
					<label class="control-label" style="width:70px">
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:creditBlackList.cancle();"><i class=""></i>取消<br /></a>
					</label>
				</div>
			</div>
		</form>	
</script>