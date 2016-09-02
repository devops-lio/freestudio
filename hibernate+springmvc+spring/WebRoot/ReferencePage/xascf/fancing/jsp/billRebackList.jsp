<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/billRebackList.js"></script>

<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:BillRebackList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BillRebackList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="billRebackListQueryForm" class="form-horizontal">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									融资单号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
								</div>
							</div>
							
							<div class="span4 control-group full">
								<label class="control-label">
									融资企业
								</label>
								<div class="controls txt">
									<input type="text"  	placeholder="请输入" name="condition.billOwerName" >
								</div>
							</div>
							<div class="span4 control-group full">
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
							<div class="span4 control-group full">
								<label class="control-label">
									账单日期从
								</label>
								<div class="controls time">
								<input type="text"  name="condition.createTimeFrom" id="expectedarrivetime1">
									<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
								</div>
							</div>
							<div class="span4 control-group full">
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
    <div class="widget-body">
        <div class="widget-grid">
            <!-- mmGrid -->
            <table id="all_mmg" class="mmg">
                <tr>
                    <th rowspan="" colspan=""></th>
                </tr>
            </table>
            <div id="all_pg" style="text-align: right;"></div>
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add">
        <div class="win-header">
            <span>融资账单还款</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content">
        </div>
    </div>
</div>
<script id="template_add" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="reback_form">
			<input type="hidden"  value="{{fancingOrderNo}}" name="fundTransactionModel.transactionNo" >
			<input type="hidden"  value="{{billTypeEn}}" name="fundTransactionModel.fundType" >
			<input type="hidden"  value="{{billOwerPid}}" name="fundTransactionModel.customerPid" >
			<input type="hidden"  value="{{billOwerName}}" name="fundTransactionModel.customerName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">融资单号：</label>
	                <div class="controls" style="padding-top: 2px;color: red;">
	                   {{fancingOrderNo}}
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">选择银行账号<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  name="fundTransactionModel.customerBankNo"  data-required="银行账号不能为空">
	                </div>
	            </div>
	        </div>
			<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">银行流水号<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"   name="fundTransactionModel.transactionSerialNo" data-required="银行流水号不能为空">
	                </div>
	            </div>
	        </div>
			<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">还款金额<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{billPrice}}" name="fundTransactionModel.transactionAmount" data-required="还款金额不能为空">
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="BillRebackList.saveReback()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="BillRebackList.cancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
