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
													<div class="controls details">
														<c:choose>
															<c:when test="${companymodel.registeredFund!=-999.9}">
																<fmt:formatNumber type="currency" pattern="#,#00  万元" value="${companymodel.registeredFund}"/>
															</c:when>
															<c:otherwise>********</c:otherwise>
														</c:choose>
													</div>
											</div> 
											<div class="span3 control-group full ">
													<label class="control-label" for="">认缴金额：</label>
													<div class="controls details">
														<c:choose>
															<c:when test="${companymodel.scribedMoney!=-999.9}">
																<fmt:formatNumber type="currency" pattern="#,#00  万元" value="${companymodel.scribedMoney}"/>
															</c:when>
															<c:otherwise>********</c:otherwise>
														</c:choose>
													</div>
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
														<c:choose>
															<c:when test="${companymodel.companyLevel=='********'}">********</c:when>
															<c:otherwise>
																<c:forEach items="${levelList}" var="item">
																	<c:if test="${companymodel.companyLevel==item.code}">${item.nameCn}</c:if>
																</c:forEach>
															</c:otherwise>
														</c:choose>
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
							<!-- 授信材料信息 -->
							<div class="widget-box">
								<div class="widget-header" >
									<span class="widget-title"><i class="icon-list"></i>授信材料信息
									</span> <span class="widget-toolbar"><a href="#"
										data-action="collapse"><i class="icon-chevron-up"></i>
									</a>
									</span>
								</div>
								<div class="widget-body">
									<div class="widget-grid">
										<div class="grid-toolbar">
											<div class="row-fluid " style="margin-top: -10px;">
												<table id="creditMaterial" class="table table-bordered" style="margin-top: 10px">
														<tr>
															<td class="tdTittl" style="text-align: center;">文件类型</td>
															<td class="tdTittl" style="text-align: center;">上传文件名</td>
															<td class="tdTittl" style="text-align: center;">有效时间</td>
														</tr>
														<c:forEach items="${materialCreditList}" var="item" varStatus="status">
														<tr>
															<td style="text-align: center;vertical-align: middle;font-size:12px">${item.typeName }</td>
															<c:set value="${fn:split(item.allFileName, ',')}" var="names" />
															<c:set value="${fn:split(item.allFileUrl, ',')}" var="urls" />
															<td style="text-align: center;font-size:12px">
																<c:forEach items="${urls}" var="url" varStatus="status">
																	<a href="#" onclick="FileUtil.downLoad('${url}','${names[status.index]}');">${names[status.index]}</a>
																</c:forEach>
															</td>
															
															<td style="text-align: center;">${item.effectiveTimeEnd }</td>
														</tr>
														
														</c:forEach>
												</table>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</form>
					
					<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
						<a class="btn btn-primary" href="javascript:void(0)"
							onclick="popCancleById('customerDetail')"><i class=""></i>关闭</a>
					</div>
					</div>
				</div>
			</div>
		</div>
</div>