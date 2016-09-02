<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/templatesList.js"></script>
<%
	pageContext.setAttribute("industyList", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("CUS_COM_INDUSTRY"));
	%>
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:templatesList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="templatesList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="templatesListQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									模板名称
								</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入" name="condition.templateName" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">所属行业</label>
								<div class="controls">
									<select name="condition.industryCode" 
								class="chzn-select"  data-placeholder="请选择">
										<option value=""></option>
										<c:forEach items="${industyList}" var="item">
										<option value="${item.code}" >${item.nameCn}</option>
										</c:forEach>
									</select>
								</div>
							</div>
							<!--  <div class="span4 control-group full">
								<label class="control-label">
									模板类型
								</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入" name="condition.templateType" >
								</div>
							</div>-->
						</div>
				</form>
			</div>
		</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>评估模板列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
        <div class="widget-grid">
        	<div class="grid-toolbar">
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="templatesList.add()"><i class=""></i>新增</a> 
		      <a  class="btn btn-primary" href="javascript:void(0)" onclick="templatesList.edit()"><i class=""></i>编辑</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="templatesList.deleteTemplates()"><i class=""></i>删除</a> 
		      <a  class="btn btn-primary" href="javascript:void(0)" onclick="templatesList.templatesSet()"><i class=""></i>模板指标设定</a> 
			</div>
            <!-- mmGrid -->
            <table id="all_mmg" class="mmg">
                <tr>
                    <th rowspan="" colspan=""></th>
                </tr>
            </table>
            <div id="all_pg" style="text-align: right;"></div>
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_template" >
        <div class="win-header">
            <span>模板基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_template" style="overflow: auto;">
        	<div class="form-search">
				<form id="templatesEditorForm" action="" method="post" class="form-horizontal">
					<input type="hidden" name="id" value="{{id}}">
					<input type="hidden" id="templatePid" name="templatesView.templatePid" >
		        	<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">模板名称<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="模板名称不能为空！" id="templateName"  placeholder="请输入"
									name="templatesView.templateName" >
							</div>
						</div>
					</div>
		        	<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">所属行业<span style="color: red;">*</span></label>
							<div class="controls">
								<select name="templatesView.industryCode"  id="industryCode"
								data-required="所属行业不能为空"
								class="chzn-select"  data-placeholder="请选择">
										<option value=""></option>
										<c:forEach items="${industyList}" var="item">
										<option value="${item.code}" >${item.nameCn}</option>
										</c:forEach>
									</select>
							</div>
						</div>
					</div>
		       		<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">模板类型<span style="color: red;">*</span></label>
							<div class="controls">
								<slt:select cssClass="chzn-select span12"	name="templatesView.templateType" optionsType="RM_TEMPLATE_TYPE">
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									<slt:outHTML>data-required="模板类型不能为空！"</slt:outHTML>				
									<slt:outHTML>id="templateType"</slt:outHTML>
								</slt:select>
							</div>
						</div>
					</div>
		        	<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">是否默认<span style="color: red;">*</span></label>
							<div class="controls">
								<slt:select cssClass="chzn-select span12"	name="templatesView.isDefault" optionsType="RM_IS_DEFAULT">
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									<slt:outHTML>data-required="是否默认不能为空！"</slt:outHTML>
									<slt:outHTML>id="isDefault"</slt:outHTML>
								</slt:select>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full">
							<label class="control-label">描述</label>
							<div class="controls txt">
								<textarea id="remark" 
										name="templatesView.remark" 
										style="resize: none;width: 100%; height: 100px;"></textarea>
							</div>
						</div>						
					</div>		
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary"  onclick="templatesList.saveTemplates();">保存</a>
					<a id="reSetBtn" class="btn btn-primary"  onclick="templatesList.cancle();">取消</a>
				</div>	
			</div>  	
        </div>
    </div>
</div>