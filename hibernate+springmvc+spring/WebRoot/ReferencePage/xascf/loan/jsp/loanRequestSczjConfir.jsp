<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

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



.details {
	margin-top: 3px;
	color: blue;
}
</style>

	
	<div class="row-fluid" >
	<input type="hidden" id="billTypeStatus" value="COMON">
	<!-- 放款申请信息 -->
		<jsp:include page="fancingLoanRequestDetail.jsp"></jsp:include>
	</div>
	<div class="row-fluid" id="contractInfo" style="margin-top: -10px;">
	<!-- 合同信息 -->
		<jsp:include page="contractResultDetail.jsp"></jsp:include>
	</div>
	<div class="row-fluid" id="fancingReceiptInfo">
	<!-- 票据信息 -->
		<jsp:include page="fancingReceiptDetails.jsp"></jsp:include>
	</div>
	<!-- 本次审批操作-->
	<div class="row-fluid">
		<jsp:include page="approvalFancingEdit.jsp"></jsp:include>
	</div>
		
