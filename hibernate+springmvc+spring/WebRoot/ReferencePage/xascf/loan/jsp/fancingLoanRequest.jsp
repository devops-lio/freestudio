<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

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
#approdPass_form .long85Lable{
	margin-left: -20px;
	width: 95px;
}
</style>
<script type="text/javascript"
	src="xascf/loan/js/fancingLoanRequest.js"></script>
<div class="tabbable" style="margin-left: 0px;">
	<ul id="tabLabel" class="nav nav-tabs">
		<li class="active"><a href="#enterpriseTab" data-toggle="tab">企业放款申请</a>
		</li>
		<li><a href="#personTab" data-toggle="tab">个人放款申请</a>
		</li>
	</ul>
	<div class="tab-content" id="tabPanelDiv"	style="margin-left: 0px;margin-top: -10px">
		<div class="tab-pane active" id="enterpriseTab">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body" >
					<div class="widget-form" style="padding: 0px;border-bottom: 1px #ccc solid;">
							<div class="widget-box" style="margin-top:0px;">
								<div class="widget-header" style="background-color: #438eb9;">
									<span class="widget-title"><i class="icon-list"></i>放款申请信息
									</span> <span class="widget-toolbar"><a href="#"
										data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
								</div>
								<div class="widget-body" >
									<form class="form-horizontal fromPre" id="fancingForm">
										<div class="row-fluid"
											style="margin-bottom: 15px;padding-top: 15px;">
											<div  style="padding-left: 45px;">
											<div class="row-fluid">
												<div class="span3 control-group full">
													<label class="control-label" for=""><span
														style="color: red;">*</span>放款单号 </label>
													<div class="controls xwin">
														<input readonly="readonly" type="text" id="businessNo"
															name="fancingOrderEntity.fancingOrderItem.fancingOrderNo"
															value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
													</div>
												</div>
												<div class="span3 control-group full" style="margin-left: 120px;">
													<label class="control-label" for=""><span
														style="color: red;">*</span>合同 </label>
													<div class="controls xwin">
													<input type="hidden" id="billTypeStatus" value="COMON">
														<input type="hidden" name="fancingOrderEntity.fancingOrderItem.menberPid"	id="memberPid"	value="${fancingOrderEntity.fancingOrderItem.menberPid }">
														<input type="hidden"	name="fancingOrderEntity.fancingOrderItem.pid"	id="fancingPid"	value="${fancingOrderEntity.fancingOrderItem.pid }">
														<input type="hidden"	name="fancingOrderEntity.fancingOrderItem.menberType"		value="1">
														<input type="hidden"	name="fancingOrderEntity.fancingOrderItem.fancingFrom"		value="1">
														<input type="hidden"	name="fancingOrderEntity.fancingOrderItem.creditNo"	id="creditNo" value="${fancingOrderEntity.fancingOrderItem.creditNo }">
														<input type="hidden"	id="notePrice"	name="fancingOrderEntity.fancingOrderItem.notePrice">
														<input type="hidden"	id="noteType" name="fancingOrderEntity.fancingOrderItem.noteType"	value="${contractbuyRelModel.billType }">
														<input type="hidden"	id="noteDiscountPrice"	name="fancingOrderEntity.fancingOrderItem.noteDisprice">
														<input type="hidden"	id="fancingStatus"	name="fancingOrderEntity.fancingOrderItem.fancingStatus" value="${fancingOrderEntity.fancingOrderItem.fancingStatus }">
														<input type="text" id="contractNo"
															name="fancingOrderEntity.fancingOrderItem.contractNo"
															data-xwin-params="fancingContractPop"
															data-required="合同不能为空！" placeholder="请选择"
															value="${fancingOrderEntity.fancingOrderItem.contractNo}">
														<i></i>
													</div>
												</div>
												<div class="span3 control-group full" style="margin-left: 120px;">
													<label class="control-label" for=""><span
														style="color: red;">*</span>申请会员 </label>
													<div class="controls">
														<input readonly="readonly" type="text" id="memberName"   
															name="fancingOrderEntity.fancingOrderItem.menberName"
															value="${fancingOrderEntity.fancingOrderItem.menberName }">
													</div>
												</div>
												
											</div>
											<div class="row-fluid">
												<div class="span3 control-group full" >
													<label class="control-label" for=""><span
														style="color: red;">*</span>委托方 </label>
													<div class="controls xwin">
														<input type="hidden"
															name="fancingOrderEntity.fancingOrderItem.buyerPid"
															id="buyerPid"
															value="${fancingOrderEntity.fancingOrderItem.buyerPid }">
														<input type="text" id="buyerName"
															name="fancingOrderEntity.fancingOrderItem.buyerName"
															data-xwin-params="contractBuyerPop" placeholder="请选择"
															data-required="委托方不能为空！"
															value="${fancingOrderEntity.fancingOrderItem.buyerName }">
														<i></i>
													</div>
												</div>
												<div class="span3 control-group full " style="margin-left: 120px;">
													<label class="control-label" for=""><span
														style="color: red;">*</span>申请金额 </label>
													<div class="controls txt">
														<input type="text" id="requestPrice" placeholder="请输入数字"
															data-required="申请金额不能为空！" data-number="只能填入数字"
															name="fancingOrderEntity.fancingOrderItem.requestPrice"
															value="${fancingOrderEntity.fancingOrderItem.requestPrice }">
													</div>
												</div>
												<div class="span3 control-group full " style="margin-left: 120px;">
													<label class="control-label" for="">预放款时间</label>
													<div class="controls time">
														<input type="text" 
															name="fancingOrderEntity.fancingOrderItem.requestPayTime" placeholder="请选择"
															value="${fancingOrderEntity.fancingOrderItem.requestPayTime }">
															<i class="date" data-format="yyyy-MM-dd" ></i>
													</div>
												</div>	
												</div>	
												<div class="row-fluid">																		
												<div class="span3 control-group full" >
													<label class="control-label" for="">款项类型</label>
													<div class="controls">
														<input type="hidden" id="loanType"
															name="fancingOrderEntity.fancingOrderItem.loanType" 
															value="${fancingOrderEntity.fancingOrderItem.loanType }">
														<input type="text" readonly="readonly" id="loanTypeCn"
															name="fancingOrderEntity.fancingOrderItem.loanTypeCn"
															value="${fancingOrderEntity.fancingOrderItem.loanTypeCn }">
													</div>
												</div>
												<div class="span3 control-group full" style="margin-left: 120px;" >
													<label class="control-label" for=""><span
														style="color: red;">*</span>放款至</label>
													<div class="controls">
														<slt:select cssClass="chzn-select"
															name="fancingOrderEntity.fancingOrderItem.loanToType"
															value="${fancingOrderEntity.fancingOrderItem.loanToType}"
															optionsType="LOAN_TO_TYPE">
															<slt:outHTML>id="loanToType"</slt:outHTML>
															<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
															<slt:outHTML>data-required="放款至方式不能为空！"</slt:outHTML>
														</slt:select>
													</div>
												</div>								
											</div>
											
											<div id="loanStat">
												<div class="row-fluid">
													<div class="span3 control-group full" >
															<label class="control-label" for="">授信额度</label>
															<div class="controls details" style="font-weight: bold;" id="qutoAmountdiv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.fancingContractItem.creditPrice==null?0:contractEntity.fancingContractItem.creditPrice}"/>
															</div>
													</div>
												</div>
												<div class="row-fluid">	
													<div class="span3 control-group full" >
															<label class="control-label" for="">授信剩余额度</label>
															<div class="controls details" style="font-weight: bold;" id="lostQutoAmountdiv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.lostAmount==null?0:contractEntity.contractLoanResultItem.lostAmount}"/>
															</div>
														</div>
													<div class="span7 control-group full"  >
															<div class="controls details" style="margin-left: -85px;" >*说明：不累计本次放款金额，即本次放款申请没有占用额度</div>
													</div>
												</div>
												<div class="row-fluid">
													<div class="span3 control-group full" >
															<label class="control-label" for="">当前放款总额</label>
															<div class="controls details" style="font-weight: bold;" id="usedAmountdiv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.usedAmount==null?0:contractEntity.contractLoanResultItem.usedAmount}"/>
															</div>
														</div>
														<div class="span7 control-group full"  >
															<div class="controls details" style="margin-left: -85px;" >*说明：不累计本次放款金额，但累计该会员其它所有（含正在申请中）放款金额</div>
														</div>
												</div>
												<div class="row-fluid">
													<div class="span3 control-group full" >
															<label class="control-label" for="" style="width: 85px;margin-left: -10px;">有效票据总额</label>
															<div class="controls details" style="font-weight: bold;" id="allNotePricediv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.allNotePrice==null?0:contractEntity.contractLoanResultItem.allNotePrice}"/>
															</div>
													</div>
													<div class="span7 control-group full"  >
															<div class="controls details" style="margin-left: -85px;" >*说明：累计该会员提交的所有（含本次）有效票据金额</div>
													</div>
												</div>
												<div class="row-fluid">
													<div class="span3 control-group full" >
															<label class="control-label" for="" style="width: 100px;margin-left: -25px;">有效票据折扣总额</label>
															<div class="controls details" style="font-weight: bold; margin-left: 80px" id="allNoteDisPricediv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.allNoteDisPrice==null?0:contractEntity.contractLoanResultItem.allNoteDisPrice}"/>
															</div>
													</div>
													<div class="span7 control-group full"  >
															<div class="controls details" style="margin-left: -85px;" >*说明：累计该会员提交的所有（含本次）有效票据金额</div>
													</div>
												</div>
												<div class="row-fluid">
													<div class="span3 control-group full" >
															<label class="control-label" for="" style="width: 110px;margin-left: -35px;">本次最大可申请额度</label>
															<div class="controls details" style="font-weight: bold;" id="remaingAmountdiv">
																<fmt:formatNumber type="currency" pattern="#,#00.00 元" value="${contractEntity.contractLoanResultItem.remaingAmount==null?0:contractEntity.contractLoanResultItem.remaingAmount}"/>
															</div>
														</div>
												</div>
											</div>
										</div>
										<div class="row-fluid" id="driverBankInfo_div">
										<!-- 司机账号信息 -->
											<jsp:include page="driverBankInfo.jsp"></jsp:include>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="row-fluid" id="contractInfo">
						<!-- 合同信息 -->
							<jsp:include page="contractResultDetail.jsp"></jsp:include>
						</div>
						<div class="row-fluid" id="fancingReceiptInfo" >
						<!-- 票据信息 -->
							<jsp:include page="fancingReceiptDetails.jsp"></jsp:include>
						</div>
						
						<c:if test="${fancingOrderEntity.fancingOrderItem.fancingStatus=='50'
										|| fancingOrderEntity.fancingOrderItem.fancingStatus=='60' }">
							
							<div class="row-fluid">	
								<div class="widget-header" style="background-color: #438eb9;">
									<span class="widget-title"><i class="icon-list"></i>审批设置 </span> <span
										class="widget-toolbar"> </span>
								</div>
								<div class="widget-form" >
									<form class="form-horizontal fromPre" id="approdPass_form">
						        	<div class="row-fluid" >
						        		<div class="span3 control-group full" >
											<label class="control-label long85Lable" ><span style="color:red;">*</span>预计回款时间</label>
											<div class="controls time" >
													<input type="text" 
													id="termDate"
														name="fancingOrderEntity.fancingOrderItem.termDate"
														value="${fancingOrderEntity.fancingOrderItem.termDate }">
														<i class="date" data-format="yyyy-MM-dd" ></i>
											</div>
										</div>
									</div>
									</form>
								</div>
							</div>
						</c:if>
						
						<!-- 历史审批信息 -->
						<c:if test="${recordList!=null }">
							<div class="row-fluid">
								<jsp:include page="approvalDetails.jsp"></jsp:include>
							</div>
						</c:if>
						<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
							<div class="span12 control-group full" >
							<input id="isSpecial" type="hidden" name="isSpecial" value="${isSpecial }" />
							<c:choose>
								<c:when test="${isSpecial=='1' }">
									<a class="btn btn-primary" href="javascript:void(0)" onclick="FancingLoanRequest.save()"><i class=""></i>保存</a>
								</c:when>
								<c:otherwise>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="FancingLoanRequest.save()"><i class=""></i>保存</a>
									<a class="btn btn-primary" href="javascript:void(0)" onclick="FancingLoanRequest.confir()"><i class=""></i>提交</a>
								</c:otherwise>
							</c:choose>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tab-pane" id="personTab">
			<h4 style="margin-top: 20px;margin-left: 20px;">非常抱歉！暂时不支持此业务！</h4>
		</div>
	</div>

</div>


