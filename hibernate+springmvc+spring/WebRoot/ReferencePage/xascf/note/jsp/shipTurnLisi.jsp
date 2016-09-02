<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<script type="text/javascript" src="xascf/note/js/shipTurnLisi.js"></script>
			<div class="widget-box" style="margin-top: 0px">
				<div class="widget-body">
					<div class="widget-grid">
						<table id="shipTurnLisi_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
						<div style="text-align: center;font-size: 12px;">
							置换前票据总金额(元)：<span style="color: red;" id="shipTurn_pices"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.notePrice}" /></span> 
								&nbsp; 	 置换前票据折扣后金额(元)：<span style="color: red;" id="shipTurnDisount"><fmt:formatNumber type="currency" pattern="#,#00.00 元"
															value="${fancingOrderEntity.fancingOrderItem.noteDisprice}" /></span>
							&nbsp;
							回单总数量：<span style="color: red;" id="shipTurn_nums"></span>
						</div>
					</div>
				</div>
			</div>
