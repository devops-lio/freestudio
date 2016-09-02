<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/noteAddInfo.js"></script>	
<div class="widget-box">
		<div class="widget-header" style="background-color: #438eb9;">
			<span class="widget-title"><i class="icon-list"></i>补充发票</span> <span
				class="widget-toolbar"> </span>
		</div>
	<div class="widget-box" style="margin-top: 0px;">
	  <div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="NoteAddInfo.receipt_add()"><i class=""></i>新增</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="NoteAddInfo.editReceipt()"><i class=""></i>编辑</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="NoteAddInfo.removeReceiptItem()" ><i class=""></i>删除</a> 
			</div>
				<table id="receiptAdd_mmg" class="mmg">
	     					<tr>
	         					<th rowspan="" colspan=""></th>
	     					</tr>
	 					</table>
	 					<div  style="text-align: center;font-size: 12px;">
				   发票价税合计：<span style="color: red;" id="addReceiptPices"></span> 
				   	&nbsp; 	 折扣后价税合计：<span style="color: red;" id="addreceiptDisount"></span>
				  	&nbsp; 	 发票总数量：<span style="color: red;" id="addReceiptNums"></span>
					  	 </div> 
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span6" id="tabwin_add_receipt">
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
			<input	type="hidden" value="{{rowIndex}}" id="receipt_rowIndex"	name="rowIndex">
			<input type="hidden" id="receiptPid"	value="{{receiptPid}}">
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>发票号码 </label>
									<div class="controls txt">
										<input type="text" value="{{receiptNumber}}" id="receiptNumber" 
											data-required="发票号码不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>填开日期 </label>
									<div class="controls time">
										<input type="text" id="issueDate" value="{{issueDate}}"	data-required="填开时间不能为空">
										<i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
								
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>到期日期</label>
									<div class="controls time">
										<input type="text" id="receiptToDate" value="{{receiptToDate}}"	data-required="到期日期不能为空">
											<i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div> 
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>价税合计</label>
									<div class="controls txt">
										<input type="text" id="actualAmount" value="{{actualAmount}}" data-required="价税合计不能为空" data-number="只能输入数字!">
									</div>
								</div>
								
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>付款方名称 </label>
									<div class="controls">
										<input type="hidden" id="payerName" value="{{payerName}}">
										<select data-placeholder="请选择..." onchange="NoteAddInfo.consigneeChange()"  
												class="chzn-select span12 self-select" 
												id="payerPid" data-required="付款方不能为空!">
											<c:forEach items="${buyList}" var="item">
												<option value='${item.buyPid }'>${item.buyName }</option>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">付款方纳税人识别号</label>
									<div class="controls txt">
										<input type="text" id="taxPayerIdentifier" value="{{taxPayerIdentifier}}">
									</div>
								</div>
								
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">发票类型 </label>
									<div class="controls">
										<slt:select cssClass="chzn-select"	optionsType="RECEIPT_TYPE">
											<slt:outHTML>id="receiptType"</slt:outHTML>
										</slt:select>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">发票种类 </label>
									<div class="controls">
										<slt:select cssClass="chzn-select"	optionsType="RECEIPT_KINDS">
											<slt:outHTML>id="receiptKinds"</slt:outHTML>
										</slt:select>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">收付标识 </label>
									<div class="controls txt">
										<input type="text" id="rpFlag" value="{{rpFlag}}">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">代收代付标识</label>
									<div class="controls txt">
										<input type="text" id="cpFlag" value="{{cpFlag}}">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">发票代码 </label>
									<div class="controls txt">
										<input type="text" value="{{receiptNo}}" id="receiptNo"	>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">客户签收日期 </label>
									<div class="controls time">
										<input type="text" id="signforDate" value="{{signforDate}}"	>
											<i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
							</div>
							
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">付款方开户行</label>
										<div class="controls ">
											<input type="text" id="payerBank" value="{{payerBank}}">
				   						</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">付款方账号</label>
									<div class="controls">
										<input type="text" value="{{payerAccountNumber}}" id="payerAccountNumber" >
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方名称 </label>
									<div class="controls txt">
										<input type="text" id="payeeName" value="{{payeeName}}"
											>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方纳税人识别号</label>
									<div class="controls txt">
										<input type="text" id="taxPayeeIdentifier" value="{{taxPayeeIdentifier}}"
											>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方地址 </label>
									<div class="controls txt">
										<input type="text" id="payeeAddress" value="{{payeeAddress}}"
											>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方电话</label>
									<div class="controls txt">
										<input type="text" id="payeePhone" value="{{payeePhone}}"
											>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方开户行 </label>
									<div class="controls txt">
										<input type="text" id="payeeBank" value="{{payeeBank}}"
											>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">收款方账号</label>
									<div class="controls txt">
										<input type="text" id="payeeAccountNumber" value="{{payeeAccountNumber}}"
											>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">商品名称或经营项目 </label>
									<div class="controls txt">
										<input type="text" id="settlementName" value="{{settlementName}}" >
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">收款人姓名</label>
									<div class="controls txt">
										<input type="text" id="payeeEsusUsername"  	value="{{payeeEsusUsername}}">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">开票人姓名 </label>
									<div class="controls txt">
										<input type="text" id="drawerEsusUsername" value="{{drawerEsusUsername}}" >
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">合计总金额 </label>
									<div class="controls txt">
										<input type="text" id="sumAmount"  	value="{{sumAmount}}"  data-number="只能输入数字!">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">合计不含税总金额</label>
									<div class="controls txt">
										<input type="text" id="sumNotaxAmount" value="{{sumNotaxAmount}}" data-number="只能输入数字!">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for="">合计总税金 </label>
									<div class="controls txt">
										<input type="text" id="sumTaxAmount"  	value="{{sumTaxAmount}}" data-number="只能输入数字!">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for="">实际总税金</label>
									<div class="controls txt">
										<input type="text" id="actualTaxAmount"  	value="{{actualTaxAmount}}" data-number="只能输入数字!">
									</div>
								</div>
								<div class="span5 control-group full">
	               					 <label class="control-label" for="">附件上传</label>
	                				<div class="controls" style="width:450px;">
	                  					<input type='button'  value='上传' class='btn' style="background-  color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
												onclick="javascript:NoteAddInfo.addUploadPop()" />
	                				</div>
	           					</div>
							</div>
	       						<input type="hidden" value="{{receiptFileUrl}}" id="receipt_url" >
								<input type="hidden" value="{{receiptFileName}}"   id="receipt_fileName" >
								<input type="hidden" value="{{receiptFileRename}}"   id="receiptFileRename" >
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="NoteAddInfo.addReceiptRow()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="NoteAddInfo.receiptCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
