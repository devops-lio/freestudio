<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipBillDetail.js"></script>
<style>
#shipBill_form .span3 {
	margin-left: 1px;
}
#shipBillDetail_form .span6 {
}
</style>
	<div class="widget-box" style="margin-top: 0px">
		<div class="widget-body">
			<div class="widget-grid">
				<table id="shipBill_mmg" class="mmg">
					<tr>
						<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div style="text-align: center;font-size: 12px;">
					对账单票总金额(元)：<span style="color: red;" id="shipBillPices"></span>
					&nbsp; 	 折扣后金额(元)：<span style="color: red;" id="shipBillDisount"></span>
					&nbsp; 对账单总数量：<span style="color: red;" id="shipBillNums"></span>
				</div>
			</div>
		</div>
	</div>

