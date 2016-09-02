<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/loan/js/approvalFancingEdit.js"></script>	
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
</style>
<div style="font-size: 12px;" id="confirDiv">
<input type="hidden" id="businessNo"	value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
									<input type="hidden" id="fancingPid"	value="${fancingOrderEntity.fancingOrderItem.pid }">
	<div class="row-fluid">
		<div class="widget-box">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>放款申请信息	</span> 
						<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
					</div>
					<div class="widget-body">
						<div class="widget-grid">
							<div class="grid-toolbar">
								<div class="form-horizontal " id="sxresultInfo" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px">
									<div class="row-fluid">
										<div class="span4 control-group full" >
											<label class="control-label" for="">放款单号：</label>
											<div class="controls details">${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</div>
										</div>
										<div class="span4 control-group full" >
											<label class="control-label" for="">申请状态：</label>
											<div class="controls details">${fancingOrderEntity.fancingOrderItem.fancingStatusCn}</div>
										</div>
										<div class="span4 control-group full " >
											<label class="control-label" for="">审批记录：</label>
											<div class="controls details">
											<a onclick="ApprovaelFancingEdit.approvlDetail();" title="点击查看详细" href="#">查看记录</a>
											</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span8 control-group full">
											<label class="control-label" for="">申请会员： </label>
											<div class="controls details">
												<a href="#" onclick="customerDetailPop.customerDetail('${fancingOrderEntity.fancingOrderItem.menberPid}')">${fancingOrderEntity.fancingOrderItem.menberName}</a>
											</div>
										</div>
										<div class="span4 control-group full " >
											<label class="control-label" for="">申请来源：</label>
											<div class="controls details">${fancingOrderEntity.fancingOrderItem.fancingFromCn}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full " >
											<label class="control-label" for="">授信额度：</label>
											<div class="controls details">
												<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${contractEntity.contractLoanResultItem.contractAmount}" />
											</div>
										</div>
									</div>
									
									<div id="loanStat1">
									<div class="row-fluid">
										<div class="span4 control-group full " >
											<label class="control-label" for="">剩余授信额度：</label>
											<div class="controls details">
												<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${contractEntity.contractLoanResultItem.lostAmount}" />
											</div>
										</div>
										<div class="span6 control-group full"  >
														<div class="controls details" style="margin-left: -70px;" >*说明：不累计本次放款金额，即本次放款申请没有占用额度</div>
												</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full " >
											<label class="control-label" for="">当前放款总额：</label>
											<div class="controls details">
												<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${contractEntity.contractLoanResultItem.usedAmount}" />
											</div>
										</div>
										<div class="span6 control-group full"  >
														<div class="controls details" style="margin-left: -70px;" >*说明：不累计本次放款金额，但累计该会员其它所有（含正在申请中）放款金额</div>
													</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full" >
												<label class="control-label" for="" >有效票据总额：</label>
												<div class="controls details"  id="allNotePricediv">
													<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.allNotePrice}"/>
												</div>
											</div>
										<div class="span6 control-group full"  >
														<div class="controls details" style="margin-left: -70px;" >*说明：累计该会员提交的所有（含本次）有效票据金额（不含预付票据）</div>
												</div>
									</div>
									<div class="row-fluid">	
										<div class="span4 control-group full" >
												<label class="control-label" for="" >有效票据折扣总额：</label>
												<div class="controls details"  id="allNoteDisPricediv">
													<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.allNoteDisPrice}"/>
												</div>
										</div>
										<div class="span6 control-group full"  >
														<div class="controls details" style="margin-left: -70px;" >*说明：累计该会员提交的所有（含本次）有效票据金额（不含预付票据）</div>
												</div>
									</div>
									</div>
									
									<div class="row-fluid">	
												<div class="span4 control-group full " >
													<label class="control-label" for="">本次票据金额：</label>
													<div class="controls details" id="details_allNotePriceDiv">
														<fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.notePrice}" />
													</div>
												</div>
									</div>
									<div class="row-fluid">
												<div class="span4 control-group full " >
													<label class="control-label" for="">本次折扣金额：</label>
													<div class="controls details" id="details_discountNotePriceDiv">
														<fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.noteDisprice}" />
													</div>
												</div>
									</div>
									
									<div id="loanStat2">
									<div class="row-fluid">	
										<div class="span4 control-group full" >
												<label class="control-label" for="" >本次最大可申请额度：</label>
												<div class="controls details"  id="remaingAmountdiv">
													<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.remaingAmount}"/>
												</div>
										</div>
									</div>
									</div>
									
											<input type="hidden" id="loanRequestNo" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo}"/> 
									<div class="row-fluid">
											<div class="span4 control-group full " >
													<label class="control-label" for="">本次申请金额：</label>
													<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${fancingOrderEntity.fancingOrderItem.requestPrice}"/></div>
												</div>
											<div class="span4 control-group full " >
												<label class="control-label" for="">预放款时间：</label>
												<div class="controls details">${fancingOrderEntity.fancingOrderItem.requestPayTime}</div>
											</div>
											<div class="span4 control-group full">
												<label class="control-label" for="">款项类型：</label>
												<div class="controls details">${fancingOrderEntity.fancingOrderItem.loanTypeCn}</div>
											</div>
									</div>
									<div class="row-fluid">
											<c:if test="${fancingOrderEntity.fancingOrderItem.replyPrice!=null && fancingOrderEntity.fancingOrderItem.termDate!=null}">
												<div class="span4 control-group full " >
													<label class="control-label" for="">本次实际放款金额：</label>
													<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${fancingOrderEntity.fancingOrderItem.replyPrice}"/></div>
												</div>
												<div class="span4 control-group full " >
													<label class="control-label" for="">放款时间：</label>
													<div class="controls details">${fancingOrderEntity.fancingOrderItem.payTime }
													</div></div>
												<div class="span4 control-group full " >
													<label class="control-label" for="">预计回款日期：</label>
													<div class="controls details">${fancingOrderEntity.fancingOrderItem.termDate}</div>
												</div>
											</c:if>	
											</div>
									</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>