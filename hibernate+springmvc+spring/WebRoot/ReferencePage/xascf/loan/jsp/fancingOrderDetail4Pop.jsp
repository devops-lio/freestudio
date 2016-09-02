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
	color: blue;
}
</style>

<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
		<div class="widget-form">
			<input type="hidden" id="businessNo" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
			<input type="hidden" id="fancingPid" value="${fancingOrderEntity.fancingOrderItem.pid }">
			<div class="row-fluid">
				<div class="row-fluid" >
				<!-- 放款申请信息 -->
					<jsp:include page="fancingLoanRequestDetail.jsp"></jsp:include>
				</div>
				<div class="row-fluid" id="contractInfo" style="margin-top: -15px;">
				<!-- 合同信息 -->
					<jsp:include page="contractResultDetail.jsp"></jsp:include>
				</div>
			</div>
			<input type="hidden" id="billTypeStatus" value="ALL">
			<!-- 票据信息 -->
			<div class="row-fluid">
				<jsp:include page="fancingReceiptDetails.jsp"></jsp:include>
			</div>	
			<!-- 历史审批信息 -->
			<c:if test="${recordList!=null }">
			<div class="row-fluid">
					<div class="row-fluid" style="margin-top: 0px">
				<jsp:include page="approvalDetails.jsp"></jsp:include></div>
			</div></c:if>
			<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
						<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancleById('fancingOrderDetailPop')"><i class=""></i>关闭</a>
					</div>	
			</div>
		</div>
	</div>
</div>