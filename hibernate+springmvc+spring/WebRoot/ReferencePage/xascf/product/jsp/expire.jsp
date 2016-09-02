<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/product/js/expire.js"></script>


<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:Expire.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:Expire.clear();"><i class=""></i>重置<br /></a>
				</div>
				<form action="" id="expireQueryForm" class="form-horizontal fromPre">
					<input type="hidden" name="condition.status" value="${condition.status}"  id="status"/>
					<input type="hidden" name="condition.redeemType" value="${condition.redeemType}"  id="redeemType"/>
					<div class="row-fluid">
						<div class="span4 control-group full">
							<label class="control-label">
								产品编号
							</label>
							<div class="controls txt">
								<input type="text"  placeholder="请输入"
									name="condition.productNo"
									 >
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								产品名称
							</label>
							<div class="controls txt">
								<input type="text" placeholder="请输入" 
									name="condition.name"
									>
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								购买人
							</label>
							<div class="controls txt">
								<input  type="text" placeholder="请输入" 
									name="condition.purchaseUser"
									 >
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span4 control-group full">
							<label class="control-label">
								购买时间
							</label>
							<div class="controls time">
								<input type="text" name="condition.startTime" id="fm">
								<i  class="date" data-format="yyyy-MM-dd"  ></i>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
<!-- 查询列表-->
<div class="widget-box">
   <div class="widget-body">
   		<div class="widget-grid">
   			<ul  class="nav nav-tabs" style="border-bottom: 0;margin-bottom: 0">
				<li class="active">
					<a href="javascript:void(0)" data-toggle="tab" onclick="Expire.tabQuery('2');">自动赎回</a>
				</li>
				<li>
					<a href="javascript:void(0)" data-toggle="tab" onclick="Expire.tabQuery('1');">申请赎回</a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="finalPriceTab" style="overflow: auto;">
					<div class="widget-grid">
						 	<!-- mmGrid -->				
						<table id="mmg" class="mmg">
	       					<tr>
	           					<th rowspan="" colspan=""></th>
	       					</tr>
	   					</table>
	   					<div id="pg" style="text-align: right;"></div>
					</div>
				</div>
			</div>
	    </div>
	</div>
</div>

	
