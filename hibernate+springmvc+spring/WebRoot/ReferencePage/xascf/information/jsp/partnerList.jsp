<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/information/js/partnerList.js"></script>
<script type="text/javascript" src="xascf/js/ajaxfileupload_2.1.js"></script>
<script type="text/javascript" src="xascf/js/picView.js"></script>
<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:partnerList.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:partnerList.clear();"><i class=""></i>重置<br /></a>
				
		</div>
		<form action="" id="partnerListQueryForm" class="form-horizontal fromPre">
			<div class="row-fluid">
				<div class="span4 control-group full">
					<label class="control-label">名称</label>
					<div class="controls txt">
							<input type="text" 	placeholder="请输入" name="condition.partnerName">
					</div>
				</div>
			</div>
		</form>
	</div>
	</div>
</div>
<!-- 查询列表-->
<div class="widget-box">
 <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="partnerList.add()"><i class=""></i>新增</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="partnerList.editor()" ><i class=""></i>编辑</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="partnerList.deleteByPids()" ><i class=""></i>删除</a> 
	     
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
</div>
<!-- 弹出框 -->
	<div class="row-fluid">
		<div class="win win-tab span8" id="tabwin"  style="height: 500px;">
	        <div class="win-header">
	            <span>新增采购商</span> <i class="close">&times;</i>
	        </div>
	        <div class="win-content" id="tabwin_content" style="height: 470px;">
	        </div>
	    </div>
    </div>	
    <!-- tab弹出框 -->
	<div class="row-fluid">
		<div class="win span8" id="tabwin_tabs"  style="height: 500px;">
	        <div class="win-header">
	            <ul>
	                <li class="active" data-rel="tab11">新增采购商</li>
	            </ul>
	            <i class="close">&times;</i>
	        </div>
	        <div class="win-content" id="tabwin_content_tabs" style="height: 470px;">
	        	<div class="active" id="tab11">
	            </div>
	        </div>
	    </div>
    </div>	
	<!-- 新增弹出框 -->
	<div class="row-fluid">
		<div class="win span8" id="tabwin_add" style="height: 210px;width: 460px;">
	        <div class="win-header">
	            <span>合作伙伴</span> <i class="close">&times;</i>
	        </div>
	        <div class="win-content" id="tabwin_add_content" style="height: 300px;">
	        </div>
        </div>
    </div>	
	<div id="partnerEditTemplateTab" style="display: none">
		<jsp:include page="/xascf/information/jsp/partnerEditTab.jsp"></jsp:include>
	</div>
	<div class="row-fluid">
		<div class="win span8" id="tabwin_upload" style="width:750px;height: 383px">
			<jsp:include page="/xascf/jsp/plupload.jsp"></jsp:include>
       	</div>
    </div>	

	
	