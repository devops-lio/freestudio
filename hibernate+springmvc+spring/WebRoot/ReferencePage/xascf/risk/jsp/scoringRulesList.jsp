<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/scoringRulesList.js"></script>
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
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:scoringRulesList.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:scoringRulesList.clearQueryForm();"><i class=""></i>重置<br /></a>
			</div>
			<form action="" id="scoringRulesListQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">得分</label>
						<div class="controls txt">
							<input type="hidden" id="ruleNoQuery" value="${ruleDefinitionModel.ruleNo}" name="condition.ruleNo"/>
							<input type="text" 	name="condition.score" >
						</div>
					</div>
				</div>
				<input type="hidden" id="rulePidQuery" value="${ruleDefinitionModel.rulePid}"/>
			<input type="hidden" id="ruleNameQuery" value="${ruleDefinitionModel.ruleName}"/>
			</form>
		</div>
	</div>
</div>


<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>${ruleDefinitionModel.ruleName}规则设定列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="scoringRulesList.add()">新增</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="scoringRulesList.editor()">编辑</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="scoringRulesList.deleteScoringRules()">删除</a>
			</div>
			<!-- mmGrid -->
			<table id="scoringRulesList_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
		
	</div>
</div>
		 	<div class="row-fluid">
								<div class="btn-toolbar" style="text-align: center">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:scoringRulesList.returnRuleDefinition();">返回</a>
			</div>
		 </div>	
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_scoringRules">
        <div class="win-header">
            <span>评分规则信息</span> <i class="close">&times;</i>
        </div>
		<div class="win-content" id="tabwin_add_scoringRules_content">
	    	<div id="scoringRules-detail-template">
	    		<div class="form-search">
		    		<form class="form-horizontal" id="scoringRulesEditorForm">
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>规则名称</label>
								<div class="controls txt">
									<input type="hidden" id="scoringRulePid" name="scoringRulesModel.scoringRulePid"/>
									<input type="hidden" id="ruleNo" name="scoringRulesModel.ruleNo"/>
									<input type="hidden" id="rulePid" name="scoringRulesModel.rulePid"/>
									<input type="text" id="ruleName" disabled="disabled" name="scoringRulesModel.ruleName"/>
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>区间值从</label>
								<div class="controls txt">
									<input type="text" data-required="区间值从 不能为空！" id="minimum"  placeholder="请输入"
									name="scoringRulesModel.minimum" value="${scoringRulesModel.minimum}">
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>至</label>
								<div class="controls txt">
									<input type="text" data-required="区间值至 不能为空！" id="maximum"  placeholder="请输入"
										name="scoringRulesModel.maximum" value="${scoringRulesModel.maximum}">
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>得分</label>
								<div class="controls txt">
									<input type="text" data-required="得分不能为空！" id="score" data-number="只能填入数字"   placeholder="请输入数字"
									name="scoringRulesModel.score" value="${scoringRulesModel.score}">
								</div>
		            		</div>
		        		</div>
				        <div class="row-fluid">    
							<div class="span10 control-group full" style="margin-left:0px">
								<label class="control-label" ><span style="color:red;">*</span>描述</label>
								<div class="controls">
								<textarea data-maxlength="描述不能超过200个字!" data-maxlength-param="200" data-required="描述不能为空！"  placeholder="请输入"
									style="width: 100%;height: 115px;resize:none;" name="scoringRulesModel.description" id="description"></textarea>
					</div>
				</div>
				        </div>
				    </form>
				    <div class="form-search-btn">
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="scoringRulesList.saveScoringRules();">保存</a>
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="scoringRulesList.cancle();">取消</a>
				    </div>
				</div>
			</div>
        </div>
    </div>
</div>	
