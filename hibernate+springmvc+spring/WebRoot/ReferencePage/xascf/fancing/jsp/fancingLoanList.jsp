<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/fancingLoanList.js"></script>

<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:fancingLoanList.query();">查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:fancingLoanList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="fancingLoanListQueryForm" class="form-horizontal">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									融资单号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.businessNo" >
								</div>
							</div>
							
							<div class="span4 control-group full">
								<label class="control-label">
									融资企业
								</label>
								<div class="controls txt">
									<input type="text"  	placeholder="请输入" name="condition.requestName" >
								</div>
							</div>
						</div>
				</form>
			</div>
		</div>
</div>
<div class="widget-box">
    <div class="widget-body">
        <div class="widget-grid">
            <!-- mmGrid -->
            <table id="loan_mmg" class="mmg">
                <tr>
                    <th rowspan="" colspan=""></th>
                </tr>
            </table>
            <div id="loan_pg" style="text-align: right;"></div>
        </div>
    </div>
</div>
<!-- 弹出框 -->
<div class="row-fluid">
	<div class="win span4" id="tabwin_trial">
    	<div class="win-header">
        	<span>放款初审</span> <i class="close">&times;</i>
   		</div>
	    <div class="win-content" id="tabwin_trial_content">
	   		<div class="form-search">
				<form class="form-horizontal" id="loanTrialForm">			
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">融资单号</label>
							<div class="controls txt">
								<input id="preloanPid" style="display: none">
								<input type="text" id="businessNo" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">放款金额<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" id="loanAmount" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">服务费</label>
							<div class="controls txt">
								<input type="text" id="servicesPrice" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">保证金</label>
							<div class="controls txt">
								<input type="text" id="deposit" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label" >审批意见</label>
							<div class="controls">
								<textarea  data-required="审批意见不能为空！" data-maxlength="审批意见不能超过200个字!" data-maxlength-param="200"
									 class="span12" rows="3"  style="height: 65px;" id="approvalRemark" ></textarea>
							</div>
						</div>	
					</div>		
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary"  onclick="fancingLoanList.loanTrial();">确定</a>
					<a class="btn btn-primary"  onclick="fancingLoanList.cancleTrial();">取消</a>
				</div>
			</div>
        </div>
    </div>
</div>

<div class="row-fluid">
	<div class="win span4" id="tabwin_confirm">
    	<div class="win-header">
        	<span>放款确认</span> <i class="close">&times;</i>
   		</div>
	    <div class="win-content" id="tabwin_confirm_content">
	   		<div class="form-search">
				<form class="form-horizontal" id="loanConfirmForm">			
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">融资单号</label>
							<div class="controls txt">
								<input id="preloanPid" style="display: none">
								<input type="text" id="businessNo" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">放款金额<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" id="loanAmount" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">服务费</label>
							<div class="controls txt">
								<input type="text" id="servicesPrice" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">保证金</label>
							<div class="controls txt">
								<input type="text" id="deposit" disabled="disabled">
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label" >审批意见</label>
							<div class="controls">
								<textarea  data-required="审批意见不能为空！" data-maxlength="审批意见不能超过200个字!" data-maxlength-param="200"
									 class="span12" rows="3"  style="height: 65px;" id="approvalRemark" ></textarea>
							</div>
						</div>	
					</div>		
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary"  onclick="fancingLoanList.loanConfirm();">确定</a>
					<a class="btn btn-primary"  onclick="fancingLoanList.cancleConfirm();">取消</a>
				</div>
			</div>
        </div>
    </div>
</div>
