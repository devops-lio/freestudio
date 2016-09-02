<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/driverBankInfo.js"></script>	
<div class="widget-box">
		<div class="widget-header" style="background-color: #438eb9;">
			<span class="widget-title"><i class="icon-list"></i>司机银行账号信息 </span> <span
				class="widget-toolbar"> </span>
		</div>
	<div class="widget-box">
	  <div class="widget-body" style="margin-top: -10px;">
		<div class="widget-grid">
				<div class="grid-toolbar">
							<a class="btn btn-primary" href="javascript:void(0)"
								onclick="DriverBankInfo.driverAdd('driver')"><i class=""></i>新增</a> 
							<a id="delete" class="btn btn-primary" href="javascript:void(0)"
							    onclick="DriverBankInfo.edit()"><i class=""></i>编辑</a>	
							<a id="delete" class="btn btn-primary" href="javascript:void(0)"
							    onclick="DriverBankInfo.removeDriverItem()"><i class=""></i>删除</a>
				</div>
				<table id="driver_mmg" class="mmg">
	     					<tr>
	         					<th rowspan="" colspan=""></th>
	     					</tr>
	 					</table>
	 					<div  style="text-align: center;font-size: 12px;">
				  总金额：<span style="color: red;" id="driverPices"></span> 
					  	 </div> 
			</div>
		</div>
	</div>
</div>
<input type="hidden" id="driverExist">
		<div class="row-fluid">
			<div class="win span4" id="tabwin_add_driver">
				<div class="win-header">
					<span>选择司机账号信息</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" id="tabwin_add_content_driver"></div>
			</div>
		</div>
		<script id="template_driver" type="text/x-handlebars-template">
	    	<div class="form-search">
		    	<form class="form-horizontal" id="driver_form" >
					<input	type="hidden" value="{{rowIndex}}" id="buy_rowIndex"	name="rowIndex">					
					<div class="row-fluid" style="margin-left: 40px;">
		      	  		<div class="span8 control-group full" >
							<label class="control-label" ><span style="color:red;">*</span>司机名称</label>
							<div class="controls xwin">
								<input type="hidden"  id="driverbanknoPid" value="{{driverbanknoPid}}">
								<input type="text" data-required="司机名称不能为空！" value="{{driverName}}" id="driverName" data-xwin-params="driverBankPop" ><i></i>
							</div>			
						</div>
					</div>
					<div class="row-fluid" style="margin-left: 40px;">
						<div class="span8 control-group full ">
							<label class="control-label" for=""><span style="color: red;">*</span>身份证号</label>
							<div class="controls txt">
								<input type="text" readonly="readonly"	id="driverIdNo"	value="{{driverIdNo}}">
							</div>
						</div>
					</div>		
					<div class="row-fluid" style="margin-left: 40px;">
						<div class="span8 control-group full ">
							<label class="control-label" for=""><span style="color: red;">*</span>银行账号</label>
							<div class="controls txt">
								<input type="text" readonly="readonly"	id="driverNo"	value="{{driverNo}}">
							</div>
						</div>
					</div>		
					<div class="row-fluid" style="margin-left: 40px;">	
						<div class="span8 control-group full ">
							<label class="control-label" for=""><span
								style="color: red;">*</span>放款金额
							</label>
							<div class="controls txt">
								<input type="text" data-number="只能输入数字"
									id="loanPrice"
									value="{{loanPrice}}"
									data-required="放款金额不能为空！">
							</div>
						</div>
					</div>
		    	</form>
		    	<div class="form-search-btn" >
		       	 	<a class="btn btn-info save" href="javascript:void(0)" onclick="DriverBankInfo.addDriverRow()"><i class=""></i>确定</a>
		        	<a class="btn btn-info cancel" href="javascript:void(0)" onclick="DriverBankInfo.cancle()"><i class=""></i>取消</a>
		    	</div>
			</div>
		</script>