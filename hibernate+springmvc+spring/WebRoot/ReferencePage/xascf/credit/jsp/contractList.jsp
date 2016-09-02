<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/credit/js/contractList.js"></script>  
<script type="text/javascript" src="xascf/credit/js/creditDetailPop.js"></script>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="Contract.load();">查询</a>
				<a class="btn btn-primary" onclick="Contract.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">授信编号</label>
						<div class="controls txt">
							<input type="text" name="condition.creditNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">授信额度</label>
						<div class="controls txt">
							<input type="text" name="condition.creditQuota">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">开始日期</label>
						<div class="controls time">
							<input type="text"
								name="condition.effectiveStartTime">
							<i class="date" data-format="yyyy-MM-dd"
								data-minDate="%y-%M-{%d+1}"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">结束日期</label>
						<div class="controls time">
							<input type="text"
								name="condition.effectiveEndTime">
							<i class="date" data-format="yyyy-MM-dd"
								data-minDate="%y-%M-{%d+1}"></i>
						</div>
					</div>
					
					 
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" for="">产品类别</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.financingType"
								optionsType="FANCING_TYPE">
								<slt:outHTML>id="financingType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" id="financingMethodDiv">
						<label class="control-label" for="">保理类别</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.financingMethod"
								optionsType="FANCING_FUNCTION">
								<slt:outHTML>id="financingMethod"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
							</slt:select>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>待合同录入列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
			<div class="widget-grid">	
				<!-- mmGrid -->
				<table id="mmg-contract" class="mmg">
				</table>
				<div id="pg-contract" style="text-align: right;">
				</div>
			</div>
	</div>
</div> 


<div class="row-fluid">
    <div class="win" id="creditDetail"  style="width:1150px;">
	    <div class="win-header">
			<span>授信信息</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="creditDetailContent"></div>
	</div>
 </div>