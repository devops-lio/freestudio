<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/funds/js/fundIncomeList.js"></script>


<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:fundIncomeList.query();"><i class=""></i>查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:fundIncomeList.clearQueryForm();"><i class=""></i>重置<br /></a>
            </div>
			<form action="" id="fundIncomeQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							银行账号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.bankNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							融入单号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.incomeNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							融入类型
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="condition.incomeType" 
										optionsType="FUND_INCOME_TYPE" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
				</div>
				<%--  <div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							客户
						</label>
						<div class="controls xwin">
							<input type="hidden" name="condition.customerPid" id="customersubPid">
							<input type="text"
								id="customerName" data-xwin-params="commonComapanyPop">
							<i></i>
						</div>
					</div>
				</div>--%>
			</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->

<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>资金融入列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundIncomeList.add()">新增</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundIncomeList.editor()"><i class=""></i>编辑</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundIncomeList.deleteFundIncome()"><i class=""></i>删除</a>
		</div>	
		<!-- mmGrid -->
		<table id="fundIncome_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_fundIncome">
        <div class="win-header">
            <span>资金融入信息</span> <i class="close">&times;</i>
        </div>
		<div class="win-content" id="tabwin_add_fundIncome_content">
	    	<div id="fundAccount-detail-template">
	    		<div class="form-search">
		    		<form class="form-horizontal" id="fundIncomeEditorForm">
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>交易流水号</label>
								<div class="controls txt">
									<input type="text" id="transactionSerialNo" data-required="交易流水号不能为空！" data-maxlength="交易流水号不能超过30位"
										data-maxlength-param="30" maxlength=30 id="transactionSerialNo"
										name="funcIncomeModel.transactionSerialNo" value="${funcIncomeModel.transactionSerialNo}">
								</div>
		            		</div>
		        		</div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>银行账号</label>
								<div class="controls xwin">
									<input type="hidden" id="id" name="funcIncomeModel.id" value="${funcIncomeModel.id}">
									<input type="hidden" id="fundIncomePid" name="funcIncomeModel.fundIncomePid" value="${funcIncomeModel.fundIncomePid}" />
									<input type="text" data-required="银行账号不能为空！"	data-maxlength="银行账号不能超过30位"
											data-maxlength-param="30" maxlength=30 id="bankNo" data-xwin-params="fundAccountPop"
											name="funcIncomeModel.bankNo" value="${funcIncomeModel.bankNo}">
									<i></i>
								</div>
				            </div>
				        </div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>融入种类</label>
								<div class="controls">
									<slt:select cssClass="chzn-select"    name="funcIncomeModel.incomeType" 
												optionsType="FUND_INCOME_TYPE">
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
										<slt:outHTML>data-required="融入类型不能为空！"</slt:outHTML>
										<slt:outHTML>id="incomeType"</slt:outHTML>								
										<slt:outHTML>data-default-value="${funcIncomeModel.incomeType}"</slt:outHTML>	
									</slt:select>
								</div>
				            </div>
				        </div>
				        <div class="row-fluid" id="agDiv">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>再融资编号</label>
								<div class="controls xwin">
									<input type="text" data-required="再融资编号不能为空！"	
											id="incomeNo" data-xwin-params="againFancingPop"
											name="funcIncomeModel.incomeNo" > <i></i>
								</div>
				            </div>
				        </div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>融入金额</label>
								<div class="controls txt">
									<input type="text" data-required="融入金额不能为空！"	data-maxlength="融入金额不能超过30位"
											data-maxlength-param="10" maxlength=10 id="incomeAmount" data-number="只能填入数字" 
											name="funcIncomeModel.incomeAmount" value="${funcIncomeModel.incomeAmount}">
								</div>
				            </div>
				        </div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label">融入日期</label>
								<div class="controls time">
									<input type="text" name="funcIncomeModel.incomeDate" value="${funcIncomeModel.incomeDate}"
									id="incomeDate">
									<i class="date" data-format="yyyy-MM-dd"></i>
								</div>
				            </div>
				        </div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>币种</label>
								<div class="controls">
									<slt:select cssClass="chzn-select"    name="funcIncomeModel.currency" 
												optionsType="CURRENCY" value="CNY">
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
										<slt:outHTML>data-required="币种不能为空！"</slt:outHTML>
										<slt:outHTML>id="currency"</slt:outHTML>								
										<slt:outHTML>data-default-value="${funcIncomeModel.currency}"</slt:outHTML>	
									</slt:select>
								</div>				
				            </div>
				        </div>
				        <div class="row-fluid" id="fromDiv">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>来源</label>
								<div class="controls txt">
									<input type="text" data-required="来源不能为空！"	data-maxlength="来源不能超过30位"
											data-maxlength-param="30" maxlength=30 id="incomeSource"
											name="funcIncomeModel.incomeSource" value="${funcIncomeModel.incomeSource}">
								</div>
				            </div>
				        </div>
				        <div class="row-fluid" id="incomeLLdiv">
				            <div class="span10 control-group full">
								<label class="control-label">利率(%)</label>
								<div class="controls txt">
									<input type="text" data-maxlength="利率不能超过30位"
											data-maxlength-param="10" maxlength=10 id="fundRate" data-number="只能填入数字"
											name="funcIncomeModel.fundRate" value="${funcIncomeModel.fundRate}">
								</div>
				            </div>
				        </div>
				        <div class="row-fluid" id="expireDiv">
				            <div class="span10 control-group full">
								<label class="control-label">到期日期</label>
								<div class="controls time">
									<input type="text" name="funcIncomeModel.expireDate" value="${funcIncomeModel.expireDate}"
									id="expireDate">
									<i class="date" data-format="yyyy-MM-dd"></i>
								</div>
				            </div>
				        </div>
				        <div class="row-fluid" id="expireDiv2">
				            <div class="span10 control-group full">
								<label class="control-label">到期日期</label>
								<div class="controls txt">
									<input type="text" value="${funcIncomeModel.expireDate}"
									id="expireDate2" readonly="readonly">
								</div>
				            </div>
				        </div>
				    </form>
				    <div class="form-search-btn">
						<a class="btn btn-primary"  onclick="javascript:fundIncomeList.saveFundIncome();">保存</a>
						<a id="reSetBtn" class="btn btn-primary"  onclick="javascript:fundIncomeList.cancle();">取消</a>
					</div>		
				</div>
			</div>
        </div>
    </div>
</div>