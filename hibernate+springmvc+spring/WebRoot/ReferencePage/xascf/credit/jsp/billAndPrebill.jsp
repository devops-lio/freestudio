<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<script type="text/javascript" src="xascf/credit/js/billAndPrebill.js"></script>	
<c:if test="${creditEntity.shipList!=null || creditEntity.orderList!=null }">
<div class="widget-box">
		<div class="widget-header" style="background-color: #438eb9;margin-top:0px;">
			<span class="widget-title"><i class="icon-list"></i>预付票据信息 </span> <span
				class="widget-toolbar"> </span>
		</div>
		<div class="widget-body">
			<div class="tabbable" >
				<ul class="nav nav-tabs" style="margin-left: 0px;">
			  		<li  class="active">
				    	<a href="#shipInfoJspTab" data-toggle="tab" >运单</a>
				    </li>
				    <li>
				    	<a href="#orderInfoJspTab" data-toggle="tab" id="orderInfoJspTabBt">订单</a>
				    </li>
			  	</ul>
			  	<div class="tab-content"  style="margin-top:-10px;">
					<div id="shipInfoJspTab" class="tab-pane  active"  >
						<!-- 预付运单jsp -->
						<jsp:include page="shipDetail.jsp"></jsp:include>
					</div>
					<div id="orderInfoJspTab" class="tab-pane">
						<!-- 预付订单jsp -->
						<jsp:include page="orderInfoTab.jsp"></jsp:include>
					</div>
				</div>
			</div>
		</div>
		
</div>
</c:if>
<c:if test="${creditEntity.receiptList!=null || creditEntity.shipBillList!=null || creditEntity.shipTurnList!=null}">
<div class="widget-box">
<div class="widget-header" style="background-color: #438eb9;margin-top:20px;">
	<span class="widget-title"><i class="icon-list"></i>票据信息 </span> <span
		class="widget-toolbar"> </span>
</div>
<div class="widget-body">
<div class="tabbable" style="margin-left: 0px;">
	<ul  class="nav nav-tabs">
  		<li  class="active">
	    	<a href="#receiptInfoJspTab" data-toggle="tab" >发票</a>
	    </li>
	    <li>
	    	<a href="#shipBillEditJspTab" data-toggle="tab"  id="shipBillEditJspTabBt">对账单</a>
	    </li>
	    <li>
	    	<a href="#shipTurnInfoJspTab" data-toggle="tab" id="shipTurnInfoJspTabBt">回单</a>
	    </li>
  	</ul>
  	<div class="tab-content"  style="margin-top:-10px;">
		<div id="receiptInfoJspTab" class="tab-pane  active" >
			<!-- 发票票据jsp -->
			<jsp:include page="../../loan/jsp/receiptDetail.jsp"></jsp:include>
		</div>
		<div id="shipBillEditJspTab" class="tab-pane" >
			<!-- 对账单票据jsp -->
			<jsp:include page="shipBillEditTab.jsp"></jsp:include>
		</div>
		<div id="shipTurnInfoJspTab" class="tab-pane" >
			<!-- 回单票据jsp -->
			<jsp:include page="shipTurnInfo.jsp"></jsp:include>
		</div>
	</div>
	</div></div>
</div></c:if>