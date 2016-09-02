<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-header" >
		<span class="widget-title"><i class="icon-list"></i>历史审批记录
		</span> <span class="widget-toolbar"><a href="#"
			data-action="collapse"><i class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body"
		style="font-size: 12px;margin-bottom: -5px;">
		<table class="table table-bordered" id="buyerTable">
			<tr>
				<th style="text-align: center;" width="30px">序号</th>
				<th style="text-align: center;" width="60px">是否通过</th>
				<th style="text-align: center;">批复记录</th>
				<th style="text-align: center;" width="120px">批复时间</th>
				<th style="text-align: center;" width="140px">下一级操作</th>
				<th style="text-align: center;" width="100px">批复者员工号</th>
				<th style="text-align: center;" >批复者</th>
				<th style="text-align: center;" width="100px">批复角色</th>
			</tr>
			<c:forEach items="${recordList}" var="item" varStatus="status">
				<tr>
				<td style="text-align: center;">${status.index+1 }</td>
				<td style="text-align: center;">${item.approvalIspassed }</td>
				<td style="text-align: center;">${item.approvalRemark }</td>
				<td style="text-align: center;">
				<fmt:formatDate value="${item.approvalDate }" pattern="yyyy-MM-dd HH:mm:ss" /> 
				</td>
				<td style="text-align: center;">${item.approvalNext }</td>
				<td style="text-align: center;">${item.approvalerNo }</td>
				<td style="text-align: center;">${item.approvalerName }</td>
				<td style="text-align: center;">${item.approvalerRoleName }</td>
				</tr>
			</c:forEach>
		</table>
	</div>
</div>