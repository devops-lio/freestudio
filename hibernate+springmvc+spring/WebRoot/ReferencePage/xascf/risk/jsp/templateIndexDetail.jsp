<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/templateIndexDetail.js"></script>
<form id="indexQueryForm" action="" method="post" style="display: none;">
	<input type="hidden" id="parentPid" name="condition.parentPid" value="${indexPid}"/>
</form>
<!-- 查询列表-->
<div class="row-fluid">
	<div class="span12">
		<div class="widget-box">
			<div class="widget-header">
				<span class="widget-title"><i class="icon-list"></i>指标列表</span>
		        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
			</div>
			<div class="widget-body">
				<div class="widget-grid">
					<div class="grid-toolbar">
						<a class="btn btn-primary" href="javascript:void(0)"	onclick="templateIndexDetail.editor()"><i class=""></i>编辑</a>
						<a	class="btn btn-primary" href="javascript:void(0)"	onclick="templateIndexDetail.deleteTemplateIndex()"><i class=""></i>删除</a>
					</div>
					<!-- mmGrid -->
					<table id="templateIndex_mmg" class="mmg">
						<tr>
							<th rowspan="" colspan=""></th>
						</tr>
					</table>
					<div id="pg" style="text-align: right;"></div>
				</div>
			</div>
		</div>
		<div class="widget-box">
			<div class="widget-body">
				<div class="widget-main padding-6" style="margin-top: 20px; margin-left: 0px;">
					<form id="indexEditorForm" action="" method="post" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label"><span	style="color: red;">*</span>名称</label>
								<div class="controls text">
									<input type="hidden" id="id" name="templateIndexModel.id">
								 	<input type="hidden"  name="templateIndexModel.indexType" value="2"/> 
								 	<input type="hidden" id="parentPid" name="templateIndexModel.parentPid">
								 	<input type="hidden" id="indexPid" name="templateIndexModel.indexPid">
								 	<input type="hidden" id="templatePid" name="templateIndexModel.templatePid">
								  	<input type="text"	data-required="评分名称不能为空！"  placeholder="请输入" id="indexName" name="templateIndexModel.indexName">
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label"> <span	style="color: red;">*</span>权重(%)</label>
								<div class="controls txt">
									<input type="text" id="percentage" name="templateIndexModel.percentage"   placeholder="请输入数字"
										data-required="权重(%)不能为空！" data-number="只能填入数字"> 
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label"> <span	style="color: red;">*</span>满分值 </label>
								<div class="controls txt">
									<input type="text"  id="fullMarks" name="templateIndexModel.fullMarks"  placeholder="请输入数字"
										data-required="满分值不能为空！" data-number="只能填入数字" >
								</div>
							</div>		
						</div>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">评分规则</label>
								<div class="controls xwin">
									<input type="hidden" name="templateIndexModel.ruleNo" id="ruleNo"> 
									<input type="hidden" name="templateIndexModel.ruleDesc" id="ruleDesc"> 
									<input type="text"  placeholder="请选择"	id="ruleName" data-xwin-params="ruleDefinitionPop" name="templateIndexModel.ruleName"><i></i>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">对应材料</label>
								<div class="controls xwin">
									<input type="hidden" name="templateIndexModel.mappingMaterial" id="mappingMaterial">
									<input type="text" id="materialName"  placeholder="请选择"	data-xwin-params="leafMaterialDefinePop"
										name="templateIndexModel.materialName"><i></i>
								</div>
							</div>			
						</div>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">指标说明</label>
								<div class="controls">
									<textarea id="remark" rows="50" cols="500"
										name="templateIndexModel.remark"  placeholder="请输入"
										style="resize: none; width: 600px; height: 100px;"></textarea>
								</div>
							</div>
						</div>
					</form>
					<div class="row-fluid">
						<div class="span10 control-group full offset2">
							<div class="btn-toolbar" style="margin-left: 215px;">
								<a class="btn btn-primary"	onclick="javascript:templateIndexDetail.saveTemplateIndex();">保存</a>
								<a	id="reSetBtn" class="btn btn-primary" onclick="javascript:templateIndexDetail.clearEditorForm();">重置</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>