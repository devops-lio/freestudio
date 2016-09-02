<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<link rel="stylesheet" type="text/css" href="./xascf/style/gloable.css?version=2015">
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
		<span class="widget-title"><i class="icon-list"></i><span
			style="color:red;">*</span>授信材料信息
		</span> <span class="widget-toolbar"><a href="#"
			data-action="collapse"><i class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<div class="row-fluid " style="margin-top: -10px;">
					<input type="hidden" id="materialSize" value="${fn:length(creditEntity.materialCreditItemList)}">
					<input type="hidden" id="materialDefineSize" value="${fn:length(materialDefinelist)}">
					<table id="creditMaterialEdit" class="table table-bordered" style="margin-top: 10px">
						<tr>
							<td class="tdTittl" style="text-align: center;">材料名称</td>
							<td class="tdTittl" style="text-align: center;">操作</td>
							<td class="tdTittl" style="text-align: center;">文件名</td>
							<td class="tdTittl" style="text-align: center;">有效时间</td>
						</tr>
						<c:choose>
							<c:when test="${creditEntity.materialCreditItemList!=null}">
								<c:forEach items="${creditEntity.materialCreditItemList}" var="materialCreditItem" varStatus="status">
									<tr>
										<td style="text-align: left;width:250px;vertical-align: middle;font-size:12px" id="typeName_${status.index }">
										<c:if test="${materialCreditItem.isRequired==1}"> 
														<span style="color: red;">*</span></c:if>${materialCreditItem.typeName}
											<input type="hidden" id="pid${status.index}" value="${materialCreditItem.pid }" />
											<input type="hidden" id="materialDefinePid${status.index}" value="${materialCreditItem.materialDefinePid }" />
											<input type="hidden" id="flag${status.index}" />
											<input type="hidden" id="newName${status.index}" />
											<input type="hidden" id="url${status.index}" />
										</td>
										<td style="text-align: center; width:90px;vertical-align: middle;font-size:12px">
											<input type="button" id="liulan${status.index}" onclick="CreditMaterialEdit.upload('${status.index}');" value="上传"     style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										</td>
										<td id="td${status.index}" style="text-align: center;">
											<c:if test="${materialCreditItem.allFileUrl!=null}">
												<c:set value="${fn:split(materialCreditItem.allFileName, ',')}" var="names" />
												<c:set value="${fn:split(materialCreditItem.allFileUrl, ',')}" var="urls" />
												<c:set value="${fn:split(materialCreditItem.allFileReName, ',')}" var="newNames" />
												<c:forEach items="${urls}" var="url" varStatus="statusTwo">
													<span id="${newNames[statusTwo.index]}}">
														<a target="_blank"  
																	onclick="FileUtil.downLoad('${url}','${names[statusTwo.index]}')">${names[statusTwo.index]}</a>
							     	  					<a title="删除"  class="buttonRomve" onclick="CreditMaterialEdit.removeTr(this,'${newNames[statusTwo.index]}')">&nbsp;&nbsp;</a>
							     	  				</span>
												</c:forEach>
											</c:if>
										</td>
										<td style="text-align: center; width:200px;font-size:12px">
											<div class="control-group full">
												<div class="controls time" style="margin-top:6px;margin-left:10px;margin-right:10px;">
													<input type="text" data-required="有效时间不能为空！" id="timeStr${status.index}" value="${materialCreditItem.effectiveTimeEnd }">
													<i class="date" data-format="yyyy-MM-dd"></i>
												</div>
											</div>
										</td>
									</tr>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<c:forEach items="${materialDefinelist}" var="mdModel" varStatus="status">
									<tr>
										<td style="text-align: left;width:250px;vertical-align: middle;font-size:12px" id="typeName_${status.index }">
											<c:if test="${mdModel.isRequired==1}"> 
														<span style="color: red;">*</span>
											</c:if>${mdModel.typeName}
											<input type="hidden" id="materialDefinePid${status.index}" value="${mdModel.pid }" />
											<input type="hidden" id="flag${status.index}" />
											<input type="hidden" id="newName${status.index}" />
											<input type="hidden" id="url${status.index}" />
										</td>
										<td style="text-align: center; width:90px;vertical-align: middle;font-size:12px">
											<input type="button" id="liulan${status.index}" onclick="CreditMaterialEdit.upload('${status.index}');" value="上传"     style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										</td>
										<td id="td${status.index}" style="text-align: center;">
										</td>
										<td style="text-align: center; width:200px;font-size:12px">
											<div class="control-group full">
												<div class="controls time" style="margin-top:6px;margin-left:10px;margin-right:10px;">
													<input type="text" data-required="有效时间不能为空！" id="timeStr${status.index}" value="${materialCreditItem.effectiveTimeEnd }">
													<i class="date" data-format="yyyy-MM-dd"></i>
												</div>
											</div>
										</td>
									</tr>
								</c:forEach>
							</c:otherwise>
						</c:choose>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>








