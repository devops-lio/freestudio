<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/baseDataConfig.js"></script>
<!-- 查询条件block -->
<div id="parentDataConfig">
	<div class="widget-box">
	      <div class="widget-header">
	          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	      </div>
	      <div class="widget-body">
	          <div class="widget-form">
	              <div class="form-toolbar">
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfig.query();"><i class=""></i>查询<br /></a>
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfig.clear();"><i class=""></i>重置<br /></a>
				</div>
					<form action="" id="basicDataQueryForm" class="form-horizontal fromPre">
							<div class="row-fluid">
								<div class="span3 control-group full">
									<label class="control-label">
										中文名称
									</label>
									<div class="controls txt">
										<input type="text" 
											placeholder="请输入"  name="condition.nameCn"
											>
									</div>
								</div>
								<div class="span3 control-group full">
									<label class="control-label">
										英文名称
									</label>
									<div class="controls txt">
										<input type="text" 
											placeholder="请输入"  name="condition.nameEn" >
									</div>
								</div>
								<input type="hidden" name="condition.parentCode" id="parentCodeQuery" value="0">
							</div>
					</form>
				</div>
			</div>
		</div>
		<!-- 查询列表-->
		<div class="widget-box">
			<div class="widget-header">
				<span class="widget-title"><i class="icon-list"></i>基础数据列表</span>
		        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
			</div>
		   <div class="widget-body">
				<div class="widget-grid">
				<!-- mmGrid -->
				<table id="mmg" class="mmg">
			       <tr>
			           <th rowspan="" colspan=""></th>
			       </tr>
			   	</table>
			   	<div id="pg" style="text-align: right;"></div>
			</div>
		</div>
	</div>
</div>

<div id="childDataConfig" style="display:none;">
	<div class="widget-box">
      <div class="widget-header">
          <span id="title" class="widget-title"><i class=""></i> 父标识：</span> 
          <span onclick="javascript:BaseDataConfigChild.backChild();" class="widget-toolbar">
	          <a style="width: 50px;"  href="javascript:void(0);" >
		          <i class="icon-remove" style="color: white;"> 关闭
		          </i>
	          </a>
          </span>
      </div>
		 <div class="widget-body" >
			<div class="grid-toolbar" style="margin-top:10px;">
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfigChild.addChild();"><i class=""></i>保存</a>
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfigChild.addFormclearChild();"><i class=""></i>重置</a>  
			</div>
	        <form action="" id="basicDataChildEditorForm" class="form-horizontal" style="margin-top: 0px;">
	         	<input type="hidden" id="tempCodeChild">
	        	<input type="hidden" name="basicDataModel.id" id="idChild" value="${basicDataModel.id}">
	         	<input type="hidden" name="basicDataModel.parentCode" id="parentCode" value="${basicDataModel.parentCode}">
		        
		        <div class="row-fluid" style="margin-top:15px;">
		        	<div class="span7 control-group full">
				        <div class="row-fluid">
				        	<div class="span6 control-group full">
									<label class="control-label">标识<span style="color: red;">*</span></label>
									<div class="controls txt">
										<input type="text" data-required="标识不能为空！"	data-maxlength="参数编号不能超过30位"
												data-maxlength-param="30" maxlength=30 id="codeChild"
												name="basicDataModel.code" value="${basicDataModel.code}">
									</div>
							</div>
							<div class="span6 control-group full ">
								<label class="control-label">排序号</label>
								<div class="controls txt">
									<input type="text"  data-number="只能输入数字!"	data-maxlength="参数编号不能超过30位"
												data-maxlength-param="30" maxlength=30 id="sequenceNoChild" 
												name="basicDataModel.sequenceNo" value="${basicDataModel.sequenceNo}">
								</div>
							</div>
				        </div>
				        <div class="row-fluid" style="margin-top:9px;">
							<div class="span6 control-group full">
								<label class="control-label">中文名称</label>
								<div class="controls txt">
									<input type="text" 	data-maxlength="参数编号不能超过30位"
											data-maxlength-param="30" maxlength=30 id="nameCnChild"
											name="basicDataModel.nameCn" value="${basicDataModel.nameCn}">
								</div>
							</div>
							<div class="span6 control-group full">
								<label class="control-label">英文名称</label>
								<div class="controls txt">
									<input type="text" 	data-maxlength="参数值不能超过30位"
											data-maxlength-param="30" maxlength=30 id="nameEnChild"
										name="basicDataModel.nameEn" value="${basicDataModel.nameEn}">
								</div>
							</div>
						</div>
					</div>	
					<div class="span5 control-group full">
						<div class="row-fluid">
							<div class="span11 control-group full">
									<label class="control-label" >备注</label>
									<div class="controls" style="margin-top: 0px;">
										<textarea   data-maxlength="备注不能超过200个字!" data-maxlength-param="200" rows="350" 
										cols="350" style="width: 100%;height: 65px;resize:none;" name="basicDataModel.reMark" id="reMarkChild">${basicDataModel.reMark}
									</textarea>
									</div>
							</div>	
						</div>
					</div>	
				</div>		
			 </form>   
		  </div> 
	   <div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.editChild();"><i class=""></i>编辑</a>
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.deleteBasicDataChild();"><i class=""></i>删除</a>  
				</div>
			<!-- mmGrid -->
			<table id="mmgChild" class="mmg">
		       <tr>
		           <th rowspan="" colspan=""></th>
		       </tr>
		   	</table>
		   	<div id="pgChild" style="text-align: right;"></div>
		</div>
	</div>
	</div>

</div>
	