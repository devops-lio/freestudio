<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.buttonRomve {
	background-image: url("res/pureui/lib/zTree/img/zTreeStandard.gif");
	margin-right: 2px;
	background-position: -111px -65px;
	vertical-align: top;
	*vertical-align: middle
}

.file {
	position: absolute;
	right: 40px;
	height: 24px;
	filter: alpha(opacity : 0);
	opacity: 0;
	width: 260px;
}
</style>
<script type="text/javascript"
	src="xascf/fancing/js/companyRootMaterialInfo.js"></script>


<div class="widget-box">
	<div class="widget-header" style="background-color: #B9AF43">
		<span class="widget-title"><i class="icon-list"></i>授信材料信息<span
			style="color:red;">*</span>
		</span> <span class="widget-toolbar"><a href="#"
			data-action="collapse"><i class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<div class="row-fluid " style="margin-top: -10px;">
					<table class="table table-bordered" style="margin-top: 10px">
						<tr>
							<td style="text-align: center;">文件类型</td>
							<td style="text-align: center;">操作</td>
							<td style="text-align: center;">上传文件名</td>
						</tr>
						<c:if test="${rootItemList==null }">
							<tr>
								<td style="text-align: center;color: red;width:250px;">贷款卡查询报告
									<input type="hidden" id="type_gszc" value="公司章程(含修正案)" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="公司章程(含修正案)文件不能为空！" id='textfielid_gszc'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_gszc"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('gszc')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_gszc"></td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">近两年经审计的财报 <input
									type="hidden" id="type_dkkh" value="贷款卡信息(卡号)" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="贷款卡信息(卡号)不能为空！" id='textfielid_dkkh'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_dkkh"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('dkkh')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_dkkh"></td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">近两年的收入明细 <input
									type="hidden" id="type_sjbg" value="近两年的审计报告" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="近两年的审计报告不能为空！" id='textfielid_sjbg'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_sjbg"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('sjbg')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_sjbg"></td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">上季度财务报表 <input
									type="hidden" id="type_srmx" value="近两年的收入明细" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="近两年的收入明细不能为空！" id='textfielid_srmx'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_srmx"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('srmx')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_srmx"></td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">上月财务报表 <input
									type="hidden" id="type_cwbb" value="上季度财务报表" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="上季度财务报表不能为空！" id='textfielid_cwbb'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_cwbb"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('cwbb')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_cwbb"></td>
							</tr>
							<tr>
								<td style="text-align: center;color: red;">物流保险保单 <input
									type="hidden" id="type_wlbd" value="物流保险保单" /></td>
								<td style="text-align: center; width:350px;">
									<div class="controls" style="width:350px;">
										<input type='text' name='textfield'
											data-required="物流保险保单不能为空！" id='textfielid_wlbd'
											style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
										<input type='button' value='浏览...' class='btn'
											style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
										<input type="file" name="file" class="file" id="file_wlbd"
											size="28" style="height:25px;width:80px;"
											onchange="ComapnyRootMaterialInfo.fileUpLoad('wlbd')"
											contenteditable="false" />
									</div></td>
								<td style="text-align: center;" id="upLoadedName_wlbd"></td>
							</tr>
							<tr id="rootMaterialTable">
								<td  colspan="2"><a style="margin-left: 250px;" href="#" onclick="ComapnyRootMaterialInfo.editRootType()">添加其他材料</a> 
								</td>
							</tr>
						</c:if>
						<c:if test="${rootItemList!=null }">
							<c:forEach var="item" items="${ rootItemList}">
								<c:if test="${item.materialRoot=='1' }">
									<tr>
										<td style="text-align: center;color: red;width:250px;">${item.materialType
											} <input type="hidden" id="type_${item.id}"
											value="${item.materialType }" /></td>
										<td style="text-align: center; width:350px;">
											<div class="controls" style="width:350px;">
												<input type="text" name="textfield"
													data-required="${item.materialFileName }不能为空！"
													value="${item.materialFileName }"
													id="textfielid_${item.id }"
													style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
												<input type="button" value="浏览..." class="btn"
													style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
												<input type="file" name="file" class="file"
													id="file_${item.id }" size="28"
													style="height:25px;width:80px;"
													onchange="ComapnyRootMaterialInfo.fileUpLoad('${item.id }')"
													contenteditable="false" />
											</div></td>
										<td style="text-align: center;" id="upLoadedName_${item.id }">
											<a target="_blank"
											href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName
												}</a></td>
									</tr>
								</c:if>
								<c:if test="${item.materialRoot=='3' }">
									<tr>
										<td style="text-align: center;color: red;width:250px;"
											onmouseover="ComapnyRootMaterialInfo.addRomove(this,'${item.materialType}')">${item.materialType
											} <input type="hidden" id="type_${item.id}"
											value="${item.materialType }" /></td>
										<td style="text-align: center; width:350px;">
											<div class="controls" style="width:350px;">
												<input type="text" name="textfield"
													data-required="${item.materialFileName }不能为空！"
													value="${item.materialFileName }"
													id="textfielid_${item.id }"
													style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
												<input type="button" value="浏览..." class="btn"
													style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
												<input type="file" name="file" class="file"
													id="file_${item.id }" size="28"
													style="height:25px;width:80px;"
													onchange="ComapnyRootMaterialInfo.fileUpLoad('${item.id }')"
													contenteditable="false" />
											</div></td>
										<td style="text-align: center;" id="upLoadedName_${item.id }"><input
											type="hidden" name="type_ids" value="${item.materialType}" />
											<a target="_blank"
											href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName
												}</a></td>
									</tr>
								</c:if>
							</c:forEach>
						</c:if>
					</table>

				</div>
				<div id="continueInfo" style="display: none;">
					<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
						买断式融资材料<span style="color:red;">*</span>
					</div>
					<div class="row-fluid " style="margin-top: -10px;width: 90.5%">
						<table class="table table-bordered" style="margin-top: 10px"
							id="continueMaterialTable">
							<tr>
								<td style="text-align: center;">文件类型</td>
								<td style="text-align: center;">操作</td>
								<td style="text-align: center;">上传文件名</td>
							</tr>
							<c:if test="${rootItemList!=null }">
								<c:forEach var="item" items="${ rootItemList}">
									<c:if test="${item.materialRoot=='2' }">
										<tr>
											<td style="text-align: center;color: red;width:250px;">${item.materialType
												} <input type="hidden" id="type_${item.id}"
												value="${item.materialType }" /></td>
											<td style="text-align: center; width:350px;">
												<div class="controls" style="width:350px;">
													<input type="text" name="textfield"
														data-required="验资报告不能为空！"
														value="${item.materialFileName }"
														id="textfielid_${item.id }"
														style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />
													<input type="button" value="浏览..." class="btn"
														style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />
													<input type="file" name="file" class="file"
														id="file_${item.id }" size="28"
														style="height:25px;width:80px;"
														onchange="ComapnyRootMaterialInfo.fileUpLoad('${item.id }')"
														contenteditable="false" />
												</div></td>
											<td style="text-align: center;" id="upLoadedName_${item.id }">
												<a target="_blank"
												href="xascf/util/download.shtml?fileName=${item.materialFileName }&url=${item.materialUrl }">${item.materialFileName
													}</a></td>
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
						<div class="win-content" id="tabwin_add_content_root"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>








