<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.lblTitle {
	border-bottom: 1px dashed #999;
	line-height: 35px;
	margin-bottom: 15px;
}
.details {
	margin-top: 3px;
	color: blue;
	font-size: 12px;
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
	font-size: 12px;
	font-weight: bold;
	text-align: center;
}

.materialInfoTr td {
	font-size: 12px;
	padding: 5px;
	vertical-align: middle;
}

.table th,.table td {
	padding: 3px;
}
#showInfo .control-label{
width:110px;
}
a {
cursor: pointer;
}
a:hover, a:focus {
color: #005580;
text-decoration: none;
}
</style>
<%
	pageContext.setAttribute("levelList", 
			com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_LEVEL"));
%>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
		<div class="widget-form">
			<div class="row-fluid">
					<form class="form-horizontal editFormPre" id="showInfo">
					<div class="widget-box">  
							<div class="widget-header">
								<span class="widget-title"><i class="icon-search"></i>基本信息</span> 
					        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
							</div>
						   <div class="widget-body" >
						   		<div class="widget-main padding-6" style="margin-top:10px;margin-left: 0px;">  
								 			<div class="row-fluid lblTitle">
								 				<span>会员信息</span>
									 		</div>  
										 	<!-- 会员详细信息Pid -->	
											<input type="hidden" id="memberPid"  	value="${comInModel.memberPid}" />  
											<div class="row-fluid">
												<div class="span3 control-group full ">
													<label class="control-label" for="">会员编号：</label>
													<div class="controls details">${comInModel.memberNo}</div>
												</div>
												<div class="span3 control-group full">
													<label class="control-label">登录名：</label>
													<div class="controls details">
														${comInModel.loginName}
													</div>
												</div>
												<div class="span3 control-group full">
													<label class="control-label">联系人：</label>
													<div class="controls details">
														${comInModel.userNameCn}
													</div>
												</div>	
												<div class="span3 control-group full">
													<label class="control-label">联系电话：</label>
													<div class="controls details">
														${comInModel.tel}
													</div>
												</div>	
											</div>
											<div class="row-fluid" >	 
												<div class="span3 control-group full ">
													<label class="control-label" for="">邮箱：</label>
													<div class="controls details">${comInModel.emill}</div>
												</div>
												<div class="span4 control-group full">
													<label class="control-label">所属客户经理：</label>
													<div class="controls details">
														${comInModel.businessPeople}
													</div>
												</div>
											</div>  
								 			<div class="row-fluid lblTitle">
								 				<span>企业信息</span>
									 		</div>  
										<div style="margin-top:3px;" class="row-fluid" >
											<div class="span8 control-group full ">
													<label class="control-label" for="">公司名称：</label>
													<div class="controls details">${companymodel.customerName}</div>
											</div>
										</div>
										<div style="margin-top:3px;" class="row-fluid" >	
											<div class="span3 control-group full ">
													<label class="control-label" for="">营业执照编码：</label>
													<div class="controls details">${companymodel.businesslicenseno}</div>
											</div>
											<div class="span3 control-group full ">
													<label class="control-label" for="">组织机构代码：</label>
													<div class="controls details">${companymodel.organizationCode}</div>
											</div>
											<div class="span3 control-group full ">
													<label class="control-label" for="">税务登记号：</label>
													<div class="controls details">${companymodel.taxNo}</div>
											</div>
											<div class="span3 control-group full ">
													<label class="control-label" for="">开户许可证：</label>
													<div class="controls details">${companymodel.accountlicenseno}</div>
											</div> 
										</div>  
										<div style="margin-top:3px;" class="row-fluid" >
											
											<div class="span3 control-group full ">
													<label class="control-label" for="">道路经营许可证：</label>
													<div class="controls details">${companymodel.roadmanagementNo}</div>
											</div> 
											<div class="span3 control-group full ">
													<label class="control-label" for="">法人代表：</label>
													<div class="controls details">${companymodel.corporate}</div>
											</div> 
											<div class="span3 control-group full ">
													<label class="control-label" for="">注册资金：</label>
													<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00  万元" value="${companymodel.registeredFund}"/></div>
											</div> 
											<div class="span3 control-group full ">
													<label class="control-label" for="">认缴金额：</label>
													<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#00  万元" value="${companymodel.scribedMoney}"/></div>
											</div> 
										</div> 
										<div style="margin-top:3px;" class="row-fluid" > 
											  
											<div class="span3 control-group full ">
													<label class="control-label" for="">资金币种：</label>
													<div class="controls details">${companymodel.currency}</div>
											</div>   
											<div class="span3 control-group full ">
													<label class="control-label" for="">注册时间：</label>
													<div class="controls details">${companymodel.registeredTime}</div>
											</div>   
											<div class="span3 control-group full ">
													<label class="control-label" for="">所属行业：</label>
													<div class="controls details">${companymodel.industry}</div>
											</div>  
											<div class="span3 control-group full ">
													<label class="control-label" for="">所属渠道：</label>
													<div class="controls details">
														<c:forEach items="${levelList}" var="item">
															<c:if test="${companymodel.companyLevel==item.code}">${item.nameCn}</c:if>
														</c:forEach>
													</div>
											</div> 
										</div>  
										<div style="margin-top:3px;" class="row-fluid" >
											  
											<div class="span3 control-group full ">
													<label class="control-label" for="">公司电话：</label>
													<div class="controls details">${companymodel.tel}</div>
											</div>  
											<div class="span3 control-group full ">
													<label class="control-label" for="">公司传真：</label>
													<div class="controls details">${companymodel.fax}</div>
											</div>  
											<div class="span3 control-group full ">
													<label class="control-label" for="">邮编号码：</label>
													<div class="controls details">${companymodel.postalCode}</div>
											</div>  
											<div class="span3 control-group full">
												<label class="control-label">
													公司邮箱：
												</label>
												<div class="controls details">${companymodel.email}</div>
											</div> 
										</div>  
										<div style="margin-top:3px;" class="row-fluid" > 
											<div class="span8 control-group full">
												<label class="control-label">
													公司注册地址：
												</label>
												<div class="controls details" >${companymodel.registeredAddress}</div>
											</div> 
										</div>
										<div style="margin-top:3px;" class="row-fluid" > 
											<div class="span8 control-group full">
												<label class="control-label">
													公司办公地址：
												</label>
												<div class="controls details" >${companymodel.officeAddress}</div>
											</div> 
										</div> 
										<div style="margin-top:3px;" class="row-fluid" align="center">
											<div class="span8 control-group full">
											<label class="control-label">
												公司备注：</label>
												<div class="controls details" style="width: 610px;word-wrap: break-word;text-align: left;">
												${companymodel.remark}
												</div>
											</div>	
										</div>  
									</div>   
								</div> 
							</div>	
					<!-- 账号信息 -->
					<c:if test="${ customerBankList!=null}">
					<div class="widget-box" id="cbank" style="border-bottom: 0px;">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>银行信息</span> <span
								class="widget-toolbar"><a href="#" data-action="collapse"><i
									class="icon-chevron-up"></i> </a> </span>
						</div>
						<div class="widget-body">
							<table class="table table-bordered" id="materialid">
								<tr>
									<td style="text-align: center;font-size: 13px "><span style="font-weight:bold;">账户类型</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">开户行全称</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">开户人名称</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">账号</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">附件</span></td>
								</tr>
								<c:forEach items="${customerBankList}"
									var="item">
									<tr>
										<td style="text-align: center; width: 100px;font-size:13px">${item.bankType}</td>
										<td style="text-align: center; font-size:13px; width:auto">${item.bankName}</td>
										<td style="text-align: center; font-size:13px; width:auto">${item.bankholder}</td>
										<td style="text-align: center; width: auto;">${item.bankNo}</td>
										<td style="text-align: center; width:auto; font-size:13px;">
										<c:if test="${not empty item.agreementName}">
																		<c:set var="fileNameArray" value="${fn:split(item.agreementName, ',')}"></c:set>
																		<c:set var="fileUrlArray" value="${fn:split(item.agreementUrl, ',')}"></c:set>
																		<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
																			<span>
																				<a target="_blank" id="href_${item.id}" name="urlname_${item.id}"
																				onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
																		    </span> 
																	    </c:forEach> 
																    </c:if>
										
										</td>
									</tr>
								</c:forEach>
							</table>
						</div>
					</div>
					</c:if>
					<!-- 司机银行账号 -->
					<c:if test="${ driverBankList!=null}">
					<div class="widget-box" id="cbank" style="border-bottom: 0px;">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>司机银行信息</span> <span
								class="widget-toolbar"><a href="#" data-action="collapse"><i
									class="icon-chevron-up"></i> </a> </span>
						</div>
						<div class="widget-body">
							<table class="table table-bordered" id="materialid">
								<tr>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">司机姓名</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">司机身份证号</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">银行账号开户人</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">银行开户行全称</span></td>
									<td style="text-align: center; font-size: 13px"><span style="font-weight:bold;">银行账号</span></td>
								</tr>
								<c:forEach items="${driverBankList}"
									var="item">
									<tr>
										<td style="text-align: center; width: 100px;font-size:13px">${item.driverName}</td>
										<td style="text-align: center; font-size:13px; width:auto">${item.driverIdNo}</td>
										<td style="text-align: center; font-size:13px; width:auto">${item.bankHolder}</td>
										<td style="text-align: center; width: auto;font-size:13px;">${item.bankName}</td>
										<td style="text-align: center; width:auto;font-size:13px;">${item.bankAccount}</td>
									</tr>
								</c:forEach>
							</table>
						</div>
					</div>
					</c:if>
					<div class="widget-box" style="border-bottom:none;">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>资质证照</span> <span
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
									<td style="text-align: center;font-size: 13px "><span
										style="font-weight:bold;">有效时间</span></td>
								</tr>
								<c:forEach items="${customerOrderEntity.materialDefineList}"
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
										<td style="text-align: center; width: 150px;">
											${item.effectiveTime}</td>
									</tr>
								</c:forEach>
							</table>
						</div>
						</div>
						<!-- 历史审批信息 -->
						<c:if test="${recordList!=null }">
						<div class="row-fluid">
							<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
						</div>
						</c:if>
						<div class="row-fluid offset5"
										style="margin-top: 10px;margin-bottom: 10px;width: 50%">
										<a class="btn btn-primary" href="javascript:void(0)" onclick="customerDetailPop.popClose()"><i class=""></i>关闭</a>
								</div>
						</form>
				</div>
			</div>
		</div>
</div>