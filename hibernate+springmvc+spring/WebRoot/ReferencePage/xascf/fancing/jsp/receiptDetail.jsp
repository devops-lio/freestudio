<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/receiptDetail.js"></script>	
<style>
.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px;left:10px; }
.baseInfo td{line-height:25px;}
</style>
<div class="row-fluid" style="margin:10px 20px 10px 20px;">
	<table class="baseInfo" style="margin-left: 50px;">
		<tr>
			<td align="right">融资单号:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</td> 
				<td align="right">融资会员:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.requestName}</td> 
				<td align="right">融资申请金额(元):</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}</td> 
				<td align="right">融资申请时间:</td> 
				<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestDateStr}</td> 
			</tr> 
			<tr> 
				<td align="right">融资种类:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingTypeCn}</td> 
				<td align="right">融资方式:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunctionCn}</td> 
				<td align="right">融资类别:</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingOrderItem.fancingKindsCn}</td> 
				<td align="right">申请人类别:</td> 
				<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestTypeCn}</td> 
			</tr> 
			<tr> 
				<td align="right">监管账户类型:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankType}</td> 
				<td align="right">监管账户:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankNo}</td> 
				<td align="right">开户行:</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingOrderItem.fancingBankName}</td> 
				<td colspan="2"></td> 
			</tr> 
			<c:if test="${fancingOrderEntity.notePoolModel.remark!=null}">
			<tr>
				<td align="right">备注:</td>
				<td colspan="7" style="color: red;">${fancingOrderEntity.notePoolModel.remark}</td>
		    </tr>
    		</c:if>
    </table>
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>采购商</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
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
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>发票信息</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="ReceiptDetail.add('receipt')">新增</a> 
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.editReceipt()">编辑</a> 
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.removeReceiptItem()">删除</a> 
				</div>
				<table id="all_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div  style="text-align: center;font-size: 12px;">
					运单总金额(元)：<span style="color: red;" id="pices"></span> 
					&nbsp;发票总数量：<span style="color: red;" id="nums"></span>
				</div> 
			</div>
		</div>
	</div>
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>提单清单</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="ReceiptDetail.add('ladingBill')">新增</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.editLadingBill()">编辑</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.removeLadingBillItem()">删除</a> 
				</div>
				<table id="ladingBill_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div  style="text-align: center;font-size: 12px;">
					运单总金额(元)：<span style="color: red;" id="ladingBillpices"></span> 
					&nbsp;提单总数量：<span style="color: red;" id="ladingBillnums"></span>
				</div> 
			</div>
		</div>
	</div>
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>运单</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="ReceiptDetail.add('ship')">新增</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.editShip()">编辑</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.removeShipItem()">删除</a> 
				</div>
				<table id="ship_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div  style="text-align: center;font-size: 12px;">
					运单总金额(元)：<span style="color: red;" id="shippices"></span> 
					&nbsp;运单总数量：<span style="color: red;" id="shipnums"></span>
				</div> 
			</div>
		</div>
	</div>
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>抵押列表</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>	
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.add('dy')"><i class=""></i>新增</a> 
					<a  class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.editdy()"><i class=""></i>编辑</a> 
					<a  class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.removeDyItem()()" ><i class=""></i>删除</a> 
				</div>
				<table id="dy_mmg" class="mmg">
					<tr>
					   <th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div id="pg" style="text-align: right;"></div>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>担保信息</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.add('db')"><i class=""></i>新增</a>  
					<a  class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.editdb()"><i class=""></i>编辑</a> 
					<a  class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.removedbItem()" ><i class=""></i>删除</a> 
				</div>
				<table id="db_mmg" class="mmg">
					<tr>
					    <th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div id="pg" style="text-align: right;"></div>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.save()"><i class=""></i>保存</a>
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptDetail.cancel()"><i class=""></i>取消</a>
</div>
<div style="display:none;">
<form class="form-horizontal" id="fancingForm">
<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo}"	name="fancingOrderEntity.fancingOrderItem.fancingOrderNo" id="fancingOrderNo">
<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingType}"	name="fancingOrderEntity.fancingOrderItem.fancingType" id="fancingType">
<input type="hidden"  id="customerName" value="${fancingOrderEntity.fancingOrderItem.requestName }">
</form>
</div>
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
					 <div class="controls">
						<select data-placeholder="请选择..." onchange="ReceiptDetail.consigneeChange('receipt')"  class="chzn-select span12 self-select" id="receiptOtherPid" data-required="发票抬头不能为空!">
						</select>
				    </div>
 						<input type="hidden"  value="{{receiptOtherName}}" id="receiptOtherName" >
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
								onchange="ReceiptDetail.upLoadChange('receipt')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid" style="display:none">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span></label>
					<div class="controls txt">
			        	<input type="text" id="remark" value="{{remark}}">
			        </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ReceiptDetail.addReceiptRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ReceiptDetail.cancle('receipt')"><i class=""></i>取消</a>
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
								onchange="ReceiptDetail.upLoadChange('ladingBill')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid" style="display:none">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span></label>
					<div class="controls txt">
			        	<input type="text" id="remark" value="{{remark}}">
			        </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ReceiptDetail.addLadingBillRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ReceiptDetail.cancle('ladingBill')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
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
	                <label class="control-label" for="">收货人<span style="color: red;">*</span></label>
	                <div class="controls">
						<select data-placeholder="请选择..." onchange="ReceiptDetail.consigneeChange('ship')"  class="chzn-select span12 self-select" id="shipConsigneePid" data-required="收货人不能为空!">
						</select>
				    </div>
 						<input type="hidden"  value="{{shipConsigneeName}}" id="shipConsigneeName" >
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
	        <div class="row-fluid" style="display:none">    
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span></label>
					<div class="controls txt">
			        	<input type="text" id="remark" value="{{remark}}">
			        </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ReceiptDetail.addShipRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ReceiptDetail.cancle('ship')"><i class=""></i>取消</a>
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
								onchange="ReceiptDetail.upLoadChange('db')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ReceiptDetail.adddbRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ReceiptDetail.cancle('db')"><i class=""></i>取消</a>
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
								onchange="ReceiptDetail.upLoadChange('dy')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ReceiptDetail.adddyRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ReceiptDetail.cancle('dy')"><i class=""></i>取消</a>
	    </div>
	</div>
</script>