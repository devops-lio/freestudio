<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipBillDetailTab.js"></script>
<div class="widget-box" style="font-size: 12px;">
		<div class="widget-body">
			<div class="widget-form">
				<div class="row-fluid">
					<div class="widget-box">
						<div class="widget-box" style="margin-top: 0px;">
							<div class="widget-body">
								<div class="widget-grid">
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
			<input type="hidden" id="shipBillNo" value="${shipBillNo }">
			<div class="row-fluid" style="padding-bottom: 12px;">
				<div class="form-search-btn">
		 			<a	class="btn btn-info cancel" href="javascript:void(0)"
						onclick="ShipBillDetailTab.shipBillCancle()"><i class=""></i>关闭</a>
				</div>
			</div>
		</div>
	</div>
</div>
