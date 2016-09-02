<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>


<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-body" style="border-bottom: 0px">
		<div class="row-fluid" >
		<input type="hidden" id="histoteriRemaingAmount" value="${contractEntity.contractLoanResultItem.remaingAmount==null?0:contractEntity.contractLoanResultItem.remaingAmount}">
 <input type="hidden" id="remaingAmount" value="${contractEntity.contractLoanResultItem.remaingAmount==null?0:contractEntity.contractLoanResultItem.remaingAmount}">
 <input type="hidden" id="contractAmount" value="${contractEntity.contractLoanResultItem.contractAmount==null?0:contractEntity.contractLoanResultItem.contractAmount}">
 <input type="hidden" id="usedAmount" value="${contractEntity.contractLoanResultItem.usedAmount==null?0:contractEntity.contractLoanResultItem.usedAmount}">
 <input type="hidden" id="allNotePrice" value="${contractEntity.contractLoanResultItem.allNotePrice==null?0:contractEntity.contractLoanResultItem.allNotePrice}">
 <input type="hidden" id="allNoteDisPrice" value="${contractEntity.contractLoanResultItem.allNoteDisPrice==null?0:contractEntity.contractLoanResultItem.allNoteDisPrice}">
 <input type="hidden" id="lostAmount" value="${contractEntity.contractLoanResultItem.lostAmount==null?0:contractEntity.contractLoanResultItem.lostAmount}">
 <input type="hidden" id="rebackPrice" value="${contractEntity.contractLoanResultItem.rebackPrice==null?0:contractEntity.contractLoanResultItem.rebackPrice}">
		
		<!-- 查看是否预付  否预付 -->
		<input type="hidden" id="billType" value="${contractbuyRelModel.billType}"/>
					<!-- 新增编辑 -->
				<!-- 审批时查看列表无编辑 -->
					<c:if test="${contractbuyRelModel.billType==1 }">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>历史发票信息 </span> <span
							class="widget-toolbar"> </span>
					</div>
					<div class="row-fluid">
						<jsp:include page="receiptLisiDetail.jsp"></jsp:include>
						</div>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==2 }">
						<!-- 对账单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>历史对账单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<div class="row-fluid" style="margin-top: -10px;">
						<jsp:include page="shipBillLisiDetail.jsp"></jsp:include>
						<SCRIPT>
						lisishipBillDetail.shipBillGrid();
						</SCRIPT>
						</div>
					</c:if>
					<c:if test="${contractbuyRelModel.billType==3 }">
						<!-- 回单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>历史回单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<div class="row-fluid" style="margin-top: -10px;">
						<jsp:include page="shipTurnLisi.jsp"></jsp:include>
						<SCRIPT>
						ShipTurnLisi.shipTurnGrid();
						</SCRIPT>
						</div>
					</c:if>
		</div>
	</div>

</div>
