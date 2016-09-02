<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/agfancing/js/agfancingEdit.js"></script>
<script type="text/javascript" src="xascf/agfancing/js/agfancingDetailPop.js"></script>
<script type="text/javascript" src="xascf/credit/js/reportPop.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>
<script type="text/javascript" src="xascf/customer/js/customerDetailPop.js"></script>

<form id="agfancingForm" action="" method="post"
	class="form-horizontal">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>再融资信息</span>
		</div>
		<div class="widget-body">
			<div class="widget-main padding-6"
				style="margin-top:20px;margin-left: 0px;">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label"><span
							style="color: red;">*</span>资产包名称
						</label>
						<div class="controls txt">
							<input type="hidden" id="type" value="${type}"/>
							<!-- 再融资单PID -->
							<input type="hidden" id="agfancingPid"
								name="agfancingEntity.agfancingModel.agfancingPid"
								value="${agfancingItem.agfancingPid}" />
							<input type="hidden" id="state"
								name="agfancingEntity.agfancingModel.state"
								value="${agfancingItem.state}" />
							<input type="hidden" id="agfancingOrderNo"
								name="agfancingEntity.agfancingModel.agfancingOrderNo"
								value="${agfancingItem.agfancingOrderNo}" />
							<input type="text" id="agfancingOrderName"
								data-required="资产包名称不能为空！"
								data-maxlength="资产包名称不能超过80位" 
								data-maxlength-param="80"
								name="agfancingEntity.agfancingModel.agfancingOrderName"
								value="${agfancingItem.agfancingOrderName}" />
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>拟融资总额(元)
						</label>
						<div class="controls txt">
							<input type="text" 
								data-required="拟融资总额不能为空！"
								data-maxlength="拟融资总额不能超过30位" 
								data-maxlength-param="30"
								maxlength=30  placeholder="请输入数字"
								data-number="只能填入数字"  
								id="agfancingAmount"
								name="agfancingEntity.agfancingModel.agfancingAmount"
								value="${agfancingItem.agfancingAmount}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">实际融资总额(元)
						</label>
						<div class="controls txt">
							<input type="text" 
								data-maxlength="实际融资总额不能超过30位" 
								data-maxlength-param="30"
								maxlength=30  placeholder="请输入数字"
								data-number="只能填入数字"  
								id="agfancingAmount"
								name="agfancingEntity.agfancingModel.agfancingActualAmount"
								value="${agfancingItem.agfancingActualAmount}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">融资利率(%)
						</label>
						<div class="controls txt">
							<input type="text" data-maxlength="融资利率不能超过30位" placeholder="请输入数字"
								data-number="只能填入数字" data-errorqtip="只能填入数字"
								data-maxlength-param="30" maxlength=30 id="agfancingRate"
								name="agfancingEntity.agfancingModel.agfancingRate"
								value="${agfancingItem.agfancingRate}">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" for=""><span
							style="color: red;">*</span>资金方</label>
						<div class="controls xwin">
							<input type="hidden" id="customerPid"
								name="agfancingEntity.agfancingModel.agfancingCustomerPid" 
								value="${agfancingItem.agfancingCustomerPid}">
							<input type="hidden" id="customerName"
								name="agfancingEntity.agfancingModel.agfancingCustomerName"
								value="${agfancingItem.agfancingCustomerName}">
							<div id="customerNamePop1">
								<input type="text" id="customerNamePop"
									data-xwin-params="agfancingCustomerPop"
									data-required="资金方不能为空！"
									placeholder="请选择资金方"
									value="${agfancingItem.agfancingCustomerName}">
								<i></i>
							</div>
							<div id="customerNamePop2" style="display:none">
								<input type="text" disabled="disabled"
									value="${agfancingItem.agfancingCustomerName}"></div>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>方案
						</label>
						<div class="controls xwin">
							<input type="hidden" id="solutionPid"
								name="agfancingEntity.agfancingModel.solutionPid" 
								value="${agfancingItem.solutionPid}"> 
							<input type="text" id="solutionName"
								data-xwin-params="agfancingSolutionPop"
								data-required="方案不能为空！"
								placeholder="请选择方案"
								value="${agfancingItem.solutionName}">
							<i></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">开始日期</label>
						<div class="controls time">
							<input type="text"
								id="startDate" placeholder="请选择"
								name="agfancingEntity.agfancingModel.startDate"
								value="${agfancingItem.startDate}"
								>
							<i class="date" data-format="yyyy-MM-dd"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">到期日期</label>
						<div class="controls time">
							<input type="text"
								id="endDate" placeholder="请选择"
								name="agfancingEntity.agfancingModel.endDate"
								value="${agfancingItem.endDate}"
								>
							<i class="date" data-format="yyyy-MM-dd"></i>
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full" >
						<label class="control-label" for="">计息周期</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select" 
								name="agfancingEntity.agfancingModel.rateCycle" 
								value="${agfancingItem.rateCycle}"
								optionsType="AG_RATE_CYCLE">
								<slt:outHTML>id="rateCycle"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
							</slt:select>	
						</div>
					</div>
					<div class="span6 control-group full">
						<label class="control-label">付息日期
						</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入"
								data-maxlength-param="255" maxlength=255 id="interestDateDesc"
								name="agfancingEntity.agfancingModel.interestDateDesc"
								value="${agfancingItem.interestDateDesc}">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span12 control-group full" >
						<label class="control-label" for="">补充材料</label>
						<div class="controls" style="width: 720px;">
							<input type='button' value='上传' class='btn'
								style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;padding-top: 0px;float: left;"
								onclick="javascript:AgfancingEdit.uploadFile()" /> 
							<div id="fileDiv" style="float: left;">
								<c:if test="${not empty agfancingItem.fileName}">
									<c:set var="fileNameArray" value="${fn:split(agfancingItem.fileName, ',')}"></c:set>
									<c:set var="fileUrlArray" value="${fn:split(agfancingItem.fileUrl, ',')}"></c:set>
									<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
										<span>
											<a target="_blank" onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
										    <a style="cursor:pointer" title="删除" class="buttonRomve" onclick="AgfancingEdit.removeFile(this,'${fileUrlArray[status.index]}')">&nbsp;&nbsp;</a> 
									    </span> 
								    </c:forEach> 
							    </c:if>
							</div>
							<input type="hidden" name="agfancingEntity.agfancingModel.fileUrl" value="${agfancingItem.fileUrl}" id="fileUrl">
							<input type="hidden" name="agfancingEntity.agfancingModel.fileName" value="${agfancingItem.fileName}" id="fileName">
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
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="AgfancingEdit.add()"><i class=""></i>添加会员</a> <a
						class="btn btn-primary" href="javascript:void(0)"
						onclick="AgfancingEdit.del()"><i class=""></i>删除</a>
				</div>
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
	</div>
	<div class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
		<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:AgfancingEdit.save();">保存</a>
		<a name="needDisplay" id="tobackBt" class="btn btn-primary"  onclick="javascript:AgfancingEdit.reback();">返回</a>
	</div>
</form>


<!-- 弹出框 -->
<div class="row-fluid">
	<div class="win span10" id="tabwin_customer">
		<div style="height: 30px;" class="win-header">
			<span>选择会员信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_content_customer">
		<div class="widget-form">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body">
					<div class="row-fluid" style="font-size: 12px;">
						<div class="widget-header">
							<span class="widget-title"><i class="icon-list"></i>会员列表</span>
						</div>
						<div class="widget-body">
							<div class="widget-grid">
								<table id="customer_mmg" class="mmg">
									<tr>
										<th rowspan="" colspan=""></th>
									</tr>
								</table>
							</div>
	   						<div id="customer_pg" style="text-align: right;"></div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span12 control-group full">
							<div class="btn-toolbar" style="text-align: center;">
								<a class="btn btn-primary"
									onclick="javascript:AgfancingEdit.customer_sure();">确定</a> <a
									class="btn btn-primary"
									onclick="javascript:AgfancingEdit.customer_cancel();">取消</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>


<!-- 弹出框 -->
<div class="row-fluid">
	<div class="win span10" id="tabwin_bill">
		<div style="height: 30px;" class="win-header">
			<span>账单信息列表</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_content_bill">
		<div class="widget-form">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body">
					<div class="row-fluid" style="font-size: 12px;">
						<div class="widget-header">
						<span class="widget-title"><i class="icon-list"></i>账单信息</span>
						</div>
						<div class="widget-body">
							<div class="widget-grid">
								<table id="bill_mmg" class="mmg">
									<tr>
										<th rowspan="" colspan=""></th>
									</tr>
								</table>
							</div>
	   						<div id="bill_pg" style="text-align: right;"></div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span12 control-group full">
							<div class="btn-toolbar" style="text-align: center;">
								<a class="btn btn-primary"
									onclick="javascript:AgfancingEdit.bill_sure();">确定</a> <a
									class="btn btn-primary"
									onclick="javascript:AgfancingEdit.bill_cancel();">取消</a>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="row-fluid" style="display:none">
	<div class="win span10" id="tabwin_bill">
		<div style="height: 30px;" class="win-header">
			<span>已配置账单列表</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_content_bill">
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