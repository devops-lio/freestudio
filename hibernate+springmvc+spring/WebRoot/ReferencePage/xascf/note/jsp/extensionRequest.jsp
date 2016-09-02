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
<script type="text/javascript"	src="xascf/note/js/extensionRequest.js"></script>
				<form class="form-horizontal" id="fancingForm">
				<div class="row-fluid" >
				<!-- 放款申请信息 --> <input type="hidden" id="billRateVal"
													value="${contractEntity.fancingContractItem.billRate }">
					<jsp:include page="../../loan/jsp/fancingLoanRequestDetail.jsp"></jsp:include>
				</div>
				<!-- 历史票据 -->
					<div class="row-fluid"  >
						<jsp:include page="lishiNoteDetails.jsp"></jsp:include>
						</div>
					<div class="row-fluid"  >
					<input type="hidden"  name="fancingOrderEntity.fancingOrderItem.fancingOrderNo"	value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
									<input type="hidden" name="fancingOrderEntity.fancingOrderItem.pid"	value="${fancingOrderEntity.fancingOrderItem.pid }">
					<input type="hidden" id="billTypeStatus" value="COMON">
						<!-- 置换票据信息 -->
							<jsp:include page="../../loan/jsp/fancingReceiptDetails.jsp"></jsp:include>
					</div>
				<!-- 历史审批信息 -->
				<c:if test="${recordList!=null }">
				<div class="row-fluid">
					<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
				</div></c:if>
				<div class="row-fluid offset4"
					style="margin-top: 20px;margin-bottom: 30px;width: 62%">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="ExtensionRequest.save()"><i class=""></i>提交置换</a> <a
						class="btn btn-primary" href="javascript:void(0)"
						onclick="ExtensionRequest.confir()"><i
						class=""></i>返回列表</a> 
				</div>
				</form>	


