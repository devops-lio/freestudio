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
<script type="text/javascript"	src="xascf/fancing/js/fancingApprol.js"></script>
<div class="form-search " style="font-size: 13px;margin: 20px;">
		<div class="row-fluid form-horizontal">
			<table>
				<tr>
					<td align="right">融资单号:</td>
					<td style="color: red;width: 140px;" >${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</td>
					<td align="right">融资会员:</td>
					<td style="width: 240px;color: red;"><a>${fancingOrderEntity.fancingOrderItem.requestName}</a></td>
					<td align="right">批复金额(元):</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}</td>
					<td align="right">申请时间:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestDateStr}</td>
				</tr>
				<tr>
					<td align="right">融资种类:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingTypeCn}</td>
					<td align="right">融资方式:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunctionCn}</td>
					<td align="right">融资类别:</td>
					<td style="color: red;width: 120px">${fancingOrderEntity.fancingOrderItem.fancingKindsCn}</td>
					<td align="right">申请人类别:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestTypeCn}</td>
				</tr>
				<tr>
					<td align="right">融资单状态:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingStatusCn}</td>
					<td align="right">监管账户类型:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankType}</td>
					<td align="right">监管账户:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankNo}</td>
					<td align="right">开户行:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankName}</td>
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
					<th style="text-align: center;">折扣率(%)</th>
				</tr>
					<c:forEach items="${fancingOrderEntity.buyerInfoList}" var="item">
						<tr>
						<td style="text-align: center;">${item.customerName }</td>
						<td style="text-align: center;">${item.registeredFund }${item.currency }</td>
						<td style="text-align: center;">${item.industry }</td>
						<td style="text-align: center;">${item.buyerRate }</td>
						</tr>
					</c:forEach>
				
				</table>
				</form>
			</div>
		</c:if>
		<div class="row-fluid" style="margin-top: 5px;color: red;">融资票据信息：</div>
		<div class="tabbable" style="margin-left: 0px;">
		  	<ul id="tabLabel" class="nav nav-tabs">
		  		<li  class="active">
			    	<a href="#shipTab" data-toggle="tab" >运单</a>
			    </li>
			    <li>
			    	<a href="#receiptTab" data-toggle="tab" id="receipt_Tab">发票</a>
			    </li>
			    <li>
			    	<a href="#ladingBillTab" data-toggle="tab"  id="ladingBill_Tab">提单</a>
			    </li>
			    <li>
			    	<a href="#danbaoTab" data-toggle="tab"  id="danbao_Tab">担保</a>
			    </li>
			    <li>
			    	<a href="#diyaTab" data-toggle="tab" id="diya_Tab">抵押</a>
			    </li>
		  	</ul>
			<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;margin-top: -10px">
				<!-- 1.运单tab 页 ==================================================================== -->
				<div class="tab-pane active" id="shipTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;border-bottom: 1px solid #ccc;" >
							<table id="details_ship_mmg" class="mmg">
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
				<!-- 2. 发票tab 页 ==================================================================== -->
				<div class="tab-pane" id="receiptTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;border-bottom: 1px solid #ccc;" >
							<table id="details_receipt_mmg" class="mmg">
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
				<!-- 3. 提单tab 页 ==================================================================== -->
				<div class="tab-pane" id="ladingBillTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;border-bottom: 1px solid #ccc;" >
							<table id="details_ladingBill_mmg" class="mmg">
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
				<!-- 4. 担保tab页 ==================================================================== -->
				<div class="tab-pane" id="danbaoTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;border-bottom: 1px solid #ccc;" >
							<table id="details_db_mmg" class="mmg">
		       					<tr>
		           					<th rowspan="" colspan=""></th>
		       					</tr>
		   					</table>
	   					</div>
					</div>
				</div>
				<!-- 5. 抵押tab页 ==================================================================== -->
				<div class="tab-pane" id="diyaTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;border-bottom: 1px solid #ccc;" >
							<table id="details_dy_mmg" class="mmg">
		       					<tr>
		           					<th rowspan="" colspan=""></th>
		       					</tr>
		   					</table>
	   					</div>
					</div>
				</div>
		</div>
	</div>

		<c:if test="${null!=fancingOrderEntity.approvList }">
			<div class="row-fluid" style="margin-top: 5px;color: red;">历史审批记录：</div>
			<div class="row-fluid">
				<form class="form-horizontal" id="buyer_form">
				<table class="table table-bordered" id="buyerTable">
					<tr>
					<th style="text-align: center;">审批建议</th>
					<th style="text-align: center;">批复时间</th>
					<th style="text-align: center;">批复人</th>
					<th style="text-align: center;">批复角色</th>
				</tr>
					<c:forEach items="${fancingOrderEntity.approvList}" var="item">
						<tr>
						<td style="text-align: center;">${item.approvalRemark }</td>
						<td style="text-align: center;">${item.approvalDate }</td>
						<td style="text-align: center;">${item.approvalerName }</td>
						<td style="text-align: center;">${item.approvalerRolePid }</td>
						</tr>
					</c:forEach>
				
				</table>
				</form>
			</div>
		</c:if>
		<form class="form-horizontal" id="approd_form">
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingPid }" name="fancingOrderEntity.fancingOrderItem.fancingPid" id="fancingPid" >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }" name="fancingOrderEntity.fancingOrderItem.fancingOrderNo" id="fancingOrderNo" >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingKinds }" name="fancingOrderEntity.fancingOrderItem.fancingKinds"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingStatus }" name="fancingOrderEntity.fancingOrderItem.fancingStatus"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingFunction }" name="fancingOrderEntity.fancingOrderItem.fancingFunction"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankType }" name="fancingOrderEntity.fancingOrderItem.fancingBankType"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankNo }" name="fancingOrderEntity.fancingOrderItem.fancingBankNo"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingBankName }" name="fancingOrderEntity.fancingOrderItem.fancingBankName"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.requesterPid }" name="fancingOrderEntity.fancingOrderItem.requesterPid"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.requestName }" name="fancingOrderEntity.fancingOrderItem.requestName"  >
				<input type="hidden" value="${fancingOrderEntity.fancingRateItem.fancingRatePid }" name="fancingOrderEntity.fancingRateItem.fancingRatePid"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOverdueType }" id="fancingOverdueType"  >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingRebackType }" id="fancingRebackType" >
				<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingRateCycle }" id="fancingRateCycle" >
	        	<div class="row-fluid" style="margin-top: 5px;color: red;">融资单审核信息：</div>
	        	<div class="row-fluid" style="margin-top: 10px;">
	        		<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">批复金额<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="hidden" id="requestPrice" value="${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}">
							<input type="text" name="fancingOrderEntity.fancingOrderItem.fancingReplyPrice" id="fancingReplyPrice"   value="${fancingOrderEntity.fancingOrderItem.fancingReplyPrice}"
								data-required="批复金额不能为空！" data-number="只能输入数字!"> <i></i>
						</div>
					</div>
					<div class="span3 control-group full" id="zhangqi">
						<label class="control-label" style="width: 80px;">账期<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<div style="float: left;width: 66%">
							<input type="text"	name="fancingOrderEntity.fancingOrderItem.fancingDate" value="${fancingOrderEntity.fancingOrderItem.fancingDate}"
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
						<label class="control-label" style="width: 80px;">账期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingRateItem.fancingRate" value="${fancingOrderEntity.fancingRateItem.fancingRate}"
							data-required="账期利率不能为空！"	data-number="只能输入数字!" > <i></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">逾期利率(%)<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
							<input type="text" name="fancingOrderEntity.fancingRateItem.overdueRate" value="${fancingOrderEntity.fancingRateItem.overdueRate}"
						data-required="逾期利率不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
				</div>
	        	<div class="row-fluid" >
	        		<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">服务费<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
						<input  name="fancingOrderEntity.fancingServicePriceModel.fancingChargePid"  value="${fancingOrderEntity.fancingServicePriceModel.fancingChargePid}" type="hidden">
							<input type="text" name="fancingOrderEntity.fancingServicePriceModel.charge"  value="${fancingOrderEntity.fancingServicePriceModel.charge}"
						data-required="服务费不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
	        		<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">保证金<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
						<input  name="fancingOrderEntity.fancingBondPriceModel.fancingChargePid"  value="${fancingOrderEntity.fancingBondPriceModel.fancingChargePid}" type="hidden">
							<input type="text" name="fancingOrderEntity.fancingBondPriceModel.charge"  value="${fancingOrderEntity.fancingBondPriceModel.charge}"
						data-required="保证金不能为空！" data-number="只能输入数字!"	> <i></i>
						</div>
					</div>
	        		<div class="span3 control-group full">
						<label class="control-label" style="width: 80px;">逾期计息方式<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
								<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingOverdueType" optionsType="OVERDUE_TYPE"   >
									<slt:outHTML>id="overdueType"</slt:outHTML>
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" style="width: 80px;">还款方式<span style="color:red;">*</span></label>
						<div class="controls txt" style="margin-left: 80px;">
								<slt:select  cssClass="chzn-select" name="fancingOrderEntity.fancingOrderItem.fancingRebackType" optionsType="BILLREBACK_TYPE" >
									<slt:outHTML>id="rebackType"</slt:outHTML>
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								</slt:select>
						</div>
					</div>
					</div>
					<div class="row-fluid" >
						<div class="span3 control-group full" id="lxjszq" style="display: none;">
							<label class="control-label" style="width: 80px;">利息计算周期<span style="color:red;">*</span></label>
							<div class="controls txt" style="margin-left: 80px;">
							<slt:select cssClass="chzn-select"
									name="fancingOrderEntity.fancingOrderItem.fancingRateCycle"
									optionsType="RATE_CYCLE">
									<slt:outHTML>id="rateCycle"</slt:outHTML>
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
									<input type="file" name="file"  class="file" id="file_pl" size="28" style="height:25px;width:80px;"
										onchange="FancingAuditingDetails.fileChange()" contenteditable="false" />	
			                </div>
						</div>
						</c:if>
					</div>
					<div class="row-fluid" style="margin-top: 5px;color: red;">本次审批信息：</div>
	        		<div class="row-fluid">
					<div class="span10 control-group full">
						<label class="control-label" >批复内容<span style="color:red;">*</span></label>
							<div class="controls txt" style="margin-left: 80px;">
							<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }" name="fancingOrderEntity.approvalRecordModel.approvalBussnessNo"  >
							<textarea rows="300" data-required="批复内容不能为空！" name="fancingOrderEntity.approvalRecordModel.approvalRemark" 
					 		cols="500" style="width: 100%;height: 100px;resize:none;"></textarea>
						</div>
					</div>
					</div>
	    		<div class="form-search-btn offset4"  style="margin-top: 30px;margin-bottom:20px;width: 62%">
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingApprolval.saveFancingApprol()"><i class=""></i>审批确认</a>
	       			 <a class="btn btn-info save" href="javascript:void(0)" onclick="FancingApprolval.rebackCheck()"><i class=""></i>返回</a>
	    		</div>
			</form>
</div>

