<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}

#sxresultInfo .span3 {
	margin-left: 1px;
}

.details {
	margin-top: 3px;
	color: blue;
}
</style>
<script type="text/javascript" src="xascf/fancing/js/agfancingPop.js"></script>
<!-- 查询列表-->
<div class="widget-box">
	<div class="widget-body">
	<div class="widget-form">
		<div class="widget-grid">
			<div class="widget-box" >
			<div class="widget-body" >
			<!-- mmGrid -->
			<table id="agfund_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div style="text-align: center;font-size: 12px;">
				账单总金额：<span style="color: red;" id="allBillPrice"></span>
			</div>
		</div>
	</div>
		

</div>
<div class="widget-body" style="border: 1px solid #ccc;">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<div class="form-horizontal " id="sxresultInfo" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">再融资单号：</label>
						<div class="controls details">
							${aGFancingItem.agfancingOrderNo}
							<input type="hidden" id="agfancingOrderNo" value="${aGFancingItem.agfancingOrderNo}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">账单总额：
						</label>
						<div class="controls details">
							<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${aGFancingItem.billAmount}"/>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">融资金额：
						</label>
						<div class="controls details">
							<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${aGFancingItem.agfancingAmount}"/>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">融资账期：
						</label>
						<div class="controls details">
							${aGFancingItem.agfancingAccount}天
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">融资费率：
						</label>
						<div class="controls details">
							${aGFancingItem.agfancingRate}%
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">融资方式：
						</label>
						<div class="controls details">
							${aGFancingItem.agfancingType}
						</div>
					</div>
					
					<div class="span3 control-group full">
						<label class="control-label">状态：
						</label>
						<div class="controls details">
							<c:if test="${aGFancingItem.state==0 }">新建</c:if>
							<c:if test="${aGFancingItem.state==1 }">通过</c:if>
							<c:if test="${aGFancingItem.state==2 }">已融入</c:if>
						</div>
					</div>
				</div>
				<div class="row-fluid " style="margin-top: 20px;margin-bottom:20px; text-align: center;">
							<div class="span12 control-group full" >
								<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancle('agFancingDetailTab')"><i class=""></i>关闭</a>
						</div>
						</div>
			</div>
		</div>
	</div>
</div></div>
	</div>
	</div>


