<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/billRebackDetails.js"></script>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
	 <div class="form-search">
	    <form class="form-horizontal fromPre" id="reback_form">
			<input type="hidden" id="billNo" name="billrebackRecordItem.fancingBillNo" value="${billItem.billNo}" >
			<input type="hidden" id="billPid"  value="${billItem.pid}" >
	        <div class="row-fluid">    
	            <div class="span7 control-group full">
	                <label class="control-label" for="">会员名称：</label>
	                <div class="controls" style="padding-top: 2px;font-size: 12px">
	                  <a href="#" onclick="customerDetailPop.customerDetail('${billItem.menberPid}')">${billItem.menberName}</a>
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="detail_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
									账单金额：<span style="color: red;" id="rebackBillPrice"></span> 
								  	 &nbsp; 	 已还金额：<span style="color: red;" id="rebackRebackedPrice"></span>
								  	 &nbsp; 	 剩余金额：<span style="color: red;" id="rebackRemainPrice"></span>
					 		</div> 
						</div>	
					</div>
	        </div>
	        <div class="row-fluid" id="bank_div" style="margin-top: 15px;">    
	        	 <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>还款金额</label>
	                <div class="controls txt">
	                    <input type="text" value="${billItem.remainingPrice }"  id="checkRebackPrice" name="billrebackRecordItem.rebackPrice" data-required="还款金额不能为空">
	                </div>
	            </div>
	            <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>转入账户</label>
	                <div class="controls xwin" >
	                			<input type="hidden" 	name="billrebackRecordItem.rebackBankNo" id="bankNo">
								<input type="text" 	id="bondAccountName" data-xwin-params="fundAccountPop"
																	data-required="银行账号不能为空！">
																<i></i>					
						</div>
	            </div>
				<div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>银行流水号</label>
	                <div class="controls txt">
	                    <input type="text"   name="billrebackRecordItem.bankTransactionNo" data-required="银行流水号不能为空">
	                </div>
	            </div>
	           <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>还款时间</label>
	                <div class="controls time">
						<input type="text"  name="billrebackRecordItem.rebackDatetime" >
						<i class="date" data-format="yyyy-MM-dd" data-maxDate="%y-%M-%d"  data-required="还款时间不能为空"></i>
					</div>
	            </div>
	        </div>
			<div class="row-fluid">
	            <div class="span6 control-group full">
	                <label class="control-label" for="">备注</label>
	                <div class="controls txt">
	                    <textarea style="height: 80px;width: 100%"  name="billrebackRecordItem.remark" ></textarea>
	                </div>
	            </div>
	           	<div class="span3 control-group full">
	                <label class="control-label" for="">本账单已结清</label>
	                <div class="controls txt">
	                	<input id="dbcheck" class="checkBoxInput" type="checkbox">
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="BillRebackDetails.saveReback()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="BillRebackDetails.cancle()"><i class=""></i>取消</a>
	    </div>
	</div></div></div>