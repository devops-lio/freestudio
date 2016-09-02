<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/personalDetails.js"></script>  
<div class="widget-box" style="width: 800px; "> 
	<div class="page-content" style="font-size: 13px;margin: 20px;">
			<form class="form-horizontal" id="details_form"> 
				<div class="row-fluid" > 
				<table>
						<tr>
							<td style="font-weight: bold;">审核状态:</td>
							<td style="width: 170px; font-weight: bold;">
								<c:if test="${comInModel.customerStatus=='0'}"></c:if>
								<c:if test="${comInModel.customerStatus=='1'}">未审核</c:if>
								<c:if test="${comInModel.customerStatus=='2'}">审核确认</c:if> 
								<c:if test="${comInModel.customerStatus=='3'}">审核取消</c:if>  
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td style="font-weight: bold;" colspan="4">个人信息</td>
						</tr>
						<tr> 
							<td>会员编号:</td>
							<td style="width: 170px;">${comInModel.memberNo}</td>
							<td>姓名:</td>
							<td style="width: 170px;">${comInModel.userNameCn}</td>
							<td>手机:</td>
							<td style="width: 170px;">${comInModel.tel}</td>
						</tr> 
						<tr>
							<td>身份证号:</td>
							<td style="width: 170px;">${comInModel.cardNo}</td>
							<td>婚否:</td>
							<td style="width: 170px;">
								<c:if test="${comInModel.ismarry==''}"></c:if>
								<c:if test="${comInModel.ismarry=='Y'}">已婚</c:if>
								<c:if test="${comInModel.ismarry=='N'}">未婚</c:if>  
							</td> 
						</tr>
						<tr>
							<td>邮箱:</td>
							<td style="width: 170px;">${comInModel.emill}</td>
							<td>个人地址:</td>
							<td style="width: 170px;">${comInModel.contactsAddr}</td>
						</tr>
					</table> 
				</div>	
		    <div class="row-fluid" style="margin-top: 5px;"> 			
			</div> 
				<input type="hidden" id="customerSource" name="companymodel.customerSource" value="${comInModel.customerSource}"/>
				<input type="hidden" id="customerPid" name="companymodel.customerPid" value="${comInModel.customerPid}"/>
				<input type="hidden" id="companyStatus" name="companymodel.status" value="${comInModel.customerStatus}"/>
				<div class="row-fluid" >
					<table>
						<tr>
							<td style="font-weight: bold;" colspan="6">账号信息</td>
						</tr>
						<tr>
							<td>账号:</td>
							<td style="width: 170px;">${comInModel.loginName}</td>
							<td>用户名:</td>
							<td style="width: 170px;">${comInModel.userNameCn}</td>
						</tr>  
						<!--  
						<tr>
							<td>账单日期:</td>
							<td style="width: 170px;">${billon.billonDate}</td>
							<td>还款日期:</td>
							<td style="width: 170px;">${billon.billRebackDate}</td>
						</tr>
						-->
						<tr> 
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
							<td colspan="4" style="width:90px;">${comInModel.remark}</td>
						</tr>
					</table> 
				</div>	
		    <div class="row-fluid" style="margin-top: 5px;">  	
			</div> 
		        	<div class="row-fluid" style="margin-top: 5px;"> 		
					</div>
			<!-- 放款融资记录 --> 
			<div class="widget-box" id="rz" >  
			<span class="widget-title" style="font-weight: bold;">放款融资记录</span>  
					<div class="widget-body">
						<div class="widget-grid"> 
						<!-- mmGrid -->
						<table id="mmg-fun" class="mmg">
						</table>
						<div id="pg" style="text-align: right;"></div>
					</div>
				</div>
			</div> 
		        	<div class="row-fluid" style="margin-top: 5px;"> 		
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
			
		        	<div class="row-fluid" style="margin-top: 5px;"> 		
					</div>	
					
			<!-- 个人监管账户信息 --> 
			<div class="widget-box" id="cbank" >  
			<span class="widget-title" style="font-weight: bold;">个人监管账户信息</span>  
					<div class="widget-body">
						<div class="widget-grid"> 
						<!-- mmGrid -->
						<table id="mmg-account" class="mmg">
						</table>
						<div id="pg" style="text-align: right;"></div>
					</div>
				</div>
			</div> 
		        	<div class="row-fluid" style="margin-top: 5px;"> 		
					</div>
			</form> 
			<div id="reception" class="row-fluid offset2" style="width: 65.5%;margin-top: 20px;margin-bottom: 30px;"> 		
	    		<a class="btn btn-primary" onclick="PersonalDetails.local();">确定</a> 		
	    		<a class="btn btn-primary" onclick="PersonalDetails.define();">审核确认</a>
	    		<a class="btn btn-primary" onclick="PersonalDetails.cancel();">审核取消</a>
			</div> 	
			
			<div id="backstage" class="row-fluid offset2" style="width: 65.5%;margin-top: 20px;margin-bottom: 30px; display: none;"> 		
	    		<a class="btn btn-primary" onclick="ComapanyDetails.local();">确认</a> 	 
			</div> 		
	    </div> 
   </div>
   

	    