<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.table th, .table td {
padding: 3px;
}
.table{
margin-bottom: 5px;
}

</style>
<script type="text/javascript"	src="xascf/fancing/js/fancingExtendCheck.js"></script>
<input type="hidden"  id="rebackFunction" value="${rebackFunction}">
			<input type="hidden"  id="beforeBackOrderNo" value="${beforeBackOrderNo}">
			<input type="hidden"  id="isExtend" value="${isExtend}">
			<input type="hidden"  value="${fancingOrderEntity.fancingBillItem.billCycleRemark}"  id="billCycleRemark">
<div class="form-search " style="font-size: 13px;margin: 20px;">
		<div class="row-fluid form-horizontal">
			<table style="margin-left: 50px;">
				<tr>
					<td align="right">融资单号:</td>
					<td style="width: 170px;color: red;" >${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</td>
					<td align="right">融资会员:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.requestName}</td>
					<td align="right">融资申请金额(元):</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}</td>
					<td align="right">融资申请时间:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestDateStr}</td>
				</tr>
				<tr>
					<td align="right">融资种类:</td>
					<td style="width: 170px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingType}</td>
					<td align="right">融资方式:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunction}</td>
					<td align="right">融资类别:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingKinds}</td>
					<td align="right">申请人类别:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestType}</td>
				</tr>
				<tr>
					<td align="right">监管账户类型:</td>
					<td style="width: 170px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankType}</td>
					<td align="right">监管账户:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankNo}</td>
					<td align="right">开户行:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingBankName}</td>
					<td>三方协议</td>
					<td></td>
				</tr>
			</table>
		</div>
		<div class="row-fluid" style="margin-top: 5px;color: red;">企业风控评估信息：</div>
		<div class="row-fluid">
		<table class="table table-bordered" >
			${riskResult} 
			</table>
		</div> 
		<div class="row-fluid" style="margin-top: 5px;color: red;">账单列表：</div>
			<div class="row-fluid">    
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="detail_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
									本期总剩余(元)：<span style="color: red;" id="rebackBillPrice"></span> 
								  	&nbsp; 	 本期总应还(元)：<span style="color: red;" id="rebackPayPrice"></span>
								  	 &nbsp; 	 本期已还(元)：<span style="color: red;" id="rebackRebackedPrice"></span>
								  	 &nbsp; 	 本期总利息(元)：<span style="color: red;" id="rebackLxPrice"></span>
					 		</div> 
						</div>	
					</div>
	        </div>
		<c:if test="${null!=fancingOrderEntity.shipOrderItemList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">运单列表：</div>
			<div class="row-fluid">
				<div class="widget-box">
				   <div class="widget-body">
						<div class="widget-grid">
								<table id="ship_mmg" class="mmg">
			       					<tr>
			           					<th rowspan="" colspan=""></th>
			       					</tr>
			   					</table>
			   					<div  style="text-align: center;font-size: 12px;">
								   运单总金额(元)：<span style="color: red;" id="pices"></span> 
								  	&nbsp; 	 运单总数量：<span style="color: red;" id="nums"></span>
								  	 </div> 
						</div>
					</div>
				</div>
			</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.receiptItemList }">
		<div class="row-fluid" style="margin-top: 5px;color: red;">发票列表：</div>
			<div class="row-fluid">
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
										<table id="receipt_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
					   					<div  style="text-align: center;font-size: 12px;">
										   发票总金额(元)：<span style="color: red;" id="picesReceipt"></span> 
										  	&nbsp; 	 发票总数量：<span style="color: red;" id="numsReceipt"></span>
										  	 </div>
								</div>
							</div>
						</div>
		</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.ladingBillList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">提单列表：</div>
			<div class="row-fluid">
			 			<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
										<table id="ladingBill_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
					   					<div  style="text-align: center;font-size: 12px;">
										  提单总金额(元)：<span style="color: red;" id="ladingBillpices"></span> 
										  	&nbsp; 	 提单总数量：<span style="color: red;" id="ladingBillnums"></span>
										  	 </div> 
								</div>
							</div>
						</div>
			</div>
		</c:if>
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">担保信息：</div>
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
										<table id="db_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
								</div>
							</div>
						</div>
			</div>
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">抵押信息：</div>
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
										<table id="dy_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
								</div>
							</div>
						</div>
			</div>
</div>
	<div class="row-fluid" id="checkDiv">
			<div class="row-fluid" id="checkDiv">
			<form class="form-horizontal" id="check_form">
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingPid}"	name="fancingOrderEntity.fancingOrderItem.fancingPid" id="fancingPid">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo}"	name="fancingOrderEntity.fancingOrderItem.fancingOrderNo"	id="fancingOrderNo">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingRebackDate}"	name="fancingOrderEntity.fancingOrderItem.fancingRebackDate">
		 	<input type="hidden" value="${fancingOrderEntity.fancingBillItem.fancingBillNo}"	name="fancingOrderEntity.fancingBillItem.fancingBillNo">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingDate}"	id="fancingDate" name="fancingOrderEntity.fancingOrderItem.fancingDate">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingDateType}"	id="fancingDateType">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOverdueType}"	id="fancingOverdueType">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingRebackType}"	id="fancingRebackType">
	        	<div class="row-fluid" style="margin-top: 10px;">
					<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">展期金额<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingOrderItem.fancingReplyPrice" id="fancingReplyPrice"   value="${fancingOrderEntity.fancingOrderItem.fancingDelayPrice}"
								data-required="账期金额不能为空！" data-number="只能输入数字!"> <i></i>
						</div>
					</div>
					<div class="span3 control-group full" id="zhangqi">
						<label class="control-label" style="width: 80px;">展期<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<div style="float: left;width: 66%">
							<input type="text"	name="fancingOrderEntity.fancingOrderItem.fancingDelayDate"  value="${fancingOrderEntity.fancingOrderItem.fancingDelayDate}"
							 data-required="展期不能为空！" data-number="只能输入数字!"> 
						</div>
						<slt:select cssClass="chzn-select"
							name="fancingOrderEntity.fancingOrderItem.fancingDateType"
							optionsType="DATE_TYPE">
							<slt:outHTML>id="dateType"</slt:outHTML>
							<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
						</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">展期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingRateItem.fancingRate" value="${fancingOrderEntity.fancingRateItem.fancingRate}"
							data-required="账期利率不能为空！"	data-number="只能输入数字!" > <i></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">逾期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingRateItem.overdueRate" value="${fancingOrderEntity.fancingRateItem.overdueRate}"
						data-required="逾期利率不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
				</div>
				<div class="row-fluid" >
	        		<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">展期计息方式<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingOverdueType" optionsType="OVERDUE_TYPE"   >
								<slt:outHTML>id="overdueType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" style="width: 80px;">还款方式<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingRebackType" optionsType="BILLREBACK_TYPE" >
								<slt:outHTML>id="billRebackType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
				</div>
	    		<div class="form-search-btn offset4"  style="margin-top: 30px;margin-bottom:20px;width: 62%">
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.saveFancingExtendCheck()"><i class=""></i>展期确认</a>
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.rebackCheck()"><i class=""></i>返回</a>
	    		</div>
			</form>
	</div>
</div>
