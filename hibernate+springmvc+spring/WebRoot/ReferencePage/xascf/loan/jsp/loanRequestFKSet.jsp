<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/loanRequestFKSet.js"></script>	
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}

#setDiv .span3 {
	margin-left: 1px;
}

.details {
	margin-top: 3px;
	color: blue;
}
#approdPass_form .long85Lable{
margin-left: -20px;
width: 95px;
}
</style>
<input type="hidden" id="listType" 	value="${listType }">
<div  style="font-size: 12px;" >
			<div class="row-fluid" >
		<input type="hidden" id="billTypeStatus" value="COMON">
			<!-- 放款申请信息 -->
				<jsp:include page="fancingLoanRequestDetail.jsp"></jsp:include>
			</div>
			<div class="row-fluid" id="contractInfo" style="margin-top: -10px;">
			<!-- 合同信息 -->
				<jsp:include page="contractResultDetail.jsp"></jsp:include>
			</div>
			<div class="row-fluid" id="fancingReceiptInfo">
			<!-- 票据信息 -->
				<jsp:include page="fancingReceiptDetails.jsp"></jsp:include>
			</div>
			<!-- 本次审批操作-->
			<div class="row-fluid">
				<div class="widget-box">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>本次审批设置 </span>
					</div>
					<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;border-bottom: 1px solid #ccc;" id="approdPassDiv">
					<div class="widget-box" style="margin-top:0px;">
					<div class="widget-form">
						<form class="form-horizontal fromPre" id="approdPass_form" style="margin-top: 15px;">
						<input type="hidden" name="fancingOrderEntity.approvalRecordModel.approvalBussnessNo"	value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
						<input type="hidden" name="fancingOrderEntity.approvalRecordModel.approvalStatus"	value="${fancingOrderEntity.fancingOrderItem.fancingStatus }">
							<input type="hidden"  name="fancingOrderEntity.approvalRecordModel.objectPid"		value="${fancingOrderEntity.fancingOrderItem.pid }">
							<input type="hidden"  name="fancingOrderEntity.approvalRecordModel.approvaledStatus"		value="${passedStatus }">
							<input type="hidden"  name="fancingOrderEntity.approvalRecordModel.approvaledName"		value="${passedNames}">
							<div class="row-fluid">
								<div class="row-fluid">
									<div class="span3 control-group full">
										<label class="control-label" ><span style="color:red;">*</span>是否通过</label>
											<div class="controls">
												<slt:select cssClass="chzn-select"
													name="fancingOrderEntity.approvalRecordModel.approvalIspassed"
													optionsType="APPROLVAL_PASS">
													<slt:outHTML>id="approvaelPass"</slt:outHTML>
												</slt:select>
											</div>
									</div>
								</div>
								<input type="hidden" name="fancingOrderEntity.approvalRecordModel.approvalNext" id="approvalNext" >
								<div class="row-fluid" id="backDiv" style="display: none;">
									<div class="span3 control-group full">
										<label class="control-label" ><span style="color:red;">*</span>驳回至</label>
											<div class="controls txt" >
											<select data-placeholder="请选择..." onchange="ApprovaelFancingEdit.backChange()"  
											name="fancingOrderEntity.approvalRecordModel.rebackStatus"
											class="chzn-select span12 self-select" id="backTo" data-required="付款方不能为空!">
												<c:forEach items="${processList}" var="item">
													<option value='${item.statusValue }'>${item.statusName }</option>
												</c:forEach>
											</select>
										</div>
									</div>
								</div>
								<div class="row-fluid" id="backDiv" >
									<div class="span8 control-group full">
										<label class="control-label" ><span style="color:red;">*</span>批复内容</label>
										<div class="controls txt">
											<textarea rows="300" data-required="批复内容不能为空！" name="fancingOrderEntity.approvalRecordModel.approvalRemark" 
									 		cols="500" style="width: 100%;height: 100px;resize:none;"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid" id="fancingSet" >
								<div class="row-fluid" >
									<div class="span3 control-group full">
										<label class="control-label long85Lable" ><span style="color:red;">*</span>申请放款金额</label>
										<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${fancingOrderEntity.fancingOrderItem.requestPrice}"/></div>
									</div>
									<input type="hidden" id="loanType" value="${fancingOrderEntity.fancingOrderItem.loanType }">
									<input type="hidden" id="requestPrice" value="${fancingOrderEntity.fancingOrderItem.requestPrice }">
									<c:if test="${fancingOrderEntity.fancingOrderItem.loanType==2}">
										<div class="span3 control-group full">
											<label class="control-label long85Lable" ><span style="color:red;">*</span>批复总金额</label>
											<div class="controls txt">
												<input type="text" name="fancingOrderEntity.fancingOrderItem.requestReplyPrice" 
													id="fancingRequestReplyPrice"  value="${fancingOrderEntity.fancingOrderItem.requestReplyPrice }"
													data-required="批复总金额不能为空！" data-number="只能输入数字!"> <i></i>
											</div>
										</div>
									</c:if>
									<div class="span3 control-group full">
										<label class="control-label long85Lable" ><span style="color:red;">*</span>票据原始总金额</label>
										<div class="controls details" id="oldAllPrice">
										<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${fancingOrderEntity.fancingOrderItem.notePrice}" />
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label long85Lable" ><span style="color:red;">*</span>票据折扣后金额</label>
										<div class="controls details">
											<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${fancingOrderEntity.fancingOrderItem.noteDisprice}" />
										</div>
									</div>
								</div>
								<input type="hidden"  name="fancingOrderEntity.fancingOrderItem.pid" value="${fancingOrderEntity.fancingOrderItem.pid }">
										<input type="hidden"  name="fancingOrderEntity.fancingOrderItem.menberName" value="${fancingOrderEntity.fancingOrderItem.menberName}">
										<input type="hidden"  name="fancingOrderEntity.fancingOrderItem.menberPid" value="${fancingOrderEntity.fancingOrderItem.menberPid}">
											
					        	<div class="row-fluid" >
					        		<div class="span3 control-group full">
										<label class="control-label long85Lable" ><span style="color:red;">*</span>本次放款金额</label>
										<div class="controls txt">
										<input type="text" name="fancingOrderEntity.fancingOrderItem.replyPrice" 
												id="fancingReplyPrice"  value="${fancingOrderEntity.fancingOrderItem.replyPrice==null?fancingOrderEntity.fancingOrderItem.requestPrice:fancingOrderEntity.fancingOrderItem.replyPrice }"
												data-required="本次放款金额不能为空！" data-number="只能输入数字!"> <i></i>
										</div>
									</div>
					        		<div class="span3 control-group full" >
										<label class="control-label long85Lable" ><span style="color:red;">*</span>预计回款时间</label>
										<div class="controls time" >
												<input type="text" 
												id="termDate"
													name="fancingOrderEntity.fancingOrderItem.termDate"
													value="${fancingOrderEntity.fancingOrderItem.termDate }">
													<i class="date" data-format="yyyy-MM-dd" ></i>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
								<div class="span12 control-group full" >
									<a class="btn btn-primary" href="javascript:void(0)"
										onclick="LoanRequestFKSet.save()"><i class=""></i>提交审批</a> <a
										class="btn btn-primary" href="javascript:void(0)"
										onclick="LoanRequestFKSet.rebackList()"><i class=""></i>返回列表</a>
										</div>
							</div>
						</form>
					</div>
				</div>
			</div>	
			</div>	
			</div>
</div>