<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript"
	src="xascf/agfancing/js/capitalSideEdit.js"></script>
<link rel="stylesheet" type="text/css"
	href="./xascf/style/gloable.css?version=2015">
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.file {
	position: absolute;
	right: 80px;
	height: 24px;
	filter: alpha(opacity :   0);
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

a:hover,a:focus {
	color: #005580;
	text-decoration: none;
}
</style>
<%
	pageContext.setAttribute("customerTypeList", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CAPITAL_SIDE_CATEGORY"));
	%>
<form class="form-horizontal editFormPre" id="agCustomerEditForm">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class="icon-search"></i>基本信息</span>
			<span class="widget-toolbar"><a href="#"
				data-action="collapse"><i class="icon-chevron-up"></i>
			</a>
			</span>
		</div>
		<div class="widget-body">
			<div class="widget-main padding-6"
				style="margin-top: 10px; margin-left: 0px;">
				<div class="row-fluid lblTitle">
					<span>账号信息</span>
				</div>
				<!-- 会员详细信息Pid -->
				<input type="hidden" id="memberPid"
					name="condition.customerModel.memberPid"
					value="${customerModel.memberPid}" />
				<input type="hidden" id="customerPid"
					name="condition.customerModel.memberPid"
					value="${customerModel.customerPid}" />
				<div class="row-fluid" align="center">
					<div class="span4 control-group full">
						<label class="control-label">
							<span style="color: red;">*</span>登录名
						</label>
						<div class="controls txt">
							<input type="text" data-required="登录名不能为空！" id="loginName"
								placeholder="请输入登录账号" name="condition.customerModel.loginName"
								value="${customerModel.loginName}" onblur="CompanyEdit.checkInfoUnio('001',this.value)">
							<input type="hidden" name="condition.customerModel.memberNo" value="${customerModel.memberNo }" name="condition.customerModel.memberNo"> 
							<input type="hidden" id="customerPid" name="condition.customerModel.customerPid" value="${customerModel.customerPid }" name="condition.customerModel.customerPid"> 
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							<span style="color: red;">*</span>状态
						</label>
						<div class="controls txt">
							<slt:select  cssClass="chzn-select" name="condition.customerModel.customerStatus" 
								optionsType="AG_CUSTOMER_STATUS" value="${customerModel.customerStatus}">
								<slt:outHTML>id="customerStatus"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="状态不能为空"</slt:outHTML>
							</slt:select> 
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
								name="condition.customerModel.loginPwd" value="${customerModel.loginPwd}"/>
						</div>
					</div> 
					<div class="span4 control-group full">
						<label class="control-label"><span id="checkPwdSpan" style="color: red;">*</span>确认密码</label>
						<div class="controls txt">
							<input type="password"  name="checkPassword" id="checkPwd" 
								data-minlength="密码最少为6位" placeholder="请输入" data-minlength-param="6"
								data-maxlength-param="30" maxlength=30
								data-equalTo="和登录密码不一致" data-equalTo-param="#loginPwd"
								value="${customerModel.loginPwd}" />
						</div>
					</div>
					<div id="pwdTip" style="float:left;margin-left:20px">
						<span style="color: red; font-size:10px;">默认密码为“123456”</span>
					</div>
				</div>
				
				<!-- 企业信息录入  -->
				<div class="row-fluid lblTitle">
					<span>资金方信息</span>
				</div>
				<div class="form-horizontal">
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">
								<span style="color: red;">*</span>名称
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入名称" data-required="公司名称不能为空！"
									name="condition.agCustomerModel.customerName"
									value="${agCustomerModel.customerName}" id="customerName">
								<input type="hidden" id="agFancingPid" name="condition.agCustomerModel.pid" value="${agCustomerModel.pid }">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">额度(元)
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入" data-number="只能填入数字"
									name="condition.agCustomerModel.limitAmount"
									value="${agCustomerModel.limitAmount}" id="limitAmount">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								类别
							</label>
							<div class="controls">
								<select id="customerType" name="condition.agCustomerModel.customerType" class="chzn-select" data-placeholder="请选择">
									<option value=""></option>
									<c:forEach items="${customerTypeList}" var="item">
										<option value="${item.code }" ${agCustomerModel.customerType==item.code?"selected":""}>${item.nameCn }</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">
								最低利率(%)
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入" data-number="只能填入数字"
									name="condition.agCustomerModel.lowestRate"
									value="${agCustomerModel.lowestRate}" id="lowestRate">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								最高利率(%)
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入" data-number="只能填入数字"
									name="condition.agCustomerModel.highestRate"
									value="${agCustomerModel.highestRate}" id="highestRate">
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">
								开始日期
							</label>
							<div class="controls time">
								<input type="text" name="condition.agCustomerModel.startDate"
									value="${agCustomerModel.startDate}" placeholder="请选择"
									id="startDate">
								<i class="date" data-format="yyyy-MM-dd"></i>
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								结束日期
							</label>
							<div class="controls time">
								<input type="text" name="condition.agCustomerModel.endDate"
									value="${agCustomerModel.endDate}" placeholder="请选择"
									id="endDate">
								<i class="date" data-format="yyyy-MM-dd"></i>
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">联系人
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									data-maxlength-param="30" maxlength=30 id="userNameCn"
									name="condition.customerModel.userNameCn"
									value="${customerModel.userNameCn}">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">联系人手机
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入格式如：132xxxxxxxx" data-number="联系人手机输入有误!" 
									maxlength=11 data-maxlength-param="11" id="tel" onblur="CompanyEdit.checkInfoUnio('002',this.value)"
									name="condition.customerModel.tel" value="${customerModel.tel}">
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">电子邮箱
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入格式如：12345@qq.com"
									data-myEmail="邮箱地址格式不正确！请输入格式如：12345@qq.com"
									name="condition.customerModel.emill"
									value="${customerModel.emill}" data-maxlength-param="30"
									maxlength=30 id="emill" onblur="CompanyEdit.checkInfoUnio('003',this.value)">
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span4 control-group full">
							<label class="control-label">
								地址
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入"
									name="condition.agCustomerModel.address"
									value="${agCustomerModel.address}" id="address">
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span8 control-group full">
							<label class="control-label">
								资质要求
							</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea data-maxlength="公司概要不能超过200个字"
									data-maxlength-param="200" rows="350" cols="350"
									style="width: 100%; height: 113px; resize: none;"
									name="condition.agCustomerModel.qualification"
									id="qualification">${agCustomerModel.qualification }</textarea>
							</div>
						</div>
					</div>
					<div style="margin-top: 3px;" class="row-fluid" align="center">
						<div class="span8 control-group full">
							<label class="control-label">
								审核流程描述
							</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea data-maxlength="公司概要不能超过200个字"
									data-maxlength-param="200" rows="350" cols="350"
									style="width: 100%; height: 113px; resize: none;"
									name="condition.agCustomerModel.approvalDesc" id="approvalDesc">${agCustomerModel.approvalDesc }</textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 需要资料清单 -->
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>需要资料清单</span>
			<span class="widget-toolbar"><a href="#"
				data-action="collapse"><i class="icon-chevron-up"></i>
			</a>
			</span>
		</div>
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a id="addbtn" class="btn btn-primary" href="javascript:void(0)"
						onclick="CompanyEdit.addMaterial()"><i class=""></i>新增</a>
					<a id="editbtn" class="btn btn-primary" href="javascript:void(0)"
						onclick="CompanyEdit.editMaterial()"><i class=""></i>编辑</a>
					<a id="deletebtn" class="btn btn-primary" href="javascript:void(0)"
						onclick="CompanyEdit.deleteMaterial()"><i class=""></i>删除</a>
				</div>
				<table id="material_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<!-- 历史审批信息 -->
	<div class="row-fluid offset4"
		style="margin-top: 20px; margin-bottom: 30px; width: 62%">
		<a name="needDisplay" id="saveBt" class="btn btn-primary"
			onclick="javascript:CompanyEdit.save();">保存</a>
		<a name="needDisplay" id="tobackBt" class="btn btn-primary"
			onclick="javascript:CompanyEdit.toback();">返回</a>
	</div>
</form>

<!-- 新增弹出框 -->
<div class="row-fluid">
	<div class="win span4" id="pop_up_delay">
		<div class="win-header">
			<span id="check_span">需要资料清单</span>
			<i class="close">&times;</i>
		</div>
		<div class="win-content" id="pop_up_show_content">
		</div>
	</div>
</div>
<script id="pop_up_bank" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >  
	 		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>材料编号</label>
	                <div class="controls txt">
	                    <input type="text" value="{{materialNo}}" id="materialNo" data-required="材料编号不能为空"  >
	                </div>
	            </div> 
			</div>  
		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>材料名称</label>
	                <div class="controls txt">
	                    <input type="text" value="{{materialName}}" id="materialName" data-required="材料名称不能为空" >
	                </div>
	            </div> 
			</div>  
		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">材料描述</label>
	                <div class="controls txt">
	                    <input type="text" value="{{materialDesc}}" id="materialDesc" >
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" id="qd-div">
	    		<div class="form-search-btn">
	       			<a class="btn btn-info save" href="javascript:void(0)" onclick="CompanyEdit.addMaterialRow()"><i class=""></i>确定</a>
	        		<a class="btn btn-info cancel" href="javascript:void(0)" onclick="CompanyEdit.cancleMaterial()"><i class=""></i>取消</a>
	    		</div>
			</div>
		</form> 
	</div>
</script>


