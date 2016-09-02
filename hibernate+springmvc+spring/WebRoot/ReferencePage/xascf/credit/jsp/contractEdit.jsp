<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>


<script type="text/javascript" src="xascf/credit/js/contractEdit.js"></script>  
<style>
.details {
	margin-top: 3px;
	color: blue;
}

 #sxresultInfo .longLable{
 width: 100px;margin-left: -25px;
 }
 .materialInfoTr td {
	font-size: 12px;
	padding: 5px;
	vertical-align: middle;
}
.file {
	position: absolute;
	right: 80px;
	height: 24px;
	filter: alpha(opacity : 0);
	opacity: 0;
	width: 260px;
	left: 10px;
}

.lblTitle {
	border-bottom: 1px dashed #999;
	line-height: 35px;
	margin-bottom: 15px;
}

.lblTitle span {
	font-size: 14px;
	font-weight: bold;
	margin-left: 15px;
}

.tdTittl {
	background-attachment: scroll;
	background-color: #f3f3f3;
	background-image: linear-gradient(to bottom, #f8f8f8, #ececec);
	background-position: 0 0;
	background-repeat: repeat-x;
	font-size: 13px;
	font-weight: bold;
	text-align: center;
}
.table th,.table td {
	padding: 3px;
}
#showDiv{
font-size: 12px;
}
a {
cursor: pointer;
}
a:hover, a:focus {
color: #005580;
text-decoration: none;
}
#setDiv .span8{
margin-left: 28px;
}
</style>
<%
//产品类型
	pageContext.setAttribute("FANCING_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_TYPE"));
	//保理类别
	pageContext.setAttribute("FANCING_FUNCTION", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_FUNCTION"));
	//保理方式
	pageContext.setAttribute("FANCING_KINDS", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_KINDS"));
	//担保方式
	pageContext.setAttribute("GURANTEE_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("GURANTEE_TYPE"));
	%>
<div id="setDiv">
	<div class="row-fluid">
		<div class="widget-box">
			<div class="widget-header" style="background-color: #438eb9;">
				<span class="widget-title"><i class="icon-list"></i>授信批复信息
				</span> <span class="widget-toolbar"><a href="#"
					data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
			</div>
			<div class="widget-body">
				<div class="widget-grid">
					<div class="grid-toolbar">
					<div class="form-horizontal fromPre" id="sxresultInfo" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;padding-left: 35px;">
					<input name="" type="hidden" value="${resultItem.creditNo }" id="creditNo">
					<input name="" type="hidden" value="${resultItem.memberNo }" id="memberNo">
						<div class="row-fluid shotRow">
							<div class="span3 control-group full">
								<label class="control-label" for="">批复编号：</label>
								<div class="controls xwin" id="resultNoDiv">
									<input type="text" 
										id="creditResultNo" placeholder="请选择"
										onchange="ContractEdit.creditNoChange();"
										data-xwin-params="creditResultPop"
										value="${resultItem.creditResultNo }">
									<i></i>
								</div>
							</div>
							<div class="span8 control-group full" >
								<label class="control-label" for="">会员名称：</label>
								<div class="controls details">
									<a href="#" onclick="customerDetailPop.customerDetail('${resultItem.memberPid}')">
									${resultItem.memberName}</a>
								</div>
							</div>
						</div>
						<div class="row-fluid shotRow">
							<div class="span3 control-group full ">
								<label class="control-label longLable" for="">授信额度：</label>
								<input type="hidden" value="${resultItem.replyQuota}" id="replyQuota">
								<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${resultItem.replyQuota}"/></div>
							</div>
							<div class="span3 control-group full ">
								<label class="control-label" for="">产品类别：</label>
								<div class="controls details"><c:forEach items="${FANCING_TYPE}" var="item">
										<c:if test="${resultItem.financingType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">保理类别：</label>
								<div class="controls details"><c:forEach items="${FANCING_FUNCTION}" var="item">
										<c:if test="${resultItem.financingMethod ==item.code }">${item.nameCn}</c:if>
										</c:forEach></div>
							</div>
						</div>
						<div class="row-fluid shotRow">
							<div class="span3 control-group full">
								<label class="control-label" for="">保理方式：</label>
								<div class="controls details"><c:forEach items="${FANCING_KINDS}" var="item">
										<c:if test="${resultItem.financingNature ==item.code }">${item.nameCn}</c:if>
										</c:forEach></div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">担保方式：</label>
								<div class="controls details"><c:forEach items="${GURANTEE_TYPE}" var="item">
										<c:if test="${resultItem.guaranteeType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></div>
							</div>
						</div>
						<!-- 
						<div class="row-fluid shotRow">
							<div class="span3 control-group full">
								<label class="control-label" for="">开始日期：</label>
								<div class="controls details">${resultItem.creditStartTime}</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">结束日期：</label>
								<div class="controls details">${resultItem.creditEndTime}</div>
							</div>
						</div> -->
						<div class="row-fluid shotRow">
							<div class="span3 control-group full">
									<label class="control-label" for="">账期利率：</label>
									<div class="controls details">
											${resultItem.termRate}%
									</div>
							</div>
								<div class="span3 control-group full">
									<label class="control-label" for="">逾期倍数：</label>
									<div class="controls details">
											${resultItem.overdueRate}倍
									</div>
								</div>
							<div class="span3 control-group full">
									<label class="control-label longLable" for="">手续费收取方式：</label>
									<div class="controls details"><c:if test="${resultItem.serveMethod=='TIMES'}">按次</c:if>
								<c:if test="${resultItem.serveMethod=='YEAR'}">按年</c:if></div>
							</div>
							<div class="span3 control-group full">
									<label class="control-label longLable" for="">手续费比例：</label>
									<div class="controls details">
										${resultItem.serveRate}%
									</div>
								</div>
								
						</div>
						<div class="row-fluid shotRow">
						<div class="span3 control-group full">
									<label class="control-label" for="">保证金收取：</label>
									<div class="controls details"><c:if test="${resultItem.isBond=='Y'}">是</c:if>
										<c:if test="${resultItem.isBond=='N'}">否</c:if></div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label longLable" for="">保证金占比：</label>
									<div class="controls details">
										${resultItem.bondRate}%
									</div>
								</div>
							<div class="span3 control-group full">
								<label class="control-label longLable" for="">保证金额度：</label>
								<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${resultItem.bondPrice}"/></div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label longLable" for="">敞口额度：</label>
								<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${resultItem.openPrice}"/></div>
							</div>
							
						</div>
						<div class="row-fluid shotRow">
							<div class="span11 control-group full">
								<label class="control-label longLable" for="">其他授信要求：</label>
								<div class="controls details" style="word-wrap: break-word;"><c:if test="${resultItem.creditRemark==null}">无</c:if>
								<c:if test="${resultItem.creditRemark!=null}">${resultItem.creditRemark}</c:if>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div></div>
	<form class="form-horizontal fromPre" id="contractForm">
	<div class="widget-body">
		<div class="widget-box" >
			<div class="widget-header" >
					<span class="widget-title"><i class="icon-list"></i><span
									style="color: red;">*</span>合同信息
					</span> <span class="widget-toolbar"><a href="#"
						data-action="collapse"><i class="icon-chevron-up"></i> </a> </span>
			</div>
				<div class="widget-form" style="padding-left: 40px">
					
						<div class="row-fluid" style="margin-top: 10px;">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>合同编号
								</label>
								<div class="controls txt">
									<input type="hidden" value="${buyPids}" id="buyPids">
									<input type="hidden" value="${contractBuyPids}" id="contractBuyPids">
									<input  type="hidden" name="fancingContractEntity.editType" value="${rebackType }" id="rebackType">
									<input type="hidden" id="fancingContractModelPid"  name="fancingContractEntity.fancingContractModel.pid" value="${contractItem==null?contractItemPid:contractItem.pid }">
									<input type="hidden" value="${resultItem.replyQuota}" name="fancingContractEntity.fancingContractModel.creditPrice">
									<input type="hidden" value="${resultItem.creditResultNo}" name="fancingContractEntity.fancingContractModel.creditResultNo">
									<input type="hidden" value="${resultItem.creditNo}" name="fancingContractEntity.fancingContractModel.creditNo">
									<input type="text" 
										id="contractNo"  placeholder="请输入"
										data-required="合同编号不能为空！"
										value="${contractItem.contractNo}"
										name="fancingContractEntity.fancingContractModel.contractNo">
								</div>
							</div>
						</div>
						<div class="row-fluid" style="margin-top: 5px;font-weight: bold;font-size: 12px;">
						签订方信息：
						</div>
						<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full ">
									<input type="hidden" id="memberPid" name="fancingContractEntity.fancingContractModel.memberPid" value="${customerSubItem.customersubPid}">
									<label class="control-label" for=""><span
										style="color: red;">*</span>卖方
									</label>
									<div class="controls txt">
										<input type="text"
											id="memberName" readonly="readonly"
											name="fancingContractEntity.fancingContractModel.memberName"
											data-required="卖方不能为空！"
											value="${contractItem==null?customerSubItem.customerName:contractItem.memberName}">
									</div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>法定代表人</label>
									<div class="controls txt">
										<input type="text"
											id="legaiMen"
											name="fancingContractEntity.fancingContractModel.legaiMen"
											data-required="法定代表人不能为空！"  placeholder="请输入"
											value="${contractItem==null?customerSubItem.corporate:contractItem.legaiMen}"
											>
									</div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label" for="">住所地</label>
									<div class="controls txt">
										<input type="text"
											id="addressCn" placeholder="请输入"
											name="fancingContractEntity.fancingContractModel.address"
											value="${contractItem==null?customerSubItem.addressCn:contractItem.address}">
									</div>
								</div>
						</div>
					
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							选择委托方：
						</div>
						<div class="row-fluid " style="margin-top: -10px;">
							<div class="widget-box">
								<div class="widget-body">
									<div class="widget-grid">
										<table id="buyer_mmg" class="mmg">
											<tr>
												<th rowspan="" colspan=""></th>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							合同项下授信信息：
						</div>
						<div class="row-fluid" id="editDiv">
							<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>额度</label>
								<div class="controls txt">
									<input id="contractAmountHidden" type="hidden">
									<input type="text"
										data-number="只能输入数字"  placeholder="请输入数字"
										onblur="ContractEdit.checkAmount();"
										id="contractAmount"
										name="fancingContractEntity.fancingContractModel.contractAmount"
										value="${contractItem==null?resultItem.replyQuota:contractItem.contractAmount}"
										data-required="合同金额不能为空！"><i></i>	
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>开始日期</label>
								<div class="controls time">
									<input type="text"
										id="creditFrom"
										data-required="合同开始日期不能为空！" placeholder="请选择"
										name="fancingContractEntity.fancingContractModel.creditFrom"
										value="${contractItem==null?resultItem.creditStartTime:contractItem.creditFrom}"
										>
									<i class="date" data-format="yyyy-MM-dd"
										></i>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>结束日期</label>
								<div class="controls time">
									<input type="text"
										id="creditTo"
										data-required="合同结束日期不能为空！" placeholder="请选择"
										name="fancingContractEntity.fancingContractModel.creditTo"
										value="${contractItem==null?resultItem.creditEndTime:contractItem.creditTo}"
										>
									<i class="date" data-format="yyyy-MM-dd"
														></i>
								</div>	
							</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>账期利率(%)</label>
								<div class="controls txt">
									<input type="text"
										id="rate"  placeholder="请输入数字"  data-number="只能输入数字"
										name="fancingContractEntity.fancingContractModel.rate"
										value="${contractItem==null?resultItem.termRate:contractItem.rate}"
										data-required="账期利率不能为空！"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>计息周期</label>
								<div class="controls txt">
									<slt:select cssClass="chzn-select" 
										name="fancingContractEntity.fancingContractModel.interest" 
										value="${contractItem==null?'0':contractItem.interest}"
										optionsType="RATE_TYPE">
										<slt:outHTML>id="interest"</slt:outHTML>
										<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
										<slt:outHTML>data-required="计息周期不能为空！"</slt:outHTML>
									</slt:select>	
								</div>
							</div>
							<div class="span3 control-group full" >
									<label class="control-label" for=""><span
										style="color: red;">*</span>付息日每</label>
									<div class="controls txt">
									<div style="float: left;width: 65%">
											<slt:select cssClass="chzn-select" 
										name="fancingContractEntity.fancingContractModel.interestDate" 
										value="${contractItem==null?'1':contractItem.interestDate}"
										optionsType="COMPOUND_TYPE">
										<slt:outHTML>id="interestDate"</slt:outHTML>
										<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
										<slt:outHTML>data-required="付息日不能为空！"</slt:outHTML>
									</slt:select>
									</div>
									<div>的20日</div>		
									</div>
								</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>宽限天数</label>
								<div class="controls txt">
								<div style="float: left;width: 72%">
									<input type="text"
										id="delayDate"
										data-number="只能输入数字"  placeholder="请输入数字"  
										value="${contractItem.delayDate==null?30:contractItem.delayDate}"
										name="fancingContractEntity.fancingContractModel.delayDate"
										data-required="宽限天数不能为空！"></div>
									<div style="font-size: 12px;">&nbsp;天</div>	
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="" ><span
									style="color: red;">*</span>逾期倍数</label>
								<div class="controls txt">
									<input type="text"
										id="delayMulpitle"
										data-number="只能输入数字" placeholder="请输入数字"  
										name="fancingContractEntity.fancingContractModel.delayMulpitle"
										value="${contractItem==null?resultItem.overdueRate:contractItem.delayMulpitle}"
										data-required="逾期倍数不能为空！"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>复利周期</label>
								<div class="controls txt">
									<slt:select cssClass="chzn-select" value="${contractItem.compoundType}"
										name="fancingContractEntity.fancingContractModel.compoundType" 
										optionsType="COMPOUND_TYPE">
										<slt:outHTML>id="compoundType"</slt:outHTML>
										<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
										<slt:outHTML>data-required="复利计收方式不能为空！"</slt:outHTML>
									</slt:select>		
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full" >
									<label class="control-label longLable" for=""><span
										style="color: red;">*</span>收取手续费</label>
									<div class="controls txt">
											<slt:select cssClass="chzn-select" 
											value="${contractItem==null?resultItem.serveMethod:contractItem.serviceType}"
										name="fancingContractEntity.fancingContractModel.serviceType"
										optionsType="SERVE_METHOD">
										<slt:outHTML>id="serviceType"</slt:outHTML>
									</slt:select>
									</div>
								</div>
							<div class="span3 control-group full" >
								<label class="control-label" for="" style="width: 100px;margin-left: -20px"><span
									style="color: red;">*</span>手续费占比(%)</label>
								<div class="controls txt">
									<input type="text"
										id="serveRate"
										data-number="只能输入数字" placeholder="请输入数字"  
										name="fancingContractEntity.fancingContractModel.serviceRate"
										value="${contractItem==null?resultItem.serveRate:contractItem.serviceRate}"
										data-required="手续费占比不能为空！"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
									<label class="control-label" for="" style="width: 100px;margin-left: -20px"><span
										style="color: red;">*</span>票据折扣率(%)</label>
									<div class="controls txt">
										<input type="text"
											 value="${contractItem.billRate==null?70:contractItem.billRate}"
											data-number="只能输入数字" placeholder="请输入数字"  id="billRate"
											name="fancingContractEntity.fancingContractModel.billRate"
											data-required="票据折扣率不能为空！"
											>
									</div>
							</div>
						</div>
						<div class="row-fluid">
								<div class="span3 control-group full" >
									<label class="control-label" for=""><span
										style="color: red;">*</span>收取保证金</label>
									<div class="controls txt">
											<slt:select cssClass="chzn-select" 
										name="fancingContractEntity.fancingContractModel.bondType"
										value="${contractItem==null?resultItem.serveRate:contractItem.bondType}"
										optionsType="IS_BOND">
										<slt:outHTML>id="isBond"</slt:outHTML>
										<slt:outHTML>onchange="ContractEdit.changeCheck();"</slt:outHTML>
									</slt:select>
									</div>
								</div>
								<div class="span3 control-group full" id="bondDiv">
									<label class="control-label" for="" style="width: 100px;margin-left: -20px"><span
										style="color: red;">*</span>保证金占比(%)</label>
									<div class="controls txt">
										<input type="text"
											id="bondRate"
											data-number="只能输入数字" placeholder="请输入数字"  
											name="fancingContractEntity.fancingContractModel.bondRate"
											value="${contractItem==null?resultItem.bondRate:contractItem.bondRate}"
											data-required="保证金占比不能为空！"
											>
									</div>
								</div>
							</div>
						</div>
						<div class="row-fluid" id="showDiv" style="display: none;">
							<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full" >
								<label class="control-label" for="">额度：</label>
								<div class="controls details">
									<fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${contractItem.contractAmount}"/>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">开始日期：</label>
								<div class="controls details">
										${contractItem.creditFrom}
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">结束日期：</label>
								<div class="controls details">
										${contractItem.creditTo}
								</div>	
							</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full" >
								<label class="control-label" for="">账期利率：</label>
								<div class="controls details">
										${contractItem.rate}%
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for="">计息周期：</label>
								<div class="controls details">
										<c:if
													test="${contractItem.interest=='0'}">天</c:if>
												<c:if
													test="${contractItem.interest=='1'}">月</c:if>
												<c:if
													test="${contractItem.interest=='2'}">季</c:if>
								</div>
							</div>
							<div class="span3 control-group full" >
									<label class="control-label" for="">付息日每：</label>
									<div class="controls details"><c:if test="${contractItem.interestDate=='1'}">月</c:if><c:if test="${contractItem.interestDate=='2'}">季</c:if>的20日	
									</div>
								</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label" for="">宽限天数：</label>
								<div class="controls details">
										${contractItem.delayDate==null?30:contractItem.delayDate}天	
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="" >逾期倍数：</label>
								<div class="controls details">
										${contractItem==null?resultItem.overdueRate:contractItem.delayMulpitle}倍
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for="">复利周期：</label>
								<div class="controls details">
									 <c:if
													test="${contractItem.compoundType=='1'}">月</c:if>
												<c:if
													test="${contractItem.compoundType=='2'}">季末月</c:if>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="span3 control-group full" >
									<label class="control-label longLable" for="">收取手续费：</label>
									<div class="controls details">
									<c:if test="${contractItem.serviceType=='TIMES'}">按次</c:if>
								<c:if test="${contractItem.serviceType=='YEAR'}">按年</c:if>
									</div>
								</div>
							<div class="span3 control-group full" >
								<label class="control-label" for="" style="width: 100px;margin-left: -25px">手续费占比：</label>
								<div class="controls details">
										${contractItem==null?resultItem.serveRate:contractItem.serviceRate}%
								</div>
							</div>
							<div class="span3 control-group full" >
									<label class="control-label" for="" style="width: 100px;margin-left: -25px">票据折扣率：</label>
									<div class="controls details">
											 ${contractItem.billRate==null?70:contractItem.billRate}%
									</div>
							</div>
						</div>
						<div class="row-fluid">
								<div class="span3 control-group full" >
									<label class="control-label" for="">收取保证金：</label>
									<div class="controls details">
									<c:if test="${contractItem.bondType=='Y'}">是</c:if>
										<c:if test="${contractItem.bondType=='N'}">否</c:if>
									</div>
								</div>
								<div class="span3 control-group full" >
									<label class="control-label" for="" style="width: 100px;margin-left: -25px">保证金占比：</label>
									<div class="controls details">
											${contractItem==null?resultItem.bondRate:contractItem.bondRate}%
									</div>
								</div>
							</div>
						</div>
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							监管账户：
						</div>
						<input type="hidden" name="fancingContractEntity.fancingContractModel.supervisonPid" value="${custmoerBankItemJianguan.companybankPid}"/>
						<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>开户行</label>
								<div class="controls txt">
									<input type="text"
										id="supervisonBank" 
										name="fancingContractEntity.fancingContractModel.supervisonBank"
										data-required="开户行不能为空！"  placeholder="请输入"  
										value="${contractItem==null?custmoerBankItemJianguan.bankName:contractItem.supervisonBank}"
										>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>账户名称</label>
								<div class="controls txt">
									<input type="text"
										id="supervisonName" placeholder="请输入"  
										name="fancingContractEntity.fancingContractModel.supervisonName"
										value="${contractItem==null?custmoerBankItemJianguan.bankholder:contractItem.supervisonName}"
										data-required="账户名称不能为空！">
								</div>
							</div>
							<div class="span3 control-group full" id="financingNatureDiv">
								<label class="control-label" for=""><span
									style="color: red;">*</span>账号</label>
								<div class="controls txt">
									<input type="text"
										id="supervisonNo" placeholder="请输入"  
										name="fancingContractEntity.fancingContractModel.supervisonNo"
										value="${contractItem==null?custmoerBankItemJianguan.bankNo:contractItem.supervisonNo}"
										data-required="账号不能为空！"
										>
								</div>
							</div>
							
						</div>
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							结算账户：
						</div>
						<input type="hidden" name="fancingContractEntity.fancingContractModel.payAccountPid" value="${custmoerBankItemJiesuan.companybankPid}"/>
						<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>开户行</label>
								<div class="controls txt">
									<input type="text"
										id="payAccountBank" placeholder="请输入"  
										name="fancingContractEntity.fancingContractModel.payAccountBank"
										data-required="开户行不能为空！"
										value="${contractItem==null?custmoerBankItemJiesuan.bankName:contractItem.payAccountBank}"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>账户名称</label>
								<div class="controls txt">
									<input type="text"
										id="payAccountName" placeholder="请输入"  
										name="fancingContractEntity.fancingContractModel.payAccountName"
										value="${contractItem==null?custmoerBankItemJiesuan.bankholder:contractItem.payAccountName}"
										data-required="账户名称不能为空！"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>账号</label>
								<div class="controls txt">
									<input type="text"
										id="payAccountNo" placeholder="请输入"  
										name="fancingContractEntity.fancingContractModel.payAccountNo"
										value="${contractItem==null?custmoerBankItemJiesuan.bankNo:contractItem.payAccountNo}"
										data-required="账号不能为空！"
										>
								</div>
							</div>
						</div>
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							保证金账户：
						</div>
						<div class="row-fluid" style="margin-top: 5px;">
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>开户行</label>
								<div class="controls xwin">
									<input type="text"
										id="bondAccountBank" placeholder="请选择"  
										name="fancingContractEntity.fancingContractModel.bondAccountBank"
										value="${contractItem.bondAccountBank}"
										data-xwin-params="fundAccountPop"
										data-required="开户行不能为空！"
										><i></i>
								</div>
							</div>
							<div class="span3 control-group full" >
								<label class="control-label" for=""><span
									style="color: red;">*</span>账户名称</label>
								<div class="controls txt">
									<input type="text"
										id="bondAccountName" readonly="readonly"
										name="fancingContractEntity.fancingContractModel.bondAccountName"
										value="${contractItem.bondAccountName}"
										data-required="账户名称不能为空！"
										>
								</div>
							</div>
							<div class="span3 control-group full" >
									<label class="control-label" for=""><span
										style="color: red;">*</span>账号</label>
									<div class="controls ">
										<input type="text" readonly="readonly" id="bankNo"
											name="fancingContractEntity.fancingContractModel.bondAccountNo"
											value="${contractItem.bondAccountNo}"
											>	
									</div>
							</div>
						</div>
						<div class="row-fluid" style=" margin-top: 5px;font-weight: bold;font-size: 12px;">
							其他补充：
						</div>
						<div class="row-fluid" style="margin-top: 5px;">
							<div class="span9 control-group full" >
								<label class="control-label" for="">补充内容</label>
								<div class="controls txt">
									<textarea rows="300"  name="fancingContractEntity.fancingContractModel.otherContent" 
							 		cols="500" style="width: 100%;height: 100px;resize:none;">${contractItem.otherContent}</textarea>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
		
		<!-- 基本企业文件记录 -->
	<div class="widget-box"> 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i><span style="color: red;">*</span>合同附加材料</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body">  
			<div class="widget-grid">
	   		<div class="widget-main padding-6" style="margin-left: 0px;"> 
					<div class="row-fluid">   
						<table class="table table-bordered" id="material">  
							<tr>
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">材料名称</span></td>   
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">操作</span></td>   
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">文件名</span></td>   
							</tr> 
							<c:forEach items="${materailList}" var="item" >  
								<tr class="materialInfoTr">   	 
										<td style="text-align: left; width: 250px;" id="typeName_${item.id}">
											<c:if test="${item.isRequired==1}"><span style="color: red;">*</span></c:if>${item.typeName} 
										</td>
										<td style="text-align: center; width:90px;" >     
											<input type='button'  value='上传' id="Upload_${item.id}" class='btn' 
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;font-size:12px;"
											onclick="javascript:ContractEdit.uploadFile('hetongfujiacailiao','${item.id}')"/>   
										</td>  
										<td style="text-align: center;width:auto;">
											<div style="text-align:center;" id="fileDiv_${item.id}">
												<c:if test="${not empty item.fileName}">
													<c:set var="fileNameArray" value="${fn:split(item.fileName, ',')}"></c:set>
													<c:set var="fileUrlArray" value="${fn:split(item.fileUrl, ',')}"></c:set>
													<c:set var="fileflagArray" value="${fn:split(item.fileFalg, ',')}"></c:set>
													<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
														<span>
															<a target="_blank" id="href_${item.id}" name="urlname_${item.id}"
															onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
														    <a style="cursor:pointer" title="删除" id="remove_${item.id}" 
														    	class="buttonRomve" onclick="ContractEdit.removeMaterial(${item.id},this,${fileflagArray[status.index]})">&nbsp;&nbsp;</a> 
													    </span> 
												    </c:forEach> 
											    </c:if>
											</div> 
											<div style="width: 90px; float:left;">       
												<input type="hidden" value="${item.pid}" id="materialDefinePid_${item.id}" name="materialPid">   
												<input type="hidden" value="${item.fileName}" id="filename_${item.id}" name="filename"> 
												<input type="hidden" value="${item.fileFalg}" id="flag_${item.id}" name="fileFalg">  
											</div>
										</td>
									</tr>   
							</c:forEach>
						</table>  
					</div>	 
			</div>
		</div>
		</div>
	</div>
		
		
		
		
		<div class="row-fluid "
						style="margin-top: 20px;margin-bottom: 30px;text-align: center;">
						<a class="btn btn-primary" href="javascript:void(0)" id="saveBtn"
							onclick="ContractEdit.save('1');"><i class=""></i>保存</a> 
						<a class="btn btn-primary" href="javascript:void(0)"
							onclick="ContractEdit.save('2');"><i class=""></i>提交</a> 
							<a class="btn btn-primary" href="javascript:void(0)" onclick="ContractEdit.rebackList()"><i class=""></i>返回列表</a>
					</div>
	</form>

