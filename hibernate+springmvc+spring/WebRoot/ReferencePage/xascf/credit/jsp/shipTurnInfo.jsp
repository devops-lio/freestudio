<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipTurnInfo.js"></script>
			<div class="widget-box" style="margin-top: 0px">
				<div class="widget-body">
					<div class="widget-grid">
						<table id="shipTurn_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
						<div style="text-align: center;font-size: 12px;">
							回单总金额(元)：<span style="color: red;" id="shipTurn_pices"></span> 
								&nbsp; 	 折扣后金额(元)：<span style="color: red;" id="shipTurnDisount"></span>
							&nbsp;
							回单总数量：<span style="color: red;" id="shipTurn_nums"></span>
						</div>
					</div>
				</div>
			</div>
