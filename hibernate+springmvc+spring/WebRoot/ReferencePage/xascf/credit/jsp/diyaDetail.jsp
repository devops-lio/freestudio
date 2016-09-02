<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>抵押信息 </span>
	</div>
	<div class="widget-body"
		style="font-size: 12px;margin-bottom: -5px;">
		<table class="table table-bordered" id="buyerTable">
			<tr>
				<th style="text-align: center;">抵押类型</th>
				<th style="text-align: center;">抵押文件编号</th>
				<th style="text-align: center;">抵押文件</th>
			</tr>
			<c:forEach items="${creditEntity.diyaList}" var="item">
				<tr>
				<td style="text-align: center;">
				<c:if test="${item.qualificationType=='5'}">房产抵押</c:if>
												<c:if
													test="${item.qualificationType=='6'}">车辆抵押</c:if>
												<c:if
													test="${item.qualificationType=='7'}">土地抵押</c:if>
				
				
				</td>
				<td style="text-align: center;">${item.qualificationNo }</td>
				<c:set value="${fn:split(item.qualificationName, ',')}" var="names" />
								<c:set value="${fn:split(item.qualificationUrl, ',')}" var="urls" />
								<td style="text-align: center;font-size:12px">
									<c:forEach items="${urls}" var="url" varStatus="status">
										<a href="#" onclick="FileUtil.downLoad('${url}','${names[status.index]}');">${names[status.index]}</a>
									</c:forEach>
								</td>
				</tr>
			</c:forEach>
		</table>
	</div>
</div>