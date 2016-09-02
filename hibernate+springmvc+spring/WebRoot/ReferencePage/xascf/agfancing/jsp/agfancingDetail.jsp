<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/agfancing/js/agfancingDetail.js"></script>
<script type="text/javascript" src="xascf/agfancing/js/agfancingDetailPop.js"></script>
<script type="text/javascript" src="xascf/credit/js/reportPop.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>

<style>
.details {
	margin-top: 3px;
	color: blue;
}
.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}
</style>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>再融资信息</span>
	</div>
	<div class="widget-body">
		<div class="form-horizontal fromPre"
			style="margin-top:10px; margin-bottom:10px; font-size:12px">
			<input type="hidden" id="type" value="${type}"/>
			<!-- 再融资单PID -->
			<input type="hidden" id="agfancingPid"
				name="agfancingEntity.agfancingModel.agfancingPid"
				value="${agfancingItem.agfancingPid}" />
			<input type="hidden" id="agfancingOrderNo"
				name="agfancingEntity.agfancingModel.agfancingOrderNo"
				value="${agfancingItem.agfancingOrderNo}" />
			<input type="hidden" id="state"
				name="agfancingEntity.agfancingModel.state"
				value="${agfancingItem.state}" />
			<div class="row-fluid">
				<div class="span3 control-group full">
					<label class="control-label">资产包名称：</label>
					<div class="controls details">${agfancingItem.agfancingOrderName}
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label">拟融资总额：</label>
					<div class="controls details">
						<fmt:formatNumber type="currency" pattern="#,##0.00" 
							value="${agfancingItem.agfancingAmount==null?0:agfancingItem.agfancingAmount}" />元
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label" style="width: 85px">实际融资总额：</label>
					<div class="controls details">
						<fmt:formatNumber type="currency" pattern="#,##0.00" 
							value="${agfancingItem.agfancingActualAmount==null?0:agfancingItem.agfancingActualAmount}" />元
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label">融资利率：</label>
					<div class="controls details">${agfancingItem.agfancingRate}%
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span3 control-group full">
					<label class="control-label" for="">资金方：</label>
					<div class="controls details">${agfancingItem.agfancingCustomerName}
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label">方案：</label>
					<div class="controls details">${agfancingItem.solutionName}
						<input type="hidden" id="solutionPid"
							name="agfancingEntity.agfancingModel.solutionPid"
							value="${agfancingItem.solutionPid}" />
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label">开始日期：</label>
					<div class="controls details">${agfancingItem.startDate}
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label">到期日期：</label>
					<div class="controls details">${agfancingItem.endDate}
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span3 control-group full" >
					<label class="control-label" for="">计息周期：</label>
					<div class="controls details">
						<c:if test="${agfancingItem.rateCycle=='1'}">天</c:if>
						<c:if test="${agfancingItem.rateCycle=='2'}">月</c:if>
						<c:if test="${agfancingItem.rateCycle=='3'}">季</c:if>
						<c:if test="${agfancingItem.rateCycle=='4'}">半年</c:if>
						<c:if test="${agfancingItem.rateCycle=='5'}">年度</c:if>
					</div>
				</div>
				<div class="span6 control-group full">
					<label class="control-label">付息日期：
					</label>
					<div class="controls details">${agfancingItem.interestDateDesc}
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12 control-group full" >
					<label class="control-label" for="">补充材料：</label>
					<div class="controls details" style="width: 720px;">
						<div id="fileDiv" style="float: left;">
							<c:if test="${not empty agfancingItem.fileName}">
								<c:set var="fileNameArray" value="${fn:split(agfancingItem.fileName, ',')}"></c:set>
								<c:set var="fileUrlArray" value="${fn:split(agfancingItem.fileUrl, ',')}"></c:set>
								<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
									<span>
										<a target="_blank" onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
								    </span> 
							    </c:forEach> 
						    </c:if>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>会员融资列表</span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<!-- mmGrid -->
			<table id="fancing_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div style="text-align: center;font-size: 12px;">
				账单总金额：<span style="color: red;" id="allBillPrice">
				<fmt:formatNumber type="currency" pattern="#,##0.00（元）" 
					value="${agfancingItem.billAmount==null?0:agfancingItem.billAmount}" /></span>
				<input type="hidden" id="billAmount" name="agfancingEntity.agfancingModel.billAmount"
							value="${agfancingItem.billAmount}">
			</div>
		</div>
	</div>
	<div class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
		<a name="needDisplay" id="tobackBt" class="btn btn-primary"  onclick="javascript:AgfancingDetail.reback();">返回列表</a>
	</div>
</div>

<div class="row-fluid">
	<div class="win span10" id="tabwin_bill_conf">
		<div style="height: 30px;" class="win-header">
			<span>已配置账单列表</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_content_bill_conf">
		<div class="widget-form">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body">
					<div class="row-fluid" style="font-size: 12px;">
						<div class="widget-header">
						<span class="widget-title"><i class="icon-list"></i>账单信息</span>
						</div>
						<div class="widget-body">
							<div class="widget-grid">
								<table id="bill_conf_mmg" class="mmg">
									<tr>
										<th rowspan="" colspan=""></th>
									</tr>
								</table>
							</div>
	   						<div id="bill_conf_pg" style="text-align: right;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>


<div class="row-fluid">
	<div class="win" id="creditDetail"  style="width:1150px;">
	    <div class="win-header">
			<span>授信信息</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="creditDetailContent"></div>
	</div>
</div>