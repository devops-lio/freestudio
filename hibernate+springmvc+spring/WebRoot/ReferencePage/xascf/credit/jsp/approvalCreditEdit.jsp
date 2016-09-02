<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript"	src="xascf/credit/js/approvalCreditEdit.js"></script>

<input type="hidden" id="listType" value="${listType }">
<div class="widget-box">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>本次审批 </span>
	</div>
	<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;border-bottom: 1px solid #ccc;" id="approdPassDiv">
		<form class="form-horizontal" id="approdPass_form" style="margin-top: 15px;">
		<input type="hidden" name="approval.approvalBussnessNo" 	value="${creditEntity.creditApplyItem.creditNo }">
		<input type="hidden" name="approval.approvalStatus"	value="${creditEntity.creditApplyItem.status }">
			<input type="hidden"  name="approval.objectPid"		value="${creditEntity.creditApplyItem.pid }">
			<input type="hidden"  name="approval.approvaledStatus"		value="${passedStatus }">
			<input type="hidden"  name="approval.approvaledName"		value="${passedNames}">
			<div class="row-fluid">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>是否通过</label>
							<div class="controls">
								<slt:select cssClass="chzn-select"
									name="approval.approvalIspassed"
									optionsType="APPROLVAL_PASS">
									<slt:outHTML>id="approvaelPass"</slt:outHTML>
								</slt:select>
							</div>
					</div>
				</div>
				<input type="hidden" name="approval.approvalNext" id="approvalNext" >
				<div class="row-fluid" id="backDiv" style="display: none;">
					<div class="span3 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>驳回至</label>
							<div class="controls txt" >
							<select data-placeholder="请选择..." onchange="ApprovaelFancingEdit.backChange()"  
							name="approval.rebackStatus"
							class="chzn-select span12 self-select" id="backTo" >
								<c:forEach items="${processList}" var="item">
									<option value='${item.statusValue }'>${item.statusName }</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row-fluid" id="backDiv" >
					<div class="span10 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>批复内容</label>
						<div class="controls txt">
							<textarea rows="300" data-required="批复内容不能为空！" name="approval.approvalRemark" 
					 		cols="500" style="width: 100%;height: 130px;resize:none;"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
					<a class="btn btn-primary" href="xascf/credit/toCreditResultPrintCustomer.shtml?creditNo=${creditEntity.creditApplyItem.creditNo }" target="_bank" id="printCustomerBtn"><i class=""></i>打印_授信批复(客户)</a>
					<a class="btn btn-primary" href="xascf/credit/toCreditResultPrintInner.shtml?creditNo=${creditEntity.creditApplyItem.creditNo }" target="_bank" id="printXinanBtn"><i class=""></i>打印_授信批复(内部)</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovalCreditEdit.save()"><i class=""></i>保存审批</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovalCreditEdit.saveSpecial()" id="specialBtn"><i class=""></i>授信特批</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovalCreditEdit.rebackList()"><i class=""></i>返回列表</a>
			</div>
			</div>
		</form>
	</div>
</div>