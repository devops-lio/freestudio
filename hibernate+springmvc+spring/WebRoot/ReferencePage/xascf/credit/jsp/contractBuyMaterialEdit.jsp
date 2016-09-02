<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/contractBuyMaterialEdit.js"></script>	
<style>
</style>
<div class="widget-box"> 
<div class="widget-body">
<div class="widget-form">
	   		<div class="widget-main padding-6" style="margin-left: 0px;"> 
					<div class="row-fluid">   
					<input type="hidden" id="contractBuyPid" value="${contractBuyPid }"> 
						<table class="table table-bordered" id="buyMaterial">  
							<tr>
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">材料名称</span></td>   
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">操作</span></td>   
								<td class="tdTittl" style="text-align: center; "><span style="font-weight:bold;">文件名</span></td>   
							</tr> 
							<c:forEach items="${materailList}" var="item" >  
								<tr class="materialInfoTr">   	 
										<td style="text-align: left; width: 250px;" id="typeName_${item.id}">
											<c:if test="${item.isRequired==1}"><span style="color: red;">*</span></c:if>${item.typeName} 
										</td>
										<td style="text-align: center; width:90px;" >     
											<input type='button'  value='上传' id="Upload_${item.id}" class='btn' 
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;font-size:12px;"
											onclick="javascript:ContractBuyMaterailEdit.uploadBuyMaterialFile('hetongweitffujiacailiao','${item.id}')"/>   
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
														    <a style="cursor:pointer" title="删除" id="remove_${item.id}" 
														    	class="buttonRomve" onclick="ContractBuyMaterailEdit.removeBuyMaterial(${item.id},this,${fileflagArray[status.index]})">&nbsp;&nbsp;</a> 
													    </span> 
												    </c:forEach> 
											    </c:if>
											</div> 
											<div style="width: 90px; float:left;">       
												<input type="hidden" value="${item.pid}" id="materialDefinePid_${item.id}" name="materialPid">   
												<input type="hidden" value="${item.fileName}" id="filename_${item.id}" name="filename"> 
												<input type="hidden" value="${item.fileFalg}" id="flag_${item.id}" name="fileFalg">  
											</div>
										</td>
									</tr>   
							</c:forEach>
						</table>  
					</div>	 
			</div>
			<div class="row-fluid " id="eidtMaterialBtn"
				style="margin-top: 100px;margin-bottom: 10px;text-align: center;">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="ContractBuyMaterailEdit.addMaterial()"><i class=""></i>确定</a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="popCancleById('tabwin_buyMaterail')"><i class=""></i>取消</a>
		</div>
		</div>
		</div>
	</div>
	







