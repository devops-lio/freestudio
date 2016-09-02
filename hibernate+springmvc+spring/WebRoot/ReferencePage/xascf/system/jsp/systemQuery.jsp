<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/system/js/systemQuery.js"></script>  
<style>
.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;left:80px; }		
</style>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="SystemQuery.load();">查询</a>
				<a class="btn btn-primary" onclick="SystemQuery.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="systemSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">系统名称</label>
						<div class="controls txt">
							<input type="text" placeholder="请输入" name="condition.systemName">
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>应用系统列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar">
                <a id="systemQueryAddBtn" class="btn btn-primary" href="javascript:void(0)">添加</a>
                <a id="systemQueryUpdateBtn" class="btn btn-primary" href="javascript:void(0)">修改</a>
                <a id="systemQueryDeleteBtn" class="btn btn-primary" href="javascript:void(0)">删除</a>
            </div>
			<!-- mmGrid -->
			<div id="mmg-systems" class="mmg">
			</div>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add">
        <div class="win-header">
            <span>系统信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content">
        </div>
    </div>
</div>	
<div id="system-detail-template" style="display: none;">
    <div class="form-search">
    <form class="form-horizontal" id="systemEditForm">
        <input type="hidden" name="systemPid"  value="{{systemPid}}">
        <input type="hidden" name="id"  value="{{id}}">
        <div class="row-fluid">
            <div class="span10 control-group full">
                <label class="control-label" for=""><span style="color: red;">*</span>系统名称</label>
                <div class="controls txt">
                    <input type="text" name="systemName" placeholder="请输入" value="{{systemName}}" data-required="此项必填">
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 control-group full">
                <label class="control-label" for=""><span style="color: red;">*</span>系统编码</label>
                <div class="controls txt">
                    <input  type="text" name="systemCode" placeholder="请输入" value="{{systemCode}}" data-required="此项必填">
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 control-group full">
                <label class="control-label" for=""><span style="color: red;">*</span>系统URL</label>
                <div class="controls txt">
                    <input type="text" name="systemUrl" placeholder="请输入" value="{{systemUrl}}" data-required="此项必填" data-url="格式不正确！格式如：http://www.baidu.com">
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 control-group full">
                <label class="control-label" for="">系统描述</label>
                <div class="controls">
                    <textarea class="span12" rows="3" placeholder="请输入" name="description" style="height: 65px;">{{description}}</textarea>
                </div>
            </div>
        </div>
    </form>
    <div class="form-search-btn">
        <a class="btn btn-primary" href="javascript:void(0)" onclick="SystemQuery.save();">保存</a>
        <a class="btn btn-primary" href="javascript:void(0)" onclick="SystemQuery.cancle();">取消</a>
    </div>
</div>
</div>
<div class="row-fluid">
		<div class="win span8" id="tabwin_upload" style="height: 160px;width: 450px;">
	        <div class="win-header">
	            <span>系统导入</span> <i class="close">&times;</i>
	        </div>
	        <div class="win-content" id="tabwin_upload_content" style="height: 160px;">
	        <div class="form-search">
	  		<div id="loading" class="hide"><i class="icon-spin icon-spinner icon-2x"></i></div>
		    <form id="imageUploadForm" class="form-horizontal" enctype="multipart/form-data">
		    	<div  style="margin-top: 30px;margin-left: 30px">
					<input type='text' name='textfield' id='textfield' style="  width:180px;" />
					<input type='button'  value='浏览...' class="btn btn-primary"  style="background-color:#FFF; border:1px solid #CDCDCD;height:30px; width:80px;"/>
					<input type="file" name="upLoadFile"  style="width:230px;"  id="imageFile" size="28"  class="file" 
						onchange="document.getElementById('textfield').value=this.value" contenteditable="false" />
					  <a class="btn btn-primary" href="javascript:void(0)" id="uploadid" >导入</a>
					   <a class="btn btn-primary" href="javascript:void(0)"  onclick="SystemQuery.ExcelCancle();">取消</a>
						    
						
		    	</div>
		    </form>
		    
  		</div>
	        </div>
        </div>
 </div>	