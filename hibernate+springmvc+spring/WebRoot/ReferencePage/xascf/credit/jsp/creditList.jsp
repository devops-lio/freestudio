<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/credit/js/creditDetailPop.js"></script>
<script type="text/javascript" src="xascf/credit/js/creditList.js"></script> 
 <%
//产品类型
	pageContext.setAttribute("FANCING_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_TYPE"));
	//保理类别
	pageContext.setAttribute("FANCING_FUNCTION", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_FUNCTION"));
	//保理方式
	pageContext.setAttribute("FANCING_KINDS", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_KINDS"));
	//担保方式
	pageContext.setAttribute("GURANTEE_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("GURANTEE_TYPE"));
	%>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="CreditList.load();">查询</a>
				<a class="btn btn-primary" onclick="CreditList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="creditQueryForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">授信编号</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.creditNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">会员名称</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.memberName">
						</div>
					</div>
					
					
					<div class="span3 control-group full">
						<label class="control-label" for="">产品类别</label>
						<div class="controls">
							<select name="condition.financingType"  data-placeholder="请选择..."
								class="chzn-select"  >
								<c:forEach items="${FANCING_TYPE}" var="item">
								<option value=""></option>
								<option value="${item.code}">${item.nameCn}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="span3 control-group full" id="financingMethodDiv">
						<label class="control-label" for="">保理类别</label>
						<div class="controls">
							<select name="condition.financingMethod"  data-placeholder="请选择..."
								class="chzn-select"  >
								<c:forEach items="${FANCING_FUNCTION}" var="item">
								<option value=""></option>
								<option value="${item.code}">${item.nameCn}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					
				</div>
				<div class="row-fluid">
				<div class="span3 control-group full">
						<label class="control-label" for="">开始日期</label>
						<div class="controls time">
							<input type="text"
								name="condition.effectiveStartTime">
							<i class="date" data-format="yyyy-MM-dd"
								></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">结束日期</label>
						<div class="controls time">
							<input type="text"
								name="condition.effectiveEndTime">
							<i class="date" data-format="yyyy-MM-dd"
								></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">状态</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"
								name="condition.status"
								optionsType="CREDIT_STATUS">
								<slt:outHTML>id="status"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
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
		<span class="widget-title"><i class="icon-list"></i>我的授信列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<!--1.所有的授信申请页面 ================= -->
		<div class="tab-pane active" id="allTab" >
			<div class="widget-grid">	
				<!-- mmGrid -->
				<table id="mmg-all" class="mmg">
				</table>
				<div id="pg-all" style="text-align: right;">
				</div>
			</div>
		</div>
		<!--  
		<div class="tabbable" style="margin-left: 0px;">
			<ul id="tabLabel" class="nav nav-tabs">
		  		<li  class="active">
			    	<a href="#allTab" data-toggle="tab" id="allTabBt">全部</a>
			    </li>
			    <li>
			    	<a href="#newTab" data-toggle="tab" id="newTabBt" >新建</a>
			    </li>
			    <li>
			    	<a href="#mdTab" data-toggle="tab" id="mdTabBt" >待市场总监确认</a>
			    </li>
			    <li>
			    	<a href="#scoreTab" data-toggle="tab" id="scoreTabBt" >待材料评分</a>
			    </li>
			    <li>
			    	<a href="#setTab" data-toggle="tab" id="setTabBt" >待授信设定</a>
			    </li>
			    <li>
			    	<a href="#reviewTab" data-toggle="tab" id="reviewTabBt">待复核确认</a>
			    </li>
			    <li>
			    	<a href="#throughTab" data-toggle="tab" id="throughTabBt">已通过</a>
			    </li>
			    <li>
			    	<a href="#backTab" data-toggle="tab" id="backTabBt">退回</a>
			    </li>
			    <li>
			    	<a href="#cancelTab" data-toggle="tab" id="cancelTabBt">作废</a>
			    </li>
			    
			    
		  	</ul>
		  	<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;margin-top: -10px;padding-top: 0px;">
			-->	
				
				<!--2.新建页面 ================= 
				<div class="tab-pane" id="newTab" >
					<div class="widget-grid">	
						<table id="mmg-new" class="mmg">
						</table>
						<div id="pg-new" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--3.待市场总监确认页面 ================= 
				<div class="tab-pane" id="mdTab" >
					<div class="widget-grid">	
						<table id="mmg-md" class="mmg">
						</table>
						<div id="pg-md" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--4.待材料评分页面 ================= 
				<div class="tab-pane" id="scoreTab" >
					<div class="widget-grid">	
						<table id="mmg-score" class="mmg">
						</table>
						<div id="pg-score" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--5.待授信设定页面 ================= 
				<div class="tab-pane" id="setTab" >
					<div class="widget-grid">	
						<table id="mmg-set" class="mmg">
						</table>
						<div id="pg-set" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--6.待复核确认页面 ================= 
				<div class="tab-pane" id="reviewTab" >
					<div class="widget-grid">	
						<table id="mmg-review" class="mmg">
						</table>
						<div id="pg-review" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--7.已通过页面 ================= 
				<div class="tab-pane" id="throughTab" >
					<div class="widget-grid">	
						<table id="mmg-through" class="mmg">
						</table>
						<div id="pg-through" style="text-align: right;">
						</div>
					</div>
				</div>
				-->
				<!--8.退回页面 =================
				<div class="tab-pane" id="backTab" >
					<div class="widget-grid">	
						<table id="mmg-back" class="mmg">
						</table>
						<div id="pg-back" style="text-align: right;">
						</div>
					</div>
				</div>
				 -->
				<!--9.作废页面 ================= 
				<div class="tab-pane" id="cancelTab" >
					<div class="widget-grid">	
						<table id="mmg-cancel" class="mmg">
						</table>
						<div id="pg-cancel" style="text-align: right;">
						</div>
					</div>
				</div>
				
			</div>
		</div>-->
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

<div class="row-fluid">
    <div class="win" id="creditDetail"  style="width:1150px;">
	    <div class="win-header">
			<span>授信信息</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="creditDetailContent"></div>
	</div>
 </div>
 

