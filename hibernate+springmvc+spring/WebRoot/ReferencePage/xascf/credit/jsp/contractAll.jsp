<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/credit/js/contractAll.js"></script>  
<script type="text/javascript" src="xascf/credit/js/creditDetailPop.js"></script>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="ContractAll.query();">查询</a>
				<a class="btn btn-primary" onclick="ContractAll.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="contractQueryForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">授信批复编号</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.creditResultNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">合同编号</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.contractNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">签订方</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.memberName">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">状态</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.status"
								optionsType="CONTRACT_STATUS">
								<slt:outHTML>id="fancingStatus"</slt:outHTML>
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
		<span class="widget-title"><i class="icon-list"></i>合同综合查询列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">  
	                <a class="btn btn-primary" onclick="ContractAll.add();">新增</a>
	                <a class="btn btn-primary" onclick="ContractAll.edit();">编辑</a>
	               <!--  <a class="btn btn-primary" onclick="ContractAll.deleteContract();">作废</a> -->
	            </div>
				<!-- mmGrid -->
				<table id="mmg" class="mmg">
				</table>
				<div id="pg" style="text-align: right;">
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
 

<!-- 合同详细信息弹出框 -->
<div class="row-fluid"> 
	<div class="win" id="contractDetail" style="width:1150px;"> 
		<div class="win-header"> 
			<span>合同详细信息</span><i class="close">&times;</i> 
		</div> 
		<div class="win-content" id="contractDetailContent">
		</div> 
	</div> 
</div>
