<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/myLoanRequestList.js"></script>
<style>
.benjinRow{
font-weight: bold;
}
</style>
<div class="widget-box">
	<div class="widget-header">
    	<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
     </div>
     <div class="widget-body">
     	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:MyLoanRequestList.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:MyLoanRequestList.clear();"><i class=""></i>重置<br /></a>
			</div>
			<form action="" id="fancingListQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							放款单号
						</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							会员名称
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.menberName" >
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							开始日期
						</label>
						<div class="controls time">
						<input type="text"  name="condition.requestDateFrom" id="expectedarrivetime1">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
						 	结束日期
						</label>
						<div class="controls time">
							<input type="text"  name="condition.requestDateTo" id="expectedarrivetime2">
							<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
						</div>
					</div>	
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" for="">状态</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.fancingStatus"
								optionsType="FANCING_STATUS">
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
		<span class="widget-title"><i class="icon-list"></i>我的放款列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
     <div class="widget-body">
		<div class="tab-pane active" id="allboundTab" >
			<div class="widget-grid">
				<table id="all_mmg" class="mmg" >
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div id="all_pg" style="text-align: right;"></div>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span10" id="tabwin_add_detail">
        <div class="win-header">
            <span>账单明细</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_detail">
			        
        </div>
    </div>
</div>

<div>


</div>