<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/system/js/kpiList.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>员工考核查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="KpiInfo.load();">查询</a>
				<a class="btn btn-primary" onclick="KpiInfo.clear();">重置</a>
			</div>
			<form class="form-horizontal" id="kpiSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">员工编号</label>
						<div class="controls txt">
							<input type="text" name="condition.userNo">
						</div>
					</div>  
					<div class="span3 control-group full">
						<label class="control-label" for="">考核状态</label>
						<div class="controls txt">   
			                <slt:select  cssClass="chzn-select" name="condition.kpidetalType" optionsType="KPI_STATUS"  >
								<slt:outHTML>id="kpidetalType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML> 
							</slt:select> 
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label">
							时间从：
						</label>
						<div class="controls time">
							<input type="text" name="condition.startTime" id="expectedarrivetime2">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							至：
						</label>
						<div class="controls time"">
							<input  type="text" name="condition.endTime" id="expectedarrivetime1">
							<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
						</div>
					</div> 
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>员工考核列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid"> 
			<!-- mmGrid -->
			<table id="mmg-kpi" class="mmg">
			</table>
			<div id=pig style="text-align: right;">
			</div>
		</div>
	</div>
</div> 

 
