<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/agfancingEdit.js"></script>


<!-- 查询列表-->
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>账单列表信息</span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)"
					onclick="AgfancingEdit.add()"><i class=""></i>新增</a> <a
					class="btn btn-primary" href="javascript:void(0)"
					onclick="AgfancingEdit.deleteCapital()"><i class=""></i>删除</a>
			</div>
			<!-- mmGrid -->
			<table id="agfund_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div style="text-align: center;font-size: 12px;">
				账单总金额：<span style="color: red;" id="allBillPrice"></span>
			</div>
		</div>
	</div>

</div>
<form id="capitalEditorForm" action="" method="post"
	class="form-horizontal">
	<div class="widget-box">
		<div class="widget-body">
			<div class="widget-main padding-6"
				style="margin-top:20px;margin-left: 0px;">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label"><span
							style="color: red;">*</span>再融资编号
						</label>
						<div class="controls txt">
							<input type="hidden" id="type" value="${type}"/>
							<!-- 再融资单PID -->
							<input type="hidden" id="agfancingPid"
								name="agfancingEntity.aGFancingModel.agfancingPid"
								value="${aGFancingItem.agfancingPid}" />
							<!-- 再融资企业PID -->
							<input type="hidden" id="agfancingCustomerPid"
								name="agfancingEntity.aGFancingModel.agfancingCustomerPid"
								value="${aGFancingItem.agfancingCustomerPid}" />
							<!-- 再融资企业 -->
							<input type="hidden" id="agfancingCustomerName"
								name="agfancingEntity.aGFancingModel.agfancingCustomerName"
								value="${aGFancingItem.agfancingCustomerName}" /> 
							<input type="text" id="agfancingOrderNo" id="agfancingOrderNo"
								name="agfancingEntity.aGFancingModel.agfancingOrderNo"
								value="${aGFancingItem.agfancingOrderNo}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>账单总额
						</label>
						<div class="controls txt">
							<input type="text" data-maxlength="账单总额不能超过30位"
								data-required="账单总额不能为空！"  placeholder="请输入数字"
								data-number="只能填入数字" data-maxlength-param="30" maxlength=30
								id="billAmount"
								name="agfancingEntity.aGFancingModel.billAmount"
								value="${aGFancingItem.billAmount}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>融资金额
						</label>
						<div class="controls txt">
							<input type="text" 
								data-required="融资金额不能为空！"
								data-maxlength="融资金额不能超过30位" 
								data-maxlength-param="30"
								maxlength=30  placeholder="请输入数字"
								data-number="只能填入数字"  
								id="agfancingAmount"
								name="agfancingEntity.aGFancingModel.agfancingAmount"
								value="${aGFancingItem.agfancingAmount}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span
							style="color: red;">*</span>融资账期(天)
						</label>
						<div class="controls txt">
							<input type="text" data-maxlength="融资账期不能超过30位"
								data-required="融资账期不能为空！"
								data-number="只能填入数字" data-maxlength-param="30" maxlength=30
								id="agfancingAccount"  placeholder="请输入数字"
								name="agfancingEntity.aGFancingModel.agfancingAccount"
								value="${aGFancingItem.agfancingAccount}">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label"><span
							style="color: red;">*</span>融资费率(%)
						</label>
						<div class="controls txt">
							<input type="text" data-maxlength="融资费率不能超过30位"
								data-required="融资费率不能为空！"  placeholder="请输入数字"
								data-number="只能填入数字" data-errorqtip="只能填入数字"
								data-maxlength-param="30" maxlength=30 id="agfancingRate"
								name="agfancingEntity.aGFancingModel.agfancingRate"
								value="${aGFancingItem.agfancingRate}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>融资方式
						</label>
						<div class="controls txt">
							<input type="text" data-required="融资方式不能为空！"
								data-required="融资方式不能为空！"
								data-maxlength="融资方式不能超过30位" data-maxlength-param="30"
								maxlength=30 id="agfancingType"  placeholder="请输入"
								name="agfancingEntity.aGFancingModel.agfancingType"
								value="${aGFancingItem.agfancingType}">
						</div>
					</div>
					
					<div class="span3 control-group full">
						<label class="control-label"><span style="color: red;">*</span>状态
						</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select" 
								value="${aGFancingItem.state}"
								name="agfancingEntity.aGFancingModel.state" 
								optionsType="AG_FANCING_STATE">
								<slt:outHTML>id="state"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
								<slt:outHTML>data-required="状态不能为空！"</slt:outHTML>
							</slt:select>	
						</div>
					</div>
				</div>
				<div class="row-fluid " style="margin-top: 20px;margin-bottom:20px; text-align: center;">
							<div class="span12 control-group full" >
							<a class="btn btn-primary"
								onclick="javascript:AgfancingEdit.save();">保存</a> 
							<a id="reSetBtn" class="btn btn-primary"
								onclick="javascript:AgfancingEdit.reback();">返回</a>
						</div>
					</div>
			</div>
		</div>
	</div>
</form>


<!-- 弹出框 -->
<div class="row-fluid">
	<div class="win span10" id="tabwin_add_buyer">
		<div style="height: 30px;" class="win-header">
			<span>融资交易单列表</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_content_buyer">
		<div class="widget-form">
			<div class="widget-box" style="font-size: 12px;">
			 <div class="widget-header">
		          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		      </div>
				<div class="widget-body">
					<div class="widget-form">
					 <div class="form-toolbar">
						<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:AgfancingEdit.fancingQuery();"><i class=""></i>查询<br /></a>
								<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:AgfancingEdit.fancingClear();"><i class=""></i>重置<br /></a>
					</div>
						<div class="row-fluid" >
								<form action="" id="fancingQueryForm" class="form-horizontal fromPre">
									<div class="row-fluid">
										<div class="span3 control-group full">
											<label class="control-label">
												账单编号
											</label>
											<div class="controls txt">
												<input type="text"  placeholder="请输入"
													name="condition.fancingBillNo">
											</div>
										</div>
										<div class="span3 control-group full">
											<label class="control-label">
												会员名称
											</label>
											<div class="controls txt">
												<input type="text"  placeholder="请输入"
													name="condition.memberName">
											</div>
										</div>
									</div>
								</form>
						</div>
					</div>
					<div class="row-fluid" style="font-size: 12px;">
					<div class="widget-header">
					<span class="widget-title"><i class="icon-list"></i>账单列表信息</span>
				</div>
						<div class="widget-body">
							<div class="widget-grid">
								<table id="mmg" class="mmg">
									<tr>
										<th rowspan="" colspan=""></th>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span12 control-group full">
							<div class="btn-toolbar" style="text-align: center;">
								<a class="btn btn-primary"
									onclick="javascript:AgfancingEdit.sure();">确定</a> <a
									class="btn btn-primary"
									onclick="javascript:AgfancingEdit.cancle();">取消</a>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>