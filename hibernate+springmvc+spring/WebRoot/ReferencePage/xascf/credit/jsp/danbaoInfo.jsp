<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="row-fluid">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>担保 </span> <span class="widget-toolbar"><a
											href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
										</span>
		</div>
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
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>担保公司名称</label>
					<div class="controls txt">
							 <input type="text" data-required="名称不能为空！" placeholder="请输入担保公司全称"  value="{{guaranteeCompanyName}}" id="guaranteeCompanyName" data-required="担保公司不能为空">
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保公司地址</label>
	                <div class="controls txt">
	                    <input type="text"  value="{{guaranteeAddress}}" id="guaranteeAddress" placeholder="请输入担保公司地址">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">注册资金(万元)</label>
	                <div class="controls txt">
	                    <input type="text" data-number="只能填写数字！" placeholder="请输入数字" id="guaranteeCapital" value="{{guaranteeCapital}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>企业联系人</label>
	                <div class="controls txt">
	                    <input type="text" data-required="联系人不能为空！" placeholder="请输入联系人"  id="guaranteeContacts" value="{{guaranteeContacts}}" data-required="企业联系人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">电话</label>
	                <div class="controls txt">
	                    <input type="text"  id="tel" value="{{tel}}" data-tel="电话输入有误!请输入格式如：020-1234567" placeholder="请输入格式如：020-1234567">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>手机</label>
	                <div class="controls txt">
	                    <input type="text"  id="mobile" value="{{mobile}}" data-required="手机不能为空" placeholder="请输入格式如：132xxxxxxxx" 
											data-mobile="联系人手机输入有误!"  maxlength=11 
											data-maxlength-param="11" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>邮箱</label>
	                <div class="controls txt">
	                    <input type="text"  id="email" value="{{email}}" data-required="邮箱不能为空" placeholder="请输入格式如：12345@qq.com" data-myEmail="邮箱地址格式不正确！请输入格式如：12345@qq.com" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">担保范围</label>
	                <div class="controls txt">
	                    <input type="text"  id="guaranteeBusiness" placeholder="请输入担保范围" value="{{guaranteeBusiness}}">
	                </div>
	            </div>
	        </div>
				<input type="hidden" value="{{guaranteeProtocolUrl}}" id="db_url" >
				<input type="hidden" value="{{guaranteeProtocolName}}" id="db_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>担保协议上传</label>
	                <div class="controls" style="width:250px;">
							<input onclick="javascript:DanbaoInfo.addUploadPop()"  type='button'  value='上传' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="DanbaoInfo.adddbRow()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="DanbaoInfo.dbCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>