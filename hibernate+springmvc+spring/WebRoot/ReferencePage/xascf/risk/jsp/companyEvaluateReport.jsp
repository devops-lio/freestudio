<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link rel="stylesheet" type="text/css" href="xascf/risk/style/evaluateReport.css?v=22661">
<script type="text/javascript" src="xascf/risk/js/companyEvaluateReport.js"></script>
<script type="text/javascript" src="xascf/credit/js/fileUtil.js"></script>
<div class="widget-box">
<input type="hidden" id="requestType" >
	<div id="divReportContent" class="widget-body">
		<c:choose>
			<c:when test="${evaluateReportModel.reportContent!=null}">
				${evaluateReportModel.reportContent}
			</c:when>
			<c:otherwise>
				<div class="widget-form" id="evaluateReportDiv">
					<form id="evaluateReportForm" class="form-horizontal">
						<input id="saveType" type="hidden" value="add">
						<input name="evaluateReportModel.reportPid" type="hidden" value="${reportPid}">
						<input name="evaluateReportModel.reportObjectPid" type="hidden" id="reportObjectPid" value="${customerSubModel.customersubPid}">
						<input name="evaluateReportModel.operator" type="hidden" value="${userName}">
						<input name="evaluateReportModel.reportTime" type="hidden" value="${dateStr}">
						<input name="evaluateReportModel.reportObjectName" type="hidden" value="${customerSubModel.customerName}">
						<input name="evaluateReportModel.reportTitle" type="hidden" value="${dateStr}_${customerSubModel.customerName}_融资调查报告">
						<table id="report">
							<tr>
								<td colspan="6" class="reportTitle">
									申请人融资调查报告
								</td>
							</tr>
							<tr>
								<td class="w100" style="padding-left: 10px;">
									客户名称：
								</td>
								<td class="w280">
									<span style="display: block; margin-left: -30px;">${customerSubModel.customerName}</span>
								</td>
								<td class="tdleft">
									经办人：
								</td>
								<td class="tdright">
									${userName}
								</td>
								<td class="tdleft">
									日期：
								</td>
								<td>
									${dateStr}
								</td>
							</tr>
						</table>
		
						<table id="reportInfo" class="reportTable" cellpadding="0"
							cellspacing="0">
							<tr>
								<td colspan="10" class="header">
									借款申请人基本信息
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									成立日期
								</td>
								<td class="tdContent">
									${customerSubModel.registeredTime}
								</td>
								<td class="tdTitle">
									注册资本
								</td>
								<td class="tdContent">
									${customerSubModel.registeredFund}(万元)
								</td>
								<td class="tdTitle">
									实缴资本
								</td>
								<td class="tdContent">
									${customerSubModel.scribedMoney}(万元)
								</td>
								<td class="tdTitle">
									所属区域
								</td>
								<td class="tdContent">
									<input type="text" />
								</td>
								<td class="tdTitle">
									运输类型
								</td>
								<td class="tdContent">
									<div class="select">
										<slt:select cssClass="chzn-select" optionsType="TRANSPORT_TYPE">
											<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
										</slt:select>
									</div>
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									注册地址
								</td>
								<td colspan="9" class="paddingLeft">
									${customerSubModel.registeredAddress}
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									办公地址
								</td>
								<td colspan="9" class="paddingLeft">
									${customerSubModel.officeAddress}
								</td>
							</tr>
							<tr>
								<td rowspan="2" class="tdTitle">
									企业沿革
								</td>
								<td style="text-align: center">
									概要
								</td>
								<td colspan="8" >
								<div style="min-height:80px">
									<textarea class="textarea5"></textarea>
								</div>
								</td>
							</tr>
							<tr>
								<td colspan="9">
									<div class="attachment"
										style="width: 100%; height: 40px; padding-left:5px; display: block;">
										<input type='button' value='上传' class='btn'
											style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
											onclick="CompanyEvaluateReport.uploadFile('evolution','1',this)" />
									</div>
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									公司概况及
									<br />
									商业模式
								</td>
								<td colspan="9" style="min-height:80px">
									<textarea class="textarea5"></textarea>
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									实际控制人
									<br />
									情况描述
								</td>
								<td colspan="9" >
								<div style="min-height:80px">
									<textarea class="textarea5"></textarea>
								</div>
								</td>
							</tr>
							<!--股东情况-->
							<tr>
								<td class="tdTitle">
									股东情况
								</td>
								<td colspan="9" class="borderNon" style="border-right: none">
									<table class="gudong" cellpadding="0" cellspacing="0">
										<tr class="firstLine">
											<td class="w35"></td>
											<td class="w180" style="line-height: 30px">
												名称
											</td>
											<td class="w180">
												股东类型
											</td>
											<td class="w180">
												出资金额
											</td>
											<td class="w180">
												占比
											</td>
											<td class="w250">
												股东背景
											</td>
										</tr>
										<tr>
											<td>
												1
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td style="padding-bottom: 3px;">
												<div style="min-height:50px">
													<textarea class="textarea3"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												2
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td style="padding-bottom: 3px">
												<div style="min-height:50px">
													<textarea class="textarea3"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												3
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td style="padding-bottom: 3px">
												<div style="min-height:50px">
													<textarea class="textarea3"></textarea>
												</div>
											</td>
										</tr>
										<tr id="holder">
											<td colspan="6" style="line-height: 30px;text-align:left">
												<a nums="4" href="javascript:void(0)"
													style="margin-left: 10px;"
													onclick="CompanyEvaluateReport.holderAddTemp($(this));">添加</a>
											</td>
										</tr>
										<tr>
											<td colspan="6" style="line-height: 30px; border-bottom: none">
												<table cellpadding="0" cellspacing="0"
													style="border: none; width: 100%">
													<tr>
														<td width="130px;" style="border-bottom: none;">
															股东关系描述
														</td>
														<td	style="padding: 5px 0px 5px 5px; border-bottom: none; border-right: none; text-align: left">
															<div style="min-height:80px">
																<textarea class="textarea5"></textarea>
															</div>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<!--对外投资-->
							<tr>
								<td class="tdTitle">
									对外投资
								</td>
								<td colspan="9" class="borderNon" style="border-right: none">
									<table class="duiwai" style="border: none" cellpadding="0"
										cellspacing="0">
										<tr class="firstLine">
											<td style="width: 35px"></td>
											<td class="w180">
												被投企业名称
											</td>
											<td class="w150">
												参与角色
											</td>
											<td class="w150">
												投资金额
											</td>
											<td class="w150">
												占比
											</td>
											<td class="w150">
												营业额
											</td>
											<td class="w150">
												主营业务
											</td>
											<td class="w150">
												业务相关性
											</td>
										</tr>
										<tr>
											<td>
												1
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												2
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												3
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr id="investment">
											<td colspan="8"
												style="line-height: 30px;text-align:left; border-bottom: none; border-right: none;">
												<a nums="4" href="javascript:void(0)"
													style="margin-left: 10px;"
													onclick="CompanyEvaluateReport.investmentAdd($(this));">添加</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<!--企业征信-->
							<tr>
								<td colspan="10" class="header">
									企业征信报告及实际控制人征信情况
								</td>
							</tr>
							<tr>
								<td class="tdTitle">
									企业征信
								</td>
								<td colspan="9" class="borderNon" style="border-right: none">
									<table id="companyCredit" cellpadding="0" cellspacing="0"
										style="width: 100%">
										<tr class="firstLine">
											<td rowspan="2" class="w100 noBg">
												概要情况
											</td>
											<td style="line-height: 30px;width:148px;" >
												借款总额
											</td>
											<td class="w150">
												逾期次数统计
											</td>
											<td>
												补充说明
											</td>
										</tr>
										<tr>
											<td>
												<input type="text" style="width:135px" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td style="min-height:30px;text-align:left;padding-left:5px;">
												<textarea class="textarea2" style="width:500px"></textarea>
											</td>
										</tr>
										<tr>
											<td style="border-bottom: none">
												明细
											</td>
											<td colspan="3"
												style="padding: 0px; border-bottom: none; border-right: none;">
												<table id="detail" cellpadding="0" cellspacing="0"
													style="border-bottom: none; width: 100%">
													<tr class="firstLine">
														<td class="w35"></td>
														<td class="w100">
															借款金额
														</td>
														<td class="w150">
															借款期限
														</td>
														<td class="w100">
															借款银行
														</td>
														<td class="w100">
															担保方式
														</td>
														<td class="w100">
															状态
														</td>
														<td>
															补充说明
														</td>
													</tr>
													<tr>
														<td>
															1
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
														<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr>
														<td>
															2
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr>
														<td>
															3
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr id="guAddTr">
														<td colspan="7"
															style="line-height: 30px; text-align:left; border-bottom: none; border-right: none;">
															<a nums="4" href="javascript:void(0)"
																style="margin-left: 10px;"
																onclick="CompanyEvaluateReport.guAdd($(this));">添加</a>
														</td>
													</tr>
												</table>
		
											</td>
										</tr>
		
									</table>
		
								</td>
							</tr>
							<!--实际控制人征信情况-->
							<tr>
								<td class="tdTitle">
									实际控制人
									<br />
									征信情况
								</td>
								<td colspan="9" class="borderNon" style="border-right: none">
									<table id="companyRealCredit" cellpadding="0" cellspacing="0"
										style="width: 100%">
										<tr class="firstLine">
											<td rowspan="2" width="100px" class="noBg">
												概要情况
											</td>
											<td style="line-height: 30px;width:148px;" >
												借款总额
											</td>
											<td class="w150">
												逾期次数统计
											</td>
											<td>
												补充说明
											</td>
										</tr>
										<tr>
											<td>
												<input type="text" style="width:135px" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div style="min-height:30px;text-align:left;padding-left:5px;">
															<textarea class="textarea2" style="width:500px"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<td style="border-bottom: none">
												明细
											</td>
											<td colspan="3"
												style="padding: 0px; border-bottom: none; border-right: none;">
												<table id="detail" cellpadding="0" cellspacing="0"
													style="border-bottom: none; width: 100%">
													<tr class="firstLine">
														<td class="w35"></td>
														<td class="w100">
															借款金额
														</td>
														<td class="w150">
															借款期限
														</td>
														<td class="w100">
															借款银行
														</td>
														<td class="w100">
															担保方式
														</td>
														<td class="w100">
															状态
														</td>
														<td>
															补充说明
														</td>
													</tr>
													<tr>
														<td>
															1
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr>
														<td>
															2
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr>
														<td>
															3
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<input type="text" style="width:135px;"/>
														</td>
														<td>
															<input type="text" />
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="GUARANTEE_TYPE">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div class="select">
																<slt:select cssClass="chzn-select"
																	optionsType="LOAN_STATUS">
																	<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
																</slt:select>
															</div>
														</td>
														<td>
															<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
														</td>
													</tr>
													<tr id="loAddTr">
														<td colspan="7"
															style="line-height: 30px; text-align:left;border-bottom: none;">
															<a nums="4" href="javascript:void(0)"
																style="margin-left: 10px;"
																onclick="CompanyEvaluateReport.loAdd($(this));">添加</a>
														</td>
													</tr>
												</table>
		
											</td>
										</tr>
		
									</table>
		
								</td>
							</tr>
		
							<!--上下游关系-->
							<tr>
								<td colspan="10" class="header">
									上下游关系
								</td>
							</tr>
							<!--上游主要供应商-->
							<tr>
								<td class="tdTitle">
									上游主要
									<br />
									供应商
								</td>
								<td colspan="9">
									<table id="upSupplier" cellpadding="0" cellspacing="0"
										style="width: 100%; border-bottom: none">
										<tr class="firstLine">
											<td class="w35"></td>
											<td class="w150">
												企业名称
											</td>
											<td class="w150">
												主营业务
											</td>
											<td class="w150">
												业务占比
											</td>
											<td class="w150">
												结算方式
											</td>
											<td>
												其他说明
											</td>
											<td class="w150">
												合同
											</td>
										</tr>
										<tr>
											<td>
												1
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
		
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('upContract','1',this)" />
		
											</td>
										</tr>
										<tr>
											<td>
												2
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('upContract','2',this)" />
											</td>
										</tr>
										<tr>
											<td>
												3
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('upContract','2',this)" />
											</td>
										</tr>
										<tr id="upSupply">
											<td colspan="7"
												style="line-height: 30px; text-align:left;border-bottom: none; border-right: none;">
												<a nums="4" href="javascript:void(0)"
													style="margin-left: 10px;"
													onclick="CompanyEvaluateReport.supplyAdd($(this));">添加</a>
											</td>
										</tr>
									</table>
		
								</td>
							</tr>
							<!--下游主要采购商-->
							<tr>
								<td class="tdTitle">
									下游主要
									<br />
									采购商
								</td>
								<td colspan="9" class="borderNon"
									style="border-bottom: none; border-right: none">
									<table id="downBuy" cellpadding="0" cellspacing="0"
										style="width: 100%;">
										<tr class="firstLine">
											<td class="w35"></td>
											<td class="w150">
												企业名称
											</td>
											<td class="w150">
												主营业务
											</td>
											<td class="w150">
												业务占比
											</td>
											<td class="w150">
												结算方式
											</td>
											<td>
												其他说明
											</td>
											<td class="w150">
												合同
											</td>
										</tr>
										<tr>
											<td>
												1
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('downContract','1',this)" />
											</td>
										</tr>
										<tr>
											<td>
												2
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('downContract','2',this)" />
											</td>
										</tr>
										<tr>
											<td>
												3
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div class="select">
													<slt:select cssClass="chzn-select"
														optionsType="SETTLEMENT_WAY">
														<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
													</slt:select>
												</div>
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2"></textarea>
														</div>
											</td>
											<td>
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('downContract','3',this)" />
											</td>
										</tr>
										<tr id="downBuyer">
											<td colspan="7" style="line-height: 30px;text-align:left">
												<a nums="4" href="javascript:void(0)"
													style="margin-left: 10px;"
													onclick="CompanyEvaluateReport.buyyerAdd($(this));">添加</a>
											</td>
										</tr>
									</table>
		
								</td>
							</tr>
		
							<!--财务情况-->
							<tr>
								<td colspan="10" class="header">
									财务情况
								</td>
							</tr>
							<!--资产负债表主要财务指标-->
							<tr>
								<td class="tdTitle">
									资产负债表
									<br />
									主要财务指标
								</td>
								<td colspan="9" style="border-bottom: none; border-right: none"
									class="borderNon">
									<table cellpadding="0" cellspacing="0" id="fuzhai" class="caiwu"
										style="width: 100%;">
										<tr>
											<td class="w140">
												报表月份
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w140">
												报表月份
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												资产总额
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												负债总额
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												货币资金
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												短期借款/应付票据
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												应收账款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												应付账款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												其它应收款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												其它应付款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												存货
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												长期借款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												预付账款
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												所有者权益合计
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												长期股权投资
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												实收资本
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												固定资产净值
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												资本公积
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												在建工程
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												未分配利润
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												其他
											</td>
											<td colspan="7" style="text-align: left">
												<div style="min-height:50px">
															<textarea class="textarea3" style="width:350px;"></textarea>
														</div>
											</td>
										</tr> 
										<tr>
											<td colspan="8" style="text-align: left;height:40px;padding-left:5px;">
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('finances','1',this)" />
											</td>
										</tr>
									</table>
								</td>
		
		
							</tr>
		
							<!--损益表主要财务指标-->
							<tr>
								<td class="tdTitle">
									损益表
									<br />
									主要财务指标
								</td>
								<td colspan="9" style="border-bottom: none; border-right: none"
									class="borderNon">
									<table cellpadding="0" cellspacing="0" id="sunyi" class="caiwu"
										style="width: 100%;">
										<tr>
											<td class="w140">
												报表月份
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w140">
												报表月份
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td class="w120">
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												主营业务收入
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												销售费用
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												主营业务成本
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												管理费用
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												营业利润
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												财务费用
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												净利润
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td colspan="5" style="text-align: left; padding-left: 8px;">
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												其他
											</td>
											<td colspan="7" style="text-align: left">
												<div style="min-height:50px">
															<textarea class="textarea3" style="width:350px;"></textarea>
														</div>
											</td>
										</tr>
										<tr>
											<td colspan="8" style="text-align: left;height:40px;padding-left:5px;">
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('finances','2',this)" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
		
							<!--现金流主要指标(或银行流水)-->
							<tr>
								<td class="tdTitle" rowspan="2">
									现金流
									<br />
									主要指标
									<br />
									(或银行流水)
								</td>
								<td colspan="9" style="border-bottom: none; border-right: none"
									class="borderNon">
									<table cellpadding="0" cellspacing="0" id="cash"
										style="width: 100%;">
										<tr>
											<td class="w250">
												报表月份
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												经营活动现金净流量
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												投资活动现金净流量
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												筹资活动现金净流量
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												现金及现金等价物增加量(减少量)
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												其他
											</td>
											<td colspan="3" style="text-align: left">
												<div style="min-height:50px">
															<textarea class="textarea3" style="width:350px;"></textarea>
														</div>
											</td>
		
										</tr>
									</table>
								</td>
		
							</tr>
		
							<!--银行流水-->
							<tr>
								<td style="text-align: center">
									银行流水
								</td>
								<td colspan="8" style="border-bottom: none; border-right: none"
									class="borderNon">
									<table cellpadding="0" cellspacing="0" style="width: 100%;"
										id="bankFlow">
										<tr>
											<td style="width: 30px;"></td>
											<td class="w150">
												账户银行
											</td>
											<td class="w100">
												报表月份
											</td>
											<td class="w100">
												<input type="text" />
											</td>
											<td class="w100">
												<input type="text" />
											</td>
											<td class="w100">
												<input type="text" />
											</td>
											<td class="w100">
												<input type="text" />
											</td>
											<td class="w100">
												<input type="text" />
											</td>
											<td class="w100">
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td rowspan="2">
												1
											</td>
											<td rowspan="2">
												<input type="text" style="width:135px"/>
											</td>
											<td>
												月度总收入
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												月度总支出
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td rowspan="2">
												2
											</td>
											<td rowspan="2">
												<input type="text" style="width:135px"/>
											</td>
											<td>
												月度总收入
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												月度总支出
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td rowspan="2">
												3
											</td>
											<td rowspan="2">
												<input type="text" style="width:135px"/>
											</td>
											<td>
												月度总收入
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td>
												月度总支出
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
										</tr>
										<tr>
											<td colspan="2">
												其他
											</td>
											<td colspan="7" style="text-align: left">
												<div style="min-height:50px">
															<textarea class="textarea3" style="width:350px;"></textarea>
														</div>
											</td>
										</tr>
										<tr>
											<td colspan="9" style="text-align: left; height:40px;padding-left:5px;">
												<input type='button' value='上传' class='btn'
													style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
													onclick="CompanyEvaluateReport.uploadFile('finances','3',this)" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
		
							<!--应收账款分析-->
							<tr>
								<td colspan="10" class="header">
									应收账款分析
								</td>
							</tr>
							<tr>
								<td colspan="10" style="border-bottom: none; border-right: none">
									<table cellpadding="0" cellspacing="0" id="yingshou"
										style="width: 100%">
										<tr class="firstLine">
											<td class="w35"></td>
											<td class="w150">
												付款单位名称
											</td>
											<td class="w150">
												金额
											</td>
											<td class="w150">
												账期
											</td>
											<td class="w150">
												合作年限
											</td>
											<td class="w150">
												回款途径
											</td>
											<td>
												补充说明
											</td>
										</tr>
										<tr>
											<td>
												1
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2" style="width:280px"></textarea>
														</div>
											</td>
										</tr>
										<tr>
											<td>
												2
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<input type="text" />
											</td>
											<td>
												<div style="min-height:30px">
															<textarea class="textarea2" style="width:280px"></textarea>
														</div>
											</td>
										</tr>
										<tr id="account">
											<td colspan="7" style="text-align: left">
												<a nums="3" href="javascript:void(0)"
													style="margin-left: 10px;"
													onclick="CompanyEvaluateReport.accountAdd($(this));">添加</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</form>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
	
	<div class="row-fluid">
		<div class="widget-box">
			<div class="widget-body">
				<div class="widget-main padding-6"
						style="margin-top:20px;margin-left: 0px;">
					<div class="row-fluid">
						<div class="span9 control-group full">
							<label class="control-label" style="text-align: center;float: left" for="">附件上传
							</label>
							<div class="controls" style="width: 450px;float: left;margin-left: 0px">
								<input type='button' value='上传' class='btn'
									style="background-  color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;padding-top: 0px;"
									onclick="javascript:CompanyEvaluateReport.addUploadPop()" /> 
								<span id="show_fileName"><a href="#" style="text-align: center;" onclick="FileUtil.downLoad('${evaluateReportModel.fileUrl}','${evaluateReportModel.fileName}')">${evaluateReportModel.fileName}</a></span>
								<input type="hidden" name="evaluateReportModel.fileUrl" value="${evaluateReportModel.fileUrl}" id="fileUrl">
								<input type="hidden" name="evaluateReportModel.fileName" value="${evaluateReportModel.fileName}" id="fileName">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row-fluid">
		<div class="span6 control-group full offset2">
			<div class="btn-toolbar" style="text-align: center">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEvaluateReport.save();">保存</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEvaluateReport.returnList();">返回</a>
			</div>
		</div>
	</div>
</div>
<!-- 结算方式 -->
<div id="billRebackSltDiv" style="display: none;">
	<div class="select">
		<slt:select cssClass="chzn-select" optionsType="SETTLEMENT_WAY">
			<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
		</slt:select>
	</div>
</div>
<!-- 企业担保方式 -->
<div id="enterpriseGuDiv" style="display: none;">
	<div class="select">
		<slt:select cssClass="chzn-select" optionsType="GUARANTEE_TYPE">
			<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
		</slt:select>
	</div>
</div>
<!-- 企业贷款状态 -->
<div id="enterpriseLoDiv" style="display: none;">
	<div class="select">
		<slt:select cssClass="chzn-select" optionsType="LOAN_STATUS">
			<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
		</slt:select>
	</div>
</div>
<div id="divUpLoad" style="display: none;">
	<input type='button' value='上传' class='btn'
		style="background-color: #FFF; border: 1px solid #CDCDCD; height: 24px; width: 56px;"
		onclick="CompanyEvaluateReport.uploadFile('fileType','index',this)" />

</div>
<table id="guLotable" style="display: none;">
	<tbody>
		<tr>
			<td>
				guLoTdIndex
			</td>
			<td>
				<input type="text" />
			</td>
			<td>
				<input type="text" style="width:135px;" />
			</td>
			<td>
				<input type="text" />
			</td>
			<td>
				<div class="select">
					<slt:select cssClass="chzn-select" optionsType="GUARANTEE_TYPE">
						<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
					</slt:select>
				</div>
			</td>
			<td>
				<div class="select">
					<slt:select cssClass="chzn-select" optionsType="LOAN_STATUS">
						<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
					</slt:select>
				</div>
			</td>
			<td>
				<textarea class="textarea2"></textarea>
			</td>
		</tr>
	</tbody>
</table>

<div class="row-fluid">
	<div class="win span8" id="tabwin_upload"
		style="width: 750px; height: 383px">
		<jsp:include page="/xascf/jsp/plupload.jsp"></jsp:include>
	</div>
</div>
