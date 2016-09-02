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
<script type="text/javascript"	src="xascf/fancing/js/fancingDetails.js"></script>
<div class="form-search " style="font-size: 13px;margin: 20px;">
		<div class="row-fluid form-horizontal">
		<input id="fancingOrderNo" type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo }">
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
				<tr>
					<td align="right">融资账期:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingDate}${fancingOrderEntity.fancingOrderItem.fancingDateTypeCn}</td>
					<td align="right">账期利率:</td>
					<td style="color: red;">${fancingOrderEntity.fancingRateItem.fancingRate}%</td>
					<td align="right">逾期利率:</td>
					<td style="color: red;">${fancingOrderEntity.fancingRateItem.overdueRate}%</td>
					<td align="right">逾期计息方式:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingOverdueTypeCn}</td>
					
				</tr>
				<tr>
					<td align="right">服务费:</td>
					<td style="color: red;"></td>
					<td align="right">还款方式:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRebackTypeCn}</td>
					<td align="right">评估报告:</td>
					<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingBankType}</td>
					<td align="right">买断式协议:</td>
					<td style="color: red;">${fancingOrderEntity.protocolInfoModel.protocolName}</td>
					
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
</div>

