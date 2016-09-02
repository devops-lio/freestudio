<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/funds/js/fundExpendManage.js"></script>
<style>
.details{
margin-top: 3px;color: bule;
font-size: 12px;
}
</style>

<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" id="queryBtn" href="javascript:void(0)" onclick="javascript:fundExpendManage.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:fundExpendManage.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="fundExpendManageQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									单号
								</label>
								<div class="controls txt">
									<input type="text"   	placeholder="请输入" id="orderNo">
								</div>
							</div>
							<!--
							<div class="span4 control-group full">
								<label class="control-label">
									开始日期
								</label>
								<div class="controls time">
									<input type="text"  id="startDate">
									<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('endDate')}"></i>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
								  结束日期
								</label>
								<div class="controls time">
									<input type="text"  id="endDate">
									<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('startDate')}"></i>								
								</div>
							</div>
							-->
						</div>
				</form>
			</div>
		</div>
</div>
<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>资金支出列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
      		<div class="tabbable" style="margin-left: 0px;">
			<ul id="tabLabel" class="nav nav-tabs" style="border-bottom: 0;margin-bottom: 0">
				<li class="active">
					<a href="#borrowedFundTab" data-toggle="tab" id="borrowedFundTabBtn">借入偿还</a>
				</li>
				<!--  <li>
					<a href="#productTab" data-toggle="tab" id="productBtn">理财产品</a>
				</li>-->
				<li>
					<a href="#financingTab" data-toggle="tab" id="financingBtn">保理放款</a>
				</li>
			</ul>
   			<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;height: 100%">
				<!-- 1. 借入偿还tab 页 -->
				<div class="tab-pane active" id="borrowedFundTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="borrowedFund_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="borrowedFundpg" style="text-align: right;"></div>
					</div>
				</div>
				<!-- 2. 理财产品tab 页 -->
				<div class="tab-pane" id="productTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="product_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="productpg" style="text-align: right;"></div>
					</div>
				</div>
				<!-- 3. 保理放款tab 页 -->
				<div class="tab-pane" id="financingTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="financing_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="financingpg" style="text-align: right;"></div>
					</div>
				</div>
			</div> 
		</div> 		
     </div>	
</div> 
<!-- 还息弹出框 -->
<div class="row-fluid">
	<div class="win span4" id="tabwin_payInterest">
		<div class="win-header">
			<span>还息</span>
			<i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_payInterest_content">
			<div class="form-search">
			<form id="payInterestForm" class="form-horizontal">
			<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label">
							<span style="color: red;">*</span>付款账号
						</label>
						<div class="controls xwin">
							<input type="text" id="bankNo4LX" placeholder="请选择付款账号"	data-xwin-params="fundAccountPop" data-required="付款账号不能为空！"><i></i>		
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label">
							<span style="color: red;">*</span>还息金额
						</label>
						<div class="controls">
							<input id="fundIncomePid" style="display: none">
							<input type="text" data-required="还息金额不能为空！" placeholder="请输入"	data-maxlength="还息金额不能超过30位"
									data-maxlength-param="10" maxlength=10 id="interest" data-number="只能填入数字">
						</div>
					</div>
				</div>
				
				
			</form>					
			<div class="form-search-btn">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="fundExpendManage.payInterest();">还息</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="fundExpendManage.cancelPayInterest();">取消</a>
			</div>
			</div>	
		</div>
	</div>
</div>
<!-- 还款弹出框 -->
<div class="row-fluid">
	<div class="win span4" id="tabwin_repay">
		<div class="win-header">
			<span>还款</span>
			<i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_repay_content">
			<div class="form-search">
				<form id="repayForm" class="form-horizontal">
					
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">
								付款账号<span style="color: red;">*</span>
							</label>
							<div class="controls xwin">
								<input type="text" data-required="付款账号不能为空！"	  id="account4Repay"  placeholder="请选择付款账号"
										data-xwin-params="fundAccountPop"
																	>
																<i></i>	
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">
								还款金额<span style="color: red;">*</span>
							</label>
							<div class="controls txt">
								<input id="fundIncomePid4Repay" style="display: none">
								<input type="text" data-required="还款金额不能为空！"	data-maxlength="还款金额不能超过30位" placeholder="请输入"
										data-maxlength-param="10" maxlength=10 id="principal" data-number="只能填入数字">
							</div>
						</div>
					</div>	
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary" onclick="fundExpendManage.repay();">还款</a>
					<a class="btn btn-primary" onclick="fundExpendManage.cancelRepay();">取消</a>
				</div>	
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="win span4" id="tabwin_fancing">
		<div class="win-header">
			<span>保理放款</span>
			<i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_fancing_content">
		</div>
	</div>
</div>
<script id="fancingLoan-template-tab" type="text/x-handlebars-template">
<div class="form-search">
				<form id="fancingForm" class="form-horizontal">
					<input type="hidden" name="loanRecordModel.loanRecordPid" id="loanRecordPid">
					<div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label" ><span style="color:red;">*</span>付款账号</label>
							<div class="controls xwin" >
								<input type="text" id="bankNo"	name="loanRecordModel.payBankNo"
												placeholder="请选择付款账号"					data-xwin-params="fundAccountPop"
																	data-required="付款账户不能为空！">
																<i></i>					
						</div>
						</div>
					</div>
					 <div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label"><span style="color:red;">*</span>交易流水号</label>
							<div class="controls" >
								<input type="text" id="payNo" placeholder="请输入" name="loanRecordModel.payNo" data-required="交易流水号不能为空！" class="input_search"/>
							</div>
						</div>
					</div>
		 			<div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label" >收款开户人</label>
							<div class="controls" >
							<input type="text" readonly="readonly"  value="{{loanBankPayee}}" class="input_search"/>
						</div>
						</div>
					</div>
		 			<div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label" >收款银行</label>
							<div class="controls" >
<input type="text" readonly="readonly"  value="{{loanBankName}}" class="input_search"/>
						</div>
						</div>
					</div>
		 			<div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label" >收款账号</label>
							<div class="controls" >
								<input type="text" readonly="readonly" name="loanRecordModel.palyBanktoNo" value="{{loanBankAccount}}" class="input_search"/>
											
						</div>
						</div>
					</div>
		 			<div class="row-fluid">
						<div class="span9 control-group full" >
							<label class="control-label" ><span style="color:red;">*</span>放款金额</label>
							<div class="controls" >
								<input type="text" readonly="readonly"  value={{loanPrice}} name="loanRecordModel.loanPrice" data-required="放款金额不能为空！" class="input_search"/>
							</div>
						</div>
					</div>
		 			<div class="row-fluid">
						<div class="span9 control-group full">
							<label class="control-label"><span style="color:red;">*</span>放款时间</label>
							<div class="controls time">
								<input type="text" id="transactionDate" placeholder="请输入实际放款时间" name="loanRecordModel.loanDate" data-required="放款时间不能为空！"><i class="date" data-format="yyyy-MM-dd"></i>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span9 control-group full">
							<label class="control-label" for="">附件上传
							</label>
							<div class="controls" style="width:450px;">
								<input type='button' value='上传' class='btn'
									style="background-  color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
									onclick="javascript:fundExpendManage.addUploadPop()" /> 
								<span id="show_fileName"></span>
							</div>
						</div>
						<input type="hidden" name="loanRecordModel.fileUrl" value="{{fileUrl}}" id="fileUrl">
						<input type="hidden" name="loanRecordModel.fileName" value="{{fileName}}"	id="fileName">
					</div>
					<input type="hidden" name="loanRecordModel.loanNo" value="{{loanNo}}">
					<input type="hidden" id="loanFancingOrderNo" name="loanRecordModel.fancingOrderNo" value="{{fancingOrderNo}}">
					</form>
				<div class="form-search-btn">
			        <a class="btn btn-primary" href="javascript:void(0)" id="receiveBtn"><i class=""></i>确定</a>
			        <a class="btn btn-primary" href="javascript:void(0)" id="calcleBtn"><i class=""></i>取消</a>
			    </div>
			</div>
</script>