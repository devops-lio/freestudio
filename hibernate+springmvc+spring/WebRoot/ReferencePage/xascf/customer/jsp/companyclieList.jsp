<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/companyclieList.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>客户拜访记录查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="ComapanyclieInfo.load();">查询</a>
				<a class="btn btn-primary" onclick="ComapanyclieInfo.clearQueryForm();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="comapanyclieSearchForm">
			<input type="hidden" name="condition.memberPid" id="memberPid" value="${memberPid }">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">拜访月份</label>
						<div class="controls time">
							<input type="text" id="bfyf" name="condition.visitDate" placeholder="请选择">
							<i class="date" data-format="yyyy-MM" ></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">拜访方式</label>
						<div class="controls">
							<slt:select cssClass="chzn-select span12" name="condition.visitType" optionsType="VISIT_TYPE">
							    <slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
							    <slt:outHTML>id="visitTypeQuery"</slt:outHTML>
							</slt:select>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>${memberName }拜访跟踪列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar"> 
                <a class="btn btn-primary" onclick="ComapanyclieInfo.add();">添加</a>
                <a class="btn btn-primary" onclick="ComapanyclieInfo.update();">修改</a>
                <a class="btn btn-primary" onclick="ComapanyclieInfo._delete();">删除</a>
            </div>
			<!-- mmGrid -->
			<table id="mmg-users" class="mmg">
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
<div class="row-fluid "		>
<div class="btn-toolbar" style="text-align: center">
				<a  id="tobackBt" class="btn btn-primary"  onclick="javascript:ComapanyclieInfo.forward();">返回</a>
			</div>
		</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_clie">
        <div class="win-header">
            <span>拜访信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_clie">
        </div>
    </div>
</div>	
<script id="template_clie" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;">
		<form class="form-horizontal" id="clieEditForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex">
        	<input type="hidden" id="clieMemberPid" name="model.memberPid" value="{{memberPid}}" />  
        	<input type="hidden"  name="model.cliePid" value="{{cliePid}}" />  
			<div class="row-fluid">
        		<div class="span10 control-group full">
					<label class="control-label" for=""><span
						style="color: red;">*</span>拜访人数 </label>
					<div class="controls txt">
						<input type="text"  id="visitCount" name="model.visitCount" value="{{visitCount}}"
							data-required="拜访人数不能为空" placeholder="请输入数字" data-number="只能输入数字!" >
					</div>
				</div>
			</div>
			<div class="row-fluid">
        		<div class="span10 control-group full">
					<label class="control-label"><span 
						style="color: red;">*</span>拜访日期</label>
					<div class="controls time">
								<input type="text"  name="model.visitDate" value="{{visitDate}}" placeholder="请选择"
								data-required="拜访日期不能为空！" id="visitDate">
								 <i  class="date" data-format="yyyy-MM-dd" ></i>
					</div>
				</div> 
			</div>
			<div class="row-fluid"> 
        		<div class="span10 control-group full">
					<label class="control-label"><span style="color: red;">*</span>拜访方式</label>
					<div class="controls"> 
						<slt:select  cssClass="chzn-select" name="model.visitType" optionsType="VISIT_TYPE"> 
							<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							<slt:outHTML>id="visitType"</slt:outHTML>
							<slt:outHTML>data-required="拜访方式不能为空"</slt:outHTML> 
						</slt:select>  
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span8 control-group full">
					<label class="control-label"><span style="color: red;">*</span>拜访记录</label>
						<div class="controls" style="margin-top: 0px;">
							<textarea data-maxlength="拜访记录不能超过1000个字"
							data-maxlength-param="1000" placeholder="请输入"
							rows="350" cols="350" style="width: 152%;height: 68px;resize:none;" 
							name="model.visitCaption" id="visitCaption">{{visitCaption}}</textarea>
						</div>
				</div>	
			</div> 
			<input type="hidden" name="model.fileUrl" value="{{fileUrl}}" id="cliefile_url" >
			<input type="hidden" name="model.fileName" value="{{fileName}}"   id="cliefile_Name" >
			<div class="row-fluid">
				<div class="span5 control-group full">
	               	<label class="control-label" for="">附件上传</label>
	                <div class="controls" style="width:450px;">
	                 	<input type='button'  value='上传' class='btn' style="background-  color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
						onclick="javascript:ComapanyclieInfo.addUploadPop()" />
	                </div>
	           	</div>	
			</div> 
		</form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="ComapanyclieInfo.save()"><i class=""></i>保存</a>
	        <a class="btn btn-primary save" href="javascript:void(0)" onclick="ComapanyclieInfo.cancle()"><i class=""></i>取消</a>
	    </div>
	</div>  
</script>
