<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/information/js/creditBlackList.js"></script>
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:creditBlackList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:creditBlackList.clear();"><i class=""></i>重置<br /></a>
				</div>
				<form action="" id="creditBlackListQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									名称
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入" name="condition.customerName"  value="">
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
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="creditBlackList.add()"><i class=""></i>新增</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="creditBlackList.deleteByPids()" ><i class=""></i>删除</a> 
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

	<!-- 新增弹出框 -->
	<div class="row-fluid">
		<div class="win span8" id="tabwin_add" style="height: 250px;width: 400px;">
	        <div class="win-header">
	            <span>信用黑名单</span> <i class="close">&times;</i>
	        </div>
	        <div class="win-content" id="tabwin_add_content" style="height: 130px;">
	        </div>
        </div>
    </div>	
	<div id="creditBlackListEditTemplateTab" style="display: none">
		<jsp:include page="/xascf/information/jsp/creditBlackListEditTab.jsp"></jsp:include>
	</div>
	