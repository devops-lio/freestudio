<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/product/js/updateRate.js"></script>

<!-- 查询条件block -->
<div class="widget-body" style="padding: 3px; border-bottom-width: 0px;" >
	<div class="widget-main padding-6" style="margin-top:10px;">
		<form action="" id="updateRateForm">
			<div class="form-horizontal" >
				<input type="hidden"   id="status"/>
				<input type="hidden" name="productModel.productPid" value="${productModel.productPid}"  id="productPid"/>
				<div  class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							产品编号<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" 
								placeholder="产品编号不能为空" 
								 value="${productModel.productNo}" id="productNo"
								 readonly="readonly">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							产品名称<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input readonly="readonly" type="text" data-required="产品名称不能为空！" 
								 value="${productModel.name}" id="name">
						</div>
					</div>
					
				</div>
				
				<div style="margin-top:3px;" class="row-fluid">
					
					<div class="span4 control-group full">
						<label class="control-label">
							年化率(%)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="年化率不能为空" data-number="只能输入数字" maxlength=20 
								placeholder="" name="productModel.aunualRate" value="${productModel.aunualRate}" id="aunualRate">
						</div>
					</div>
				</div>
				
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span6 control-group full offset2" style="margin-top: 20px;"  >
						<div class="btn-toolbar" style="margin-left: 0px;">
							<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:UpdateRate.save();">保存</a>
							<a name="needDisplay"   id="reSetBtn" class="btn btn-primary"  onclick="javascript:UpdateRate.clear();">重置</a>
						</div>
						</div>
				</div>
			</div>
		</form>
	</div>
</div>



