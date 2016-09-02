<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
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

#tabPanelDiv .span3 {
	margin-left: 1px;
}
</style>
<script type="text/javascript" src="xascf/loan/js/noteAddEdit.js"></script>
<div class="row-fluid">
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
<c:if test="${loanType==2 || contractbuyRelModel.billType!=1}">
	<div class="row-fluid">
		<div class="widget-header" style="background-color: #438eb9;">
			<span class="widget-title"><i class="icon-list"></i>历史发票 </span> <span
				class="widget-toolbar"> </span>
		</div>
		<div class="row-fluid" >
			<jsp:include page="receiptDetail.jsp"></jsp:include>
		</div>
	</div>
</c:if>
<!-- 票据补充 -->
<div class="row-fluid" id="noteAddDiv">
	<jsp:include page="noteAddInfo.jsp"></jsp:include>
</div>
<div class="row-fluid offset5"
	style="margin-top: 20px;margin-bottom: 30px;width:45%">
	<a class="btn btn-primary" href="javascript:void(0)"
		onclick="NoteAddEdit.save()"><i class=""></i>保存</a> <a
		class="btn btn-primary" href="javascript:void(0)"
		onclick="NoteAddEdit.rebackList()"><i class=""></i>返回</a>
</div>
