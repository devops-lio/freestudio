<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%
//产品类型
	pageContext.setAttribute("FANCING_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_TYPE"));
	//保理类别
	pageContext.setAttribute("FANCING_FUNCTION", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_FUNCTION"));
	//保理方式
	pageContext.setAttribute("FANCING_KINDS", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_KINDS"));
	%>
<script type="text/javascript" src="xascf/credit/js/creditRequestDetails.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>
<div id="setDiv">
	<div class="row-fluid">
				<div class="widget-box" >
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>授信申请信息
						</span> <span class="widget-toolbar"><a href="#"
							data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
					</div>
					<div class="widget-body">
						<div class="widget-grid">
							<div class="grid-toolbar">
							<div class="form-horizontal" id="sxresultInfo" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px">
								<input type="hidden" id="businessNo" value="${creditEntity.creditApplyItem.creditNo}">
								<input type="hidden" id="creditNo" value="${creditEntity.creditApplyItem.creditNo}">
								<input type="hidden" id="pid" value="${creditEntity.creditApplyItem.pid}">
								<input type="hidden" id="creditQuota" value="${creditEntity.creditApplyItem.creditQuota}">
								<div class="row-fluid">
									<div class="span3 control-group full">
										<label class="control-label" for="">授信编号： </label>
										<div class="controls details">${creditEntity.creditApplyItem.creditNo}</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for="">申请状态：</label>
										<div class="controls details">${creditEntity.creditApplyItem.statusCn}</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for="">审批记录：</label>
										<div class="controls details">
										<a onclick="CreditRequestDetails.approvlDetail();" title="点击查看详细" href="#">查看记录</a></div>
									</div>
								</div>
								<div class="row-fluid">
									<div class="span8 control-group full">
										<label class="control-label" for="">申请会员：</label>
										<div class="controls details"><a href="#" onclick="customerDetailPop.customerDetail('${creditEntity.creditApplyItem.memberPid}')">${creditEntity.creditApplyItem.memberName}</a></div>
									</div>
								</div>
								<div class="row-fluid">
									<div class="span3 control-group full ">
										<label class="control-label" for="">申请额度：</label>
										<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${creditEntity.creditApplyItem.creditQuota}"/></div>
									</div>
									<div class="span3 control-group full ">
										<label class="control-label" for="">产品类别：</label>
										<div class="controls details">
										<c:forEach items="${FANCING_TYPE}" var="item">
										<c:if test="${creditEntity.creditApplyItem.financingType==item.code }">${item.nameCn}</c:if>
										</c:forEach>
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for="">保理类别：</label>
										<div class="controls details">
										<c:forEach items="${FANCING_FUNCTION}" var="item">
										<c:if test="${creditEntity.creditApplyItem.financingMethod ==item.code }">${item.nameCn}</c:if>
										</c:forEach>
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for="">保理方式：</label>
										<div class="controls details">
										<c:forEach items="${FANCING_KINDS}" var="item">
										<c:if test="${creditEntity.creditApplyItem.financingNature ==item.code }">${item.nameCn}</c:if>
										</c:forEach>
										</div>
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
										<input type="hidden" value="${creditEntity.creditApplyItem.reportPid}" id="reportPid" >
										<div class="controls details"><a onclick="CreditRequestDetails.showEvaluateReport()">查看报告</a></div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for="">授信打分：</label>
										<div class="controls details">
										<a onclick="CreditRequestDetails.scoreDetail();" title="点击查看详细" href="#">${creditEntity.evaluateResultModel.score}分(查看)</a></div>
									</div>
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
		</div>
	</div>
	