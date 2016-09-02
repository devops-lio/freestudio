<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/loan/js/servicesChargeList.js"></script>

<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:servicesChargeList.query();">查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:servicesChargeList.clearQueryForm();">重置<br /></a>
            </div>
			<form action="" id="servicesChargeQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							费用编号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.chargeNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							合同编号
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.fancingOrderNo">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label">
							费用状态
						</label>
						<div class="controls">
							<slt:select cssClass="chzn-select"    name="condition.chargeStatus" 
										optionsType="FANCING_CHARGE_STATUS" >
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
				</div>
			</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->
<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>手续费列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<!-- mmGrid -->
		<table id="servicesCharge_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>
<div class="row-fluid">
	<div class="win span4" id="tabwin_receive" >
        <div class="win-header">
            <span>收款确认</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_receive_content" >
        </div>
       </div>
   </div>	
<div id="servicesChargeReceiveTemplateTab" style="display: none">
	<jsp:include page="/xascf/fancing/jsp/fancingChargeReceiveTab.jsp"></jsp:include>
</div>
