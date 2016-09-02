<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/financingEvaluateList.js"></script>
<script type="text/javascript" src="xascf/js/evaluateTableEventUtil.js"></script>
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
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="financingEvaluateList.query();"><i class=""></i>查询<br/></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="financingEvaluateList.clear();"><i class=""></i>重置<br /></a>
			</div>
			<form action="" id="evaluateResultQueryForm" class="form-horizontal">
				<div class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">融资单号</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
						</div>
					</div>	
					<div class="span4 control-group full">
						<label class="control-label">发起日期从</label>
						<div class="controls time">
							<input type="text"  name="condition.requestDateFrom" id="expectedarrivetime1">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">至</label>
						<div class="controls time">
							<input type="text"  name="condition.requestDateTo" id="expectedarrivetime2">
							<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
   <div class="widget-body">
	<div class="widget-grid">
		<!-- mmGrid -->
		<table id="financing_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>
<div class="row-fluid" style="display: none" id="evaluateTableDiv">
	<div class="widget-box">
		<div class="widget-body">
			<form id="indexFormId" style="margin-bottom: 0px">
				<input id="fancingOrderNo" type="hidden" name="evaluateResultModel.evaluateObjectNo"/>
				<input id="fancingPid" type="hidden" name="evaluateResultModel.evaluateObjectPid"/>
				<table  class="table table-bordered" id="indexTableId" style="margin-bottom: 5px">
				</table>
				<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label" >评价及信贷建议：</label>
						<div>
							<textarea  data-maxlength-param="200" class="span12" 
								style="height: 65px;" id="evaluateConclusion" name="evaluateResultModel.evaluateConclusion"></textarea>
						</div>
					</div>
				</div>
				<div class="row-fluid">
						<div class="form-search-btn offset4"  style="margin-top: 30px;margin-bottom:20px;width: 62%">
							<a class="btn btn-primary"  onclick="financingEvaluateList.save();">保存</a>
						</div>	
				</div>		
			</form>
		</div>
	</div>
</div>