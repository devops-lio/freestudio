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
margin-top: 3px;color: red;

}
</style>
<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>会员授信信息 </span> <span
			class="widget-toolbar"><a href="#" data-action="collapse"><i
				class="icon-chevron-up"></i> </a> </span>
	</div>
	<div class="widget-body" style="border-bottom: 0px">
		<div class="row-fluid">
			<div class="form-horizontal" id="sxresultInfo"
				style="margin-top: 10px;margin-bottom: 0px;font-size: 12px">
				<div class="row-fluid">
					<div class="span3 control-group full ">
						<label class="control-label" for="">授信编号：</label>
						<div class="controls details">${creditEntity.creditApplyItem.creditNo }</div>
					</div>
					<div class="span3 control-group full ">
						<label class="control-label" for="">会员授信额度：</label>
						<div class="controls details"><fmt:formatNumber type="currency" pattern="#0.00元" value="${creditEntity.creditApplyItem.creditQuota }" /> </div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">剩余授信额度：</label>
						<div class="controls details"><fmt:formatNumber type="currency" pattern="#0.00元" value="${creditEntity.creditApplyItem.remaingAmount }" /></div>
						<input type="hidden" id="remaingAmount" value="${ creditEntity.creditApplyItem.remaingAmount}"/>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">融资类型：</label>
						<div class="controls details">${creditEntity.creditApplyItem.financingTypeCn }</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full" id="financingMethodDiv">
						<label class="control-label" for="">保理方式：</label>
						<div class="controls details">${creditEntity.creditApplyItem.financingMethodCn }</div>
					</div>
					<div class="span3 control-group full" id="financingNatureDiv">
						<label class="control-label" for="">保理性质：</label>
						<div class="controls details">${creditEntity.creditApplyItem.financingNatureCn }</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">票据类型：</label>
						<div class="controls details">
							<c:if test="${creditEntity.creditApplyItem.billTypeCn==''}">无</c:if>
							<c:if test="${creditEntity.creditApplyItem.billTypeCn!=''}">${creditEntity.creditApplyItem.billTypeCn }</c:if>
						</div>
						<input type="hidden" id="billType" value="${ creditEntity.creditApplyItem.billType}"/>
					</div>
					<!-- 
					<div class="span3 control-group full">
						<label class="control-label" for="">授信有效期：</label>
						<div class="controls details" style="width: 200px;">${creditEntity.creditApplyItem.effectiveStartTimeStr }<span style="color: black;">至</span>${creditEntity.creditApplyItem.effectiveEndTimeStr }</div>
					</div> -->
				</div>
				<div class="row-fluid">
					
					<div class="span3 control-group full">
						<label class="control-label" for="">是否预付：</label>
						<div class="controls details" style="width: 200px;">${creditEntity.creditApplyItem.isPrepayCn }</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">预付票据类型：</label>
						<div class="controls details" style="width: 200px;">
							<c:if test="${creditEntity.creditApplyItem.prepayBillTypeCn==''}">无</c:if>
							<c:if test="${creditEntity.creditApplyItem.prepayBillTypeCn!=''}">${creditEntity.creditApplyItem.prepayBillTypeCn }</c:if>
						</div>
						<input type="hidden" id="prepayBillType" value="${ creditEntity.creditApplyItem.prepayBillType}"/>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">授信账期利率：</label>
						<div class="controls details" style="width: 200px;">${creditEntity.rateModel.termRate }%</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">授信逾期利率：</label>
						<div class="controls details" style="width: 200px;">${creditEntity.rateModel.overdueRate }%</div>
					</div>
				</div>
				<div class="row-fluid">
					
					<div class="span3 control-group full">
						<label class="control-label" for="">授信展期利率：</label>
						<div class="controls details" style="width: 200px;">${creditEntity.rateModel.expandRate }%</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid" style="margin-top: 5px;">
				<jsp:include page="buyerNoEdit.jsp"></jsp:include>
		</div>
		<!-- 票据信息 -->
		<div class="row-fluid" >
		<!-- 查看是否预付  否预付 -->
			<c:if test="${loanType==1 || loanType==3}">
				<c:if test="${creditEntity.creditApplyItem.billType==null && noteEditType==null}">
						<jsp:include page="receiptInfo.jsp"></jsp:include>
				</c:if>
					<!-- 新增编辑 -->
				<c:if test="${noteEditType=='NOTEEDIT' }">
					<c:if test="${creditEntity.creditApplyItem.billType==1 }">
					<!-- 发票 -->
						<jsp:include page="receiptInfo.jsp"></jsp:include>
					</c:if>
					<c:if test="${creditEntity.creditApplyItem.billType==2 }">
						<!-- 对账单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>对账单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/shipBillEdit.jsp"></jsp:include>
					</c:if>
					<c:if test="${creditEntity.creditApplyItem.billType==3 }">
						<!-- 回单 -->
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>回单信息 </span> <span
								class="widget-toolbar"> </span>
						</div>
						<jsp:include page="../../credit/jsp/shipTurnEdit.jsp"></jsp:include>
					</c:if>
				</c:if>
				<!-- 审批时查看列表无编辑 -->
				<c:if test="${noteEditType=='NOTECHECKNOEDIT' }">
					<c:if test="${creditEntity.creditApplyItem.billType==1 }">
						<jsp:include page="receiptDetail.jsp"></jsp:include>
					</c:if>
					<c:if test="${creditEntity.creditApplyItem.billType==2 }">
						<!-- 对账单 -->
						<jsp:include page="../../credit/jsp/shipBillEditTab.jsp"></jsp:include>
					</c:if>
					<c:if test="${creditEntity.creditApplyItem.billType==3 }">
						<!-- 回单 -->
						<jsp:include page="../../credit/jsp/shipTurnInfo.jsp"></jsp:include>
					</c:if>
				</c:if>
			</c:if>
			<!-- 预付票据 是预付 -->
			<c:if test="${loanType==2}">
			<!-- 新增编辑 -->
				<c:if test="${noteEditType=='NOTEEDIT' }">
				<!-- 订单 -->
					<c:if test="${creditEntity.creditApplyItem.prepayBillType=='1'}">
							<jsp:include page="../../credit/jsp/orderInfo.jsp"></jsp:include>
					</c:if>
					<!-- 运单 -->
					<c:if test="${creditEntity.creditApplyItem.prepayBillType=='2'}">
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
					<c:if test="${creditEntity.creditApplyItem.prepayBillType==1}">
							<jsp:include page="../../credit/jsp/orderInfo.jsp"></jsp:include>
					</c:if>
					<!-- 运单 -->
					<c:if test="${creditEntity.creditApplyItem.prepayBillType==2}">
						<jsp:include page="../../credit/jsp/shipDetail.jsp"></jsp:include>
					</c:if>
				</c:if>
			</c:if>
		</div>
	</div>

</div>
