<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
.details{
margin-top: 3px;color: bule;

}
</style>
<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-body" style="border-bottom: 0px">
		<div class="row-fluid" >
		<!-- 查看是否预付  否预付 -->
		<input type="hidden" id="billType" value="${contractbuyRelModel.billType}"/>
		<input type="hidden" id="preBillType" value="${contractbuyRelModel.preBillType}"/>
			<c:if test="${loanType==1 || loanType==3}">
				<c:if test="${contractbuyRelModel.billType==null && noteEditType==null}">
						<jsp:include page="receiptInfo.jsp"></jsp:include>
				</c:if>
					<!-- 新增编辑 -->
				<c:if test="${noteEditType=='NOTEEDIT' }">
					<c:if test="${contractbuyRelModel.billType==1 }">
					<!-- 发票 -->
					<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>发票信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="receiptInfo.jsp"></jsp:include>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==2 }">
						<!-- 对账单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>对账单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/shipBillEdit.jsp"></jsp:include>
						<SCRIPT>
						ShipBillEdit.shipBillGrid();
						</SCRIPT>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==3 }">
						<!-- 回单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>回单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/shipTurnEdit.jsp"></jsp:include>
						<SCRIPT>
						ShipTurnEdit.shipTurnGrid();
						</SCRIPT>
					</c:if>
				</c:if>
				<!-- 审批时查看列表无编辑 -->
				<c:if test="${noteEditType=='NOTECHECKNOEDIT' }">
					<c:if test="${contractbuyRelModel.billType==1 }">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>发票信息 </span> <span
							class="widget-toolbar"> </span>
					</div>
					<div class="row-fluid">
						<jsp:include page="receiptDetail.jsp"></jsp:include>
						</div>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==2 }">
						<!-- 对账单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>对账单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<div class="row-fluid" >
						<jsp:include page="../../credit/jsp/shipBillEditTab.jsp"></jsp:include>
						<SCRIPT>
						ShipBillDetail.shipBillGrid();
						</SCRIPT>
						</div>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==3 }">
						<!-- 回单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>回单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<div class="row-fluid" style="margin-top: -10px;">
						<jsp:include page="../../credit/jsp/shipTurnInfo.jsp"></jsp:include>
						<SCRIPT>
						ShipTurnInfo.shipTurnGrid();
						</SCRIPT>
						</div>
					</c:if>
				</c:if>
			</c:if>
			<!-- 预付票据 是预付 -->
			<c:if test="${loanType==2}">
			<!-- 新增编辑 -->
				<c:if test="${noteEditType=='NOTEEDIT' }">
				<!-- 订单 -->
					<c:if test="${contractbuyRelModel.preBillType=='1'}">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>订单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/orderInfo.jsp"></jsp:include>
						<script type="text/javascript" src="xascf/credit/js/orderInfo.js"></script>							
						<SCRIPT>
							OrderInfo.orderGrid();
						</SCRIPT>		
					</c:if>
					<!-- 运单 -->
					<c:if test="${contractbuyRelModel.preBillType=='2'}">
						<div class="widget-header" >
							<span class="widget-title"><i class="icon-list"></i>运单信息</span> 
							<span class="widget-toolbar">
								<a href="#" data-action="collapse">
									<i class="icon-chevron-up"></i> 
								</a> 
							</span>
						</div>
						<jsp:include page="../../credit/jsp/shipInfo.jsp"></jsp:include>
					</c:if>
				</c:if>
				<!-- 审批时查看列表无编辑的订单或者运单 -->
				<c:if test="${noteEditType=='NOTECHECKNOEDIT' }">
					<c:if test="${contractbuyRelModel.preBillType==1}">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>订单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/orderInfoTab.jsp"></jsp:include>
						<SCRIPT>
							OrderInfo.orderGrid();
						</SCRIPT>				
					</c:if>
					<!-- 运单 -->
					<c:if test="${contractbuyRelModel.preBillType==2}">
						<jsp:include page="../../credit/jsp/shipDetail.jsp"></jsp:include>
					</c:if>
				</c:if>
			</c:if>
		</div>
	</div>

</div>
