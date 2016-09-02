<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>

.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px;left:10px; }
</style>

	<script id="partnerEdit-template-tab" type="text/x-handlebars-template">
		<form class="form-horizontal" id="partnerEditForm" name="form1" method="post" action="" style="margin-top:50px;">
			 <div class="row-fluid">
				<div class="span10 control-group full" >
					<label class="control-label">企业名称<span style="color:red;">*</span></label>
					<div class="controls" >
						<input type="text" name="partnerModel.partnerName" id="partnerName" data-required="企业名称不能为空！"
							class="input_search"    value="{{partnerName}}"/>
					</div>
				</div>
			</div>
 			<div class="row-fluid">
				<div class="span10 control-group full" >
					<label class="control-label" >URL<span style="color:red;">*</span></label>
					<div class="controls" >
						<input type="text" name="partnerModel.partnerUrl" id="partnerUrl" data-required="URL不能为空！"
								data-url="企业网址格式不正确！格式如：http://www.baidu.com"
							class="input_search"  value="{{partnerUrl}}"/>
					</div>
				</div>
			</div>
			<input type="hidden" name="partnerModel.partnerLogo" value="{{partnerLogo}}" id="partnerLogo">
			<input type="hidden" name="partnerModel.partnerPid" value="{{partnerPid}}" id="pid">
			<div class="row-fluid">
				<div class="span10 control-group full" >
					<label class="control-label" >企业Logo<span style="color:red;">*</span></label>
					<div  class="controls" >
						<input type='text' data-required="企业Logo不能为空！" value="{{partnerLogo}}"
							 id='partnerLogoName' style="height:22px; border:1px solid #cdcdcd; width:100px;" />
						<input type='button'  value='上传' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
							onclick="javascript:partnerList.addUploadPop()"/>
					</div>
				</div>
			</div>
			<!--
			<div class="row-fluid">
				<div class="span10 control-group full offset1"  >
					<div class="controls" style="width: 150px;height: 100px;">
						<div id="circle_img" class=""  > </div>  
					</div>
				</div>
			</div>
			-->
			<div class="row-fluid">
				<div class="span4 control-group full" style="margin-top: 15px;width:100%;" align="center">
					<label class="control-label" style="padding-top:0px;width:225px;">
						<input type="button" class="btn btn-primary" value="保存" onclick="javascript:partnerList.save();"/>
					</label>
					<label class="control-label" style="padding-top:0px;width:80px;">
						<input type="button" class="btn btn-primary" value="取消" onclick="javascript:partnerList.cancle();"/>
					</label>
				</div>
			</div>
		</form>
</script>