<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
#order_form .span3 {
	margin-left: 1px;
}
#order_form .span6 {
	margin-left: -10px;
}
</style>
<div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)"
				onclick="OrderInfo.order_add()"><i class=""></i>新增</a> <a
				class="btn btn-primary" href="javascript:void(0)"
				onclick="OrderInfo.editOrder()"><i class=""></i>编辑</a> <a
				class="btn btn-primary" href="javascript:void(0)"
				onclick="OrderInfo.removeOrderItem()"><i class=""></i>删除</a>
		</div>
		<table id="order_mmg" class="mmg">
			<tr>
				<th rowspan="" colspan=""></th>
			</tr>
		</table>
		<div style="text-align: center;font-size: 12px;border-bottom: 1px #ccc solid;">
			订单总金额(元)：<span style="color: red;" id="order_pices"></span>
				&nbsp; 	 折扣后金额(元)：<span style="color: red;" id="orderDisount"></span>
			 &nbsp;
			订单总数量：<span style="color: red;" id="order_nums"></span>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="win span10" id="tabwin_add_order">
		<div class="win-header">
			<span>订单基本信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" style="margin-right: 30px;" id="tabwin_add_content_order"></div>
	</div>
</div>
<script id="template_order" type="text/x-handlebars-template">
			<div class="form-search">
				<form class="form-horizontal" id="order_form">
					<input type="hidden" name="id" value="{{id}}"> 
					<input	type="hidden" value="{{rowIndex}}" id="order_rowIndex"	name="rowIndex"> 
					<input type="hidden" id="shipOrderPid"	value="{{shipOrderPid}}">
					<div class="row-fluid">
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>订单编号</label>
							<div class="controls txt">
								<input type="text" value="{{orderNo}}" id="orderNo"
									data-required="订单编号不能为空">
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for="">订单条码</label>
							<div class="controls txt">
								<input type="text" value="{{orderBarcode}}" id="orderBarcode">
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>委托方名称</label>
							<input type="hidden" id="orderBuyName" value="{{orderBuyName}}">
							<div class="controls ">
								<select data-placeholder="请选择..." 
									class="chzn-select span12 self-select" onchange="OrderInfo.buyChange()"
									id="orderBuyPid" data-required="委托方名称不能为空!">
									<c:forEach items="${buyList}" var="item">
										<option value='${item.buyPid }'>${item.buyName }</option>
									</c:forEach>
								</select>
		   					</div>
		   				</div>
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>下单人 </label>
							<div class="controls txt">
								<input type="text" id="singleName" value="{{singleName}}"
									data-required="下单人名称不能为空">
							</div>
						</div>
		   			</div>	
					<div class="row-fluid">
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>下单时间 </label>
							<div class="controls time">
								<input type="text" id="singleDate" data-required="下单时间不能为空"
									value="{{singleDate}}">
								<i class="date" data-format="yyyy-MM-dd"></i>
							</div>
						</div>
						<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>提货联系人 </label>
								<div class="controls txt">
									<input type="text" id="shipperContact" value="{{shipperContact}}"
										data-required="提货联系人不能为空">
								</div>
						</div>
						<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>提货地址 </label>
								<div class="controls txt">
									<input type="text" id="shipperAddress" value="{{shipperAddress}}"
										data-required="提货地址不能为空">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>提货联系人电话</label>
								<div class="controls">
									<input type="text" value="{{shipperTel}}" id="shipperTel" 
										data-required="提货联系人电话不能为空!"> 
								</div>
							</div>
					</div>
					<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>总件数</label>
								<div class="controls txt">
									<input type="text" id="quantity" value="{{quantity}}"
										data-required="总件数不能为空">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">总体积</label>
								<div class="controls txt">
									<input type="text" id="valume" value="{{valume}}">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>重量</label>
								<div class="controls txt">
									<input type="text" id="weight" value="{{weight}}"
										data-required="重量不能为空">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">开票金额</label>
								<div class="controls txt">
									<input type="text" id="billAmount" value="{{billAmount}}">
								</div>
							</div>
					</div>
					<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label" for="">预收付金额 </label>
								<div class="controls txt">
									<input type="text" id="preAmount" value="{{preAmount}}">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for="">已收付金额 </label>
								<div class="controls txt">
									<input type="text" id="amountReceived" value="{{amountReceived}}">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>总金额 </label>
								<div class="controls txt">
									<input type="text" id="totalAmount" value="{{totalAmount}}"
										data-required="总金额不能为空">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label" for=""><span
									style="color: red;">*</span>有效期至</label>
								<div class="controls time">
									<input type="text" id="orderToDate" data-required="有效时间不能为空"
										value="{{toDate}}">
									<i class="date" data-format="yyyy-MM-dd"></i>
								</div>
							</div>
					</div>
					<div class="row-fluid">   
						<div class="span3 control-group full">
							<label class="control-label" for="">运输类型</label>
							<div class="controls txt">
								<input type="text" value="{{tranType}}" id="tranType" >
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label" for="">订单状态 </label>
							<div class="controls txt">
								<input type="text" value="{{orderStatus}}" id="orderStatus" >
							</div>
						</div>
						<div class="span3 control-group full">
								<label class="control-label" for="">要求到达时间 </label>
								<div class="controls time">
									<input type="text" id="reqArrivalDate" 
									 	value="{{reqArrivalDate}}">
									<i class="date" data-format="yyyy-MM-dd"></i>
								</div>
						</div>
						<div class="span3 control-group full">
								<label class="control-label" for="">要求提货时间 </label>
								<div class="controls time">
									<input type="text" id="reqDeliveryDate"
									 	value="{{reqDeliveryDate}}">
									<i class="date" data-format="yyyy-MM-dd"></i>
								</div>
						</div>
					</div>
			        <div class="row-fluid">   
						<div class="span3 control-group full">
							<label class="control-label" for=""><span
								style="color: red;">*</span>派车单号</label>
							<div class="controls txt">
								<input type="text" value="{{delveryNo}}" id="delveryNo" 
									data-required="派车单号不能为空">
							</div>
						</div> 
						<div class="span3 control-group full">
							<label class="control-label" for="">是否开票 </label>
							<div class="controls txt">
								<input type="text" value="{{isHaveBill}}" id="isHaveBill" >
							</div>
						</div> 
						<div class="span3 control-group full">
							<label class="control-label" for="">是否已开单</label>
							<div class="controls txt">
								<input type="text" value="{{isHaveAccount}}" id="isHaveAccount">
							</div>
						</div> 
						<div class="span3 control-group full">
							<label class="control-label" for="">备注</label>
							<div class="controls txt">
								<input type="text" value="{{remark}}" id="remark" >
							</div>
						</div>   
			        </div>
					<input type="hidden" value="{{fileUrl}}" id="odder_url" >
					<input type="hidden" value="{{fileName}}" id="order_fileName" >
					<input type="hidden" value="{{fileReName}}" id="order_fileReName" >
			        <div class="row-fluid"> 
			            <div class="span5 control-group full">
			                <label class="control-label" for="">附件上传</label>
			                <div class="controls" style="width:250px;">
									<input onclick="javascript:OrderInfo.addUploadPop()"  type='button'  value='上传' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
			                </div>
			            </div>
			        </div>
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="OrderInfo.addOrderRow()"><i class=""></i>确定</a> <a
						class="btn btn-primary" href="javascript:void(0)"
						onclick="OrderInfo.orderCancle()"><i class=""></i>取消</a>
				</div>
</script>
