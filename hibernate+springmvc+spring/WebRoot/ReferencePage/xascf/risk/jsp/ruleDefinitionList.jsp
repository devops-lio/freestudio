<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/ruleDefinitionList.js"></script>

<div class="widget-box">
	<div class="widget-header">
	    <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	    <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:ruleDefinitionList.query();">查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:ruleDefinitionList.clearQueryForm();">重置<br /></a>
			</div>
			<form action="" id="ruleDefinitionListQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">规则名称</label>
						<div class="controls txt">
							<input type="text"  name="condition.ruleName" >
						</div>
					</div>	
				</div>
			</form>
		</div>
	</div>
</div>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>规则设定列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.add()">新增</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.editor()">编辑</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.deleteRuleDefinition()">删除</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.scoringRoleSetting()"><i class=""></i>子项设置</a> 		
			</div>
			<!-- mmGrid -->
			<table id="ruleDefinitionList_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
					
				</tr>

           </table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_ruleDefinition">
        <div class="win-header">
            <span>规则设定信息</span> <i class="close">&times;</i>
        </div>
		<div class="win-content" id="tabwin_add_ruleDefinition_content">
	    	<div id="ruleDefinition-detail-template">
	    		<div class="form-search">
		    		<form class="form-horizontal" id="ruleDefinitionEditorForm">
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>规则名称</label>
								<div class="controls txt">
									<input type="hidden" id="rulePid" name="ruleDefinitionModel.rulePid"/>
									<input type="hidden" id="ruleNo" name="ruleDefinitionModel.ruleNo"/>
									<input type="text" data-required="规则名称不能为空！"	data-maxlength="规则名称不能超过30位" id="ruleName"
											data-maxlength-param="30" maxlength=30   placeholder="请输入"
											name="ruleDefinitionModel.ruleName" value="${ruleDefinitionModel.ruleName}">
								</div>
		            		</div>
		        		</div>
				        <div class="row-fluid">    
							<div class="span10 control-group full" style="margin-left:0px">
								<label class="control-label" ><span style="color:red;">*</span>规则说明</label>
								<div class="controls">
								<textarea data-maxlength="规则说明不能超过200个字!"  placeholder="请输入" data-maxlength-param="200" data-required="规则说明不能为空！"
									style="width: 100%;height: 115px;resize:none;" id="description" name="ruleDefinitionModel.description" id="description" ></textarea>
					</div>
				</div>
				        </div>
				    </form>
				    <div class="form-search-btn">
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.saveRuleDefinition();">保存</a>
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="ruleDefinitionList.cancle();">取消</a>
				    </div>
				</div>
			</div>
        </div>
    </div>
</div>	

