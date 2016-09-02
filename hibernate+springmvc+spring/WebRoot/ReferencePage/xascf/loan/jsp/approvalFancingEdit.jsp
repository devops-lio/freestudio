<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript"	src="xascf/loan/js/approvalFancingEdit.js"></script>
<input type="hidden" id="listType" value="${listType }">
<div class="widget-box">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>本次审批 </span>
	</div>
	<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;border-bottom: 1px solid #ccc;" id="approdPassDiv">
		<form class="form-horizontal" id="approdPass_form" style="margin-top: 15px;">
		<input type="hidden" name="approval.approvalBussnessNo"	value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
		<input type="hidden" name="approval.approvalStatus"	value="${fancingOrderEntity.fancingOrderItem.fancingStatus }">
			<input type="hidden"  name="approval.objectPid"		value="${fancingOrderEntity.fancingOrderItem.pid }">
			<input type="hidden"  name="approval.approvaledStatus"		value="${passedStatus }">
			<input type="hidden"  name="approval.approvaledName"		value="${passedNames}">
			<div class="row-fluid">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" >是否通过<span style="color:red;">*</span></label>
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
						<label class="control-label" >驳回至<span style="color:red;">*</span></label>
							<div class="controls txt" >
							<select data-placeholder="请选择..." onchange="ApprovaelFancingEdit.backChange()"  
							name="approval.rebackStatus"
							class="chzn-select span12 self-select" id="backTo" data-required="付款方不能为空!">
								<c:forEach items="${processList}" var="item">
									<option value='${item.statusValue }'>${item.statusName }</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row-fluid" id="backDiv" >
					<div class="span10 control-group full">
						<label class="control-label" >批复内容<span style="color:red;">*</span></label>
						<div class="controls txt">
							<textarea rows="300" data-required="批复内容不能为空！" name="approval.approvalRemark" 
					 		cols="500" style="width: 100%;height: 100px;resize:none;"></textarea>
						</div>
					</div>
				</div>
			</div>
		<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovaelFancingEdit.save()"><i class=""></i>提交审批</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovaelFancingEdit.saveSpecial()" id="sepecialBtn"><i class=""></i>特批申请</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovaelFancingEdit.rebackList()"><i class=""></i>返回列表</a>
			</div>
			</div>
		</form>
	</div>
</div>