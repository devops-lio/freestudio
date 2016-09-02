<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/allCompanyClieList.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>客户拜访记录查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="allComapanyclieInfo.load();">查询</a>
				<a class="btn btn-primary" onclick="allComapanyclieInfo.clearQueryForm();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="comapanyclieSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">会员名称</label>
						<div class="controls txt">
							<input type="text"  name="condition.memberName">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">拜访月份</label>
						<div class="controls time">
							<input type="text" id="bfyf" name="condition.visitDate">
							<i class="date" data-format="yyyy-MM" ></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">拜访方式</label>
						<div class="controls">
							<slt:select cssClass="chzn-select span12" name="condition.visitType" optionsType="VISIT_TYPE">
							    <slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
							    <slt:outHTML>id="visitTypeQuery"</slt:outHTML>
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
		<span class="widget-title"><i class="icon-list"></i>客户拜访跟踪列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<!-- mmGrid -->
			<table id="mmg-users" class="mmg">
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
