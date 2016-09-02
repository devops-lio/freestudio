<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/businessQuery/js/buyDetail.js"></script>

<div class="widget-box">
	<div class="widget-header">
	    <span class="widget-title"><i class=""></i>查询条件</span> 
	    <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:BuyDetail.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BuyDetail.clear();"><i class=""></i>重置<br /></a>
	  		</div>
			<form action="" id="buyDetailQueryForm" class="form-horizontal fromPre">
				<input type="hidden" id="contractNo" name="condition.contractNo" value="${contractNo}">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							委托方名称
						</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.buyName" >
						</div>
					</div>
					
					<div class="span3 control-group full">
						<label class="control-label">
							票据类型
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.billType" >
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>${memberName}在合同${contractNo}内的所有委托方放款列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
    	<div class="widget-grid">
			<div class="widget-body" style="border-top: none;" >
				<table id="_mmg" class="mmg" >
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div class="row-fluid">
					<div class="span7  control-group full" id="allMsg" style="padding-left: 45px;line-height:35px;text-align: left;font-size: 12px;margin-bottom:5px;">&nbsp;</div>
					<div class="span5 control-group full" id="pg" style="text-align: right;"></div>
				</div>
			</div>	
		</div>
	</div>
</div>

<div class="row-fluid" style="margin-top: 20px;text-align: center;">
	<a class="btn btn-primary" href="javascript:void(0)" onclick="BuyDetail.back()"><i class=""></i>返回</a>
</div>

<div class="row-fluid">
    <div class="win" id="fancingOrderDetail3pop"  style="width:1150px;">
	    <div class="win-header">
			<span>放款详细</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="fancingOrderDetailContent3Pop"></div>
	</div>
</div>


