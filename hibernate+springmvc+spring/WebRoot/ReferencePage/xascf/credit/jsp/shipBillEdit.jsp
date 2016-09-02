<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipBillEdit.js"></script>
<style>
#shipBill_form .span3 {
	margin-left: 1px;
}
#shipBillDetail_form .span6 {
	margin-left: -10px;
}
</style>
<div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)"
				onclick="ShipBillEdit.shipBill_add()"><i class=""></i>新增</a> <a
				class="btn btn-primary" href="javascript:void(0)"
				onclick="ShipBillEdit.editShipBill()"><i class=""></i>编辑</a> <a
				class="btn btn-primary" href="javascript:void(0)"
				onclick="ShipBillEdit.removeShipBillItem()"><i class=""></i>删除</a>
		</div>
		<table id="shipBill_mmg" class="mmg">
			<tr>
				<th rowspan="" colspan=""></th>
			</tr>
		</table>
		<div style="text-align: center;font-size: 12px;border-bottom: 1px #ccc solid;">
			对账单票总金额(元)：<span style="color: red;" id="shipBillEditPrice"></span>
				&nbsp; 	 折扣后金额(元)：<span style="color: red;" id="shipBillDisount"></span>
			&nbsp; 对账单总数量：<span style="color: red;" id="shipBillEditNums"></span>
		</div>
	</div>
</div>

<div class="row-fluid">
	<div class="win span10" id="tabwin_add_shipBill">
		<div class="win-header">
			<span>对账单基本信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_content_shipBill"></div>
	</div>
</div>
<script id="template_shipBill" type="text/x-handlebars-template">
	<div class="row-fluid">
		<div class="form-search">
			<form class="form-horizontal" id="shipBill_form">
					<input type="hidden" name="id" value="{{id}}">
					<input	type="hidden" value="{{rowIndex}}" id="ship_Bill_rowIndex"	name="rowIndex"> 
					<input type="hidden" id="shipBill_pid" value="{{pid}}">
					<div class="row-fluid">
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>对账单编号 </label>
							<div class="controls txt">
								<input type="text" value="{{shipBillNo}}" id="shipBillNo" readonly='readonly'
									>
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>客户(委托方)</label>
							<div class="controls">
								<input type="hidden" id="buyNameTwo" value="{{buyName}}"> 
								<select
									data-placeholder="请选择..."
									onchange="ShipBillEdit.consigneeChange()"
									class="chzn-select span12 self-select" id="buyPidTwo"
									data-required="客户(委托方)不能为空!">
									<c:forEach items="${buyList}" var="item">
										<option value='${item.buyPid }'>${item.buyName }</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>结算总金额 </label>
							<div class="controls txt">
								<input type="text" id="shipBillAmount" value="{{billAmount}}"  data-number="只能输入数字" data-required="结算总金额不能为空">
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>账单月份</label>
							<div class="controls time">
								<input type="text" id="billDate" value="{{billDate}}" data-required="账单月份不能为空"> 
								<i	class="date" data-format="yyyy-MM"></i>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>对账日</label>
							<div class="controls time">
								<input type="text" id="checkDate" value="{{checkDate}}"	data-required="对账日不能为空"> 
									<i class="date"	data-format="yyyy-MM-dd"></i>
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>到期日期</label>
							<div class="controls time">
								<input type="text" id="shipBillToDate" value="{{toDate}}"	data-required="到期日期不能为空"> 
									<i class="date"	data-format="yyyy-MM-dd"></i>
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for="">客户确认人</label>
							<div class="controls">
								<input type="text" id="buyCheckName" value="{{buyCheckName}}">
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for="">审核人</label>
							<div class="controls txt">
								<input type="text" id="checkName" value="{{checkName}}">
							</div>
						</div>
						
					</div>
					<div class="row-fluid">
						<input type="hidden" value="{{billFileUrl}}" id="billFileUrl">
						<input type="hidden" value="{{billFileRename}}"	id="billFileRename">
						<input type="hidden" value="{{billFileName}}"	id="billFileName">
						<div class="span3 control-group full">
							<label class="control-label" for="">附件上传
							</label>
							<div class="controls" style="width:450px;">
								<input type='button' value='上传' class='btn'
									style="background-  color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
									onclick="javascript:ShipBillEdit.addUploadPop()" /> 
							</div>
						</div>
					</div>
					</div>
			</form>
		</div>
	</div>
	<div class="row-fluid" style="padding-left: 10px;padding-right: 10px;">
		<div class="row-fluid span6">
			<div class="widget-box">
				<div class="widget-header" style="background-color: #438eb9;">
					<span class="widget-title"><i class="icon-list"></i>对账单明细 </span> <span
						class="widget-toolbar"> </span>
				</div>
				<div class="widget-box" style="margin-top: 0px;">
					<div class="widget-body">
						<div class="widget-grid">
							<div class="grid-toolbar">
								<a class="btn btn-primary" href="javascript:void(0)" onclick="ShipBillEdit.detailAdd()"><i class=""></i>新增</a> 
								<a	class="btn btn-primary" href="javascript:void(0)" onclick="ShipBillEdit.editDetail()"><i class=""></i>编辑</a>
								<a	class="btn btn-primary" href="javascript:void(0)" onclick="ShipBillEdit.removeDetailItem()"><i class=""></i>删除</a>
							</div>
							<table id="shipBilldetail_mmg" class="mmg">
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div style="text-align: center;font-size: 12px;">
								对账单明细总金额(元)：<span style="color: red;" id="detailPices"></span>
								&nbsp; 对账单明细总数量：<span style="color: red;" id="detailNums"></span>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="row-fluid span6" style="margin-left: 5px;">
			<div class="widget-box" style="border: 1px solid #ccc;padding-bottom: 12px;">
				<div class="widget-header" style="background-color: #438eb9;">
					<span class="widget-title"><i class="icon-list"></i>明细编辑</span> <span
						class="widget-toolbar"> </span>
				</div>
				<div id="detail_div">
				<form class="form-horizontal" id="shipBillDetail_form" style="margin-top: 15px;">
				<input	type="hidden" value="{{rowIndex}}" id="detail_rowIndex"	name="rowIndex"> 
					<input type="hidden" id="detial_pid" value="{{pid}}">
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>物流单号</label>
							<div class="controls txt">
								<input type="text" value="{{shipNo}}" id="shipNo" onfocus="ShipBillEdit.checkNo();"
									data-required="物流单号不能为空">
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>始发站</label>
							<div class="controls">
								<input type="text" id="startPalce" value="{{startPalce}}" data-required="始发站不能为空"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>目的站</label>
							<div class="controls txt">
								<input type="text" value="{{toPlace}}" id="toPlace"
									data-required="目的站不能为空">
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>收货人</label>
							<div class="controls">
								<input type="text" id="consigneeName" value="{{consigneeName}}" data-required="收货人不能为空"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for="">服务方式 </label>
							<div class="controls txt">
								<input type="text" value="{{serviceType}}" id="serviceType"
									>
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>货物名</label>
							<div class="controls">
								<input type="text" id="goodsName" value="{{goodsName}}" data-required="货物名不能为空"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>总件数</label>
							<div class="controls txt">
								<input type="text" value="{{goodsNum}}" id="goodsNum"  data-number="只能输入数字"
									data-required="总件数不能为空">
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>体积</label>
							<div class="controls">
								<input type="text" id="goodsValume" value="{{goodsValume}}"  data-number="只能输入数字" data-required="体积不能为空"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for="">应收提货费</label>
							<div class="controls txt">
								<input type="text" value="{{deliveryFee}}" id="deliveryFee"	 data-number="只能输入数字">
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for="">应收操作费<span
								style="color: red;">*</span> </label>
							<div class="controls">
								<input type="text" data-required="应收操作费不能为空！"  data-number="只能输入数字" id="operationFee" value="{{operationFee}}"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for="">应收保险费</label>
							<div class="controls txt">
								<input type="text" value="{{insuranceFee}}" id="insuranceFee"  data-number="只能输入数字"
									>
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for="">应收派送费</label>
							<div class="controls">
								<input type="text" id="delivertoFee" value="{{delivertoFee}}"  data-number="只能输入数字"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for="">运费单价</label>
							<div class="controls txt">
								<input type="text" value="{{shipFee}}" id="shipFee"  data-number="只能输入数字">
							</div>
						</div>
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>应收运费</label>
							<div class="controls">
								<input type="text" id="shipPrice" value="{{shipPrice}}"  data-number="只能输入数字" data-required="应收运费不能为空"> 
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>应收总费用</label>
							<div class="controls txt">
								<input type="text" value="{{allPrice}}" id="allPrice"  data-number="只能输入数字"
									data-required="应收总费用不能为空">
							</div>
						</div>
						<!--  
						<div class="span6 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>签收状态</label>
							<div class="controls">
								<slt:select  cssClass="chzn-select" name="" optionsType="SHIP_STATUS"   >
								<slt:outHTML>id="shipStatus"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="状态不能为空"</slt:outHTML>
							</slt:select>
							</div>
						</div>-->
					</div>
				</form>
				</div>
				<div class="form-search-btn">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="ShipBillEdit.detailSave()"><i class=""></i>添加</a> 
				</div>
			</div>
		</div>
		</div>
	<div class="row-fluid" style="padding-bottom: 12px;">
		<div class="form-search-btn">
			<a class="btn btn-primary" href="javascript:void(0)"
				onclick="ShipBillEdit.addBillRow()"><i class=""></i>确定</a> <a
				class="btn btn-primary" href="javascript:void(0)"
				onclick="ShipBillEdit.shipBillCancle()"><i class=""></i>取消</a>
		</div>
	</div>
</script>
