<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/agfancing/js/agfancingAuthorList.js"></script> 

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="AgfancingAuthorList.load();">查询</a>
				<a class="btn btn-primary" onclick="AgfancingAuthorList.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="solutionSearchForm"> 
				<div class="row-fluid "> 
					<div class="span3 control-group full">
						<label class="control-label" for="">方案名称</label>
						<div class="controls txt">
							<input type="text"  placeholder="请输入" name="condition.solutionName">
						</div>
					</div> 
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>方案列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar">  
                <a class="btn btn-primary" onclick="AgfancingAuthorList.add();">新增</a>
                <a class="btn btn-primary" onclick="AgfancingAuthorList.edit();">编辑</a> 
                <a class="btn btn-primary" onclick="AgfancingAuthorList._delete();">删除</a> 
                <a class="btn btn-primary" onclick="AgfancingAuthorList.authorAssign();">方案设定</a> 
            </div>
			<!-- mmGrid -->
			<table id="mmg-purchase" class="mmg">
			</table>
			<div id=pig style="text-align: right;">
			</div>
		</div>
	</div>
</div> 


<!-- 新增弹出框 --> 
<div class="row-fluid">
	<div class="win span4" id="tabwin_add_fangan">
		<div class="win-header">
			<span>方案信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_content_fangan"></div>
	</div>
</div>
<script id="template_fangan" type="text/x-handlebars-template"> 
	
	<div class="form-search" style="font-size: 13px;">
		<form class="form-horizontal editFormPre" id="solutionEditForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex">
			<input type="hidden" value="{{pid}}" name="condition.pid" 
				id="pid">
	 		<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>方案编码</label>
	                <div class="controls txt">
	                    <input type="text"  name="condition.solutionNo" placeholder="请输入方案编码"
						value="{{solutionNo}}" id="solutionNo" data-required="方案编码不能为空">
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">方案名称</label>
	                <div class="controls txt">
	                    <input type="text" name="condition.solutionName" placeholder="请输入"
						 value="{{solutionName}}" id="solutionName" >
	                </div>
	            </div> 

			</div> 
			<div class="row-fluid">
				<div style="margin-top:3px;" class="row-fluid" align="center">
						<div class="span10 control-group full">
						<label class="control-label">
							方案描述</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea data-maxlength="公司概要不能超过200个字"
								data-maxlength-param="200"
								rows="350" cols="350" style="width: 100%;height: 113px;resize:none;" 
								name="condition.solutionDesc" id="solutionDesc">{{solutionDesc}}</textarea>
							</div>
						</div>	
				</div> 
			</div> 
		</form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="AgfancingAuthorList.save()"><i class=""></i>保存</a>
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="AgfancingAuthorList.cancle()"><i class=""></i>取消</a>
	    </div>
	</div>  
</script>

<div class="row-fluid">
    <div class="win span6" id="tabwin_add_assign">
        <div class="win-header">
            <span>方案信息查看权限分配</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_assign">
        </div>
    </div>
</div>
