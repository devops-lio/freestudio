<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/receiptDetail.js"></script>	
<div class="widget-box" style="margin-top: 0px">
	  <div class="widget-body">
		<div class="widget-grid">
				<table id="receipt_mmg" class="mmg">
	     					<tr>
	         					<th rowspan="" colspan=""></th>
	     					</tr>
	 					</table>
	 					<div  style="text-align: center;font-size: 12px;">
				   发票价税合计：<span style="color: red;" id="receiptPices"></span> 	
				   &nbsp; 	 折扣后价税合计：<span style="color: red;" id="details_receiptNotePriceDiv"></span>
				  	&nbsp; 	 发票总数量：<span style="color: red;" id="receiptNums"></span>
					  	 </div> 
			</div>
		</div>
</div>
