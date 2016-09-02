<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/receiptAuditingDetail.js"></script>	
<style>
.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px;left:10px; }
.baseInfo td{line-height:25px;}
.tblAmount{margin-top:10px; margin-left:auto;margin-right:auto;}
.tblAmount td{line-height:25px;}
.tblAmount .tdTitle{ text-align:right;}
.amount{color:red; width:120px;}
</style>
<form id="auditingForm">
<div class="row-fluid" style="margin:10px 20px 10px 20px;">
	<table class="baseInfo" style="margin-left: 50px;">
		<tr>
			<td align="right">申请编号:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingOrderNo}</td> 
				<td align="right">会员名称:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.requestName}</td> 
				<td align="right">融资方式:</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingOrderItem.fancingKindsCn}</td> 
				<td align="right">申请金额:</td> 
				<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingRequestPrice}</td> 
			</tr> 
			<tr> 
				<td align="right">批复金额:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingReplyPrice}</td> 
				<td align="right">已发生融资金额:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingFunction}</td> 
				<td align="right">账期利率:</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingRateItem.fancingRate}</td> 
				<td align="right">账期:</td> 
				<td style="color: red;">${fancingOrderEntity.fancingOrderItem.fancingDateType}</td> 
			</tr> 
			<tr> 
				<td align="right">逾期利率:</td> 
				<td style="width: 170px; color: red;">${fancingOrderEntity.fancingRateItem.overdueRate}</td> 
				<td align="right">还款方式:</td> 
				<td style="width: 220px; color: red;">${fancingOrderEntity.fancingOrderItem.fancingRebackType}</td> 
				<td align="right">逾期计息方式:</td> 
				<td style="color: red; width: 120px;">${fancingOrderEntity.fancingOrderItem.fancingOverdueType}</td> 
				<td align="right"></td> 
				<td style="color: red;"></td>
			</tr> 
    </table> 
</div>
<div class="row-fluid ">
	<div class="widget-box">
		<div class="widget-header">
			<span class="widget-title"><i class=""></i>历史融资票据</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar"></div>
				<table id="note_old_mmg" class="mmg">
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
			<span class="widget-title"><i class=""></i>本次融资票据</span> 
			<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>		
		<div class="widget-body">
			<div class="widget-grid">
				<div class="grid-toolbar"></div>
				<table id="note_new_mmg" class="mmg">
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
		<div class="widget-body">
			<table class="tblAmount">
				<tr>
					<td class="tdTitle">剩余票据金额:</td>
					<td class="amount">${notePoolEntity.lostPrice}</td>
					<td class="tdTitle">本次产生票据金额:</td>
					<td id="currNoteAmount" class="amount"></td>			
				</tr>
				<tr id="trApprove">
					<td class="tdTitle">本次产生融资放款金额:</td>
					<td style="padding-top:10px;">
						<div class="controls txt">
		                    <input type="text" id="loanAmount" data-required="本次产生融资放款金额不能为空" data-num="本次产生融资放款金额只能是数字"  name="fancingOrderEntity.preLoanItem.loanAmount"/>
		                </div>					
					</td>
					<td class="tdTitle">服务费:</td>	
					<td style="padding-top:10px;">
						<div class="controls txt">
		                    <input type="text" id="servicesPrice" data-required="服务费不能为空" data-num="服务费只能是数字" name="fancingOrderEntity.preLoanItem.servicesPrice""/>
		                </div>
					</td>					
				</tr>
				<tr id="trReject" style=" display:none;">
					<td class="tdTitle" style="vertical-align: top;padding-top:10px;">拒绝原因:</td>
					<td colspan="3" style="padding-top:10px;">
						<textarea id="reason" name="fancingOrderEntity.preLoanItem.remark" style=" width:500px; height:100px;"></textarea>
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>
<div id="divApprove" class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptAuditingDetail.approve()"><i class=""></i>审核通过</a>
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptAuditingDetail.showReject()"><i class=""></i>拒绝</a>
</div>
<div id="divReject" class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%; display:none;">
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptAuditingDetail.reject()"><i class=""></i>确认拒绝</a>
	<a class="btn btn-primary" href="javascript:void(0)" onclick="ReceiptAuditingDetail.showApprove()"><i class=""></i>返回审核</a>
</div>
<div style="display:none">
	<input type="hidden" value="${fancingOrderEntity.fancingOrderItem.fancingOrderNo}"	name="fancingOrderEntity.preLoanItem.businessNo" id="businessNo">
	<input type="hidden" value="${notePoolEntity.lostPrice}" id="lostPrice">
	<input type="hidden" id="iptCurrNoteAmount" name="fancingOrderEntity.preLoanItem.currAmount">
	
</div>
</form>