<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/billList.js"></script>
<style>
.details {
	margin-top: 3px;
	color: blue;
}
</style>
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:BillList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BillList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="billListQueryForm" class="form-horizontal fromPre">
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
									放款单号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
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
									账单类型
								</label>
								<div class="controls">
									<slt:select  cssClass="chzn-select" name="condition.billType" optionsType="BILL_TYPE"   >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
								</div>
							</div>
						</div>
						<div class="row-fluid">
						
							<div class="span3 control-group full">
								<label class="control-label">
									账单日期从
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
<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>账单列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
      <div class="widget-body">
	<div class="tabbable" style="margin-left: 0px;">
		  	<ul id="tabLabel" class="nav nav-tabs">
		  		<li  class="active">
			    	<a href="#allboundTab" data-toggle="tab" >所有账单</a>
			    </li>
			    <li>
			    	<a href="#delayTab" data-toggle="tab" id="delay" >逾期账单</a>
			    </li>
			    <li>
			    	<a href="#waitCheckTab" data-toggle="tab" id="waitCheck" >本期账单</a>
			    </li>
			    <li>
			    	<a href="#historyTab" data-toggle="tab" id="history" >历史账单</a>
			    </li>
			    <li>
			    	<a href="#earlierTab" data-toggle="tab" id="earlier" >提前还款</a>
			    </li>
			    <li>
			    	<a href="#handsTab" data-toggle="tab" id="hands" >手动计息</a>
			    </li>
		  	</ul>
			<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;margin-top: -10px;">
				<!-- 1.所有账单tab 页 ==================================================================== -->
				<div class="tab-pane active" id="allboundTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="all_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="all_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 2. 逾期账单tab 页 ==================================================================== -->
				<div class="tab-pane" id="delayTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="delay_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="delay_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 3. 本期账单tab 页 ==================================================================== -->
				<div class="tab-pane" id="waitCheckTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="waitCheck_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="waitCheck_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 4. 历史账单tab 页 ==================================================================== -->
				<div class="tab-pane" id="historyTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="history_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="history_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 5. 提前tab 页 ==================================================================== -->
				<div class="tab-pane" id="earlierTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="earlier_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="earlier_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 6. 手动计息tab 页 ==================================================================== -->
				<div class="tab-pane" id="handsTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="hands_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="hands_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span10" id="tabwin_add">
        <div class="win-header">
            <span id="add_span">融资账单还款</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content">
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="win span10" id="tabwin_add_detail">
        <div class="win-header">
            <span>融资账单明细</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_detail">
			        <form class="form-horizontal" style="margin-bottom: 20px;font-size: 12px">
			        	<div class="row-fluid">    
				            <div class="span8 control-group full">
				                <label class="control-label" for="">会员名称：</label>
				                <div class="controls details"  id="menberName">
				                </div>
				            </div>
				            <div class="span4 control-group full">
				                <label class="control-label" for="">所属账期：</label>
				                <div class="controls details"  id="termDiv">
				                </div>
				            </div>
				        </div>
				        <div class="row-fluid">    
				            <div class="widget-grid">
									<div class="widget-body" style="border-top: none;" >
										<table id="details_mmg" class="mmg" >
											<tr>
												<th rowspan="" colspan=""></th>
											</tr>
										</table>
										<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
												本期总剩余：<span style="color: red;" id="billPriceDiv"></span> 
											  	&nbsp; 	 本期总应还：<span style="color: red;" id="payPriceDiv"></span>
											  	 &nbsp; 	 本期已还：<span style="color: red;" id="rebackedPriceDiv"></span>
								 		</div> 
									</div>	
								</div>
				        </div>
				         <div class="form-search-btn">
					        <a class="btn btn-info save" href="javascript:void(0)" onclick="BillList.cancle()"><i class=""></i>确定</a>
					    </div>
			        </form>
        </div>
    </div>
</div>
<script id="template_detail" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="detail_form">
			<input type="hidden"  value="{{fancingOrderNo}}" name="fundTransactionModel.transactionNo" >
			<input type="hidden"  value="{{billTypeEn}}" name="fundTransactionModel.fundType" >
			<input  value="{{billOwerPid}}" name="fundTransactionModel.customerPid" id="billOwerPid">
			<input type="hidden"  value="{{billOwerName}}" name="fundTransactionModel.customerName" >
	        <div class="row-fluid">    
	            <div class="span4 control-group full">
	                <label class="control-label" for="">融资单号：</label>
	                <div class="controls" style="padding-top: 2px;color: red;">
	                   {{fancingOrderNo}}
	                </div>
	            </div>
	            <div class="span4 control-group full">
	                <label class="control-label" for="">融资金额：</label>
	                <div class="controls" style="padding-top: 2px;color: red;">
	                   {{fancingOrderNo}}
	                </div>
	            </div>
	            <div class="span4 control-group full">
	                <label class="control-label" for="">融资账期结束时间：</label>
	                <div class="controls" style="padding-top: 2px;color: red;">
	                   {{fancingOrderNo}}
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="BillList.saveReback()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="BillList.cancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
