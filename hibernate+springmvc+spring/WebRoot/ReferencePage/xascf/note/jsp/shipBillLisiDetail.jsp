<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/note/js/shipBillLisiDetail.js"></script>

	<div class="widget-box">
		<div class="widget-body">
			<div class="widget-grid">
				<table id="lisishipBill_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div style="text-align: center;font-size: 12px;">
					置换前票据总金额(元)：<span style="color: red;" id="lisireceiptPices"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.notePrice}" /></span>
					&nbsp; 	置换前票据折扣后金额(元)：<span style="color: red;" id="lisishipBillDisount"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.noteDisprice}" /></span>
					<!--  &nbsp; 对账单总数量：<span style="color: red;" id="lisireceiptNums"></span>-->
				</div>
			</div>
		</div>
	</div>
<div class="row-fluid">
	<div class="win span10" id="tabwin_add_lisishipBillDetail">
		<div class="win-header">
			<span>对账单明细信息</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_add_content_lisishipBillDetail">
				<div class="row-fluid">
					<div class="widget-box">
						<div class="widget-box" style="margin-top: 0px;">
							<div class="widget-body">
								<div class="widget-grid">
									<table id="lisishipBilldetail_mmg" class="mmg">
										<tr>
											<th rowspan="" colspan=""></th>
										</tr>
									</table>
									<div style="text-align: center;font-size: 12px;">
										对账单明细总金额(元)：<span style="color: red;" id="lisidetailPices"></span>
										&nbsp; 对账单明细总数量：<span style="color: red;" id="lisidetailNums"></span>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
			<div class="row-fluid" style="padding-bottom: 12px;">
				<div class="form-search-btn">
		 			<a	class="btn btn-info cancel" href="javascript:void(0)"
						onclick="lisishipBillDetail.shipBillCancle()"><i class=""></i>关闭</a>
				</div>
			</div>
		</div>
	</div>
</div>
