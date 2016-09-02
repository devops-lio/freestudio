<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/funds/js/fundTransactionList.js"></script>


<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:fundTransactionList.query();"><i class=""></i>查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:fundTransactionList.clearQueryForm();"><i class=""></i>重置<br /></a>
            </div>
			<form action="" id="fundTransactionQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							交易流水号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.transactionSerialNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							流水号类型
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="condition.serialType" 
										optionsType="SERIAL_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							业务编号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.businessNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							资金账号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.bankNo">
						</div>
					</div>	
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							业务类型
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="condition.businessType" 
										optionsType="FUND_BUSINESS_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							融入种类
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="condition.incomeType" 
										optionsType="FUND_INCOME_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							交易类型
						</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select"    name="condition.transactionType" 
										optionsType="FUND_TRANSACTION_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>			
					<div class="span3 control-group full">
						<label class="control-label">
							交易对象
						</label>
						<div class="controls xwin">
							<input type="text"  placeholder="请输入" name="condition.transactionObject">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							交易对象账号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.transactionObjectAccount">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							资金类型
						</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select"    name="condition.fundType" 
										optionsType="FUND_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							交易日期从
						</label>
						<div class="controls time">
						<input type="text"  name="condition.transactionDateFrom" id="transactionDate1">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('transactionDate2')}"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
						  至
						</label>
						<div class="controls time">
							<input type="text"  name="condition.transactionDateTo" id="transactionDate2">
							<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('transactionDate1')}"></i>
						</div>
					</div>
				</div>
			</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->

<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>资金交易明细列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<!-- mmGrid -->
		<table id="fundTransaction_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>