<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/buyerInfoSetTab.js"></script>
<div class="widget-box" style="margin-top: 0px;border-bottom:0px;">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>委托方 </span> <span class="widget-toolbar"><a
			href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
		</span>
	</div>
	<div class="widget-body">
		<div class="row-fluid " style="margin-top: -10px;">
			<div class="widget-box" style="border-bottom: 0px">
				<div class="widget-body">
					<div class="widget-grid">
						<table id="buyer_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="win span4" id="tabwin_buyer_set">
				<div class="win-header">
					<span>委托方设定</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" id="tabwin_buyer_set_content"></div>
			</div>
		</div>
		<script id="template_buyer_set" type="text/x-handlebars-template">
	    	<div class="form-search">
		    	<form class="form-horizontal" id="buyer_set_form" >
					<input type="hidden" name="model.pid" id="buyrelPid" value="{{pid}}">
					<input	type="hidden" value="{{rowIndex}}" id="buy_rowIndex"	name="rowIndex">		
					<div class="span9 control-group full">
						<label class="control-label" for=""><span
							style="color: red;">*</span>是否有效</label>
						<div class="controls">
							<slt:select cssClass="chzn-select" value="{{isEffective}}"
								name="model.isEffective"
								optionsType="IS_EFFECTIVE">
								<slt:outHTML>id="isEffective"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
							<slt:outHTML>data-required="是否有效不能为空!"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span9 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>票据类型</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select"  value="{{billType}}"
								name="model.billType"
								optionsType="NOTE_TYPE">
								<slt:outHTML>id="billType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
								<slt:outHTML>data-required="票据类型不能为空!"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span9 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>是否预付</label>
						<div class="controls txt">
							<slt:select cssClass="chzn-select" value="{{isPrePay}}"
								name="model.isPrePay"
								optionsType="FANCING_ISEPREPAY">
								<slt:outHTML>onchange="BuyerInfoSetTab.changeCheck()"</slt:outHTML>
								<slt:outHTML>id="isPrePay"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
								<slt:outHTML>data-required="是否预付不能为空！"</slt:outHTML>
							</slt:select>
						</div>
					</div>
						<div class="span9 control-group full" >
							<label class="control-label" for="">预付票据</label>
							<div class="controls">
								<slt:select cssClass="chzn-select" 
									name="model.preBillType"	
									optionsType="EPREPAY_NOTETYPE">
									<slt:outHTML>id="preBillType"</slt:outHTML>
									<slt:outHTML>data-placeholder="请选择" </slt:outHTML>
								</slt:select>
							</div>
						</div>
					<div class="span9 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>业务占比(%)</label>
						<div class="controls txt">
							<input type="text"  data-required="业务占比不能为空!"
								id="disCount" value="{{businessPercent}}"
								name="model.businessPercent"
								readonly="readonly">
						</div>
					</div>
					<div class="span9 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>折扣率(%)</label>
						<div class="controls txt">
							<input type="text"  data-required="折扣率不能为空!"
								id="disCount" value="{{disCount}}"
								name="model.disCount">
						</div>
					</div>
					<div class="span9 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>授信额度
						</label>
						<div class="controls txt">
							<input type="text" data-number="只能输入数字"
								id="creditPercent" value="{{creditPercent}}"
								name="model.creditPercent"
								data-required="授信额度不能为空！">
						</div>
					</div>
				
		    	</form>
		    	<div class="form-search-btn" >
		       	 	<a class="btn btn-primary" href="javascript:void(0)" onclick="BuyerInfoSetTab.operateOk()"><i class=""></i>确定</a>
		        	<a class="btn btn-primary" href="javascript:void(0)" onclick="BuyerInfoSetTab.operateCancel()"><i class=""></i>取消</a>
		    	</div>
			</div>
			</div>
		</script>
		
		
	</div>
</div>





