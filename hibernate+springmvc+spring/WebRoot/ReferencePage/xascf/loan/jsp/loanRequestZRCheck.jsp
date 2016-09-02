<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}
#ZRCHECK .span3 {
	margin-left: 1px;
}
.table th,.table td {
	padding: 3px;
}

.table {
	margin-bottom: 5px;
}

#tabPanelDiv .span3 {
	margin-left: 1px;
}

</style>
<div class="widget-box" style="font-size: 12px;" id="ZRCHECK">
	<div class="widget-body">
	<input type="hidden" id="billTypeStatus" value="COMON">
		<input type="hidden" id="businessNo"
			value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
		<input type="hidden" id="loanRequestNo"
			value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
		<input type="hidden" id="fancingPid"
			value="${fancingOrderEntity.fancingOrderItem.pid }">
		<div class="widget-form">
			<div class="row-fluid" id="contractInfo">
			<!-- 合同信息 -->
				<jsp:include page="contractResultDetail.jsp"></jsp:include>
			</div>
			<div class="row-fluid" id="fancingReceiptInfo">
			<!-- 票据信息 -->
				<jsp:include page="fancingReceiptDetails.jsp"></jsp:include>
			</div>
			<div class="row-fluid" >
	<!-- 放款申请信息 -->
		<jsp:include page="fancingLoanRequestDetail.jsp"></jsp:include>
	</div>
			<!-- 本次审批操作-->
			<div class="row-fluid">
				<jsp:include page="approvalFancingEdit.jsp"></jsp:include>
			</div>		
		</div>
	</div>
</div>
