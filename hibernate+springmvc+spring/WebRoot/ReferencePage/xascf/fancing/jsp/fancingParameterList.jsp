<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/fancingParameterList.js"></script>

<div class="widget-box">
   <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
		</div>
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="systemParameterList.edit()"><i class=""></i>编辑</a> 
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
<div class="widget-box">
   <div class="widget-body">
   		<div class="widget-main padding-6" style="margin-top:20px;margin-left: 0px;">
			<form id="systemParameterEditorForm" action="" method="post" class="form-horizontal">
				<div class="row-fluid">
					<div class="span5 control-group full">
						<label class="control-label">参数编号<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="hidden" id="parameterPid" name="systemParameterModel.parameterPid" value="${systemParameterModel.parameterPid}" />
							<input type="hidden"  name="systemParameterModel.parameterType" value="1" />
							<input type="text" data-required="参数编号不能为空！"	data-maxlength="参数编号不能超过30位"
									data-maxlength-param="30" maxlength=30 id="parameterCode"
									name="systemParameterModel.parameterCode" value="${systemParameterModel.parameterCode}">
						</div>
					</div>
					<div class="span5 control-group full">
						<label class="control-label">参数值<span style="color: red;">*</span></label>
						<div class="controls txt">
							<input type="text" data-required="参数值不能为空！"	data-maxlength="参数值不能超过30位"
									data-maxlength-param="30" maxlength=30 id="parameterValue"
								name="systemParameterModel.parameterValue" value="${systemParameterModel.parameterValue}">
						</div>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label">描述</label>
						<div class="controls txt">
							<input type="text"  id="parameterDesc"
									name="systemParameterModel.parameterDesc" value="${systemParameterModel.parameterDesc}">
						</div>
					</div>						
				</div>		
				<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label" >备注</label>
						<div class="controls" style="margin-top: 0px;">
							<textarea  data-maxlength="备注不能超过200个字!" data-maxlength-param="200" rows="350" cols="350" 
							style="width: 100%;height: 115px;resize:none;" name="systemParameterModel.remark" id="remark">${systemParameterModel.remark}</textarea>
						</div>
					</div>	
				</div>	
				<div class="row-fluid">
					<div class="span10 control-group full offset2">
						<div class="btn-toolbar" style="margin-left: 215px;">
							<a class="btn btn-primary"  onclick="javascript:FancingParameterList.saveSystemParameter();">保存</a>
							<a id="reSetBtn" class="btn btn-primary"  onclick="javascript:FancingParameterList.clear();">重置</a>
						</div>
					</div>
				</div>		
			</form>
		</div> 
	</div>
</div>