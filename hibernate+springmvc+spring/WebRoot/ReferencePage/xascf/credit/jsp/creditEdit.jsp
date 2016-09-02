<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<style>
#enterpriseTab .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}
a {
cursor: pointer;
}
a:hover, a:focus {
color: #005580;
text-decoration: none;
}
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
</style>
<script type="text/javascript" src="xascf/credit/js/creditEdit.js"></script>
<script type="text/javascript" src="xascf/credit/js/buyerInfo.js"></script>
<script type="text/javascript" src="xascf/credit/js/danbaoInfo.js"></script>
<script type="text/javascript" src="xascf/credit/js/diyaInfo.js"></script>
<script type="text/javascript" src="xascf/credit/js/creditMaterialEdit.js"></script>
<script type="text/javascript" src="xascf/credit/js/orderInfo.js"></script>


<div class="tabbable" style="margin-left: 0px;">
	<ul id="tabLabel" class="nav nav-tabs">
		<li class="active"><a href="#enterpriseTab" data-toggle="tab">保理类授信申请</a></li>
		<li><a href="#personTab" data-toggle="tab">仓单质押授信申请</a></li>
		<li><a href="#personTab" data-toggle="tab">订单融资授信申请</a></li>
		<li><a href="#personTab" data-toggle="tab">综合授信申请</a></li>
	</ul>
	<div class="tab-content" id="tabPanelDiv"
		style="margin-left: 0px;margin-top: -10px">
		<div class="tab-pane active" id="enterpriseTab">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body">
					<div class="widget-box" style="margin-top:0px;">
						<div class="widget-header">
							<span class="widget-title"><i class="icon-list"></i><span
								style="color:red;">*</span>授信申请信息 </span> <span class="widget-toolbar"><a
								href="#" data-action="collapse"><i class="icon-chevron-up"></i>
							</a>
							</span>
						</div>
						<div class="widget-form">
							<form class="form-horizontal fromPre" id="creditForm">
								<input type="hidden" id="businessNo"
									value="${creditEntity.creditApplyItem.creditNo}"> <input
									type="hidden" id="creditPid"
									name="creditEntity.creditModel.pid"
									value="${creditEntity.creditApplyItem.pid }">
								<div class="row-fluid">
									<div class="span3 control-group full ">
										<label class="control-label" for=""><span
											style="color: red;">*</span>授信编号 </label>
										<div class="controls txt">
											<input type="text" id="creditNo"
												name="creditEntity.creditModel.creditNo" readonly="readonly"
												value="${creditEntity.creditApplyItem.creditNo}">
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for=""><span
											style="color: red;">*</span>申请会员</label>
										<div class="controls xwin">
											<input type="hidden" id="memberType"
												name="creditEntity.creditModel.memberType" value="1">
											<input type="hidden" id="memberPid"
												onchange="CreditEdit.customerCheck();"
												name="creditEntity.creditModel.memberPid"
												value="${creditEntity.creditApplyItem.memberPid}"> <input
												type="hidden" id="memberPidSys"
												value="${creditEntity.creditApplyItem.memberPid}"> <input
												type="text" id="memberName"
												data-xwin-params="commonComapanyPop"
												data-required="申请企业不能为空！"
												placeholder="请选择授信企业"
												value="${creditEntity.creditApplyItem.memberName }">
											<i></i>
										</div>
									</div>
									<div class="span3 control-group full ">
										<label class="control-label" for=""><span
											style="color: red;">*</span>申请额度</label>
										<div class="controls txt">
											<input type="text" id="creditQuota"
												name="creditEntity.creditModel.creditQuota"
												data-required="申请额度不能为空！"
												placeholder="请输入数字" data-number="只能输入数字"
												value="${creditEntity.creditApplyItem.creditQuota}">
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for=""><span
											style="color: red;">*</span>产品类别</label>
										<div class="controls">
										<select name="creditEntity.creditModel.financingType"  id="financingType"
													data-required="产品类别不能为空"
													class="chzn-select"  >
															<c:forEach items="${FANCING_TYPE}" var="item">
															<option value="${item.code}" ${creditEntity.creditApplyItem.financingType == item.code ? "selected" : "" }>${item.nameCn}</option>
															</c:forEach>
												</select>
										</div>
										
									</div>
								</div>
								<div class="row-fluid">
									<!-- 
									<div class="span3 control-group full">
										<label class="control-label" for=""><span
											style="color: red;">*</span>开始日期</label>
										<div class="controls time">
											<input type="text" data-required="开始日期不能为空！"
												name="creditEntity.creditModel.effectiveStartTime"
												placeholder="请选择开始日期"
												value="${creditEntity.creditApplyItem.effectiveStartTime}">
											<i class="date" data-format="yyyy-MM-dd"
												></i>
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for=""><span
											style="color: red;">*</span>结束日期</label>
										<div class="controls time">
											<input type="text" data-required="结束日期不能为空！"
												name="creditEntity.creditModel.effectiveEndTime"
												placeholder="请选择结束日期"
												value="${creditEntity.creditApplyItem.effectiveEndTime}">
											<i class="date" data-format="yyyy-MM-dd"
												></i>
										</div>
									</div> -->


									<div class="span3 control-group full" id="financingMethodDiv">
										<label class="control-label" for=""><span
											style="color: red;">*</span>保理类别</label>
										<div class="controls">
											<select name="creditEntity.creditModel.financingMethod" id="financingMethod"
													data-required="保理类别不能为空"
													class="chzn-select"  >
													<c:forEach items="${FANCING_FUNCTION}" var="item">
													<option value="${item.code}" ${creditEntity.creditApplyItem.financingMethod == item.code ? "selected" : "" }>${item.nameCn}</option>
															
													</c:forEach>
												</select>
										</div>
									</div>
									<div class="span3 control-group full" id="financingNatureDiv">
										<label class="control-label" for=""><span
											style="color: red;">*</span>保理方式</label>
										<div class="controls">
											<select name="creditEntity.creditModel.financingNature"  id="financingNature"
													data-required="保理方式不能为空"
													class="chzn-select"  >
													<c:forEach items="${FANCING_KINDS}" var="item">
													<option value="${item.code}" ${creditEntity.creditApplyItem.financingNature == item.code ? "selected" : "" }>${item.nameCn}</option>
														
													</c:forEach>
												</select>
										</div>
									</div>
									<div class="span3 control-group full">
										<label class="control-label" for=""><span
											style="color: red;">*</span>调查报告</label>
										<div class="controls xwin">
											<input type="hidden" id="reportPid"
												name="creditEntity.creditModel.reportPid"
												value="${creditEntity.creditApplyItem.reportPid}"> 
											<input
												type="text" id="reportTitle"
												data-xwin-params="reportPop"
												data-required="评估报告不能为空！"
												placeholder="请选择评估报告"
												name="creditEntity.creditModel.reportTitle"
												value="${creditEntity.creditApplyItem.reportTitle }">
											<i></i>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div class="row-fluid">
						<c:if test="${recordList!=null }">
							<div class="row-fluid">
								<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
							</div></c:if>
							<!--
							<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
								 贷款卡信息 
								<jsp:include page="loanCardInfo.jsp"></jsp:include>
							</div>-->

							<div class="row-fluid">
								<!-- 基本材料jsp -->
								<jsp:include page="creditMaterialEdit.jsp"></jsp:include>
							</div>
							<div class="row-fluid">
								<!-- 委托方jsp -->
								<jsp:include page="buyerInfo.jsp"></jsp:include>
							</div>
							<div class="widget-box">
								<div class="widget-header">
									<span class="widget-title"><i class="icon-list"></i>预付票据信息
									</span> <span class="widget-toolbar"><a href="#"
										data-action="collapse"><i class="icon-chevron-up"></i> </a>
									</span>
								</div>
								<div class="widget-body">
									<div class="tabbable" style="margin-left: 0px;">
										<ul class="nav nav-tabs">
											<li class="active"><a href="#shipInfoJspTab"
												data-toggle="tab" id="shipInfoBt">运单</a></li>
											<li><a href="#orderInfoJspTab" data-toggle="tab"
												id="orderInfoBt">订单</a></li>
										</ul>
										<div class="tab-content" style="margin-top:-10px;">
											<div id="shipInfoJspTab" class="tab-pane  active">
												<!-- 预付运单jsp -->
												<jsp:include page="shipInfo.jsp"></jsp:include>
											</div>
											<div id="orderInfoJspTab" class="tab-pane">
												<!-- 预付订单jsp -->
												<jsp:include page="orderInfo.jsp"></jsp:include>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="widget-box">
								<div class="widget-header">
									<span class="widget-title"><i class="icon-list"></i>票据信息
									</span> <span class="widget-toolbar"><a href="#"
										data-action="collapse"><i class="icon-chevron-up"></i> </a>
									</span>
								</div>
								<div class="widget-body">
									<div class="tabbable" style="margin-left: 0px;">
										<ul class="nav nav-tabs">
											<li class="active"><a href="#receiptInfoJspTab"
												data-toggle="tab">发票</a></li>
											<li><a href="#shipBillEditJspTab" data-toggle="tab"
												id="shipBillEditBt">对账单</a></li>
											<li><a href="#shipTurnEditJspTab" data-toggle="tab"
												id="shipTurnEditBt">回单</a></li>
										</ul>
										<div class="tab-content" style="margin-top:-10px;">
											<div id="receiptInfoJspTab" class="tab-pane  active">
												<!-- 发票票据jsp -->
												<div class="row-fluid" style="margin-top: -10px;">
												<jsp:include page="../../loan/jsp/receiptInfo.jsp"></jsp:include>
												</div>
											</div>
											<div id="shipBillEditJspTab" class="tab-pane">
												<!-- 对账单票据jsp -->
												<jsp:include page="shipBillEdit.jsp"></jsp:include>
											</div>
											<div id="shipTurnEditJspTab" class="tab-pane">
												<!-- 回单票据jsp -->
												<jsp:include page="shipTurnEdit.jsp"></jsp:include>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 
							<div class="row-fluid" style="margin-top: 30px;">
								<input id="dbcheck" class="checkBoxInput" type="checkbox">担保
							</div> -->
							<div class="row-fluid ">
								<!-- 担保jsp -->
								<jsp:include page="danbaoInfo.jsp"></jsp:include>
							</div>
							<!-- 
							<div  class="row-fluid" style="margin-top:35px;">
								<input class="checkBoxInput" id="dycheck" type="checkbox">抵押
							</div> -->
							<div class="row-fluid ">
								<!-- 抵押jsp -->
								<jsp:include page="diyaInfo.jsp"></jsp:include>
							</div>
						</div>
						<div class="row-fluid " style="margin-top: 20px;margin-bottom:20px; text-align: center;">
							<div class="span12 control-group full" >
							<c:choose>
								<c:when test="${isSpecial=='1'}">
									<a class="btn btn-primary" href="javascript:void(0)" onclick="CreditEdit.save('90')"><i class=""></i>保存</a>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="Menu.forward('xascf/credit/jsp/creditAllList.jsp')"><i class=""></i>返回列表</a>
								</c:when>
								<c:otherwise>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="CreditEdit.save('00')"><i class=""></i>保存</a>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="CreditEdit.save('10')"><i class=""></i>提交</a>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="CreditEdit.returnList()"><i class=""></i>返回列表</a>
								</c:otherwise>
							</c:choose>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tab-pane" id="personTab">
			<h4 style="margin-top: 20px;margin-left: 20px;">非常抱歉！暂时不支持此业务！</h4>
		</div>
	</div>
</div>


