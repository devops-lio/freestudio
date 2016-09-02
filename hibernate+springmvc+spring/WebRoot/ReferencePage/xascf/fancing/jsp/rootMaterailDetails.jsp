<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
#checkbox_div .checkBoxInput{
margin-bottom: 7px;
margin-right: 7px;
}
</style>
<script type="text/javascript" src="xascf/fancing/js/rootMaterailDetails.js"></script>
	 <div class="form-search">
	 <div class="row-fluid">
	          	请选择    <input id="checkAll"  class="checkBoxInput" type="checkbox" style="margin-bottom: 7px;
margin-right: 7px;">全选
	        </div>
	        <div class="row-fluid" id="checkbox_div" style="margin-left: 60px;"> 
	                         <c:forEach var="item" items="${baseDataList }" varStatus="varstatus">
	                         	<input id="${item.dataPid }" class="checkBoxInput" name="rootType" type="checkbox" value="${item.nameCn }">${item.nameCn }
	                         <br>
	                         </c:forEach>
	        </div>
	        <div class="row-fluid" style="margin-bottom: 20px">
	          	<a href="javascript:void(0)" onclick="RootMaterailDetails.addRootType()">新增选项    </a>
	        </div>
	        <div class="row-fluid" id="showNewAdd" style="display: none;">
	          	<form class="form-horizontal" id="addRootType_form">
	          		<div class="span8 control-group full">
		                <label class="control-label" for="">基本材料类型名称<span style="color: red;">*</span></label>
		                <div class="controls txt">
		                    <input type="text"  name="basicDataModel.nameCn"  data-required="基本材料类型名称不能为空">
		                    <input type="hidden" name="basicDataModel.code" id="rootTypeCode"  >
		                    <input type="hidden" name="basicDataModel.parentCode"  id="rootTypeParentCode" value="OTHERFANCINGMATERIALTYPE" >
		                </div>
	            	</div>
	            	<a class="btn btn-info save" href="javascript:void(0)" style="margin-left: 15px;" onclick="RootMaterailDetails.saveRootType()"><i class=""></i>添加</a>
	          	 </form>
	        </div>
	    <div class="form-search-btn" style="margin-top: 30px;">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="RootMaterailDetails.addOtherType()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="RootMaterailDetails.otherRootCancle()"><i class=""></i>取消</a>
	    </div>
	</div>