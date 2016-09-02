<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<style>
.table th, .table td {
padding: 3px;
}
.table{
margin-bottom: 5px;
}

</style>
<script type="text/javascript"	src="xascf/fancing/js/fancingExtendRequest.js"></script>
<input type="hidden"  id="rebackFunction" value="${rebackFunction}">
			<input type="hidden"  id="beforeBackOrderNo" value="${beforeBackOrderNo}">
			<input type="hidden"  id="isExtend" value="${isExtend}">
			<input type="hidden"  value="${fancingOrderEntity.fancingBillItem.billCycleRemark}" name="billrebackRecordItem.billCycleRemark" id="billCycleRemark">
<div class="form-search " style="font-size: 13px;margin: 20px;">
		<div class="row-fluid form-horizontal">
			<table style="margin-left: 50px;">
				<tr>
					<td align="right">融资单号:</td>
					<td style="width: 170px;color: red;" >${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</td>
					<td align="right">融资会员:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.requestName}</td>
					<td align="right">融资申请金额(元):</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}</td>
					<td align="right">融资申请时间:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestDateStr}</td>
				</tr>
				<tr>
					<td align="right">融资种类:</td>
					<td style="width: 170px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingType}</td>
					<td align="right">融资方式:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunction}</td>
					<td align="right">融资类别:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingKinds}</td>
					<td align="right">申请人类别:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestType}</td>
				</tr>
				<tr>
					<td align="right">监管账户类型:</td>
					<td style="width: 170px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankType}</td>
					<td align="right">监管账户:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankNo}</td>
					<td align="right">开户行:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingBankName}</td>
					<td></td>
				</tr>
			</table>
		</div>
		<div class="row-fluid" style="margin-top: 5px;color: red;">账单列表：</div>
			<div class="row-fluid">    
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="detail_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
									本期总剩余(元)：<span style="color: red;" id="rebackBillPrice"></span> 
								  	&nbsp; 	 本期总应还(元)：<span style="color: red;" id="rebackPayPrice"></span>
								  	 &nbsp; 	 本期已还(元)：<span style="color: red;" id="rebackRebackedPrice"></span>
								  	 &nbsp; 	 本期总利息(元)：<span style="color: red;" id="rebackLxPrice"></span>
					 		</div> 
						</div>	
					</div>
	        </div>
		<c:if test="${null!=fancingOrderEntity.shipOrderItemList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">运单列表：</div>
			<div class="row-fluid">
				<div class="widget-box">
				   <div class="widget-body">
						<div class="widget-grid">
								<div class="grid-toolbar">
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.add('ship')"><i class=""></i>追加</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.editShip()"><i class=""></i>编辑</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.removeShipItem()" ><i class=""></i>删除</a> 
									</div>
								<table id="ship_mmg" class="mmg">
			       					<tr>
			           					<th rowspan="" colspan=""></th>
			       					</tr>
			   					</table>
			   					<div  style="text-align: center;font-size: 12px;">
								   运单总金额(元)：<span style="color: red;" id="pices"></span> 
								  	&nbsp; 	 运单总数量：<span style="color: red;" id="nums"></span>
								  	 </div> 
						</div>
					</div>
				</div>
			</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.receiptItemList }">
		<div class="row-fluid" style="margin-top: 5px;color: red;">发票列表：</div>
			<div class="row-fluid">
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
								<div class="grid-toolbar">
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.add('receipt')"><i class=""></i>追加</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.editReceipt()"><i class=""></i>编辑</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.removeReceiptItem()" ><i class=""></i>删除</a> 
									</div>
										<table id="receipt_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
					   					<div  style="text-align: center;font-size: 12px;">
										   发票总金额(元)：<span style="color: red;" id="picesReceipt"></span> 
										  	&nbsp; 	 发票总数量：<span style="color: red;" id="numsReceipt"></span>
										  	 </div>
								</div>
							</div>
						</div>
		</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.ladingBillList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">提单列表：</div>
			<div class="row-fluid">
			 			<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
								<div class="widget-grid">
									<div class="grid-toolbar">
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.add('ladingBill')"><i class=""></i>追加</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.editLadingBill()"><i class=""></i>编辑</a> 
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.removeLadingBillItem()" ><i class=""></i>删除</a> 
									</div>
										<table id="ladingBill_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
					   					<div  style="text-align: center;font-size: 12px;">
										  提单总金额(元)：<span style="color: red;" id="ladingBillpices"></span> 
										  	&nbsp; 	 提单总数量：<span style="color: red;" id="ladingBillnums"></span>
										  	 </div> 
								</div>
							</div>
						</div>
			</div>
		</c:if>
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">担保信息：</div>
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
									<div class="grid-toolbar">
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.add('db')"><i class=""></i>追加</a> 
								      <a  class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.editdb()"><i class=""></i>编辑</a> 
								      <a  class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.removedbItem()" ><i class=""></i>删除</a> 
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
			   <div class="row-fluid" style="margin-top: 5px;color: red;">抵押信息：</div>
				<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
									<div class="grid-toolbar">
								      <a class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.add('dy')"><i class=""></i>追加</a> 
								      <a  class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.editdy()"><i class=""></i>编辑</a> 
								      <a  class="btn btn-primary" href="javascript:void(0)" onclick="FancingExtendRequest.removeDyItem()()" ><i class=""></i>删除</a> 
									</div>
										<table id="dy_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table>
								</div>
							</div>
						</div>
			</div>
</div>
	<div class="row-fluid" id="checkDiv">
			<div class="row-fluid" id="checkDiv">
			<form class="form-horizontal" id="check_form">
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingPid}"	name="fancingOrderEntity.fancingOrderItem.fancingPid" id="fancingPid">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo}"	name="fancingOrderEntity.fancingOrderItem.fancingOrderNo"	id="fancingOrderNo">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingDate}"	id="fancingDate">
		 	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingDateType}"	id="fancingDateType">
	        	<div class="row-fluid" style="margin-top: 10px;">
					<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">展期金额<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingOrderItem.fancingDelayPrice" id="fancingReplyPrice"   value="${fancingOrderEntity.fancingBillItem.billPrice}"
								data-required="账期金额不能为空！" data-number="只能输入数字!"> <i></i>
						</div>
					</div>
					<div class="span3 control-group full" id="zhangqi">
						<label class="control-label" style="width: 80px;">展期<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<div style="float: left;width: 66%">
							<input type="text"	name="fancingOrderEntity.fancingOrderItem.fancingDelayDate"  id="extendDate"
							 data-required="展期不能为空！" data-number="只能输入数字!"> 
						</div>
						<slt:select cssClass="chzn-select"
							name="fancingOrderEntity.fancingOrderItem.fancingDateType"
							optionsType="DATE_TYPE">
							<slt:outHTML>id="dateType"</slt:outHTML>
							<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
						</slt:select>
						</div>
					</div>
				</div>
	    		<div class="form-search-btn offset4"  style="margin-top: 30px;margin-bottom:20px;width: 62%">
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.saveFancingExtendRequest()"><i class=""></i>申请发起</a>
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.rebackCheck()"><i class=""></i>返回</a>
	    		</div>
			</form>
	</div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_ship">
        <div class="win-header">
            <span>运单基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_ship">
        </div>
    </div>
</div>
<script id="template_ship" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="ship_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" id="shipOrderPid" value="{{shipOrderPid}}"  >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运单号码<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{shipNo}}" id="shipNo" data-required="运单号码不能为空">
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">委托人<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{shipClient}}" id="shipClient" data-required="委托人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">车牌号码<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipCarNo" value="{{shipCarNo}}" data-required="车牌号码不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">出发地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipFrom" value="{{shipFrom}}" data-required="出发地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">目的地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipTo" value="{{shipTo}}" data-required="目的地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运单金额<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipPrice" value="{{shipPrice}}" data-required="运单金额不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物名称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipName" value="{{shipName}}" data-required="货物名称不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物数量<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipNum" value="{{shipNum}}" data-required="货物数量不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">状态<span style="color: red;">*</span></label>
	                <div class="controls">
							<slt:select  cssClass="chzn-select" name="" optionsType="SHIP_STATUS"   >
								<slt:outHTML>id="shipStatus"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="状态不能为空"</slt:outHTML>
							</slt:select>
				                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.addShipRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="FancingExtendRequest.cancle('ship')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_receipt">
        <div class="win-header">
            <span>发票基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_receipt">
        </div>
    </div>
</div>
<script id="template_receipt" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="receipt_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" id="receiptPid" value="{{receiptPid}}"  >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发票代码<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{receiptNo}}" id="receiptNo" data-required="发票代码不能为空">
				                </div>
	            </div>
	        </div>
 			<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发票类型<span style="color: red;">*</span></label>
					<div class="controls">
							<slt:select  cssClass="chzn-select" name="" optionsType="FANCING_RECEIPT_TYPE"  >
								<slt:outHTML>id="receiptType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发票抬头<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{receiptOtherName}}" id="receiptOtherName" data-required="发票抬头不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物名称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="goodsName" value="{{goodsName}}" data-required="货物不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">规格</label>
	                <div class="controls txt">
	                    <input type="text"  id="goodsSpec" value="{{goodsSpec}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">数量</label>
	                <div class="controls txt">
	                    <input type="text"  id="goodsNum" value="{{goodsNum}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">单位</label>
	                <div class="controls txt">
	                    <input type="text"  id="goodsUnit" value="{{goodsUnit}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发票金额<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="receiptPrice" value="{{receiptPrice}}" data-required="发票金额不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">税率</label>
	                <div class="controls txt">
	                    <input type="text"  id="taxRate" value="{{taxRate}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">税额</label>
	                <div class="controls txt">
	                    <input type="text"  id="taxPrice" value="{{taxPrice}}" >
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">填开时间<span style="color: red;">*</span></label>
						<div class="controls time">
			                <input type="text" id="receiptFromDate" data-required="填开时间不能为空！"
			                 value="{{receiptFromDate}}">
			                <i  class="date" data-format="yyyy-MM-dd" ></i>
			              </div>
	            </div>
	        </div>
	       <input type="hidden" value="{{receiptFileUrl}}" id="receipt_url" >
				<input type="hidden" value="{{receiptFileName}}" id="receipt_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">附件上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;">
	                  <input type='text' name='textfield' data-required="附件不能为空！" value="{{receiptFileName}}"
							 id='textfielid_receipt' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_receipt" size="28" style="height:24px;width:200px;"
								onchange="FancingExtendRequest.upLoadChange('receipt')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.addReceiptRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="FancingExtendRequest.cancle('receipt')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_ladingBill">
        <div class="win-header">
            <span>提单基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_ladingBill">
        </div>
    </div>
</div>
<script id="template_ladingBill" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="ladingBill_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" id="ladingBillPid" value="{{ladingBillPid}}"  >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">提单号<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{ladingBillNo}}" id="ladingBillNo" data-required="提单号不能为空">
				                </div>
	            </div>
	        </div>
 			<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">提单类型<span style="color: red;">*</span></label>
					<div class="controls">
							<slt:select  cssClass="chzn-select" name="" optionsType="FANCING_LADINGBILL_TYPE"  >
								<slt:outHTML>id="ladingBillType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发货人<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{ladingBillClient}}" id="ladingBillClient" data-required="发货人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">起运地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillFrom" value="{{ladingBillFrom}}" data-required="起运地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">目的地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillTo" value="{{ladingBillTo}}" data-required="目的地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">航次<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillCarNo" value="{{ladingBillCarNo}}" data-required="航次不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物名称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillGoodsname" value="{{ladingBillGoodsname}}" data-required="货物名称不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物数量<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillNum" value="{{ladingBillNum}}" data-required="货物数量不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运费<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillPrice" value="{{ladingBillPrice}}" data-required="运费不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">承运时间<span style="color: red;">*</span></label>
						<div class="controls time">
			                <input type="text" id="ladingBillDate" data-required="承运时间不能为空！"
			                 value="{{ladingBillDate}}">
			                <i  class="date" data-format="yyyy-MM-dd" ></i>
			              </div>
	            </div>
	        </div>
	       <input type="hidden" value="{{ladingBillFileurl}}" id="ladingBill_url" >
				<input type="hidden" value="{{ladingBillFilename}}" id="ladingBill_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">附件上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;">
	                  <input type='text' name='textfield' data-required="附件不能为空！" value="{{ladingBillFilename}}"
							 id='textfielid_ladingBill' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_ladingBill" size="28" style="height:24px;width:200px;"
								onchange="FancingExtendRequest.upLoadChange('ladingBill')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.addLadingBillRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="FancingExtendRequest.cancle('ladingBill')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
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
							<input type="file" name="file"  class="file" id="file_db" size="28" style="height:24px;width:200px;"
								onchange="FancingExtendRequest.upLoadChange('db')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.adddbRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="FancingExtendRequest.cancle('db')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
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
	                <label class="control-label" for="">抵押类型<span style="color: red;">*</span></label>
					<div class="controls">
							<slt:select  cssClass="chzn-select" name="" optionsType="DY_MATERIAL_TYPE"  >
								<slt:outHTML>id="qualificationType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">抵押材料编号<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{qualificationNo}}" id="qualificationNo" data-required="材料编号不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">抵押材料全称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="qualificationName" value="{{qualificationName}}" data-required="材料名称不能为空">
	                </div>
	            </div>
	        </div>
				<input type="hidden" value="{{qualificationUrl}}" id="dy_url" >
				<input type="hidden" value="{{qualificationFileName}}" id="dy_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">附件上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;">
	                  <input type='text' name='textfield' data-required="附件文件不能为空！" value="{{qualificationFileName}}"
							 id='textfielid_dy' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_dy" size="28" style="height:24px;width:200px;"
								onchange="FancingExtendRequest.upLoadChange('dy')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingExtendRequest.adddyRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="FancingExtendRequest.cancle('dy')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
