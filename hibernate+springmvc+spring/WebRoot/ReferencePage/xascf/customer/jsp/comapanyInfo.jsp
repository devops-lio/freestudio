<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/comapanyInfo.js"></script>   
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
		<span class="widget-title"><i class="icon-search"></i>企业登记查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="ComapanyInfo.load();">查询</a>
				<a class="btn btn-primary" onclick="ComapanyInfo.clear();">重置</a>
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
						<label class="control-label" for="">企业名称</label>
						<div class="controls txt">
							<input type="text" name="condition.customerName">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label" for="">客户来源</label>
						<div class="controls txt">
							<slt:select  cssClass="chzn-select" name="condition.customerSource" optionsType="CUS_COM_SOURCE">
								<slt:outHTML>id="customerSource"</slt:outHTML>
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
						<label class="control-label" for="">客户状态</label>
						<div class="controls txt">
						<slt:select  cssClass="chzn-select" name="condition.customerStatus" optionsType="CUS_COM_STATUS" > 
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								</slt:select> 
								</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>企业登记列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<ul  class="nav nav-tabs" style="margin-bottom: 0">
				<li id="oneNew" class="active">
					<a href="#customerTab" data-toggle="tab" id="customerBtn" onclick="ComapanyInfo.tabQuery('1');">普通会员</a>
				</li>
				<li id="twoPublish">
					<a href="#newCustomerTab" data-toggle="tab" id="newCustomerBtn" onclick="ComapanyInfo.tabQuery('2');">新建会员</a>
				</li> 
			</ul> 
		    <div class="grid-toolbar" id="buttonGroup">  
                <a class="btn btn-primary" onclick="ComapanyInfo.add();">新增</a>
                <a class="btn btn-primary" onclick="ComapanyInfo.update();">编辑</a> 
                <a class="btn btn-primary" onclick="ComapanyInfo._delete();">删除</a> 
                <a class="btn btn-primary" onclick="ComapanyInfo.companyResetPws();" style="display: none;">重置密码</a>   
                <!--  
                <a class="btn btn-primary" onclick="ComapanyInfo.detail();">会员信息</a>  
                -->
            </div> 
            <div class="tab-content"> 
                <!-- 普通会员 Tab 页面-->
				<div class="tab-pane active" id="customerTab"  >
					<div class="widget-grid">
						<table id="mmg-customer" class="mmg">
          					<th rowspan="" colspan=""></th>
						</table>
						<div id="pig" style="text-align: right;">
						</div>
					</div>
				</div>
				<!-- 新建会员 Tab 页面 --> 
				<div class="tab-pane" id="newCustomerTab"  >
					<div class="widget-grid">
						<table id="mmg-newcustomer" class="mmg">
          					<th rowspan="" colspan=""></th>
						</table>
						<div id="pg" style="text-align: right;">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 

<div class="row-fluid">
    <div class="win span8" id="tabwin_add_customerDetails">
	        <div class="win-header">
	            <span>会员信息详情</span> <i class="close">&times;</i>
	        </div>
        	<div class="win-content" id="tabwin_add_content_customerDetails">
        </div>
    </div>
</div>

<!-- 新增弹出框 --> 
<div class="row-fluid">
    <div class="win span4" id="pop_up_delay" style="width: 820px; height: 550px; overflow: visible;">
        <div class="win-header">
            <span id="check_span">基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_show_content">
        </div>
    </div>
</div>
<div id="pop_up_show" style="display: none;">  
</div>
