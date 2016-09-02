<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.buttonRomve{
background-image:url("res/pureui/lib/zTree/img/zTreeStandard.gif");
margin-right:2px; background-position:-111px -65px; vertical-align:top; *vertical-align:middle
}
.file{ position:absolute;right:40px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px; }
</style>
<script type="text/javascript" src="xascf/fancing/js/personRootMaterialInfo.js"></script>	
<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">基本材料信息<span style="color:red;">*</span>
	<a href="javascript:void(0)" onclick="PersonRootMaterialInfo.editRootType()">添加其他材料类型</a>
</div>
<div class="row-fluid " style="margin-top: -10px;">
						   <table class="table table-bordered" style="margin-top: 10px" id="rootMaterialTable">  
							<tr>
								<td style="text-align: center;" onmouseout="">文件类型</td>
								<td style="text-align: center;">操作</td>
								<td style="text-align: center;">上传文件名</td>
							</tr>
							<c:if test="${rootItemList==null }">
							<tr>
								<td style="text-align: center;color: red;width:250px;">户口本 
								<input type="hidden" id="type_hkb"  value="户口本"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield' data-required="户口本 文件不能为空！"
										 id='textfielid_hkb' style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_hkb" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('hkb')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_hkb">
								</td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">房产证
								<input type="hidden" id="type_fcz"  value="房产证"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield' data-required="房产证不能为空！"
										 id='textfielid_fcz' style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_fcz" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('fcz')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_fcz">
								</td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">车辆行驶证
								<input type="hidden" id="type_clxsz"  value="车辆行驶证"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield' data-required="车辆行驶证不能为空！"
										 id='textfielid_clxsz' style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_clxsz" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('clxsz')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_clxsz">
								</td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">结婚证(单身证明)
								<input type="hidden" id="type_jhz"  value="结婚证(单身证明)"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield' data-required="结婚证(单身证明)不能为空！"
										 id='textfielid_jhz' style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_jhz" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('jhz')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_jhz">
								</td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">主要银行账户流水
								<input type="hidden" id="type_yhls"  value="主要银行账户流水"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield' data-required="主要银行账户流水不能为空！"
										 id='textfielid_yhls' style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_yhls" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('yhls')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_yhls">
								</td>
							</tr>
							</c:if>
							<c:if test="${rootItemList!=null }">
							 <c:forEach var="item" items="${ rootItemList}">
							    <c:if test="${item.materialRoot=='1' }">
							 	<tr>
								<td style="text-align: center;color: red;width:250px;">${item.materialType }
								<input type="hidden" id="type_${item.id}"  value="${item.materialType }"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type="text" name="textfield" value="${item.materialFileName }"
										 id="textfielid_${item.id }" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type="button"  value="浏览..." class="btn" style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_${item.id }" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('${item.id }')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_${item.id }">
								<a target="_blank"  href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName }</a>
								</td>
							</tr>
							 </c:if>
							 <c:if test="${item.materialRoot=='3' }">
								 	<tr>
										<td style="text-align: center;color: red;width:250px;" onmouseover="PersonRootMaterialInfo.addRomove(this,'${item.materialType}')">${item.materialType }
										<input type="hidden" id="type_${item.id}"  value="${item.materialType }"/>
										</td>
										<td style="text-align: center; width:350px;" >  
											<div class="controls" style="width:350px;">
												<input type="text" name="textfield" data-required="${item.materialFileName }不能为空！" value="${item.materialFileName }"
												 id="textfielid_${item.id }" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
												<input type="button"  value="浏览..." class="btn" style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
												<input type="file" name="file" class="file"  id="file_${item.id }" size="28" style="height:25px;width:80px;"
													onchange="PersonRootMaterialInfo.fileUpLoad('${item.id }')" contenteditable="false" />	
											</div>
										</td>
										<td style="text-align: center;" id="upLoadedName_${item.id }"><input type="hidden" name="type_ids"  value="${item.materialType}"/>
										<a target="_blank"  href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName }</a>
										</td>
									</tr>
							 	</c:if>
							 </c:forEach>
							</c:if>
						</table>  
						   
			 		</div>
			 		<div id="continueInfo" style="display: none;" >
					 	<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">买断式融资材料<span style="color:red;">*</span>
					 	</div>
					 	<div class="row-fluid " style="margin-top: -10px;width: 90.5%">
					 			<table class="table table-bordered" style="margin-top: 10px" id="continueMaterialTable">  
									<tr>
										<td style="text-align: center;">文件类型</td>
										<td style="text-align: center;">操作</td>
										<td style="text-align: center;">上传文件名</td>
									</tr>
									<c:if test="${rootItemList!=null }">
							 <c:forEach var="item" items="${ rootItemList}">
							    <c:if test="${item.materialRoot=='2' }">
							 	<tr>
								<td style="text-align: center;color: red;width:250px;">${item.materialType }
								<input type="hidden" id="type_${item.id}"  value="${item.materialType }"/>
								</td>
								<td style="text-align: center; width:350px;" >  
									<div class="controls" style="width:350px;">
										<input type="text" name="textfield" data-required="验资报告不能为空！" value="${item.materialFileName }"
										 id="textfielid_${item.id }" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type="button"  value="浏览..." class="btn" style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file"  id="file_${item.id }" size="28" style="height:25px;width:80px;"
											onchange="PersonRootMaterialInfo.fileUpLoad('${item.id }')" contenteditable="false" />	
									</div>
								</td>
								<td style="text-align: center;" id="upLoadedName_${item.id }">
								<a target="_blank"  href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName }</a>
								</td>
							</tr>
							 </c:if>
							 </c:forEach>
							</c:if>
								</table>  
					 		</div>
					 </div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_root">
        <div class="win-header">
            <span>其他基本材料类型</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_root">
        </div>
    </div>
</div>
 	