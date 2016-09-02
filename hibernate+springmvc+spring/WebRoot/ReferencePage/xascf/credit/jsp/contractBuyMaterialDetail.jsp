<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.tdTittl {
	background-attachment: scroll;
	background-color: #f3f3f3;
	background-image: linear-gradient(to bottom, #f8f8f8, #ececec);
	background-position: 0 0;
	background-repeat: repeat-x;
	font-size: 12px;
	font-weight: bold;
	text-align: center;
}
.table th,.table td {
	padding: 3px;
}
a {
cursor: pointer;
}
 .materialInfoTr td {
	font-size: 12px;
	padding: 5px;
	vertical-align: middle;
}
a:hover, a:focus {
color: #005580;
text-decoration: none;
}
</style>
<script type="text/javascript">
var allHeight=$("#tabwin_buyMaterail_content").height();
	var tableHeight=$("#buyMaterial").height();
	$("#eidtMaterialBtn").css('margin-top',(allHeight-tableHeight-100)+'px');
</script>
<div class="widget-box"> 
<div class="widget-body">
<div class="widget-form">
	   		<div class="widget-main padding-6" style="margin-left: 0px;"> 
					<div class="row-fluid">   
					<input type="hidden" id="contractBuyPid" value="${contractBuyPid }"> 
						<table class="table table-bordered" id="buyMaterial">  
							<tr>
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">材料名称</span></td>   
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">文件名</span></td>   
							</tr> 
							<c:forEach items="${materailList}" var="item" >  
								<tr class="materialInfoTr">   	 
										<td style="text-align: left; width: 250px;" id="typeName_${item.id}">
											<c:if test="${item.isRequired==1}"><span style="color: red;">*</span></c:if>${item.typeName} 
										</td>
										<td style="text-align: center;width:auto;">
											<div style="text-align:center;" id="fileDiv_${item.id}">
												<c:if test="${not empty item.fileName}">
													<c:set var="fileNameArray" value="${fn:split(item.fileName, ',')}"></c:set>
													<c:set var="fileUrlArray" value="${fn:split(item.fileUrl, ',')}"></c:set>
													<c:set var="fileflagArray" value="${fn:split(item.fileFalg, ',')}"></c:set>
													<c:forEach items="${fileNameArray}" var="fileName" varStatus="status">
														<span>
															<a target="_blank" id="href_${item.id}" name="urlname_${item.id}"
															onclick="FileUtil.downLoad('${fileUrlArray[status.index]}','${fileName}')">${fileName}</a>
													    </span> 
												    </c:forEach> 
											    </c:if>
											</div> 
										</td>
									</tr>   
							</c:forEach>
						</table>  
					</div>	 
			</div>
			<div class="row-fluid " id="eidtMaterialBtn"
				style="margin-top: 100px;margin-bottom: 10px;text-align: center;">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancleById('tabwin_buyMaterail')"><i class=""></i>取消</a>
		</div>
		</div>
		</div>
	</div>
	







