<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>


<script type="text/javascript" src="xascf/customer/js/customerDetails.js"></script>  
<%
	pageContext.setAttribute("levelList", 
			com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_LEVEL"));
%>
<div class="widget-box" style="width: 800px; border:0; "> 
	<div class="page-content" style="font-size: 13px;margin: 20px;">
			<form class="form-horizontal" id="details_form"> 
				<div class="row-fluid" > 
				<table>
						<tr>
							<td style="font-weight: bold;">审核状态:</td>
							<td style="width: 170px; font-weight: bold;">
								<c:if test="${comInModel.customerStatus=='0'}"></c:if>
								<c:if test="${comInModel.customerStatus=='00'}">会员注册</c:if>
								<c:if test="${comInModel.customerStatus=='10'}">完善基本资料</c:if> 
								<c:if test="${comInModel.customerStatus=='01'}">完善监管资料</c:if> 
								<c:if test="${comInModel.customerStatus=='30'}">审核通过</c:if>  
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td style="font-weight: bold;" colspan="4">个人信息</td>
						</tr>
						<tr> 
							<td>账号:</td>
							<td style="width: 170px;">${comInModel.loginName}</td>
							<td>联系人:</td>
							<td style="width: 170px;">${comInModel.userNameCn}</td>
							<td>手机:</td>
							<td style="width: 170px;">${comInModel.tel}</td>
						</tr>
						<tr>
							<td>邮箱:</td>
							<td style="width: 170px;">${comInModel.emill}</td>
						</tr> 
					</table> 
				</div>	
		    <div class="row-fluid" style="margin-top: 5px;"> 			
			</div>
				<input type="hidden" id="customersubPid" name="companymodel.customersubPid" value="${companymodel.customersubPid}" /> 
				<input type="hidden" id="customerSource" name="comInModel.customerSource" value="${comInModel.customerSource}"/>
				<input type="hidden" id="companyStatus" name="companymodel.status" value="${companymodel.status}"/>
				<div class="row-fluid" >
					<table>
						<tr>
							<td style="font-weight: bold;" colspan="6">企业信息</td>
						</tr>
						<tr>
							<td>会员编号:</td>
							<td style="width: 170px;">${comInModel.memberNo}</td>
							<td>企业名称:</td>
							<td style="width: 170px;">${companymodel.customerName}</td>
							<td>公司法人:</td> 
							<td style="width: 170px;">${companymodel.corporate}</td>
						</tr>
						<tr>
							<td>资金币种:</td> 
							<td style="width: 170px;"> 
								<c:if test="${companymodel.currency=='CNY'}">人民币</c:if>
								<c:if test="${companymodel.currency=='USD'}">美元</c:if> 
							</td> 
							<td>注册金额(万元):</td> 
							<td style="width: 170px;">${companymodel.registeredFund}</td>
							<td>税务登记:</td> 
							<td style="width: 170px;">${companymodel.taxNo}</td>
						</tr>
						<tr>
							<td>注册时间:</td> 
							<td style="width: 170px;">${companymodel.registeredTime}</td>  
							<td>公司电话:</td> 
							<td style="width: 170px;">${companymodel.tel}</td>  
							<td>公司传真:</td> 
							<td style="width: 170px;">${companymodel.fax}</td>   
						</tr> 
						<tr>
							<td>公司邮箱:</td>
							<td style="width: 170px;">${companymodel.email}</td>
							<td>公司地址:</td>
							<td style="width: 170px;">${companymodel.addressCn}</td>
							<td>所属行业:</td>
							<td style="width: 170px;">
								<c:if test="${companymodel.industry=='0'}"></c:if>
								<c:if test="${companymodel.industry=='1'}">物流</c:if>
								<c:if test="${companymodel.industry=='2'}">个体</c:if> 
								<c:if test="${companymodel.industry=='3'}">企业</c:if>  
								<c:if test="${companymodel.industry=='4'}">集团</c:if>    
							</td>
						</tr>
						<tr>
							<td>所属渠道:</td>
							<td style="width: 170px;">
								<c:forEach items="${levelList}" var="item">
									<c:if test="${companymodel.companyLevel==item.code}">${item.nameCn}</c:if>
								</c:forEach>
							</td>
							<td>客户来源:</td>
							<td style="width: 170px;">
								<c:if test="${comInModel.customerSource=='0'}"></c:if>
								<c:if test="${comInModel.customerSource=='1'}">后端登记</c:if>
								<c:if test="${comInModel.customerSource=='2'}">前端注册</c:if> 
								<c:if test="${comInModel.customerSource=='3'}">外来抓取</c:if>  
							</td>
						</tr> 
						<tr>
							<td>公司概要:</td>
							<td colspan="4" style="width:90px;">${companymodel.remark}</td>
						</tr>
					</table> 
				</div>	
		    <div class="row-fluid" style="margin-top: 5px;">  	
			</div> 
        	<div class="row-fluid" style="margin-top: 5px;"> 		
			</div>
			<!-- 放款记录 --> 
			<div class="widget-box" id="rz" >  
			<span class="widget-title" style="font-weight: bold;">放款记录</span>  
					<div class="widget-body">
						<div class="widget-grid"> 
						<!-- mmGrid -->
						<table id="mmg-fun" class="mmg">
						</table>
						<div id="pg" style="text-align: right;"></div>
					</div>
				</div>
			</div>  
			<!-- 理财购买记录 -->
			<div class="widget-box" id="lc">
			<span class="widget-title" style="font-weight: bold;">理财购买记录</span>
				<div class="widget-body">
					<div class="widget-grid">
						<!-- mmGrid -->
						<table id="mmg-fin" class="mmg">
						</table>
						<div id="pg" style="text-align: right;"></div>
					</div>
				</div>
			</div>	  
			</form> 
			<div id="backstage" class="row-fluid" style="margin-top: 20px;margin-bottom: 30px; text-align:center;"> 		
	    		<a class="btn btn-primary" onclick="ComapanyInfo.cancel();">关闭</a> 	 
			</div> 		
			 
	    </div> 
   </div>
   

	    