<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/customerEmpower.js"></script>
<script type="text/javascript" src="xascf/customer/js/customerDetailPop.js"></script>

<%
	pageContext.setAttribute("levelList", 
			com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_LEVEL"));
%>

<script type="text/javascript">
	var levelArray = new Array();
	<c:forEach items="${levelList}" var="item">
		levelArray.push({name:'${item.code}',value:'${item.nameCn}'});
	</c:forEach>
</script>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>会员分配管理</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="CustomerEmpower.load();">查询</a>
				<a class="btn btn-primary" onclick="CustomerEmpower.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="customerSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">会员编号</label>
						<div class="controls txt">
							<input type="text" name="condition.memberNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">会员名称</label>
						<div class="controls txt">
							<input type="text" name="condition.customerName">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">会员类型</label>
						<div class="controls">
							<slt:select cssClass="chzn-select" name="condition.customerType" optionsType="CUSTOMER_TYPE">
								<slt:outHTML>id="customerType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">所属渠道</label>
						<div class="controls txt">
							<select name="condition.companyLevel"
								id="companyLevel" class="chzn-select" data-placeholder="请选择">
								<option value=""></option>
								<c:forEach items="${levelList}" var="item">
									<option value="${item.code}" ${condition.customerStatus == item.code ? "selected" : "" }>${item.nameCn}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label" for="">客户经理</label>
						<div class="controls txt">
							<input type="text" name="condition.businessPeople">
						</div>
					</div> 
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>会员列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
            <!-- mmGrid -->
			<div id="mmg-customer" class="mmg">
			</div>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div> 
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span8" id="tabwin_add_user">
        <div class="win-header">
            <span id="title_add_user"></span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_user_content">
        </div>
    </div>
</div>
