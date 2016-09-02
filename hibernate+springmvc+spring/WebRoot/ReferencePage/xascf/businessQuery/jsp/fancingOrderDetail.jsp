<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/businessQuery/js/fancingOrderDetail.js"></script>

<div style="padding:10px;">
<div class="widget-box">
	<div class="widget-header">
	    <span class="widget-title"><i class=""></i>查询条件</span> 
    </div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:FancingOrderDetail.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:FancingOrderDetail.clear();"><i class=""></i>重置<br /></a>
	  		</div>
			<form action="" id="fancingOrderQueryForm" class="form-horizontal fromPre">
				<input type="hidden" id="buyPid" name="condition.buyPid" value="${buyPid}">
				<input type="hidden"  name="condition.contractNo" value="${contractNo}">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							放款单号
						</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>${buyName}放款详情列表</span>
	</div>
    <div class="widget-body">
    	<div class="widget-grid">
			<div class="widget-body" style="border-top: none;" >
				<table id="order_mmg" class="mmg" >
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div class="row-fluid">
					<div class="span7  control-group full" id="allFancingMsg" style="line-height:35px;padding-left: 45px;text-align: left;font-size: 12px;margin-bottom:5px;">&nbsp;</div>
					<div class="span5 control-group full" id="order_pg" style="text-align: right;"></div>
				</div>
			</div>	
		</div>
	</div>
</div>
</div>
<div class="row-fluid " style="margin-top: 20px;margin-bottom:20px; text-align: center;">
							<div class="span12 control-group full" >
								<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancleById('fancingOrderDetail3pop')"><i class=""></i>关闭</a>
						</div>
						</div>

