<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/payable/js/receivableList.js"></script>  
<style>
#showMsgTable td{

text-align: right;
}
#showMsgTable{
margin-left: 30px;
}
.tabCont{
color:blue;
width: 120px;
text-align: left;
}
</style>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>业务收入查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="ReceivableList.load();">查询</a>
				<a class="btn btn-primary" onclick="ReceivableList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="receivableForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">业务编号</label>
						<div class="controls txt">
							<input type="text" name="condition.businessNo">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label" >业务类型</label>
						<div class="controls">
							<slt:select cssClass="chzn-select span12" name="condition.incomeType" optionsType="PM_BUSINESS_TYPE">
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
		<span class="widget-title"><i class="icon-list"></i>业务收入列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
    	<div class="widget-grid">
			<div class="widget-body" style="border-top: none;" >
			<!-- mmGrid -->
			<table  class="mmg" id="mmg-receivable">
			</table>
			<div class="row-fluid">
			<div class="span7  control-group full" id="allMsg" style="line-height:20px;height: 100px;text-align: left;font-size: 12px;margin-bottom:-10px;padding-top: 8px">&nbsp;</div>
			<div class="span5 control-group full" id="pg" style="text-align: right;"></div>
		</div>
		</div>
	</div>
	</div>
</div> 