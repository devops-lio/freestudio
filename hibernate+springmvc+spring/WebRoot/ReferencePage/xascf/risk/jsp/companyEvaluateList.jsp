<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/companyEvaluateList.js"></script>
<script type="text/javascript" src="xascf/js/evaluateTableEventUtil.js"></script>
<script type="text/javascript" src="xascf/js/evaluateReportPreviewUtil.js"></script>
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
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="companyEvaluateList.query();">查询</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="companyEvaluateList.clear();">重置</a>
			</div>
			<form action="" id="evaluateResultQueryForm" class="form-horizontal fromPre">
							<input type="hidden" name="condition.reportObjectPid" id="reportObjectPid" value="${reportObjectPid}"/>
							<input type="hidden" id="requestType" >
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							报告时间
						</label>
						<div class="controls time">
							<input type="text"  name="condition.reportTime">
							<i class="date" data-format="yyyy-MM-dd"></i>
						</div>
						
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>评估报告列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			
			<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="evalAdd" onclick="companyEvaluateList.add()"><i class=""></i>新增</a> 
					<a class="btn btn-primary" href="javascript:void(0)" id="evalEdit" onclick="companyEvaluateList.editEvaluateReport()"><i class=""></i>编辑</a> 
					<a class="btn btn-primary" href="javascript:void(0)" id="evalDel" onclick="companyEvaluateList.deleteEvaluateReport()"><i class=""></i>删除</a> 
					<a class="btn btn-primary" href="javascript:void(0)" onclick="companyEvaluateList.reportPreview()"><i class=""></i>预览</a> 
			</div>
			<!-- mmGrid -->
			<table id="mmg_evaluateReport" class="mmg">
			</table>
			<div id="pg" style="text-align: right;">
			</div>
		</div>
	</div>
</div> 
<div class="row-fluid" style="text-align: center;margin-top: 20px">
		<a class="btn btn-primary" href="javascript:void(0)"  onclick="companyEvaluateList.reback();">返回</a>
</div>