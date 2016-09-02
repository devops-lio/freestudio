<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="widget-box">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>委托方信息 </span>
	</div>
	<div class="widget-body"
		style="font-size: 12px;margin-bottom: -5px;">
		<table class="table table-bordered" id="buyerTable">
			<tr>
				<th style="text-align: left;">委托方名称</th>
				<th style="text-align: center;width:70px">账期</th>
				<th style="text-align: center;width:90px">业务占比</th>
				<th style="text-align: center;width:90px">票据类型</th>
				<th style="text-align: center;width:110px">授信额度</th>
				<th style="text-align: center;width:110px">是否预付</th>
				<th style="text-align: center;width:100px">预付票据类型</th>
				<th style="text-align: center;width:100px">折扣率</th>
			</tr>
			<c:forEach items="${contractEntity.contractbuyRelItemList}" var="item">
				<tr>
					<td style="text-align: left;"><a href="#" onclick="customerDetailPop.buyerDetail('${item.buyPid }');">${item.buyName }</a></td>
					<td style="text-align: center;">
						${item.billCycle }天
					</td>
					<td style="text-align: center;">
						${item.businessPercent }%
					</td>
					<td style="text-align: center;">
						<c:if test="${item.billType=='1'}">发票</c:if>
						<c:if test="${item.billType=='2'}">对账单</c:if>
						<c:if test="${item.billType=='3'}">回单</c:if>
					</td>
					
					<td style="text-align: center;"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${item.creditPercent}"/></td>
					<td style="text-align: center;">
						<c:if test="${item.isPrePay=='1'}">否</c:if>
						<c:if test="${item.isPrePay=='2'}">是</c:if>
					</td>
					<td style="text-align: center;">
						<c:if test="${item.preBillType=='1'}">订单</c:if>
						<c:if test="${item.preBillType=='2'}">运单</c:if>
					</td>
					<td style="text-align: center;">
						<input type="hidden" id="${item.buyPid }_id"  value="${item.buyPid }">
						<input type="hidden" id="${item.buyPid }_value"  value="${item.disCount }" >${item.disCount }%
					</td>
					
				</tr>
			</c:forEach>
		</table>
	</div>
</div>