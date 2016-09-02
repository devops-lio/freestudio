<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
#showContractDiv .table th,.table td {
	padding: 3px;
}

#showContractDiv .table {
	margin-bottom: 5px;
}

#showContractDiv .details {
	margin-top: 3px;
	color: blue;
}

#showContractDiv .span3 {
	margin-left: 1px;
}
</style>
 <input type="hidden" id="histoteriRemaingAmount" value="${contractEntity.contractLoanResultItem.remaingAmount==null?0:contractEntity.contractLoanResultItem.remaingAmount}">
 <input type="hidden" id="remaingAmount" value="${contractEntity.contractLoanResultItem.remaingAmount==null?0:contractEntity.contractLoanResultItem.remaingAmount}">
 <input type="hidden" id="contractAmount" value="${contractEntity.contractLoanResultItem.contractAmount==null?0:contractEntity.contractLoanResultItem.contractAmount}">
 <input type="hidden" id="usedAmount" value="${contractEntity.contractLoanResultItem.usedAmount==null?0:contractEntity.contractLoanResultItem.usedAmount}">
 <input type="hidden" id="allNotePrice" value="${contractEntity.contractLoanResultItem.allNotePrice==null?0:contractEntity.contractLoanResultItem.allNotePrice}">
 <input type="hidden" id="allNoteDisPrice" value="${contractEntity.contractLoanResultItem.allNoteDisPrice==null?0:contractEntity.contractLoanResultItem.allNoteDisPrice}">
 <input type="hidden" id="lostAmount" value="${contractEntity.contractLoanResultItem.lostAmount==null?0:contractEntity.contractLoanResultItem.lostAmount}">
 <input type="hidden" id="rebackPrice" value="${contractEntity.contractLoanResultItem.rebackPrice==null?0:contractEntity.contractLoanResultItem.rebackPrice}">
			<div class="row-fluid" id="showContractDiv">
				<div class="widget-box" style="border-bottom: 0px;">
					<div class="widget-header" style="background-color: #438eb9;">
						<span class="widget-title"><i class="icon-list"></i>合同信息 </span> <span
							class="widget-toolbar"><a href="#" data-action="collapse"><i
								class="icon-chevron-up"></i> </a> </span>
					</div>
					<div class="widget-body">
						<div class="widget-grid">
							<div class="grid-toolbar">
								<div class="form-horizontal" id="sxresultInfo"
									style="margin-top: 0px;margin-bottom: 0px;font-size: 12px">
									<div class="row-fluid">
										<div class="span4 control-group full ">
											<label class="control-label" for="">合同编号：</label>
											<div class="controls details">${contractEntity.fancingContractItem.contractNo}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span8 control-group full ">
											<label class="control-label" for="">卖方：</label>
											<div class="controls details">${contractEntity.fancingContractItem.memberName}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">法定代表人：</label>
											<div class="controls details">${contractEntity.fancingContractItem.legaiMen}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span8 control-group full ">
											<label class="control-label" for="">住所地：</label>
											<div class="controls details">${contractEntity.fancingContractItem.address}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full ">
											<label class="control-label" for="">合同金额：</label>
											<div class="controls details">
												<fmt:formatNumber type="currency" pattern="#,#00.00 元"
													value="${contractEntity.fancingContractItem.contractAmount}" />
											</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">授信开始日期：</label>
											<div class="controls details">${contractEntity.fancingContractItem.creditFrom}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">授信结束日期：</label>
											<div class="controls details">${contractEntity.fancingContractItem.creditTo
												}</div>
										</div>

									</div>
									<div class="row-fluid">

										<div class="span4 control-group full">
											<label class="control-label" for="">账期利率：</label>
											<div class="controls details">${contractEntity.fancingContractItem.rate}%</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">计息周期：</label>
											<div class="controls details">
												<c:if
													test="${contractEntity.fancingContractItem.interest=='0'}">天</c:if>
												<c:if
													test="${contractEntity.fancingContractItem.interest=='1'}">月</c:if>
												<c:if
													test="${contractEntity.fancingContractItem.interest=='2'}">季</c:if>
											</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">付息日为：</label>
											<div class="controls details">每<c:if test="${contractEntity.fancingContractItem.interestDate=='1'}">月</c:if><c:if test="${contractEntity.fancingContractItem.interestDate=='2'}">季</c:if>的20日
											</div>
										</div>

									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">宽限天数：</label>
											<div class="controls details">${contractEntity.fancingContractItem.delayDate}天</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">逾期倍数：</label>
											<div class="controls details">${contractEntity.fancingContractItem.delayMulpitle}倍</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">复利周期：</label>
											<div class="controls details">
												<c:if
													test="${contractEntity.fancingContractItem.compoundType=='1'}">月</c:if>
												<c:if
													test="${contractEntity.fancingContractItem.compoundType=='2'}">季末月</c:if>
											</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">收取手续费：</label>
											<div class="controls details">${contractEntity.fancingContractItem.serviceTypeCn}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">手续费占比：</label>
											<div class="controls details">${contractEntity.fancingContractItem.serviceRate}%</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">票据折扣率：</label>
											<div class="controls details">
												${contractEntity.fancingContractItem.billRate}%
												 <input
													type="hidden" id="billRateVal"
													value="${contractEntity.fancingContractItem.billRate }">
											</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">收取保证金：</label>
											<div class="controls details">
												${contractEntity.fancingContractItem.bondTypeCn}</div>
										</div>
										<c:if test="${contractEntity.fancingContractItem.bondTypeCn=='是'}">
											<div class="span4 control-group full">
												<label class="control-label" for="">保证金占比：</label>
												<div class="controls details">${contractEntity.fancingContractItem.bondRate}%</div>
											</div>
										</c:if>

									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">监管账号开户行：</label>
											<div class="controls details">${contractEntity.fancingContractItem.supervisonBank}</div>
										</div>

										<div class="span4 control-group full">
											<label class="control-label" for="">监管账号开户人：</label>
											<div class="controls details">${contractEntity.fancingContractItem.supervisonName}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">监管账号：</label>
											<div class="controls details">${contractEntity.fancingContractItem.supervisonNo}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">结算账号开户行：</label>
											<div class="controls details">${contractEntity.fancingContractItem.payAccountBank}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">结算账号开户人：</label>
											<div class="controls details">${contractEntity.fancingContractItem.payAccountName}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">结算账号：</label>
											<div class="controls details">
												${contractEntity.fancingContractItem.payAccountNo}</div>
										</div>
									</div>
									<div class="row-fluid">
										<div class="span4 control-group full">
											<label class="control-label" for="">保证金开户行：</label>
											<div class="controls details">${contractEntity.fancingContractItem.bondAccountBank}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">保证金账号开户人：</label>
											<div class="controls details">${contractEntity.fancingContractItem.bondAccountName}</div>
										</div>
										<div class="span4 control-group full">
											<label class="control-label" for="">保证金账号：</label>
											<div class="controls details">
												${contractEntity.fancingContractItem.bondAccountNo}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		
	<div class="row-fluid" style="margin-top: -10px;">
		<jsp:include page="contractbuyerRelList.jsp"></jsp:include>
	</div>
<div class="widget-box" style="border-bottom:none;">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>合同附加材料</span> <span
								class="widget-toolbar"><a href="#" data-action="collapse"><i
									class="icon-chevron-up"></i> </a> </span>
						</div>
						<div class="widget-body">
							<table class="table table-bordered" id="materialid">
								<tr>
									<td style="text-align: center; font-size: 13px"><span
										style="font-weight:bold;">材料名称</span></td>
									<td style="text-align: center;font-size: 13px "><span
										style="font-weight:bold;">文件名</span></td>
								</tr>
								<c:forEach items="${contractEntity.contractMaterialList}"
									var="item">
									<tr>
										 <td style="text-align: left; width: 250px;font-size: 12px"><c:if test="${item.isRequired==1}"><span style="color: red;">*</span></c:if>${item.typeName}</td>
										<td style="text-align: center; font-size:13px; width:auto">
											<c:if test="${not empty item.fileName}">
																		<c:set var="fileNameArray" value="${fn:split(item.fileName, ',')}"></c:set>
																		<c:set var="fileUrlArray" value="${fn:split(item.fileUrl, ',')}"></c:set>
																		<c:set var="fileflagArray" value="${fn:split(item.fileFalg, ',')}"></c:set>
																		<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
																			<span>
																				<a target="_blank" id="href_${item.id}" name="urlname_${item.id}"
																				onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
																		    </span> 
																	    </c:forEach> 
																    </c:if> </td>
									</tr>
								</c:forEach>
							</table>
						</div>
						</div>
						
						<div class="row-fluid " style="margin-top: 20px;margin-bottom:20px; text-align: center;">
							<div class="span12 control-group full" >
									<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancle('contractDetailPop')"><i class=""></i>关闭</a>
								</div>
							</div>