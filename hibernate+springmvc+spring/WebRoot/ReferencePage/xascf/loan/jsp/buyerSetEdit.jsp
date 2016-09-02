<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<div class="widget-box">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>委托方信息 </span>
	</div>
	<div class="widget-body form-horizontal"
		style="font-size: 12px;margin-bottom: -5px;">
		<form id="buyerForm">
		<table class="table table-bordered" id="buyerTable">
			<tr>
				<th style="text-align: center;">委托方名称</th>
				<th style="text-align: center;">结算周期</th>
				<th style="text-align: center;">业务占比</th>
				<th style="text-align: center;">折扣率(%)</th>
			</tr>
			<c:forEach items="${buyRelList}" var="item">
				<tr>
				<td style="text-align: center;">${item.buyName }</td>
				<td style="text-align: center;">${item.billCycle }</td>
				<td style="text-align: center;">${item.businessPercent }</td>
				<td style="text-align: center;">
				<input type="hidden" id="${item.buyPid }_id"  value="${item.pid }">
				<input type="text" id="${item.buyPid }_value" data-required="折扣率不能为空！" value="${item.disCount }" onchange="javascript:LoanRequestFKSet.noteDiscount('${item.pid }','${item.buyPid }',this.value);"></td>
				</tr>
			</c:forEach>
		</table>
		</form>
	</div>
</div>