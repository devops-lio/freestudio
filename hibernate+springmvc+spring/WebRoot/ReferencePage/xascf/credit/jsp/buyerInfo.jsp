<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i><span
			style="color:red;">*</span>委托方 </span> <span class="widget-toolbar"><a
			href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
		</span>
	</div>
	<div class="widget-body">
					<div class="widget-grid">
						<div class="grid-toolbar">
							<a class="btn btn-primary" href="javascript:void(0)"
								onclick="BuyerInfo.buyerAdd('buyer')"><i class=""></i>新增</a> 
							<a id="delete" class="btn btn-primary" href="javascript:void(0)"
							    onclick="BuyerInfo.edit()"><i class=""></i>编辑</a>	
							<a id="delete" class="btn btn-primary" href="javascript:void(0)"
							    onclick="BuyerInfo.removeBuyerItem()"><i class=""></i>删除</a>
						</div>
						<table id="buyer_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
					</div>
		<input type="hidden" id="buyerExist">
		<div class="row-fluid">
			<div class="win span4" id="tabwin_add_buyer">
				<div class="win-header">
					<span>选择委托方信息</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" id="tabwin_add_content_buyer"></div>
			</div>
		</div>
		<script id="template_buyer" type="text/x-handlebars-template">
	    	<div class="form-search">
		    	<form class="form-horizontal" id="buyer_form" >
					<input	type="hidden" value="{{rowIndex}}" id="buy_rowIndex"	name="rowIndex">					
					<div class="row-fluid">
		      	  		<div class="span10 control-group full" >
							<label class="control-label" ><span style="color:red;">*</span>委托方</label>
							<div class="controls xwin">
								<input type="hidden"  id="buyPid" value="{{buyPid}}">
								<input type="hidden" id="ispurchase" value="1">
								<input type="text" data-required="委托方不能为空！"  placeholder="请选择委托方" value="{{buyName}}" id="buyName" data-xwin-params="buyerComapanyPop" ><i></i>
							</div>			
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full ">
							<label class="control-label" for=""><span style="color: red;">*</span>账期(天)</label>
							<div class="controls txt">
								<input type="text" data-number="只能输入数字"
									id="billCycle"   placeholder="请输入数字" 
									value="{{billCycle}}"
									data-required="账期不能为空！">
							</div>
						</div>
					</div>		
					<div class="row-fluid">	
						<div class="span10 control-group full ">
							<label class="control-label" for=""><span
								style="color: red;">*</span>业务占比(%)
							</label>
							<div class="controls txt">
								<input type="text" data-number="只能输入数字"
									id="businessPercent"  placeholder="请输入小于100的数字" 
									value="{{businessPercent}}"
									data-required="业务占比不能为空！">
							</div>
						</div>
					</div>

								

					<div class="row-fluid">	
						<div class="span10 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>票据类型</label>
							<div class="controls">
								<slt:select cssClass="chzn-select"
									name="billType"
									optionsType="NOTE_TYPE">
									<slt:outHTML>id="billType"</slt:outHTML>
								<slt:outHTML>data-required="票据类型不能为空!"</slt:outHTML>
									<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
								</slt:select>
							</div>
						</div>
					</div>
					
					<div class="row-fluid">	
						<div class="span10 control-group full">
									<label class="control-label" for=""><span
								style="color: red;">*</span>是否预付</label>
									<div class="controls">
										<slt:select cssClass="chzn-select" 
											name="isPrePay"
											optionsType="FANCING_ISEPREPAY">
											<slt:outHTML>data-required="是否预付不能为空！"</slt:outHTML>
											<slt:outHTML>id="isPrePay"</slt:outHTML>
											<slt:outHTML>onchange="BuyerInfo.changeCheck()"</slt:outHTML>
											<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
										</slt:select>
									</div>
								</div>
					</div>

					<div class="row-fluid">	
						<div class="span10 control-group full" >
							<label class="control-label" for="">预付票据</label>
							<div class="controls">
								<slt:select cssClass="chzn-select" 
									name="preBillType"	
									optionsType="EPREPAY_NOTETYPE">
									<slt:outHTML>id="preBillType"</slt:outHTML>
									<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
								</slt:select>
							</div>
						</div>
					</div>
		    	</form>
		    	<div class="form-search-btn" >
		       	 	<a class="btn btn-primary" href="javascript:void(0)" onclick="BuyerInfo.addBuyerRow()"><i class=""></i>确定</a>
		        	<a class="btn btn-primary" href="javascript:void(0)" onclick="BuyerInfo.buyerCancle()"><i class=""></i>取消</a>
		    	</div>
			</div>
		</script>
	</div>
</div>





