<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
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
	color: blue;
}
}
</style>

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
					<c:if test="${creditEntity.danbaoItemList!=null }">
						<jsp:include page="danbaoDetail.jsp"></jsp:include>
					</c:if>
			</div>
			<div class="row-fluid">
					<!-- 抵押信息 -->
					<c:if test="${creditEntity.diyaList!=null }">
						<jsp:include page="diyaDetail.jsp"></jsp:include>
					</c:if>
			</div>
			<!-- 本次审批操作-->
			<div class="row-fluid" style="margin-top: 0px;font-size: 14px;">
				<!-- 委托方jsp -->
				<jsp:include page="buyerInfoSetTab.jsp"></jsp:include>
			</div>
			<div class="row-fluid">
				<jsp:include page="approvalCreditQuotaEdit.jsp"></jsp:include>
			</div>
			
			
