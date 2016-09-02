<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/payable/js/badDebtList.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>坏账登记查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="BadDebtList.load();">查询</a>
				<a class="btn btn-primary" onclick="BadDebtList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="badDebtForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">交易单号</label>
						<div class="controls txt">
							<input type="text" name="badDebt.orderNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">客户名称</label>
						<div class="controls txt">
							<input type="text" name="badDebt.customerName">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label" >业务类型</label>
						<div class="controls">
							<slt:select cssClass="chzn-select span12" name="badDebt.businessType" optionsType="FANCING_TYPE">
							    <slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
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
		<span class="widget-title"><i class="icon-list"></i>坏账登记列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid"> 
			<!-- mmGrid -->
			<table  class="mmg" id="mmg_badDabt">
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div> 