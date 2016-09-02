<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/baseDataConfigChild.js"></script>
<!-- 查询条件block -->
<div class="widget-box">
      <div class="widget-header">
	    <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	    <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfigChild.queryChild();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BaseDataConfigChild.clear();"><i class=""></i>重置<br /></a>
			</div>
				<form   id="basicDataChildQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									key
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入" name="condition.code" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									中文值
								</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入"  name="condition.nameCn"	>
								</div>
							</div>
							<input type="hidden" name="condition.parentCode" id="parentCodeQuery" value="${parentCode }">
						</div>
				</form>
			</div>
		</div>
	</div>
	   <div class="widget-body" style="border-bottom: 1px solid #ccc;">
	   	<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>${nameCn }子项列表</span>
	        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.addChild();"><i class=""></i>新增</a>
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.editChild();"><i class=""></i>编辑</a>
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.deleteBasicDataChild();"><i class=""></i>删除</a>  
				</div>
			<!-- mmGrid -->
			<table id="mmg" class="mmg">
		       <tr>
		           <th rowspan="" colspan=""></th>
		       </tr>
		   	</table>
		   	<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
	<div class="row-fluid" style="margin-top: 20px;text-align: center;">
		<a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.backChild()"><i class=""></i>返回</a>
	</div>
<div class="row-fluid">
	<div class="win span4" id="tabwin_baseData" >
        <div class="win-header">
            <span>基础数据子项</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_baseData_content" >
        </div>
       </div>
   </div>	
<script id="baseData-template-tab" type="text/x-handlebars-template">
<div class="form-search">
		<form action="" id="basicDataChildEditorForm" class="form-horizontal" style="margin-top: 0px;">
	         	<input type="hidden" id="tempCodeChild">
	        	<input type="hidden" name="basicDataModel.id" id="idChild" value="{{id}}">
				<input type="hidden" value="{{rowIndex}}" name="rowIndex">
	        	<input type="hidden" name="basicDataModel.dataPid" id="dataPid" value="{{dataPid}}">
	         	<input type="hidden" name="basicDataModel.parentCode" id="parentCode" value="{{parentCode}}">
		        	<div class="row-fluid" >
				        	<div class="span9 control-group full">
									<label class="control-label"><span style="color: red;">*</span>KEY</label>
									<div class="controls txt">
										<input type="text"  placeholder="请输入" data-required="KEY不能为空！"	data-maxlength="KEY不能超过30位"
												data-maxlength-param="30" maxlength=30 id="codeChild"
												name="basicDataModel.code" value="{{code}}">
									</div>
							</div>
					</div>
					<div class="row-fluid">
							<div class="span9 control-group full">
								<label class="control-label"><span style="color: red;">*</span>中文值</label>
								<div class="controls txt">
									<input type="text"  placeholder="请输入"	data-maxlength="中文值不能超过30位" data-required="中文值不能为空！"
											data-maxlength-param="30" maxlength=30 id="nameCnChild"
											name="basicDataModel.nameCn" value="{{nameCn}}">
								</div>
							</div>
					</div>
					<div class="row-fluid">
							<div class="span9 control-group full">
								<label class="control-label">英文名称</label>
								<div class="controls txt">
									<input type="text" 	
											data-maxlength-param="30" maxlength=30 id="nameEnChild"  placeholder="请输入"
										name="basicDataModel.nameEn" value="{{nameEn}}">
								</div>
							</div>
					</div>
					<div class="row-fluid">
							<div class="span9 control-group full ">
								<label class="control-label">排序号</label>
								<div class="controls txt">
									<input type="text"  data-number="只能输入数字!"	  placeholder="请输入数字"
												data-maxlength-param="30" maxlength=30 id="sequenceNoChild" 
												name="basicDataModel.sequenceNo" value="{{sequenceNo}}">
								</div>
							</div>
				     </div>
			 </form>
			<div class="form-search-btn" >
		       	 	<a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.saveChild()"><i class=""></i>确定</a>
		        	<a class="btn btn-primary" href="javascript:void(0)" onclick="BaseDataConfigChild.cancle()"><i class=""></i>取消</a>
		    	</div> 
</div>  
</script>	