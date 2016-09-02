<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<c:if test="${rootItemList!=null }">
	 <c:forEach var="item" items="${ rootItemList}">
	    <c:if test="${item.materialRoot=='2' }">
	 	<tr>
		<td style="text-align: center;color: red;width:250px;">${item.materialType }
		<input type="hidden" id="type_${item.id}"  value="${item.materialType }"/>
		</td>
		<td style="text-align: center; width:350px;" >  
			<div class="controls" style="width:350px;">
				<input type="text" name="textfield" value="${item.materialFileName }"
				 id="textfielid_${item.id }" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
				<input type="button"  value="浏览..." class="btn" style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
				<input type="file" name="file" class="file"  id="file_${item.id }" size="28" style="height:28px;width:315px;"
					onchange="ShipFancing.fileUpLoad('${item.id }')" contenteditable="false" />	
			</div>
		</td>
		<td style="text-align: center;" id="upLoadedName_${item.id }">
		<a target="_blank"  href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName }</a>
		</td>
	</tr>
	 </c:if>
	 </c:forEach>
	</c:if>