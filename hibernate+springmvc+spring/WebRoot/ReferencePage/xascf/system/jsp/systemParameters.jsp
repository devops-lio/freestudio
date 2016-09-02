<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/systemParameters.js"></script>
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
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:SystemParameters.query();"><i class=""></i>查询<br /></a>
						<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:SystemParameters.clear();"><i class=""></i>重置<br /></a>
				</div>
					<form action="" id="systemParametersQueryForm" class="form-horizontal fromPre">
							<div class="row-fluid">
								<div class="span3 control-group full">
									<label class="control-label">
										参数名称
									</label>
									<div class="controls txt">
										<input type="text" 
											placeholder="请输入"  name="condition.parameterDesc" >
									</div>
								</div>   
							</div>
							
					</form>
				</div>
			</div>
		</div>
		<!-- 查询列表-->
		<div class="widget-box">
			<div class="widget-header">
				<span class="widget-title"><i class="icon-list"></i>系统参数列表</span>
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

<!-- 新增弹出框 --> 
<div class="row-fluid">
    <div class="win span4" id="pop_up_delay" style="overflow: visible;">
        <div class="win-header">
            <span id="check_span">参数信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_show_content">
        </div>
    </div>
</div>
<script id="pop_up_paramet" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editForm">
			<input type="hidden" value="${systemParameterModel.parameterPid}" name="systemParameterModel.parameterPid" id="parameterPid" > 
			<div class="row-fluid" id="kh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>参数名称</label>
	                <div class="controls txt">
	                    <input type="text"  value="${systemParameterModel.parameterDesc}" id="parameterDesc" name="systemParameterModel.parameterDesc" >
	                </div>
	            </div> 
			</div>
	 		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>参数值</label>
	                <div class="controls txt">
	                    <input type="text" value="${systemParameterModel.parameterValue}" id="parameterValue" 
						name="systemParameterModel.parameterValue">
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" id="qd-div">
	    		<div class="form-search-btn">
	       			<a class="btn btn-primary" href="javascript:void(0)" onclick="SystemParameters.addParametRow()"><i class=""></i>确定</a>
	        		<a class="btn btn-primary" href="javascript:void(0)" onclick="SystemParameters.cancleParamet()"><i class=""></i>取消</a>
	    		</div>
			</div>
		</form> 
	</div>
</script>
<div id="pop_up_show" style="display: none;"> 
   
</div>
	