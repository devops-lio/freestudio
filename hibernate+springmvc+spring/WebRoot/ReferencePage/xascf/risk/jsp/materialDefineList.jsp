<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<script type="text/javascript" src="xascf/risk/js/materialDefineList.js"></script>
<div class="widget-box">
	<div class="widget-header">
	    <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	    <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:materialDefineList.query();">查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="materialDefineList.clear();">重置</a>
			</div>
			<form action="" id="materialDefineQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">材料类型</label>
						<div class="controls txt">
							<input type="text" 	 name="condition.typeName" placeholder="请输入">
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>材料类型列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="materialDefineList.childMaterialDefine()">子材料定义</a> 		
			</div>
			<!-- mmGrid -->
			<table id="materialDefine_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>