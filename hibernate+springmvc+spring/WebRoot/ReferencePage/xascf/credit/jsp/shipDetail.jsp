<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipDetail.js"></script>
<div class="widget-box">
	<div class="widget-header" >
		<span class="widget-title"><i class="icon-list"></i>运单信息</span> 
		<span class="widget-toolbar">
			<a href="#" data-action="collapse">
				<i class="icon-chevron-up"></i> 
			</a> 
		</span>
	</div>
	<div class="widget-body">
		<div class="row-fluid " style="margin-top: -10px;width: 100%">
			<div class="widget-box">
				<div class="widget-body">
					<div class="widget-grid">
						<table id="ship_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
						<div style="text-align: center;font-size: 12px;">
							运单总金额：<span style="color: red;" id="ship_pices"></span> &nbsp;
							运单折扣金额：<span style="color: red;" id="shipdis_pices"></span> &nbsp;
							运单总数量：<span style="color: red;" id="ship_nums"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>