<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%
	pageContext.setAttribute("customerTypeList", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CAPITAL_SIDE_CATEGORY"));
%>
<script type="text/javascript" src="xascf/agfancing/js/capitalSideList.js"></script> 
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="CapitalSideList.load();">查询</a>
				<a class="btn btn-primary" onclick="CapitalSideList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="agFancingSearchForm"> 
				<div class="row-fluid "> 
					<div class="span3 control-group full">
						<label class="control-label" for="">资金方名称</label>
						<div class="controls txt">
							<input type="text"  placeholder="请输入" name="condition.customerName">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label">
							类别
						</label>
						<div class="controls">
							<select id="customerType" name="condition.customerType" class="chzn-select" data-placeholder="请选择">
								<option value=""></option>
								<c:forEach items="${customerTypeList}" var="item">
									<option value="${item.code }">${item.nameCn }</option>
								</c:forEach>
							</select>
						</div>
		            </div>  
		            <div class="span4 control-group full">
						<label class="control-label">
							利率
						</label>
						<div class="controls txt">
							<input type="text" name="condition.lowestRate"
								id="lowestRate" style="width:80px">
							-
							<input type="text" name="condition.highestRate" style="width:80px"
								id="highestRate">

						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>资金方列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar">  
                <a class="btn btn-primary" onclick="CapitalSideList.add();">新增</a>
                <a class="btn btn-primary" onclick="CapitalSideList.update();">编辑</a> 
                <a class="btn btn-primary" onclick="CapitalSideList._delete();">删除</a> 
                <!-- 
                <a class="btn btn-primary" onclick="ComapanyInfo.companyResetPws();">重置密码</a> 
                 -->
            </div>
			<!-- mmGrid -->
			<table id="mmg-purchase" class="mmg">
			</table>
			<div id=pig style="text-align: right;">
			</div>
		</div>
	</div>
</div> 


<!-- 新增弹出框 --> 
<div class="row-fluid">
	<div class="win span10" id="tabwin_add_weitf">
		<div class="win-header">
			<span>选择委托方信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_content_weitf"></div>
	</div>
</div>
<script id="template_weitf" type="text/x-handlebars-template"> 
	
	<div class="form-search" style="font-size: 13px;">
		<form class="form-horizontal editFormPre" id="purchaseEditForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex">
			<input type="hidden" value="{{customersubPid}}" name="customerOrderEntity.customerSubItemView.customersubPid" 
				id="customersubPid">
	 		<div class="row-fluid">
	            <div class="span4 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>企业名称</label>
	                <div class="controls txt">
	                    <input type="text"  name="customerOrderEntity.customerSubItemView.customerName" placeholder="请输入完整企业名称"
						value="{{customerName}}" id="customerName" data-required="企业名称不能为空">
	                </div>
	            </div> 
	            <div class="span4 control-group full">
	                <label class="control-label" for="">公司法人</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.corporate" placeholder="请输入"
						 value="{{corporate}}" id="corporate" >
	                </div>
	            </div> 
	            <div class="span4 control-group full">
	                <label class="control-label" for="">营业执照</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.businesslicenseno" placeholder="请输入" 
 						value="{{businesslicenseno}}" id="businesslicenseno"  >
	                </div>
	            </div> 

			</div> 
	 		<div class="row-fluid">
 			<div class="span4 control-group full">
	                <label class="control-label" for="">组织机构代码</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.organizationCode" placeholder="请输入"
 						value="{{organizationCode}}" id="organizationCode"  >
	                </div>
	            </div> 
				<div class="span4 control-group full">
	                <label class="control-label" for="">税务登记</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.taxNo" placeholder="请输入"
						value="{{taxNo}}"  id="bankNo" >
	                </div>
	            </div> 
 				<div class="span4 control-group full">
	                <label class="control-label" for="">注册资金(万元)</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.registeredFund" placeholder="请输入数字"
 						value="{{registeredFund}}" id="registeredFund"  data-number="只能输入数字!" data-maxlength="注册资金不能超过9位!" data-maxlength-param="9">
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid"> 
			 <div class="span4 control-group full">
	                <label class="control-label" for="">注册时间</label>
	                <div class="controls time">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.registeredTime"   placeholder="请选择"
						value="{{registeredTime}}" id="registeredTime" >
						<i  class="date" data-format="yyyy-MM-dd" ></i>
	                </div>
	            </div> 
			<div class="span4 control-group full">
	                <label class="control-label" for="">联系电话</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.tel" placeholder="请输入格式如：020-1234567"
 						value="{{tel}}" id="tel" data-tel="电话输入有误!请输入格式如：020-1234567">
	                </div>
	            </div>
			<div class="span4 control-group full">
	                <label class="control-label" for="">联系人手机</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.mobile" placeholder="请输入格式如：132XXXXXXXX"
 						value="{{mobile}}" id="mobile" data-mobile="电话输入有误!请输入格式如：132XXXXXXXX">
	                </div>
	            </div>
	            
			</div>  
	 		<div class="row-fluid"> 
				 <div class="span4 control-group full">
	                <label class="control-label" for="">公司传真</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.fax" placeholder="请输入格式如：020-1234567" data-tel="传真输入有误!请输入格式如：020-1234567"
						 value="{{fax}}" id="fax">
	                </div>
	            </div>
 			<div class="span4 control-group full">
	                <label class="control-label" for="">公司邮箱</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.email" data-myEmail="邮箱地址格式不正确！请输入格式如：12345@qq.com" placeholder="请输入格式如：12345@qq.com"
						 value="{{email}}"  id="email">
	                </div>
	            </div> 
	            <div class="span4 control-group full"> 
	                <label class="control-label" for="">公司办公地址</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.officeAddress" maxlength=80 
						 value="{{officeAddress}}" id="addressCn" >
	                </div>
	            </div>
			</div>
			<div class="row-fluid"> 
	            <div class="span4 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>类别</label>
	                <div class="controls txt"> 
							<select id="businessScope" name="customerOrderEntity.customerSubItemView.businessScope" class="chzn-select" data-required="类别不能为空" data-placeholder="请选择">
										<option value=""></option>
										<c:forEach items="${basicDataModelList}" var="item">
										<option value="${item.code }">${item.nameCn }</option>
										</c:forEach>
									</select>
	                </div>
	            </div>
			<div class="span4 control-group full"> 
	                <label class="control-label" for="">主营业务</label>
	                <div class="controls txt">
	                    <input type="text" name="customerOrderEntity.customerSubItemView.mainbusiness" maxlength=80 
						 value="{{mainbusiness}}" id="mainbusiness" >
	                </div>
	            </div>  
			</div>
			<div class="row-fluid">
				<div style="margin-top:3px;" class="row-fluid" align="center">
						<div class="span8 control-group full">
						<label class="control-label">
							公司概要</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea data-maxlength="公司概要不能超过200个字"
								data-maxlength-param="200"
								rows="350" cols="350" style="width: 100%;height: 113px;resize:none;" 
								name="customerOrderEntity.customerSubItemView.remark" id="remark">{{remark}}</textarea>
							</div>
						</div>	
				</div> 
			</div> 
		</form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="CapitalSideList.save()"><i class=""></i>保存</a>
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="CapitalSideList.canclePurchase()"><i class=""></i>取消</a>
	    </div>
	</div>  
</script>

<div id="pop_up_show" style="display: none;"> 
   
</div>
