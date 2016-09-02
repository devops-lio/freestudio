<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/note/js/receiptLisiDetail.js"></script>	
<div class="widget-box">
	  <div class="widget-body">
		<div class="widget-grid">
				<table id="lisireceipt_mmg" class="mmg">
	     					<tr>
	         					<th rowspan="" colspan=""></th>
	     					</tr>
	 					</table>
	 					<div  style="text-align: center;font-size: 12px;">
				  置换前票据总金额(元)：<span style="color: red;" id="lisireceiptPices"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.notePrice}" /></span> 	
				   &nbsp; 	 置换前票据折扣后金额(元)：<span style="color: red;" id="lisidetails_discountNotePriceDiv"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.noteDisprice}" /></span>
				  <!-- 	&nbsp; 	 发票总数量：<span style="color: red;" id="lisireceiptNums"></span> -->
					  	 </div> 
			</div>
		</div>
</div>
