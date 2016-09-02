<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/customerEvaluateList.js"></script>
<script type="text/javascript" src="xascf/js/evaluateTableEventUtil.js"></script>
<style>
</style>
<div class="widget-box">
	<div class="widget-header">
    	<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="customerEvaluateList.query();">查询</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="customerEvaluateList.clear();">重置</a>
			</div>
			<form action="" id="evaluateResultQueryForm" class="form-horizontal">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							个人会员<span style="color: red;">*</span>
						</label>
						<div class="controls xwin">
					        <input type="hidden" id="requestType" value="2">
					        <input type="hidden" id="customersubPid" name="condition.customersubPid">
							<input type="text"  id="customerName" name="condition.customerName" 
								data-xwin-params="commonComapanyPop" data-required="个人会员不能为空！"><i></i>
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
			<table id="mmg-customer" class="mmg">
			</table>
			<div id="pg" style="text-align: right;">
			</div>
		</div>
	</div>
</div> 
<div class="row-fluid" id="evaluateTableDiv" style="display: none">
	<div class="widget-box">
		<div class="widget-body">
			<div class="widget-main padding-6" style="margin-top: 20px; margin-left: 0px;">
				<form id="indexFormId" style="margin-bottom: 0px">
					<div class="row-fluid">
						<div class="span4 control-group">
							<input type="hidden" name="evaluateResultModel.evaluateObjectPid" id="evaluateObjectPid"/>
							<input type="hidden" name="evaluateResultModel.evaluateObjectNo" id="evaluateObjectNo"/>
							<input type="hidden" name="evaluateResultModel.evaluateObjectName" id="evaluateObjectName"/>
							<label class="control-label">客户:<span id="customerNameSpan" style="color: red"></span></label>
						</div>
						<div class="span4 control-group">
							<label class="control-label">编号:<span id="membernoSpan" style="color: red"></span></label>
						</div>
						<div class="span4 control-group">
							<label class="control-label">信誉:</label>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span4 control-group">
							<label class="control-label">当前授信额度:</label>
						</div>
						<div class="span4 control-group">
							<label class="control-label">风险综合评估:</label>
						</div>
						<div class="span4 control-group">
							<label class="control-label">信贷风险:</label>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span3 control-group">
							<label class="control-label">当前借款:</label>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="widget-body">
			<table  class="table table-bordered" id="indexTableId" style="margin-bottom: 5px">
			</table>
			<div class="row-fluid" id="saveBtnDiv">
				<div class="span10 control-group full offset5">			
					<div class="form-search-btn">
						<a class="btn btn-primary"  onclick="customerEvaluateList.save();">保存</a>
					</div>	
				</div>	
			</div>				
		</div>
	</div>
</div>