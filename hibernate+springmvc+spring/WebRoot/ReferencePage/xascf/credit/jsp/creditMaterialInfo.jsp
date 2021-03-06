<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<style>
.file {
	position: absolute;
	right: 40px;
	height: 24px;
	filter: alpha(opacity : 0);
	opacity: 0;
	width: 260px;
}

.tdTittl{
background-attachment: scroll;
    background-color: #f3f3f3;
    background-image: linear-gradient(to bottom, #f8f8f8, #ececec);
    background-position: 0 0;
    background-repeat: repeat-x;
    font-size: 13px;
    font-weight: bold;
    text-align: center;

}
</style>

<div class="widget-box">
	<div class="widget-header" >
		<span class="widget-title"><i class="icon-list"></i>授信材料信息
		</span> <span class="widget-toolbar"><a href="#"
			data-action="collapse"><i class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<div class="row-fluid " style="margin-top: -10px;">
					<table id="creditMaterial" class="table table-bordered" style="margin-top: 10px">
							<tr>
								<td class="tdTittl" style="text-align: center;">文件类型</td>
								<td class="tdTittl" style="text-align: center;">上传文件名</td>
								<td class="tdTittl" style="text-align: center;">有效时间</td>
							</tr>
							<c:forEach items="${creditEntity.materialCreditItemList}" var="item" varStatus="status">
							<tr>
								<td style="text-align: center;vertical-align: middle;font-size:12px">${item.typeName }</td>
								<c:set value="${fn:split(item.allFileName, ',')}" var="names" />
								<c:set value="${fn:split(item.allFileUrl, ',')}" var="urls" />
								<td style="text-align: center;font-size:12px">
									<c:forEach items="${urls}" var="url" varStatus="status">
										<a href="#" onclick="FileUtil.downLoad('${url}','${names[status.index]}');">${names[status.index]}</a>
									</c:forEach>
								</td>
								
								<td style="text-align: center;">${item.effectiveTimeEnd }</td>
							</tr>
							
							</c:forEach>
					</table>
				</div>
			</div>
		</div>
		
	</div>
</div>








