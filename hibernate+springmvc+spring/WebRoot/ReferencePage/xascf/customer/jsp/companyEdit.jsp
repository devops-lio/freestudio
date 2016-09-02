<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/customer/js/companyEdit.js"></script>
<link rel="stylesheet" type="text/css" href="./xascf/style/gloable.css?version=2015">
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
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

.materialInfoTr td {
	font-size: 12px;
	padding: 5px;
	vertical-align: middle;
}

.table th,.table td {
	padding: 3px;
}
a {
cursor: pointer;
}
a:hover, a:focus {
color: #005580;
text-decoration: none;
}
</style>
<!-- 会员登入信息 --> 
<%
	pageContext.setAttribute("industyList", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_INDUSTRY"));
	pageContext.setAttribute("levelList", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_LEVEL"));
	%>
<form class="form-horizontal editFormPre" id="customerEditForm">
	<div class="widget-box">  
		<div class="widget-header">
			<span class="widget-title"><i class="icon-search"></i>基本信息</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
	   <div class="widget-body">
	   		<div class="widget-main padding-6" style="margin-top:10px;margin-left: 0px;">  
			 			<div class="row-fluid lblTitle">
			 				<span>会员信息</span>
				 		</div>  
					 	<!-- 会员详细信息Pid -->	
						<input type="hidden" id="memberPid" name="customerOrderEntity.customerItemView.memberPid" 
						value="${membermodel.memberPid}" />  
						<input type="hidden" id="customerPid" name="customerOrderEntity.customerItemView.customerPid" 
						value="${membermodel.customerPid}" />  
						<input type="hidden" id="rebackType" value="${rebackType}" />  
						<div class="row-fluid" align="center">
							<div class="span4 control-group full">
								<label class="control-label">
									<span style="color: red;">*</span>会员编号
								</label>
								<div class="controls txt">
									<input type="text" 
										 name="customerOrderEntity.customerItemView.memberNo"
										 value="${membermodel.memberNo}" id="memberNo">
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label"><span style="color: red;">*</span>登录名</label>
								<div class="controls txt">
									<input type="text" id="loginName" placeholder="请输入登录账号"
										name="customerOrderEntity.customerItemView.loginName" value="${membermodel.loginName}">
								</div>
							</div>
						</div>
						<div class="row-fluid" align="center">
							<div class="span4 control-group full">
								<label class="control-label"><span id="loginPwdSpan" style="color: red;">*</span>登录密码</label>
								<div class="controls txt">
									<input type="password" id="loginPwd" data-required="登录密码不能为空！" 
										data-minlength="密码最少为6位" placeholder="请输入" data-minlength-param="6"
										data-maxlength-param="30" maxlength=30
										name="customerOrderEntity.customerItemView.loginPwd" value="${membermodel.loginPwd}"/>
								</div>
							</div> 
							<div class="span4 control-group full">
								<label class="control-label"><span id="checkPwdSpan" style="color: red;">*</span>确认密码</label>
								<div class="controls txt">
									<input type="password"  name="checkPassword" id="checkPwd" 
										data-minlength="密码最少为6位" placeholder="请输入" data-minlength-param="6"
										data-maxlength-param="30" maxlength=30
										data-equalTo="和登录密码不一致" data-equalTo-param="#loginPwd"
										value="${membermodel.loginPwd}" />
								</div>
							</div>
							<div id="pwdTip" style="float:left;margin-left:20px">
								<span style="color: red; font-size:10px;">默认密码为“123456”</span>
							</div>
						</div>
						<div class="row-fluid" align="center">	 
						<div class="span4 control-group full">
								<label class="control-label"><span style="color: red;">*</span>联系人</label>
								<div class="controls txt">
									<input type="text"  placeholder="请输入"
											data-maxlength-param="30" maxlength=30 id="userNameCn" 
											name="customerOrderEntity.customerItemView.userNameCn" value="${membermodel.userNameCn}">
								</div>
							</div>	
							<div class="span4 control-group full">
								<label class="control-label"><span style="color: red;">*</span>联系人手机</label>
								<div class="controls txt">
									<input type="text"	placeholder="请输入格式如：132xxxxxxxx" 
											data-mobile="联系人手机输入有误!"  maxlength=11 
											data-maxlength-param="11" id="tel"
											name="customerOrderEntity.customerItemView.tel" value="${membermodel.tel}">
								</div>
							</div>	
							<div class="span4 control-group full">
								<label class="control-label">邮箱</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入格式如：12345@qq.com" data-myEmail="邮箱地址格式不正确！请输入格式如：12345@qq.com" 
									name="customerOrderEntity.customerItemView.emill" value="${membermodel.emill}" 
									data-maxlength-param="30" maxlength=30 id="emill">
								</div>
							</div> 	
							
						</div>  
				
			<!-- 企业信息录入  -->
			 			<div class="row-fluid lblTitle">
			 				<span>企业信息</span>
				 		</div>  
				<div class="form-horizontal">   
					<div style="margin-top:3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>公司名称
							</label>
							<div class="controls txt">
								<input type="text"  placeholder="请输入完整企业名称"
									 name="customerOrderEntity.customerSubItemView.customerName"
									 value="${companymodel.customerName}" id="customerName">
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>营业执照注册号
							</label>
							<div class="controls txt">
								<input type="text"  placeholder="请输入" 
									 name="customerOrderEntity.customerSubItemView.businesslicenseno"
									 value="${companymodel.businesslicenseno}" id="businesslicenseno">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								组织机构代码
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									name="customerOrderEntity.customerSubItemView.organizationCode"
									 value="${companymodel.organizationCode}" id="organizationCode">
							</div>
						</div>
					</div>  
					<div style="margin-top:3px;" class="row-fluid" align="center"> 
						<div class="span4 control-group full">
							<label class="control-label">
								税务登记号
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									name="customerOrderEntity.customerSubItemView.taxNo"
									 value="${companymodel.taxNo}" id="taxNo">
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								开户许可证
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									 name="customerOrderEntity.customerSubItemView.accountlicenseno"
									 value="${companymodel.accountlicenseno}" id="accountlicenseno">
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								道路经营许可证
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									name="customerOrderEntity.customerSubItemView.roadmanagementNo"
									 value="${companymodel.roadmanagementNo}" id="roadmanagementNo">
							</div>
						</div> 
					</div> 
					<div style="margin-top:3px;" class="row-fluid" align="center">   
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>法人代表
							</label>
							<div class="controls txt">
								<input type="text"  placeholder="请输入"
									name="customerOrderEntity.customerSubItemView.corporate"
									 value="${companymodel.corporate}" id="corporate">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>注册资金(万元)
							</label>
							<div class="controls txt">
								<input type="text"  data-number="只能输入数字!" placeholder="请输入数字"
									name="customerOrderEntity.customerSubItemView.registeredFund" data-maxlength-param="9" data-maxlength="注册资金不能超过9位!"
									 value="${companymodel.registeredFund}" id="registeredFund">
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>认缴金额(万元)
							</label>
							<div class="controls txt">
								<input type="text" data-number="只能输入数字!" data-maxlength-param="9" placeholder="请输入数字" data-maxlength="认缴金额不能超过9位!"
									name="customerOrderEntity.customerSubItemView.scribedMoney"
									 value="${companymodel.scribedMoney}" id="scribedMoney">
							</div>
						</div> 
					</div>  
					<div style="margin-top:3px;" class="row-fluid" align="center">  
						<div class="span4 control-group full">
							<label class="control-label">
								资金币种
							</label>
							<div class="controls"> 
								<slt:select  cssClass="chzn-select" name="customerOrderEntity.customerSubItemView.currency" optionsType="CURRENCY" 
								value="${companymodel.currency}" > 
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									<slt:outHTML>id="currency"</slt:outHTML>
								</slt:select>  
							</div>
						</div>  
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>注册时间
							</label>
							<div class="controls time">
								<input type="text"  name="customerOrderEntity.customerSubItemView.registeredTime" 
								value="${companymodel.registeredTime}" placeholder="请选择"
								 id="registeredTime">
								 <i  class="date" data-format="yyyy-MM-dd" ></i>
							</div>
						</div>  
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>所属行业
							</label>
							<div class="controls"> 
								<select name="customerOrderEntity.customerSubItemView.industry" 
								class="chzn-select"  data-placeholder="请选择">
										<option value=""></option>
										<c:forEach items="${industyList}" var="item">
										<option value="${item.code}" ${companymodel.industry == item.code ? "selected" : "" }>${item.nameCn}</option>
										</c:forEach>
									</select>
							</div>
						</div> 
					</div>  
					<div style="margin-top:3px;" class="row-fluid" align="center">  
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>所属渠道
							</label>
							<div class="controls"> 
								<select name="customerOrderEntity.customerSubItemView.companyLevel"
								 id="companyLevel"
								class="chzn-select"  data-placeholder="请选择">
										<option value=""></option>
										<c:forEach items="${levelList}" var="item">
										<option value="${item.code}" ${companymodel.companyLevel == item.code ? "selected" : "" }>${item.nameCn}</option>
										</c:forEach>
									</select>
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>公司电话
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入格式如：020-1234567"
									name="customerOrderEntity.customerSubItemView.tel" data-tel="电话输入有误!请输入格式如：020-1234567"
									 value="${companymodel.tel}" id="tel">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								公司传真
							</label>
							<div class="controls txt">
								<input type="text"  data-tel="传真输入有误!请输入格式如：020-1234567" placeholder="请输入格式如：020-1234567"
									name="customerOrderEntity.customerSubItemView.fax"
									 value="${companymodel.fax}" id="fax">
							</div>
						</div> 
					</div>  
					<div style="margin-top:3px;" class="row-fluid" align="center"> 
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>公司注册地址 
							</label>
							<div class="controls txt">
								<input type="text"  placeholder="请输入"
									name="customerOrderEntity.customerSubItemView.registeredAddress"
									 value="${companymodel.registeredAddress}" id="registeredAddress">
							</div>
						</div> 
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>公司办公地址
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									 name="customerOrderEntity.customerSubItemView.officeAddress"
									 value="${companymodel.officeAddress}" id="officeAddress">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								邮编号码
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入格式如：361000" data-number="只能输入数字!"
									name="customerOrderEntity.customerSubItemView.postalCode"
									 value="${companymodel.postalCode}" id="postalCode">
							</div>
						</div> 
					</div> 
					<div style="margin-top:3px;" class="row-fluid" align="center"> 
						<div class="span4 control-group full">
							<label class="control-label">
								公司邮箱
							</label>
							<div class="controls txt">
								<input type="text"  data-myEmail="邮箱地址格式不正确！请输入格式如：12345@qq.com" placeholder="请输入格式如：12345@qq.com"
									name="customerOrderEntity.customerSubItemView.email" 
									 value="${companymodel.email}" id="email">
							</div>
						</div> 
					</div>
					<div style="margin-top:3px;" class="row-fluid" align="center">
						<div class="span8 control-group full">
						<label class="control-label">
							公司备注</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea data-maxlength="公司概要不能超过500个字"
								data-maxlength-param="500"
								rows="350" cols="350" style="width: 100%;height: 113px;resize:none;" 
								name="customerOrderEntity.customerSubItemView.remark" id="remark">${companymodel.remark}</textarea>
							</div>
						</div>	
					</div>  
				</div>   
				<div class="row-fluid" style="margin-top: 10px;"> 		
				</div>  
			</div> 
		</div>	
	</div> 

	<!-- 银行信息 --> 
	<div class="widget-box" > 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>银行信息</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body"> 
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a id="addbtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.addbank()"><i class=""></i>新增</a>  
			      <a id="editbtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.editbankRow()"><i class=""></i>编辑</a> 
			      <a id="deletebtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.removeBankRow()"><i class=""></i>删除</a> 
				</div>
				<table id="bank_mmg" class="mmg">
	  					<tr>
	      					<th rowspan="" colspan=""></th>
	  					</tr>
				</table>
			</div>
		</div>
	</div>
	<!-- 司机账号信息 -->
	<div class="widget-box" > 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>司机银行账号信息</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body"> 
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a id="addbtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.addDriverbank()"><i class=""></i>新增</a>  
			      <a id="editbtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.editDriverBankRow()"><i class=""></i>编辑</a> 
			      <a id="deletebtn" class="btn btn-primary" href="javascript:void(0)" onclick="CompanyEdit.removeDriverBankRow()"><i class=""></i>删除</a> 
				</div>
				<table id="driver_bank_mmg" class="mmg">
	  					<tr>
	      					<th rowspan="" colspan=""></th>
	  					</tr>
				</table>
			</div>
		</div>
	</div>
	<!-- 基本企业文件记录 -->
	<div class="widget-box"> 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i><span style="color: red;">*</span>资质证照</span> 
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
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">有效时间</span></td>  
							</tr> 
							<c:forEach items="${customerOrderEntity.materialDefineList}" var="item" >  
								<tr class="materialInfoTr">   	 
										<td style="text-align: left; width: 250px;" id="typeName_${item.id}">
											<c:if test="${item.isRequired==1}"><span style="color: red;">*</span></c:if>${item.typeName} 
										</td>
										<td style="text-align: center; width:90px;" >     
											<input type='button'  value='上传' id="Upload_${item.id}" class='btn' 
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;font-size:12px;"
											onclick="javascript:CompanyEdit.uploadFile('jibencailiao','${item.id}')"/>   
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
														    	class="buttonRomve" onclick="CompanyEdit.removeMaterial(${item.id},this,${fileflagArray[status.index]})">&nbsp;&nbsp;</a> 
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
										<td style="text-align: center; width: 150px;"> 
											<div class="control-group full">
												<div class="controls time" style="margin-top:6px;margin-left:10px;margin-right:10px;">
													<input type="text" name="effectiveTime" value="${item.effectiveTime}"
													 id="effective_${item.id}" >
													<i class="date" data-format="yyyy-MM-dd"></i>
												</div>   
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
	<!-- 历史审批信息 -->
	<c:if test="${recordList!=null }">
	<div class="row-fluid">
		<jsp:include page="../../loan/jsp/approvalDetails.jsp"></jsp:include>
	</div>
	</c:if>
	<div class="row-fluid offset4"		style="margin-top: 20px;margin-bottom: 30px;width: 62%">
				<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:CompanyEdit.save();">保存</a>
				<a name="needDisplay" id="tobackBt" class="btn btn-primary"  onclick="javascript:CompanyEdit.toback();">返回</a>
			</div>
</form>

<!-- 新增弹出框 --> 
<div class="row-fluid">
    <div class="win span4" id="pop_up_delay" >
        <div class="win-header">
            <span id="check_span">银行账户信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_show_content">
        </div> 
    </div>
</div> 
<script id="pop_up_bank" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >  
	 		<div class="row-fluid" id="lx-div">
	            <div class="span10 control-group full"> 
	                <label class="control-label" for=""><span style="color: red;">*</span>账户类型</label>
	                <div class="controls txt"> 
							<select data-placeholder="请选择" class="chzn-select span12 self-select" id="bankType" onchange="CompanyEdit.bankTypeChange()"
							data-required="账户类型不能为空!" >
								<option value='1'>监管账户</option>						
								<option value='2'>结算账户</option>						
							</select>   
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid"> 
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>机构类型</label>
	                <div class="controls txt"> 
						<select data-placeholder="请选择" class="chzn-select span12 self-select" id="bankProperty" onchange="CompanyEdit.typechange()"
						data-required="机构类型不能为空!" >
							<option value='1'>银行</option>						
							<option value='2'>第三方支付</option>						
						</select>  
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" id="jg-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>开户行全称</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{bankName}}" id="bankName"  data-required="开户行全称不能为空">
	                </div>
	            </div> 
			</div> 
			<div class="row-fluid" id="kh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>账号开户人</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{bankholder}}" id="bankholder" data-required="账号开户人不能为空">
	                </div>
	            </div> 
			</div>
	 		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>账号</label>
	                <div class="controls txt">
	                    <input type="text" value="{{bankNo}}" id="bankNo" data-required="账号不能为空" data-number="只能输入数字!" >
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" id="xy-div">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">附件</label>
	                <div class="controls" style="width:250px;"> 
					  <input type="hidden" value="{{agreementUrl}}" id="agreementUrl" name="agreementUrl">
	                  <input type="hidden"  name='agreementName' value="{{agreementName}}"   
							 id='agreementName'  />
							<input type='button'  value='上传' class='btn' id='btnxy' style="background-color:#FFF;  
									border:1px solid #CDCDCD;height:24px; width:64px;"
									onclick="CompanyEdit.upLoadMaterials()"/> 
	                </div>
				</div>	
			</div>	 	
			<div class="row-fluid" id="qd-div">
	    		<div class="form-search-btn">
	       			<a class="btn btn-info save" href="javascript:void(0)" onclick="CompanyEdit.addBankRow()"><i class=""></i>确定</a>
	        		<a class="btn btn-info cancel" href="javascript:void(0)" onclick="CompanyEdit.canclebank()"><i class=""></i>取消</a>
	    		</div>
			</div>
		</form> 
	</div>
</script>
<div class="row-fluid">
    <div class="win span4" id="pop_up_driver" >
        <div class="win-header">
            <span id="check_span">司机银行账户信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_driver_content">
        </div> 
    </div>
</div> 
<script id="pop_up_driver_T" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editDriverForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >  
	 		<div class="row-fluid" >
	            <div class="span10 control-group full"> 
	                <label class="control-label" for=""><span style="color: red;">*</span>司机名称</label>
	                <div class="controls txt"> 
 						<input type="text"  value="{{driverName}}" id="driverName"  data-required="司机名称不能为空">
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid"> 
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>司机身份证号</label>
	                 <div class="controls txt"> 
 						<input type="text"  value="{{driverIdNo}}" id="driverIdNo"  data-required="司机身份证号不能为空" data-number="只能输入数字!" >
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" >
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>账号开户人</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{bankHolder}}" id="driverBankholder"  data-required="账号开户人不能为空">
	                </div>
	            </div> 
			</div> 
			<div class="row-fluid" >
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>开户行全称</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{bankName}}" id="driverBankName" data-required="开户行全称不能为空" >
	                </div>
	            </div> 
			</div>
	 		<div class="row-fluid" >
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>账号</label>
	                <div class="controls txt">
	                    <input type="text" value="{{bankAccount}}" id="driverBankAccount" data-required="账号不能为空" data-number="只能输入数字!" >
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid">
	    		<div class="form-search-btn">
	       			<a class="btn btn-info save" href="javascript:void(0)" onclick="CompanyEdit.saveDriverBankRow()"><i class=""></i>确定</a>
	        		<a class="btn btn-info cancel" href="javascript:void(0)" onclick="CompanyEdit.cancleDriverBank()"><i class=""></i>取消</a>
	    		</div>
			</div>
		</form> 
	</div>
</script>

<div id="pop_up_show" style="display: none;"> 
   
</div> 
 
 <div class="row-fluid">
    <div class="win span8" id="tabwin_add_clieTrack">
	        <div class="win-header">
	            <span>客户跟踪信息</span> <i class="close">&times;</i>
	        </div>
        	<div class="win-content" id="tabwin_add_content_clieTrack">
        </div>
    </div>
</div>


