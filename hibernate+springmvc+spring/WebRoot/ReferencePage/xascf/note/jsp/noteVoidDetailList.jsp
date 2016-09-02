<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/note/js/noteVoidDetailList.js"></script>
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
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:NoteVoidDetailList.query();">查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:NoteVoidDetailList.clear();">重置<br /></a>
			</div>
			<form action="" id="fancingListQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							放款单号
						</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
							<input type="hidden" 	placeholder="请输入" value="${memberPid }"  name="condition.memberPid" >
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							委托方名称
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.buyerName" >
						</div>
					</div>			
					<div class="span3 control-group full">
						<label class="control-label" for="">票据类型</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.noteType"
								optionsType="NOTE_TYPE">
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							票据状态
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.noteStatus"
								optionsType="NOTE_STATUS">
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
		<span class="widget-title"><i class="icon-list"></i>${memberName }放款票据列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
      <div class="widget-body">
      	<div class="widget-grid">
			<div class="widget-body" style="border-top: none;" >
				<table id="waitCheck_mmg" class="mmg" >
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div id="waitCheck_pg" style="text-align: right;"></div>
			</div>	
		</div>
	</div>
</div>
<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
					<a class="btn btn-primary" href="javascript:void(0)" onclick="NoteVoidDetailList.rebackList()"><i class=""></i>返回</a>
				</div>
			</div>