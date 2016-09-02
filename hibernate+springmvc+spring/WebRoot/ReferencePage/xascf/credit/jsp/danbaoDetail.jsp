<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="widget-box" style="border-bottom: 0px;">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>担保信息 </span>
	</div>
	<div class="widget-body"
		style="font-size: 12px;margin-bottom: -5px;">
		<table class="table table-bordered" id="buyerTable">
			<tr>
				<th style="text-align: center;">担保公司</th>
				<th style="text-align: center;">担保协议</th>
			</tr>
			<c:forEach items="${creditEntity.danbaoItemList}" var="item">
				<tr>
				<td style="text-align: center;">${item.guranteeName}</td>
				<c:set value="${fn:split(item.guaranteeProtocolName, ',')}" var="names" />
								<c:set value="${fn:split(item.guaranteeProtocolUrl, ',')}" var="urls" />
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