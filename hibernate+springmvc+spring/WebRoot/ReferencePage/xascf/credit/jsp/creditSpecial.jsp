<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}

#setDiv .span3 {
	margin-left: 1px;
}

.details {
	margin-top: 3px;
	color: red;
}
</style>
<div id="setDiv">
	<div class="row-fluid">
		<!-- 授信申请基本信息 -->
			<jsp:include page="creditRequestDetails.jsp"></jsp:include>
	</div>
	<!-- 票据和预付票据信息 -->
	<div class="row-fluid">
			<jsp:include page="billAndPrebill.jsp"></jsp:include>
	</div>
	
	<!-- 担保信息 -->
	<div class="row-fluid">
			<c:if test="${creditEntity.danbaoRelList!=null }">
				<jsp:include page="danbaoDetail.jsp"></jsp:include>
			</c:if>
	</div>
	<div class="row-fluid">
			<!-- 抵押信息 -->
			<c:if test="${creditEntity.diyaList!=null }">
				<jsp:include page="diyaDetail.jsp"></jsp:include>
			</c:if>
	</div>
	<div class="row-fluid" style="margin-top: 5px;">
		<div class="widget-box">
			<div class="widget-header" style="background-color: #438eb9;">
				<span class="widget-title"><i class="icon-list"></i>委托方信息 </span>
				<span class="widget-toolbar"><a href="#"
					data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
			</div>
			<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;">
				<table class="table table-bordered" id="buyerTable">
					<tr>
						<th style="text-align: left;">委托方名称</th>
						<th style="text-align: center;width:70px">账期</th>
						<th style="text-align: center;width:90px">业务占比</th>
						<th style="text-align: center;width:80px">票据类型</th>
						<th style="text-align: center;width:120px">授信额度</th>
						<th style="text-align: center;width:80px">是否预付</th>
						<th style="text-align: center;width:95px">预付票据类型</th>
						<th style="text-align: center;width:70px">折扣率</th>
						<th style="text-align: center;width:80px">是否有效</th>
						
						
					</tr>
					<c:forEach items="${creditEntity.buyRelList}" var="item">
						<tr>
							<td style="text-align: left;"><a href="#" onclick="customerDetailPop.buyerDetail('${item.buyPid }');">${item.buyName }</a></td>
							<td style="text-align: center;">${item.billCycle }天</td>
							<td style="text-align: center;">${item.businessPercent }%</td>
							<td style="text-align: center;">${item.billType }</td>
							<td style="text-align: center;"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${item.creditPercent}"/></td>
							<td style="text-align: center;">${item.isPrePay }</td>
							<td style="text-align: center;">${item.preBillType }</td>
							<td style="text-align: center;">${item.disCount }%</td>
							<c:if test="${item.isEffective=='1' }">
								<td style="text-align: center;">有效</td>
							</c:if>
							<c:if test="${item.isEffective=='0' }">
								<td style="text-align: center;">无效</td>
							</c:if>
							
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
	<!-- 历史审批信息 -->
			<!-- 本次审批操作-->
			<div class="row-fluid">
				<jsp:include page="approvalCreditEdit.jsp"></jsp:include>
			</div>
</div>