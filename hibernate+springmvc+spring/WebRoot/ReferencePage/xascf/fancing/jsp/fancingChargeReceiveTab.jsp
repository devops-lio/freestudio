<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>

</style>

	<script id="fancingChargeReceive-template-tab" type="text/x-handlebars-template">
<div class="form-search">
		<form class="form-horizontal" id="fancingChargeReceiveForm"  >
			 <div class="row-fluid">
				<div class="span9 control-group full" >
					<label class="control-label"><span style="color:red;">*</span><span id="repaymentTypeLbl">收取方式</span></label>
					<div class="controls" >
						<slt:select cssClass="chzn-select"    name="chargeRecordModel.repaymentType" 
										optionsType="CUS_BANK_PROPERTY" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>id="repaymentType"</slt:outHTML>
						</slt:select>
					</div>
				</div>
			</div>
			 <div class="row-fluid">
				<div class="span9 control-group full" >
					<label class="control-label"><span style="color:red;">*</span>交易流水号</label>
					<div class="controls" >
						<input type="text" id="transactionSerialNo" name="chargeRecordModel.repayNo" data-required="交易流水号不能为空！" class="input_search"/>
					</div>
				</div>
			</div>
 			<div class="row-fluid">
				<div class="span9 control-group full" >
					<label class="control-label" ><span style="color:red;">*</span><span id="bankNoLbl">转入账户</span></label>
					<div class="controls xwin" >
	                	<input type="hidden" id="bankNo"	name="chargeRecordModel.repalyBanktoNo">
						<input type="text" 	id="bondAccountName" data-xwin-params="fundAccountPop"
																	data-required="转入账户不能为空！">
														<i></i>					
				</div>
				</div>
			</div>
 			<div class="row-fluid">
				<div class="span9 control-group full" >
					<label class="control-label" ><span style="color:red;">*</span><span id="repayPriceLbl">收取金额</span></label>
					<div class="controls" >
						<input type="text" readonly="readonly"  id="customerBankNo" value={{charge}} name="chargeRecordModel.repayPrice"  class="input_search"/>
					</div>
				</div>
			</div>
 			<div class="row-fluid">
				<div class="span9 control-group full">
					<label class="control-label"><span style="color:red;">*</span>交易时间</label>
					<div class="controls time">
						<input type="text" id="transactionDate" name="chargeRecordModel.repayDateStr" data-required="交易时间不能为空！"><i class="date" data-format="yyyy-MM-dd"></i>
					</div>
				</div>
			</div>
			<div class="row-fluid">
	            <div class="span6 control-group full">
	                <label class="control-label" for="">备注</label>
	                <div class="controls txt">
	                    <textarea style="height: 70px;width: 162px;" id="remark" name="chargeRecordModel.remark" ></textarea>
	                </div>
	            </div>
			</div>
			<input type="hidden" name="chargeRecordModel.chargeNo" value="{{chargeNo}}">
			<input type="hidden"  value="{{rowIndex}}">
			<input type="hidden" name="chargeRecordModel.fancingOrderNo" value="{{fancingOrderNo}}">
			<input type="hidden" name="chargeRecordModel.chargeRecordPid" id="chargeRecordPid">
			</form>
		<div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" id="receiveBtn"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" id="calcleBtn"><i class=""></i>取消</a>
	    </div>
	</div>	
</script>