<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/billDetails.js"></script>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
	 <div class="form-search">
	    <form class="form-horizontal fromPre" id="reback_form">
	        <div class="row-fluid">    
	            <div class="span6 control-group full">
	            <input id="billFancingNo" type="hidden" value="${orderItem.fancingOrderNo}"/>
	                <label class="control-label" for="">会员名称：</label>
	                <div class="controls" style="padding-top: 2px;font-size: 12px">
	                  <a href="#" onclick="customerDetailPop.customerDetail('${orderItem.menberPid}')">${orderItem.menberName}</a>
	                </div>
	            </div>
	            <div class="span6 control-group full">
	                <label class="control-label" for="">放款单号：</label>
	                <div class="controls" style="padding-top: 2px;font-size: 12px">
	                  ${orderItem.fancingOrderNo}
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="detail_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
									账单金额：<span style="color: red;" id="rebackBillPrice"></span> 
								  	 &nbsp; 	 已还金额：<span style="color: red;" id="rebackRebackedPrice"></span>
								  	 &nbsp; 	 剩余金额：<span style="color: red;" id="rebackRemainPrice"></span>
					 		</div> 
						</div>	
					</div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="BillDetails.cancle()"><i class=""></i>确定</a>
	    </div>
	</div></div></div>


