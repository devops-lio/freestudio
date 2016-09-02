<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<script type="text/javascript" src="xascf/credit/js/reportPop.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>
<style>
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
</style>
<div id="setDiv">
	<div class="row-fluid">
		<div class="widget-box">
			<div class="widget-header">
				<span class="widget-title"><i class="icon-list"></i>授信申请信息 </span>
				<span class="widget-toolbar"><a href="#"
					data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
			</div>
			<div class="widget-body">
				<div class="widget-grid">
					<div class="grid-toolbar">
						<div class="form-horizontal" id="sxresultInfo"	style="margin-top: 10px;margin-bottom: 0px;font-size: 12px">
							<div class="row-fluid">
								<div class="span3 control-group full ">
									<label class="control-label" for="">授信编号：</label>
									<div class="controls details">${creditEntity.creditApplyItem.creditNo}
										<input type="hidden" id="businessNo" value="${creditEntity.creditApplyItem.creditNo}"/>
									</div>
								</div>
								<div class="span3 control-group full ">
									<label class="control-label" for="">申请状态：</label>
									<div class="controls details">${creditEntity.creditApplyItem.statusCn}
									</div>
								</div>
								<div class="span3 control-group full">
										<label class="control-label" for="">审批记录：</label>
										<div class="controls details">
										<a onclick="CreditDetail.approvlDetail();" title="点击查看详细" href="#">查看记录</a></div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span8 control-group full ">
									<label class="control-label" for="">申请会员：</label>
									<div class="controls details"><a href="#" onclick="customerDetailPop.customerDetail('${creditEntity.creditApplyItem.memberPid}')">${creditEntity.creditApplyItem.memberName}</a></div>
								</div>
							</div>
							<div class="row-fluid">	
								<div class="span3 control-group full ">
									<label class="control-label" for="">授信额度：</label>
									<div class="controls details">
										<fmt:formatNumber type="currency" pattern="#,#00.00  元"
											value="${creditEntity.creditApplyItem.creditQuota }" />
									</div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label" for="">产品类别：</label>
									<div class="controls details">${creditEntity.creditApplyItem.financingTypeCn
										}</div>
								</div>
								<div class="span3 control-group full" id="financingMethodDiv">
									<label class="control-label" for="">保理类别：</label>
									<div class="controls details">${creditEntity.creditApplyItem.financingMethodCn
										}</div>
								</div>
								<div class="span3 control-group full" id="financingNatureDiv">
									<label class="control-label" for="">保理方式：</label>
									<div class="controls details">${creditEntity.creditApplyItem.financingNatureCn
										}</div>
								</div>
							</div>
							<!-- 
							<div class="row-fluid">
								<div class="span3 control-group full">
									<label class="control-label" for="">开始日期：</label>
									<div class="controls details">${creditEntity.creditApplyItem.effectiveStartTimeStr }</div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label" for="">结束日期：</label>
									<div class="controls details">${creditEntity.creditApplyItem.effectiveEndTimeStr}</div>
								</div>
							</div> -->
							<div class="row-fluid">
								<div class="span3 control-group full">
									<label class="control-label" for="">调查报告：</label>
									<div class="controls details">
										<a href="#" onclick="CreditDetail.showEvaluateReport('${creditEntity.creditApplyItem.reportPid}')">查看报告</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 授信材料信息 -->
	<div class="row-fluid">
				<jsp:include page="creditMaterialInfo.jsp"></jsp:include>
	</div>
	<div class="row-fluid" style="margin-top: 5px;">
		<div class="widget-box">
			<div class="widget-header" style="background-color: #438eb9;">
				<span class="widget-title"><i class="icon-list"></i>委托方信息 </span>
				<span class="widget-toolbar"><a href="#"
					data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
			</div>
			<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;">
				<table class="table table-bordered" id="buyerTable">
					<tr>
						<th style="text-align: left;">委托方名称</th>
						<th style="text-align: center;width:90px">账期</th>
						<th style="text-align: center;width:110px">业务占比</th>
						<th style="text-align: center;width:100px">票据类型</th>
						<th style="text-align: center;width:100px">是否预付</th>
						<th style="text-align: center;width:115px">预付票据类型</th>
						
						
					</tr>
					<c:forEach items="${creditEntity.buyRelList}" var="item">
						<tr>
							<td style="text-align: left;"><a href="#" onclick="customerDetailPop.buyerDetail('${item.buyPid }');">${item.buyName }</a></td>
							<td style="text-align: center;">${item.billCycle }天</td>
							<td style="text-align: center;">${item.businessPercent }%</td>
							<td style="text-align: center;">${item.billType }</td>
							<td style="text-align: center;">${item.isPrePay }</td>
							<td style="text-align: center;">${item.preBillType }</td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
	<!-- 票据和预付票据信息 -->
	<div class="row-fluid" >
			<jsp:include page="billAndPrebill.jsp"></jsp:include>
	</div>
	
	<!-- 担保信息 -->
	<div class="row-fluid">
			<c:if test="${creditEntity.danbaoItemList!=null }">
				<jsp:include page="danbaoDetail.jsp"></jsp:include>
			</c:if>
	</div>
	<div class="row-fluid" style="margin-bottom: -20px;">
			<!-- 抵押信息 -->
			<c:if test="${creditEntity.diyaList!=null }">
				<jsp:include page="diyaDetail.jsp"></jsp:include>
			</c:if>
	</div>
	<!-- 本次审批操作-->
	<div class="row-fluid" style="margin-top: 20px;">
		<jsp:include page="approvalCreditEdit.jsp"></jsp:include>
	</div>
</div>