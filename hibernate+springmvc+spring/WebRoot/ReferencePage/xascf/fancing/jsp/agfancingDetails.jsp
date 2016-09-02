<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/agfancingDetails.js"></script>


<form action="" id="agfancingQueryForm" class="form-horizontal">
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:AgfancingDetails.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:AgfancingDetails.clear();"><i class=""></i>重置<br /></a>
				</div>
						<input type="hidden" name="condition.status" value="${condition.status}"  id="status"/>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									再融资编号
								</label>
								<div class="controls txt">
									<input type="text"  placeholder="请输入"
										name="condition.agfancingOrderNo"
										 >
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									生成时间从
								</label>
								<div class="controls time">
									<input type="text" name="condition.startTime" id="expectedarrivetime2">
									<i  class="date" data-format="yyyy-MM-dd"  data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									至
								</label>
								<div class="controls time"">
									<input  type="text" name="condition.endTime" id="expectedarrivetime1">
									<i  class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
								</div>
							</div> 
						</div>
			</div>
		</div>
	</div>
<!-- 查询列表-->
<div class="widget-box">
   <div class="	widget-body">
   		<div class="widget-grid">
			<ul  class="nav nav-tabs" style="margin-bottom: 0"> 
				<li id="onenew" class="active">
					<a href="#oneTab" data-toggle="tab" id="oneTabBtn" >审核中</a>
				</li>
				<li>
					<a href="#twoTab" data-toggle="tab" id="twoTabBtn">已通过</a>
				</li>
				<li>
					<a href="#threeTab" data-toggle="tab" id="threeTabBtn">已收款</a>
				</li>
				<li>
					<a href="#fourTab" data-toggle="tab" id="fourTabBtn">到期应还</a>
				</li> 
			</ul> 
			
   			<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;height: 100%">
   				<!-- 审核中 -->
				<div class="tab-pane active" id="oneTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="Checking_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="onefancpg" style="text-align: right;"></div>
					</div>
				</div>
				<!-- 审核已通过 -->
				<div class="tab-pane" id="twoTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="Checked_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="twofancpg" style="text-align: right;"></div>
					</div>
				</div>
				<!-- 已收款 -->
				<div class="tab-pane" id="threeTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="Incomeed_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="threefancpg" style="text-align: right;"></div>
					</div>
				</div>
				<!-- 到期还款 -->
				<div class="tab-pane" id="fourTab" style="overflow: auto;">
					<div class="widget-grid">
						<table id="Repayment_mmg" class="mmg">
							<tr><th rowspan="" colspan=""></th></tr>
						</table>
						<div id="fourfancpg" style="text-align: right;"></div>
					</div>
				</div>  
   			</div> 
	    </div>
	</div>
</div> 
</form>

<!-- 弹出框 -->
<div class="row-fluid"> 
	<form id="agfancingbillEditorForm" action="" method="post" class="form-horizontal">
	  <div class="win span8" id="tabwin_agfancingbill">
	      <div style="height: 36px;" class="win-header">
	          <span>再融资还款申请</span><i class="close">&times;</i>
	      </div>
	      <div class="win-content" id="tabwin_agfancingbill_content" >
	      <div class="form-search" style="font-size: 13px;margin: 20px;">
		  	    <div class="row-fluid" >  
					<div class="span4 control-group full">
						<label class="control-label">再融资单号<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" readonly data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="agfancingOrderNo_bill"  
									name="financingAgainOrderEntity.agfancingItemView.agfancingOrderNo" value="${agfancingmodel.agfancingOrderNo}">
						</div>
					</div> 
					<div class="span4 control-group full">
						<label class="control-label">融资金额<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" readonly data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="agfancingAmount_bill"  
									name="financingAgainOrderEntity.agfancingItemView.agfancingAmount" value="${agfancingmodel.agfancingAmount}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">应还金额<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text"  data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="billPrice"  
									name="financingAgainOrderEntity.agfancingItemView.billPrice" value="${agfancingmodel.billPrice}">
						</div>
					</div>
				 </div>
				 <div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">融资账期(日)<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" readonly data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="agfancingAccount"  
									name="financingAgainOrderEntity.agfancingItemView.agfancingAccount" value="${agfancingmodel.agfancingAccount}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">融资费率(%)<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" readonly data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="agfancingRate"  
									name="financingAgainOrderEntity.agfancingItemView.agfancingRate" value="${agfancingmodel.agfancingRate}">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">应还时间<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" readonly data-required="融资账期不能为空！" data-maxlength="融资账期不能超过30位"  
									data-number="只能填入数字" data-maxlength-param="30"  maxlength=30 id="mustRepaydate"  
									name="financingAgainOrderEntity.agfancingItemView.mustRepaydate" value="${agfancingmodel.mustRepaydate}">
						</div>
					</div> 
				 </div> 
			 <div class="row-fluid"> 
					<div class="span10 control-group full offset2"> 
						<div class="btn-toolbar" style="margin-left: 170px;">
							<a class="btn btn-primary"  onclick="javascript:AgfancingDetails.sure();">确定</a>
							<a class="btn btn-primary"  onclick="javascript:AgfancingDetails.close();">取消</a> 
						</div>
					</div>
			 </div> 
			</div>
	      </div>
	  </div>
  </form>
</div>	
