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
<script type="text/javascript"	src="xascf/fancing/js/fancingContinueAuditingDetails.js"></script>
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
					<td style="width: 170px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingTypeCn}</td>
					<td align="right">融资方式:</td>
					<td style="width: 220px;color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunctionCn}</td>
					<td align="right">融资类别:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingKindsCn}</td>
					<td align="right">申请人类别:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestTypeCn}</td>
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
		<div class="row-fluid" style="margin-top: 5px;color: red;">企业风控评估信息：</div>
		<div class="row-fluid">
		<table class="table table-bordered" >
			${riskResult} 
			</table>
		</div> 
		<div class="row-fluid" style="margin-top: 5px;color: red;">融资材料信息：</div>
		<div class="row-fluid">
			<table class="table table-bordered" id="clTable">
				<tr>
					<th style="text-align: center;">类型</th>
					<th style="text-align: center;">附件</th>
					<th style="text-align: center;">评分结果(满分100)</th>
				</tr>
				<c:forEach items="${fancingOrderEntity.materialItemList}" var="item">
					<tr>
					<td style="text-align: center;">${item.materialType }</td>
					
					<td style="text-align: center;"><a target="_blank" href="xascf/util/download.shtml?fileName=${item.materialFileName}&url=${ item.materialUrl}">
							${item.materialFileName}</a></td>
					<td style="text-align: center;">${item.resultScore }</td>		
					</tr>
				</c:forEach>
				<c:forEach items="${fancingOrderEntity.guaranteeMappItemList}" var="item">
					<tr>
					<td style="text-align: center;">担保材料</td>
					
					<td style="text-align: center;"><a target="_blank" href="xascf/util/download.shtml?fileName=${item.guaranteeProtocolName}&url=${ item.guaranteeProtocolUrl}">
							${item.guaranteeProtocolName}</a></td>
					<td style="text-align: center;">${item.resultScore }</td>		
					</tr>
				</c:forEach>
				<c:forEach items="${fancingOrderEntity.qualificationItemList}" var="item">
					<tr>
					<td style="text-align: center;">${item.qualificationType }</td>
					
					<td style="text-align: center;"><a target="_blank" href="xascf/util/download.shtml?fileName=${item.qualificationFileName}&url=${ item.qualificationUrl}">
							${item.qualificationFileName}</a></td>
					<td style="text-align: center;">${item.resultScore }</td>		
					</tr>
				</c:forEach>
				<tr>
					<td style="text-align: center;color: red;">综合得分(100)</td>
					<td style="text-align: center;color: red;" colspan="2">${fancingOrderEntity.evaluateResultModel.score }</td>
				</tr>
				<tr>
					<td style="text-align: center;color: red;">评估建议</td>
					<td style="text-align: center;color: red;" colspan="2">${fancingOrderEntity.evaluateResultModel.evaluateConclusion }</td>
				</tr>
			</table>
		</div>
		<c:if test="${null!=fancingOrderEntity.buyerInfoList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">采购商列表：</div>
			<div class="row-fluid">
			<form class="form-horizontal" id="buyer_form">
				<table class="table table-bordered" id="buyerTable">
					<tr>
					<th style="text-align: center;">采购商名称</th>
					<th style="text-align: center;">注册资金</th>
					<th style="text-align: center;">所属行业</th>
					<th style="text-align: center;">折扣(%)</th>
				</tr>
					<c:forEach items="${fancingOrderEntity.buyerInfoList}" var="item" varStatus="status">
						<tr>
						<td style="text-align: center;">${item.customerName }</td>
						<td style="text-align: center;">${item.registeredFund }${item.currency }</td>
						<td style="text-align: center;">${item.industry }</td>
						<td style="text-align: center;">
							<input style="background-color: #ffffff;border: 1px solid #cccccc;border-radius: 4px;"
							data-required="采购商折扣不能为空！" data-number="只能输入数字!"
							 name="buyerRate" >
								<input type="hidden" name="customersubPid" 
								value="${item.customersubPid }">
						</td>		
						</tr>
					</c:forEach>
				</table>
				</form>
			</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.shipOrderItemList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">运单列表：</div>
			<div class="row-fluid">
				<div class="widget-box">
				   <div class="widget-body">
						<div class="widget-grid">
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
		<!--  
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">票据池信息：</div>
				<table class="table table-bordered" id="clTable">
					<tr>
						<th style="text-align: center;">类型</th>
						<th style="text-align: center;">票据号码</th>
						<th style="text-align: center;">票据抬头</th>
						<th style="text-align: center;">票据金额</th>
						<th style="text-align: center;">票据日期</th>
					</tr>
					<c:forEach items="${fancingOrderEntity.noteDetailsModelList}" var="item">
						<tr>
						<td style="text-align: center;">${item.noteType }</td>
						<td style="text-align: center;">${item.noteNo }</td>
						<td style="text-align: center;">${item.noteOwerPid }</td>
						<td style="text-align: center;">${item.notePrice }</td>
						<td style="text-align: center;">${item.noteDate }</td>
						</tr>
					</c:forEach>
				</table>
			</div>-->
		<!-- 
		<c:if test="${null!=fancingOrderEntity.guaranteeMappItemList }">
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">担保信息：</div>
				<table class="table table-bordered" id="clTable">
					<tr>
						<th style="text-align: center;">类型</th>
						<th style="text-align: center;">附件</th>
						<th style="text-align: center;">评分结果</th>
					</tr>
					<c:forEach items="${fancingOrderEntity.guaranteeMappItemList}" var="item">
						<tr>
						<td style="text-align: center;">担保</td>
						
						<td style="text-align: center;"><a target="_blank" href="xascf/util/download.shtml?fileName=${item.guaranteeProtocolName}&url=${ item.guaranteeProtocolUrl}">
								${item.guaranteeProtocolName}</a></td>
						<td style="text-align: center;">${item.guaranteeName }</td>		
						</tr>
					</c:forEach>
				</table>
			</div>
		</c:if>
		<c:if test="${null!=fancingOrderEntity.qualificationItemList }">
			<div class="row-fluid">
			   <div class="row-fluid" style="margin-top: 5px;color: red;">抵押信息：</div>
				<table class="table table-bordered" id="clTable">
					<tr>
						<th style="text-align: center;">类型</th>
						<th style="text-align: center;">附件</th>
						<th style="text-align: center;">评分结果</th>
					</tr>
					<c:forEach items="${fancingOrderEntity.qualificationItemList}" var="item">
						<tr>
						<td style="text-align: center;">${item.qualificationType }</td>
						
						<td style="text-align: center;"><a target="_blank" href="xascf/util/download.shtml?fileName=${item.qualificationFileName}&url=${ item.qualificationUrl}">
								${item.qualificationFileName}</a></td>
						<td style="text-align: center;">${item.qualificationName }</td>		
						</tr>
					</c:forEach>
				</table>
			</div>
		</c:if> -->
</div>
	<div class="row-fluid" id="checkDiv">
			<div class="row-fluid" id="checkDiv">
			<form class="form-horizontal" id="check_form">
				 <div class="row-fluid" style="margin-top: 5px;color: red;">融资票据池信息：</div>
				 <div class="row-fluid" >
					<div class="span3 control-group full">
						<label class="control-label" >票据总金额<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="text" name="fancingOrderEntity.notePoolModel.notePrice" id="notePrice" value="${allNotePrice }" 
								readonly="readonly"> 
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" >票据有效总金额<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="text"	name="fancingOrderEntity.notePoolModel.effectivePrice"  value="${allNotePrice }" 
							 data-required="有效金额不能为空！" data-number="只能输入数字!"> 
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" >剩余金额<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="text" name="fancingOrderEntity.notePoolModel.lostPrice"  value="${allNotePrice }" 
						data-required="剩余金额不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" >票据有效时间<span style="color:red;">*</span></label>
						<div class="controls time">
			                <input type="text" name="fancingOrderEntity.notePoolModel.effectiveDateStr"  data-required="票据有效时间不能为空！">
			                <i  class="date" data-format="yyyy-MM-dd"  ></i>
			              </div>
					</div>
					
				</div>
				 <div class="row-fluid" style="margin-top: 5px;color: red;">融资单基本信息：</div>
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingPid }" name="fancingOrderEntity.fancingOrderItem.fancingPid" id="fancingPid" >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }" name="fancingOrderEntity.fancingOrderItem.fancingOrderNo" id="fancingOrderNo" >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingKinds }" name="fancingOrderEntity.fancingOrderItem.fancingKinds"  >
	        	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingFunction }" name="fancingOrderEntity.fancingOrderItem.fancingFunction"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankType }" name="fancingOrderEntity.fancingOrderItem.fancingBankType"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankNo }" name="fancingOrderEntity.fancingOrderItem.fancingBankNo"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankName }" name="fancingOrderEntity.fancingOrderItem.fancingBankName"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.requesterPid }" name="fancingOrderEntity.fancingOrderItem.requesterPid"  >
	        	<div class="row-fluid" style="margin-top: 10px;">
					<div class="span3 control-group full">
						<label class="control-label" >批复虚拟金额<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="hidden" id="requestPrice" value="${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}">
							<input type="text" name="fancingOrderEntity.fancingOrderItem.fancingReplyPrice" id="fancingReplyPrice"  
								data-required="批复金额不能为空！" data-number="只能输入数字!"> <i></i>
						</div>
					</div>
					<div class="span3 control-group full" id="zhangqi">
						<label class="control-label" >账期<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<div style="float: left;width: 50%">
							<input type="text"	name="fancingOrderEntity.fancingOrderItem.fancingDate"
							 data-required="账期不能为空！" data-number="只能输入数字!"> 
						</div>
						<slt:select cssClass="chzn-select"
							name="fancingOrderEntity.fancingOrderItem.fancingDateType"
							optionsType="DATE_TYPE">
							<slt:outHTML>id="dateType"</slt:outHTML>
							<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
						</slt:select>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" >账期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="text" name="fancingOrderEntity.fancingRateItem.fancingRate" 
							data-required="账期利率不能为空！"	data-number="只能输入数字!" > <i></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" >逾期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<input type="text" name="fancingOrderEntity.fancingRateItem.overdueRate" 
						data-required="逾期利率不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
				</div>
	        	<div class="row-fluid" >
	        		<div class="span3 control-group full">
						<label class="control-label" >逾期计息方式<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingOverdueType" optionsType="OVERDUE_TYPE"   >
								<slt:outHTML>id="overdueType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" >还款方式<span style="color:red;">*</span></label>
						<div class="controls txt" >
							<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingRebackType" optionsType="BILLREBACK_TYPE" >
								<slt:outHTML>id="billRebackType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<c:if test="${fancingOrderEntity.fancingOrderItem.fancingFunction=='2'}">
					<div class="span3 control-group full" >
						<input type="hidden" id="pl_url" name="fancingOrderEntity.protocolInfoModel.protocolFileUrl">
						<input type="hidden" id="pl_fileName" name="fancingOrderEntity.protocolInfoModel.protocolFileName">
						<input type="hidden" id="pl_fileName" name="fancingOrderEntity.protocolInfoModel.fancingOrderNo" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
						<label class="control-label" style="width: 80px;">三方协议<span style="color:red;">*</span></label>
		                <div class="controls" style="width:250px;margin-left: 0px">
		                  <input type='text' name='textfield' data-required="协议文件不能为空！" 
								 id='textfielid_pl' style="height:22px; border:1px solid #cdcdcd; width:90px;" />
								<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
								<input type="file" name="file"  class="file" id="file_pl" size="28" style="height:24px;width:200px;margin-left: 50px;"
									onchange="FancingAuditingDetails.fileChange()" contenteditable="false" />	
		                </div>
					</div></c:if>
				</div>
	    		<div class="form-search-btn offset4"  style="margin-top: 30px;margin-bottom:20px;width: 62%">
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingAuditingDetails.saveFancingCheck()"><i class=""></i>通过</a>
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingAuditingDetails.rebackCheck()"><i class=""></i>驳回</a>
	    		</div>
			</form>
			<div id="rebackDiv" style="display: none;">
				<form class="form-horizontal" id="reback_form"> 
					<input type="hidden" value="" name="fancingOrderEntity.fancingOrderItem.fancingPid"  >
	        		<div class="row-fluid" style="margin-top: 10px;">
						<div class="span8 control-group full" style="margin-left: -75px;">
							<label class="control-label" >驳回理由<span style="color:red;">*</span></label>
							<div class="controls txt">
								<textarea rows="300" data-required="驳回理由不能为空！" name="fancingOrderEntity.fancingOrderItem.fancingRebackRemark" 
						 cols="500" style="width: 652px;height: 100px;resize:none;"></textarea>
							</div>
						</div>
					</div>
	    			<div class="form-search-btn offset4"  style="margin-bottom: 30px;width: 62%">
	       				 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingAuditingDetails.saveReback()"><i class=""></i>确定驳回</a>
	    			</div>
				</form>
			</div>
	</div>
</div>

