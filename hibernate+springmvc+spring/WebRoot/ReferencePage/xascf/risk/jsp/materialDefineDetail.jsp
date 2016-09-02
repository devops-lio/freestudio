<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/risk/js/materialDefineDetail.js"></script>
<div class="widget-box">
	
	<div class="widget-header">
    	<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:materialDefineDetail.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:materialDefineDetail.clearQueryForm();"><i class=""></i>重置<br /></a>
			</div>
			
			<form action="" id="materialDefineQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">材料名称</label>
						<div class="controls txt">
						<input type="hidden" id="parentCode" name="condition.parentCode" value="${code}"/>
							<input type="hidden" id="materialType" name="condition.materialType" value="${materialType}"/>
							<input type="text" 	name="condition.typeName"  placeholder="请输入">
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
    	<span class="widget-title"><i class=""></i>子材料信息列表</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)"	onclick="materialDefineDetail.add()"><i class=""></i>新增</a>
				<a class="btn btn-primary" href="javascript:void(0)"	onclick="materialDefineDetail.editor()"><i class=""></i>编辑</a>
				<a	class="btn btn-primary" href="javascript:void(0)"	onclick="materialDefineDetail.deleteMaterialDefine()"><i class=""></i>删除</a>
			</div>
			<!-- mmGrid -->
			<table id="materialDefine_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>
<div class="row-fluid">
			<div class="btn-toolbar" style="text-align: center">
			 <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:materialDefineDetail.returnMaterialList();">返回<br/></a>
		 	</div>
</div>
<div class="row-fluid">
	<div class="win span4" id="tabwin_add_childMaterial">
        <div class="win-header">
            <span>子材料信息</span> <i class="close">&times;</i>
        </div>
		<div class="win-content" id="tabwin_add_childMaterial_content">
	    	<div id="childMaterial-detail-template">
	    		<div class="form-search">
		    		<form class="form-horizontal" id="materialDefineEditorForm">
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span	style="color: red;">*</span>材料名称</label>
								<div class="controls text">
									<input type="hidden" id="id" name="materialDefineModel.id">
									<input type="hidden" id="materialType" name="materialDefineModel.materialType">
									<input type="hidden" id="parentCode" name="materialDefineModel.parentCode">
									<input type="hidden" id="pid" name="materialDefineModel.pid">
									<input type="text"	data-required="名称不能为空！"  placeholder="请输入" id="typeName" name="materialDefineModel.typeName">
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>权重(%)</label>
								<div class="controls txt">
									<input type="text" data-required="权重(%)不能为空！" data-number="只能填入数字"   placeholder="请输入数字" id="materialWeights" name="materialDefineModel.materialWeights">
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>序号</label>
								<div class="controls txt">
									<input type="text" data-required="序号不能为空！" data-number="只能填入数字"  placeholder="请输入数字" id="orderNo" name="materialDefineModel.orderNo">
								</div>
		            		</div>
		        		</div>
				        <div class="row-fluid">    
							<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>是否必填 </label>
								<div class="controls">
									<slt:select cssClass="chzn-select span12"	name="materialDefineModel.isRequired" optionsType="RM_IS_DEFAULT">
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
										<slt:outHTML>data-required="是否必填不能为空！"</slt:outHTML>
										<slt:outHTML>id="isRequired"</slt:outHTML>
									</slt:select>
								</div>
							</div>						
				        </div>
				    </form>
				    <div class="form-search-btn">
						<a class="btn btn-primary"	onclick="javascript:materialDefineDetail.saveMaterialDefine();">保存</a>
						<a	id="reSetBtn" class="btn btn-primary" onclick="javascript:materialDefineDetail.cancle();">取消</a>
				    </div>
				</div>
			</div>
        </div>
    </div>
 </div>