<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/billListRebackDetail.js"></script>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
	 <div class="form-search">
	    	 <div class="row-fluid">  
	    	 <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:BillListRebackDetail.allLXQuery();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BillListRebackDetail.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="allLXQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									账单编号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.fancingBillNo" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									会员名称
								</label>
								<div class="controls txt">
									<input type="text"  	placeholder="请输入" name="condition.memberName" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									账单到期从
								</label>
								<div class="controls time">
								<input type="text"  name="condition.createTimeFrom" id="expectedarrivetime1">
									<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
								  至
								</label>
								<div class="controls time">
									<input type="text"  name="condition.createTimeTo" id="expectedarrivetime2">
									<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
								</div>
							</div>
						</div>
				</form>
			</div>
		</div>
	    	 
	    	 </div>
	        <div class="row-fluid" id="mmgDiv">  
		        <div class="widget-header">
					<span class="widget-title"><i class="icon-list"></i>待还利息账单列表</span>
				</div>  
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="listDetail_mmg" class="mmg" >
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
	         <div class="row-fluid"> 
	        <form class="form-horizontal fromPre" id="allLXReback_form">
	        <div class="row-fluid" id="bank_div" style="margin-top: 15px;">    
	        	 <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>还款金额</label>
	                <div class="controls txt">
	                    <input type="text"   id="checkRebackPrice" name="billrebackRecordItem.rebackPrice" readonly="readonly">
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
	                <label class="control-label" for="">银行流水号</label>
	                <div class="controls txt">
	                    <input type="text"   name="billrebackRecordItem.bankTransactionNo" >
	                </div>
	            </div>
	           <div class="span3 control-group full">
	                <label class="control-label" for="">还款时间</label>
	                <div class="controls time">
						<input type="text"  name="billrebackRecordItem.rebackDatetime" >
						<i class="date" data-format="yyyy-MM-dd" data-maxDate="%y-%M-%d"  ></i>
					</div>
	            </div>
	        </div>
			<div class="row-fluid">
	            <div class="span6 control-group full">
	                <label class="control-label" for="">备注</label>
	                <div class="controls txt">
	                    <textarea style="height: 80px;width: 100%;"  name="billrebackRecordItem.remark" ></textarea>
	                </div>
	            </div>
	           	<div class="span3 control-group full" style="display:none">
	                <label class="control-label" for="">已结清</label>
	                <div class="controls txt">
	                	<input id="dbcheck" class="checkBoxInput" type="checkbox">
	                </div>
	            </div>
	        </div>
	    </form>
	    </div>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="BillListRebackDetail.saveReback()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="BillListRebackDetail.cancle()"><i class=""></i>取消</a>
	    </div>
	</div></div></div>