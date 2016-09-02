<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="widget-box">
	<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>抵押 </span> <span class="widget-toolbar"><a
											href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
										</span>
		</div>
   <div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="DiyaInfo.dyadd('dy')"><i class=""></i>新增</a> 
		      <a  class="btn btn-primary" href="javascript:void(0)" onclick="DiyaInfo.editdy()"><i class=""></i>编辑</a> 
		      <a  class="btn btn-primary" href="javascript:void(0)" onclick="DiyaInfo.removeDyItem()()" ><i class=""></i>删除</a> 
			</div>
				<table id="dy_mmg" class="mmg">
      					<tr>
          					<th rowspan="" colspan=""></th>
      					</tr>
  					</table>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_dy">
        <div class="win-header">
            <span>抵押材料信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_dy">
        </div>
    </div>
</div>
<script id="template_dy" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="dy_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" value="{{qualificationPid}}" id="qualificationPid" >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>抵押类型</label>
					<div class="controls">
						<select data-placeholder="请选择..."   class="chzn-select span12 self-select" id="qualificationType" data-required="抵押类型不能为空!">
							<option value='5'>房产抵押</option>						
							<option value='6'>车辆抵押</option>						
							<option value='7'>土地抵押</option>						
						</select>
						<!--	<slt:select  cssClass="chzn-select" name="" optionsType="DY_MATERIAL_TYPE"  >
								<slt:outHTML>id="qualificationType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>-->
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>抵押材料编号</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{qualificationNo}}" id="qualificationNo" data-required="材料编号不能为空">
	                </div>
	            </div>
	        </div>
			<input type="hidden" value="{{qualificationUrl}}" id="dy_url" >
			<input type="hidden" value="{{qualificationName}}" id="dy_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>附件上传</label>
	                <div class="controls" style="width:250px;">
							<input type='button' onclick="DiyaInfo.addUploadPop()" value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="DiyaInfo.adddyRow()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="DiyaInfo.diyaCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>

 	