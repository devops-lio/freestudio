<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript"
	src="xascf/credit/js/creditScoringDetail.js"></script>
	<script type="text/javascript" src="xascf/credit/js/reportPop.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>

<script type="text/javascript">
	
	$(document).ready(function() {
		$(".popaclass").hover(
			function() {
				$(this).next().show("fast");
				/*$(this).next().animate({
					opacity : "show",
					left : "490"
				}, "slow");*/
			}, 
			function() {
				$(this).next().hide("fast");
				/*$(this).next().animate({
					opacity : "hide",
					left : "450"
				}, "fast");*/
			}
		);
	});
</script>
<style>
.emclass {
	 background-color:#FFEFD5;
	 border-color:#C4C4C4;
	 border-width:1px;
	 border-style:solid;
	 box-shadow: 5px 5px 1px #000;
	 border-radius: 10%;
	 width: 200px;
	 height: auto;
	 margin-left:5px;
	 margin-top:-2px;
	 position: absolute;
	 text-align: center;
	 font-style: normal;
	 z-index:10;
	 padding:5px;
	 display:none;
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
</style>
<div id="setDiv">
	<div class="row-fluid">
		<div class="widget-box" style="font-size: 12px;">
		<input type="hidden" id="cretitApplyPid"	value="${creditEntity.creditApplyItem.pid}">
			<div class="widget-header" style="background-color: #438eb9;">
				<span class="widget-title"><i class="icon-list"></i>授信申请信息 </span> <span
					class="widget-toolbar"><a href="#" data-action="collapse"><i
						class="icon-chevron-up"></i> </a> </span>
			</div>
			<div class="widget-body">
				<div class="widget-grid">
					<div class="grid-toolbar">
							<div class="form-horizontal" style="margin-top: 10px;margin-bottom: 0px;font-size: 12px">
								<div class="row-fluid">
									<div class="span3 control-group full ">
										<label class="control-label" for="">授信编号：</label>
										<div class="controls details">${creditEntity.creditApplyItem.creditNo} 
										<input type="hidden" id="creditNo" value="${creditEntity.creditApplyItem.creditNo}" />
										<input type="hidden" id="businessNo" value="${creditEntity.creditApplyItem.creditNo}" />
										<input type="hidden" id="memberNo" value="${customerModel.memberNo}" />
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
										<label class="control-label" for="">授信会员：</label>
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
			<!-- 授信会员信息 -->
			<div class="row-fluid" style="margin-top: -10px;">
				<div class="widget-box">	
						<!-- 委托方 -->
						<div class="row-fluid" >
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
					
						
						<div class="row-fluid">
							<div class="widget-box">
								<div class="widget-header" style="background-color: #438eb9;">
									<span class="widget-title"><i class="icon-list"></i>会员评分信息
									</span>
								</div>
								<div class="widget-body"
									style="font-size: 12px;margin-bottom: -5px;">
									<div class="row-fluid">
										<form class="form-horizontal">
											<div class="row-fluid">
												<div class="span3 control-group full"
													style="margin-top: 5px">
													<input id="industryCode"
														value="${customerSubModel.industry}" type="hidden" /> <label
														class="control-label" style="width: 50px">模板：</label>
													<div class="controls xwin" style="margin-left: 50px">
														<input type="hidden" id="templatePid"
															value="${templatesView.templatePid}"> <input
															type="text" id="templateName"
															data-xwin-params="templatesPop"
															value="${templatesView.templateName}"> <i></i>
													</div>
												</div>
												<div style="float: left;padding: 2px 10px">
													<a class="btn btn-primary" href="javascript:void(0)"
														onclick="javascript:creditScoringDetail.reScoring();">
														重新评分 </a>
												</div>
											</div>
										</form>
										<div class="widget-box" style="padding:0 10px;"
											id="templateIndexDivId">${templateIndexHtml}</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
			
			<!-- 授信材料信息 -->
			<div class="row-fluid" style="margin-top: 5px;">
				<div class="widget-box">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>授信材料信息</span>
						<span class="widget-toolbar"><a href="#"
							data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
					</div>
					<div class="widget-body">
						<div class="row-fluid">
							<form class="form-horizontal"
								style="margin-top: 10px;margin-bottom: 10px;font-size: 12px"
								id="materialDefineForm">
								<table class="table table-bordered" id="materialDefineTableId"
									style="margin-bottom: 5px;table-layout: fixed">
									${materialDefineTable}
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 贷款卡号
			<c:if test="${creditEntity.loanbankItem.loansNo!=''}">
			<div class="row-fluid">
				<div class="widget-box">
					<div class="widget-header">
						<span class="widget-title"><i class="icon-list"></i>公司贷款卡信息
						</span> <span class="widget-toolbar"><a href="#"
							data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
					</div>
					<div class="widget-body">
						<div class="widget-grid">
							<div class="grid-toolbar">
								<div class="form-horizontal">
									<div style="margin-top:3px;" class="row-fluid">
										<div class="span3 control-group full">
											<label class="control-label"> 贷款银行：</label>
											<div class="controls details">
												${creditEntity.loanbankItem.loansBank}</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label"> 贷款卡号：</label>
											<div class="controls details">
												${creditEntity.loanbankItem.loansNo}</div>
										</div>

										<div class="span3 control-group full">
											<label class="control-label"> 贷款密码：</label>
											<div class="controls details">
												${creditEntity.loanbankItem.loansPwd}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</c:if>
			 -->
			
			
			
			
			
			
			
			<!-- 票据和预付票据信息 -->
			<div class="row-fluid">
					<jsp:include page="billAndPrebill.jsp"></jsp:include>
			</div>
			
			<!-- 担保信息 -->
			<div class="row-fluid">
					<c:if test="${creditEntity.danbaoRelList!=null }">
						<jsp:include page="danbaoDetail.jsp"></jsp:include>
					</c:if>
			</div>
			<div class="row-fluid">
					<!-- 抵押信息 -->
					<c:if test="${creditEntity.diyaList!=null }">
						<jsp:include page="diyaDetail.jsp"></jsp:include>
					</c:if>
			</div>
			<!-- 历史审批信息 
			<div class="row-fluid">
				<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
			</div>
			-->
			
			<!-- 本次审批操作-->
			<div class="row-fluid">
				<div class="widget-box">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>授信评分审批</span>
					</div>
					<div class="widget-body"
						style="font-size: 12px;margin-bottom: -5px;border-bottom: 1px solid #ccc;"
						id="approdPassDiv">
						<form class="form-horizontal" id="evaluateResultForm"
							style="margin-top: 15px;">
							<input type="hidden"
								name="approvalRecordModel.approvalBussnessNo"
								value="${creditEntity.creditApplyItem.creditNo}"> <input
								type="hidden" name="approvalRecordModel.approvalStatus"
								value="${creditEntity.creditApplyItem.status}"> <input
								type="hidden" name="approvalRecordModel.approvalNext"
								id="approvalNext"> <input type="hidden"
								name="approvalRecordModel.objectPid"
								value="${creditEntity.creditApplyItem.pid }"> <input
								type="hidden" name="approvalRecordModel.approvaledStatus"
								value="${passedStatus }"> <input type="hidden"
								name="approvalRecordModel.approvaledName" value="${passedNames}">

							<input type="hidden" name="backToNodeId" id="backToNodeId">

							<div class="row-fluid">
								<div class="row-fluid" id="scoreDiv">
									<div class="span3 control-group full">
										<label class="control-label">最终得分<span
											style="color:red;">*</span>
										</label>
										<div class="controls">
											<input type="text" data-required="最终得分不能为空！"
												data-number="只能填入数字" name="evaluateResultModel.score">
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div class="span3 control-group full">
										<label class="control-label">是否通过<span
											style="color:red;">*</span>
										</label>
										<div class="controls">
											<slt:select cssClass="chzn-select"
												name="approvalRecordModel.approvalIspassed"
												optionsType="APPROLVAL_PASS">
												<slt:outHTML>id="approvaelPass"</slt:outHTML>
											</slt:select>
										</div>
									</div>
								</div>
								<div class="row-fluid" id="backDiv" style="display: none;">
									<div class="span3 control-group full">
										<label class="control-label">驳回至<span
											style="color:red;">*</span>
										</label>
										<div class="controls txt">
											<select data-placeholder="请选择..."
												name="approvalRecordModel.rebackStatus"
												class="chzn-select span12 self-select" id="backTo">
												<c:forEach items="${processList}" var="item">
													<option value='${item.statusValue }'>${item.statusName
														}</option>
												</c:forEach>
											</select>
										</div>
									</div>
								</div>
								<div class="row-fluid" id="backDiv">
									<div class="span8 control-group full">
										<label class="control-label">审批内容<span
											style="color:red;">*</span>
										</label>
										<div class="controls txt">
											<textarea rows="300" data-required="审批内容不能为空！"
												name="evaluateResultModel.evaluateConclusion" cols="500"
												style="width: 100%;height: 50px;resize:none;"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid offset4"
								style="margin-top: 20px;margin-bottom: 30px;width: 62%">
								<a class="btn btn-primary" href="javascript:void(0)"
									onclick="creditScoringDetail.saveScoring()">提交审批</a> <a
									class="btn btn-primary" href="javascript:void(0)"
									onclick="creditScoringDetail.returnList()">返回列表</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
