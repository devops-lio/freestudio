<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript" src="xascf/fancing/js/danbaoInfo.js"></script>	
<div class="row-fluid">
	<div class="widget-box">
   		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a class="btn btn-primary" href="javascript:void(0)" onclick="DanbaoInfo.dbadd('db')"><i class=""></i>新增</a> 
			      <a  class="btn btn-primary" href="javascript:void(0)" onclick="DanbaoInfo.editdb()"><i class=""></i>编辑</a> 
			      <a  class="btn btn-primary" href="javascript:void(0)" onclick="DanbaoInfo.removedbItem()" ><i class=""></i>删除</a> 
				</div>
					<table id="db_mmg" class="mmg">
	      					<tr>
	          					<th rowspan="" colspan=""></th>
	      					</tr>
	  					</table>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_db">
        <div class="win-header">
            <span>担保企业信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_db">
        </div>
    </div>
</div>
<script id="template_db" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="db_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" value="{{guaranteeCompanyPid}}" id="guaranteeCompanyPid" >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保公司名称<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{guaranteeName}}" id="guaranteeName" data-required="担保公司不能为空">
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保公司地址</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{guaranteeAddress}}" id="guaranteeAddress" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">注册资金(万元)</label>
	                <div class="controls txt">
	                    <input type="text"  id="guaranteeCapital" value="{{guaranteeCapital}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">企业联系人<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="guaranteeContacts" value="{{guaranteeContacts}}" data-required="企业联系人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">电话</label>
	                <div class="controls txt">
	                    <input type="text"  id="tel" value="{{tel}}">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">手机<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="mobile" value="{{mobile}}" data-required="手机不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">邮箱<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="email" value="{{email}}" data-required="邮箱不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保范围</label>
	                <div class="controls txt">
	                    <input type="text"  id="guaranteeBusiness" value="{{guaranteeBusiness}}">
	                </div>
	            </div>
	        </div>
				<input type="hidden" value="{{guaranteeProtocolUrl}}" id="db_url" >
				<input type="hidden" value="{{guaranteeProtocolName}}" id="db_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保协议上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;">
	                  <input type='text' name='textfield' data-required="协议文件不能为空！" value="{{guaranteeProtocolName}}"
							 id='textfielid_db' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_db" size="28" style="height:25px;width:85px;"
								onchange="DanbaoInfo.upLoadChange('db')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="DanbaoInfo.adddbRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="DanbaoInfo.dbCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>