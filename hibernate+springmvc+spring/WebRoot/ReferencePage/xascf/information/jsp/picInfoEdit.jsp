<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/information/js/picInfoEdit.js"></script> 
	<div class="widget-box" style="margin-top: 0px; margin-bottom: 0px; border-top:0px;border-left:1px solid #ccc;">
		<div class="widget-body" style="padding: 5px; border-bottom-width: 0px;border-left:0px;" >
			<div class="widget-main padding-6">
				<form action="" id="picInfoEditorForm">
					<div class="form-horizontal">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									<span style="color: red;">*</span>标题
								</label>
								<div class="controls txt" style="width: 400px;">
									<input type="text"  data-required="标题不能为空！" 
										placeholder="请输入" name="noticeInfoModel.noticeTitle" 
										 value="${noticeInfoModel.noticeTitle }">
								</div>
							</div>						
						</div>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									排序
								</label> 
								<div class="controls txt" style="width: 250px;">
									<input type="text"   data-number="只能输入数字!" 
										data-maxlength-param="3" maxlength=3 
										placeholder="请输入" name="noticeInfoModel.sequence" 
										 value="${noticeInfoModel.sequence}">
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									是否置顶
								</label>
								<div style="margin-left: 100px;">
									<input type="checkbox" id ="isTopCheck">
								</div>
							</div>				
						</div>	
						<div class="row-fluid">
				            <div class="span4 control-group full">
				                <label class="control-label"><span style="color: red;">*</span>图片上传</label>
				                <div class="controls" style="width:250px;"> 
								  <input type="hidden" value="${noticeInfoModel.picUrl}" id="picUrl" name="noticeInfoModel.picUrl">
				                  <input type='text' value="${noticeInfoModel.picName}" name="noticeInfoModel.picName" id='picName' 
				                  		 style="height:22px; border:1px solid #cdcdcd; width:146px;" data-required="图片信息不能为空！" />
										<input type='button'  value='浏览...' class='btn' id='btnxy' style="background-color:#FFF;  
												border:1px solid #CDCDCD;height:24px; width:64px;"
												onclick="picInfoEditor.upLoadMaterials()"/> 
				                </div>
							</div> 
						</div>			
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									<span style="color: red;">*</span>显示系统
								</label>
								<div style="margin-left: 135px">
									<input type="checkbox" id ="xascfCheck">信安利得
									<input type="checkbox" id ="jimiCheck">积米网
								</div>
							</div>				
						</div>				
						<div class="row-fluid">
							<div class="span4 control-group full">
							<label class="control-label" >
								<span style="color: red;">*</span>内容</label>
								<div class="controls" style="margin-top: 0px;width: 850px;height: 450px;">
									<textarea data-required="内容不能为空！"  name="contect" style="resize:none;" >${noticeInfoModel.noticeContent}</textarea>
							 
								</div>
							</div>	
						</div>
						<div class="row-fluid">
							<div class="span4 control-group full" style="margin-top: 20px;margin-left: 400px;" >
								<label class="control-label" style="padding-top:0px;width:200px;">
									<a class="btn btn-primary" href="javascript:void(0)"  onclick="javascript:picInfoEditor.save();">保存</a>
									<a class="btn btn-primary" href="javascript:void(0)"  onclick="javascript:picInfoEditor.back();">返回</a>
								
								</label>
								
							</div>
							<input type="hidden" name="noticeInfoModel.noticeContent" id="noticeContent">
							<input type="hidden" name="noticeInfoModel.isTop" id="isTop" value="${noticeInfoModel.isTop}" >
							<input type="hidden" name="noticeInfoModel.showingSystem" id="showingSystem" value="${noticeInfoModel.showingSystem}" >
							<input type="hidden" name="noticeInfoModel.id" value="${noticeInfoModel.id }" >
							<input type="hidden" name="noticeInfoModel.noticePid" value="${noticeInfoModel.noticePid}" >
						</div>	
					</div>
				</form>
			</div>
		</div>
	</div>
	