<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
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
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
		<div class="widget-form">
			<div class="row-fluid">
					<div class="widget-box">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>授信基本信息 </span> <span class="widget-toolbar"><a
								href="#" data-action="collapse"><i class="icon-chevron-up"></i>
							</a> </span>
						</div>
						<div class="widget-body">
							<div class="widget-grid">
								<div class="grid-toolbar">
								<div class="form-horizontal fromPre" id="sxresultInfo"
									style="margin-top: 10px;margin-bottom: 10px;font-size: 12px">
									<input type="hidden" id="businessNo"
										value="${creditEntity.creditApplyItem.creditNo}" />
									<div class="row-fluid">
										<div class="span3 control-group full">
											<label class="control-label" for="">授信编号： </label>
											<div class="controls details">${creditEntity.creditApplyItem.creditNo}</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label" for="">申请状态：</label>
											<div class="controls details">${creditEntity.creditApplyItem.statusCn}</div>
										</div>
									</div>
									<div class="row-fluid">	
										<div class="span8 control-group full">
											<label class="control-label" for="">申请会员：</label>
											<div class="controls details">${creditEntity.creditApplyItem.memberName}</div>
										</div>
									</div>
									<div class="row-fluid">	
										<div class="span3 control-group full ">
											<label class="control-label" for="">申请额度：</label>
											<div class="controls details">
												<fmt:formatNumber type="currency" pattern="#,#00.00  元"
													value="${creditEntity.creditApplyItem.creditQuota}" />
											</div>
										</div>
										<div class="span3 control-group full ">
											<label class="control-label" for="">产品类别：</label>
											<div class="controls details">${creditEntity.creditApplyItem.financingTypeCn}</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label" for="">保理类别：</label>
											<div class="controls details">${creditEntity.creditApplyItem.financingMethodCn}</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label" for="">保理方式：</label>
											<div class="controls details">${creditEntity.creditApplyItem.financingNatureCn}</div>
										</div>
									</div>
									<!-- 
									<div class="row-fluid">
										<div class="span3 control-group full">
											<label class="control-label" for="">开始日期：</label>
											<div class="controls details">${creditEntity.creditApplyItem.effectiveStartTime}</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label" for="">结束日期：</label>
											<div class="controls details">${creditEntity.creditApplyItem.effectiveEndTime}</div>
										</div>
										
									</div> -->
									<div class="row-fluid">
										<div class="span3 control-group full">
											<label class="control-label" for="">调查报告：</label>
											<div class="controls details">
												<a href="#"
													onclick="CreditDetail.showEvaluateReport('${creditEntity.creditApplyItem.reportPid}')">查看报告</a>
											</div>
										</div>
										<c:if test="${creditEntity.evaluateResultModel!=null}">
											<div class="span3 control-group full">
												<label class="control-label" for="">总得分：</label>
												<div class="controls details">
											<a onclick="CreditDetail.scoreDetail();" title="点击查看详细" href="#">${creditEntity.evaluateResultModel.score}分(查看)</a></div>
											</div><input type="hidden" id="scrorePid" value="${creditEntity.creditApplyItem.pid}">
										</c:if>
										<c:if test="${creditEntity.creditResultModel!=null}">
											<div class="span3 control-group full">
												<label class="control-label" for="">授信批复：</label>
												<div class="controls details"><a href="xascf/credit/toCreditResultPrintInner.shtml?creditNo=${creditEntity.creditApplyItem.creditNo }" target="_bank">点击查看</a></div>
											</div>
										</c:if>
										
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>
					<!-- 授信材料信息 -->
					<jsp:include page="creditMaterialInfo.jsp"></jsp:include>
			
					<c:if test="${creditEntity.buyRelList!=null}">
						<div class="widget-box" style="border-bottom: 0px;">
							<div class="widget-header" style="background-color: #438eb9;">
								<span class="widget-title"><i class="icon-list"></i>委托方信息 </span> <span class="widget-toolbar"><a
									href="#" data-action="collapse"><i class="icon-chevron-up"></i>
								</a> </span>
							</div>
							<div class="widget-body"
								style="font-size: 12px;margin-bottom: -5px;">
								<table class="table table-bordered" id="buyerTable">
									<tr>
										<th style="text-align: left;">委托方名称</th>
										<th style="text-align: center;width:70px">账期</th>
										<th style="text-align: center;width:90px">业务占比</th>
										<th style="text-align: center;width:70px">票据类型</th>
										<th style="text-align: center;width:100px">授信额度</th>
										<th style="text-align: center;width:70px">是否预付</th>
										<th style="text-align: center;width:100px">预付票据类型</th>
			
			
									</tr>
									<c:forEach items="${creditEntity.buyRelList}" var="item">
										<tr>
											<td style="text-align: center;text-align: left;"><a href="#" onclick="customerDetailPop.buyerDetail('${item.buyPid }');">${item.buyName }</a></td>
											<td style="text-align: center;">${item.billCycle }天</td>
											<td style="text-align: center;">${item.businessPercent }%</td>
											<td style="text-align: center;">${item.billType }</td>
											<td style="text-align: center;"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${item.creditPercent }"/></td>
											<td style="text-align: center;">${item.isPrePay }</td>
											<td style="text-align: center;">${item.preBillType }</td>
										</tr>
									</c:forEach>
								</table>
							</div>
						</div>
					</c:if>
					<!-- 历史审批信息 -->
					<c:if test="${recordList!=null }">
						<div class="row-fluid">
							<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
						</div>
					</c:if>
					<!-- 票据和预付票据信息 -->
					<jsp:include page="billAndPrebill.jsp"></jsp:include>
			
					<!-- 担保信息 -->
					<c:if test="${creditEntity.danbaoItemList!=null }">
						<jsp:include page="danbaoDetail.jsp"></jsp:include>
					</c:if>
					<!-- 抵押信息 -->
					<c:if test="${creditEntity.diyaList!=null }">
						<jsp:include page="diyaDetail.jsp"></jsp:include>
					</c:if>
					
					<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
						<a class="btn btn-primary" href="javascript:void(0)"
							onclick="creditCancle()"><i class=""></i>关闭</a>
					</div>
					</div>
					</div>
					</div></div></div>

	
	
