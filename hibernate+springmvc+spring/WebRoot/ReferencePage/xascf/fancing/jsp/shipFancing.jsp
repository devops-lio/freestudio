<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
 
 <style>
.widget-box .checkBoxInput{
margin-bottom: 7px;
margin-right: 7px;

}

.table th, .table td {
padding: 3px;
}
.table{
margin-bottom: 5px;
}
</style>
<script type="text/javascript" src="xascf/js/ajaxfileupload_2.1.js"></script>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
		<div class="widget-form">
	 		<form class="form-horizontal" id="fancingForm">
	 			<div class="row-fluid">
	 					<div class="span3 control-group full ">
			              <label class="control-label" for="">融资单号<span style="color: red;">*</span></label>
			              <div class="controls txt">
			                <input type="text" id="facingOrderNo" name="fancingOrderEntity.fancingOrderItem.fancingOrderNo" 
			                readonly="readonly"
			                value="${ fancingOrderEntity.fancingOrderItem.fancingOrderNo}"
			                >
			                <input type="hidden" name="fancingOrderEntity.fancingOrderItem.fancingType" value="1" id="fancingType">
			                <input type="hidden" name="fancingOrderEntity.fancingOrderItem.fancingRequestType" value="1" id="requestType">
			                <input type="hidden" name="fancingOrderEntity.fancingOrderItem.fancingPid" id="fancingOrderPid" value="${fancingOrderEntity.fancingOrderItem.fancingPid }">
			              </div>
			            </div>
	 					<div class="span3 control-group full">
			              <label class="control-label" for="">申请企业<span style="color: red;">*</span></label>
			              <div class="controls xwin">
			              	<input type="hidden" name="fancingOrderEntity.fancingOrderItem.requesterPid" id="customersubPid" value="${fancingOrderEntity.fancingOrderItem.requesterPid }">
							<input type="text"  id="customerName"  data-xwin-params="commonComapanyPop"
							data-required="申请企业不能为空！"	 value="${fancingOrderEntity.fancingOrderItem.requestName }"> <i></i>
							</div>
			            </div>
			            <div class="span3 control-group full ">
			              <label class="control-label" for="">预融资金额<span style="color: red;">*</span></label>
			              <div class="controls txt">
			                <input type="text" name="fancingOrderEntity.fancingOrderItem.fancingRequestPrice"
			                data-required="预融资金额不能为空！" value="${fancingOrderEntity.fancingOrderItem.fancingRequestPrice }"
			                >
			              </div>
			            </div>
			            <div class="span3 control-group full">
			              <label class="control-label" for="">预放款日期</label>
			             <div class="controls time">
			                <input type="text" name="fancingOrderEntity.fancingOrderItem.fancingEstimateDateStr"
			                 value="${fancingOrderEntity.fancingOrderItem.fancingEstimateDateStr }">
			                <i  class="date" data-format="yyyy-MM-dd" data-minDate="%y-%M-{%d+1}" ></i>
			              </div>
			            </div>
		 		</div>
	 			<div class="row-fluid">
	 					<div class="span3 control-group full">
			              <label class="control-label" for="">监管账号类型</label>
			             <div class="controls">
			                <slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingBankType" optionsType="CUS_BANK_PROPERTY"  >
								<slt:outHTML>id="fancingBankType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="监管账号类型不能为空"</slt:outHTML>
							</slt:select>
			              </div>
			            </div>
	 					<div class="span3 control-group full">
			              <label class="control-label" for="">监管账号</label>
			             <div class="controls">
			                <input type="text" id="fancingBankNo" name="fancingOrderEntity.fancingOrderItem.fancingBankNo"
			                 value="${fancingOrderEntity.fancingOrderItem.fancingBankNo }">
			                
			              </div>
			            </div>
	 					<div class="span3 control-group full" id="bank_div">
			              <label class="control-label" for="">开户行</label>
			             <div class="controls">
			                <input type="text" name="fancingOrderEntity.fancingOrderItem.fancingBankName"
			                 value="${fancingOrderEntity.fancingOrderItem.fancingBankName }">
			              </div>
			            </div>
		 		</div>
	 			<div class="row-fluid">
	 					<div class="span3 control-group full">
			              <label class="control-label" for="">融资方式</label>
			             <div class="controls">
			                <slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingFunction" optionsType="FANCING_FUNCTION"  >
								<slt:outHTML>id="fancingFunction"</slt:outHTML>
							</slt:select>
			              </div>
			            </div>
			            <div class="span3 control-group full">
			              <label class="control-label" for="">融资类别</label>
			             <div class="controls">
			                <slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingKinds" optionsType="FANCING_KINDS"  >
								<slt:outHTML>id="fancingKinds"</slt:outHTML>
							</slt:select>
			              </div>
			            </div>
		 		</div>
		 	</form>
		 	<div class="row-fluid">
		 			<div class="row-fluid" style="font-size: 14px;width: 90.5%;margin-top: 5px;" align="left">
		 			以下请选择您提供融资的材料，以便我们做出评估，谢谢!</div>
		 				
				 	<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
				 					<!-- 基本材料jsp -->
	 					<jsp:include page="companyRootMaterialInfo.jsp"></jsp:include>
			 		</div>
				 	<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
				 					<!-- 采购商jsp -->
	 					<jsp:include page="buyerInfo.jsp"></jsp:include>
			 		</div>
		 			<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
		 				<!-- 运单编辑jsp -->
		 				<jsp:include page="shipInfo.jsp"></jsp:include>
			 		</div>
		 			<div class="row-fluid" style="margin-top: 10px;">
		 				<input id="dbcheck" class="checkBoxInput" type="checkbox">担保
			 		</div>
		 			<div class="row-fluid " style="display:none;" id="dbshow">
			 			<!-- 担保jsp -->
		 				<jsp:include page="danbaoInfo.jsp"></jsp:include>
			 		</div>
		 			<div class="row-fluid">
		 				<input class="checkBoxInput" id="dycheck" type="checkbox">抵押
			 		</div>
		 			<div class="row-fluid " style="display: none;" id="dyshow">
			 			<!-- 抵押jsp -->
		 				<jsp:include page="diyaInfo.jsp"></jsp:include>
			 		</div>
		 		</div>
		 		<div class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
					      <a class="btn btn-primary" href="javascript:void(0)" onclick="CompanyFancingEdit.save()"><i class=""></i>保存</a> 
					      <a class="btn btn-primary" href="javascript:void(0)" onclick="CompanyFancingEdit.comfirFancingOrder()"><i class=""></i>提交</a> 
					      <a id="edit" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyFancingEdit.edit()"><i class=""></i>返回</a> 
		 		</div>
	 		
	 	</div>
	 </div>	
</div>
<script type="text/javascript" src="xascf/fancing/js/companyFancingEdit.js"></script>	

