<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/creditSpecialList.js"></script>
<script type="text/javascript" src="xascf/credit/js/creditDetailPop.js"></script>
<%
//产品类型
	pageContext.setAttribute("FANCING_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_TYPE"));
	//保理类别
	pageContext.setAttribute("FANCING_FUNCTION", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_FUNCTION"));
	%>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="creditSpecialList.query();">查询</a>
				<a class="btn btn-primary" onclick="creditSpecialList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="creditSpecialQueryForm">
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
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>授信特批列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<!-- mmGrid -->
		<table id="creditApply_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>

<div class="row-fluid">
    <div class="win" id="creditDetail"  style="width:1150px;">
	    <div class="win-header">
			<span>授信信息</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="creditDetailContent"></div>
	</div>
 </div>
 
