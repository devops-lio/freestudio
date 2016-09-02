<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/fancingList.js"></script>
<style>
</style>
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:FancingList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:FancingList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="fancingListQueryForm" class="form-horizontal">
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									融资单号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.fancingOrderNo" >
								</div>
							</div>
							
							<div class="span4 control-group full">
								<label class="control-label">
									发起日期从
								</label>
								<div class="controls time">
								<input type="text"  name="condition.requestDateFrom" id="expectedarrivetime1">
									<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
								  至
								</label>
								<div class="controls time">
									<input type="text"  name="condition.requestDateTo" id="expectedarrivetime2">
									<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
								</div>
							</div>
							
						</div>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									会员名称
								</label>
								<div class="controls txt">
									<input type="text"  	placeholder="请输入" name="condition.requestName" >
								</div>
							</div>
							<div class="span4 control-group full">
					              <label class="control-label" for="">会员类型</label>
					             <div class="controls">
					                <slt:select  cssClass="chzn-select" name="condition.fancingRequestType" optionsType="FANCING_REQUEST_TYPE"  >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
					              </div>
					            </div>
						</div>
				</form>
			</div>
		</div>
</div>
<div class="widget-box">
      <div class="widget-body">
	<div class="tabbable" style="margin-left: 0px;">
		  	<ul id="tabLabel" class="nav nav-tabs">
		  		<li  class="active">
			    	<a href="#allboundTab" data-toggle="tab" >全部</a>
			    </li>
			    <li>
			    	<a href="#newingTab" data-toggle="tab" id="newing" >新建</a>
			    </li>
			  <!--    <li>
			    	<a href="#checkingTab" data-toggle="tab" id="checking" >评估中</a>
			    </li>-->
			    <li>
			    	<a href="#waitCheckTab" data-toggle="tab" id="waitCheck" >待审核</a>
			    </li>
			    <li>
			    	<a href="#passCheckTab" data-toggle="tab" id="passCheck" >待放款</a>
			    </li>
			    <li>
			    	<a href="#payedTab" data-toggle="tab" id="payed" >已放款</a>
			    </li>
			    <li>
			    	<a href="#rabackedTab" data-toggle="tab" id="rabacked">已退回</a>
			    </li>
		  	</ul>
			<div class="tab-content" id="tabPanelDiv" style="margin-left: 0px;margin-top: -10px">
				<!-- 1.所有交易单tab 页 ==================================================================== -->
				<div class="tab-pane active" id="allboundTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="all_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="all_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 2. 新建tab 页 ==================================================================== -->
				<div class="tab-pane" id="newingTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="new_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="new_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 3. 待审核tab 页 ==================================================================== -->
				<div class="tab-pane" id="waitCheckTab" >
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="waitCheck_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="waitCheck_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 3. 评估中tab页 ==================================================================== -->
				<div class="tab-pane" id="checkingTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="checking_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="checking_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 4. 已通过tab页 ==================================================================== -->
				<div class="tab-pane" id="passCheckTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="passCheck_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="passCheck_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 5. 已放款tab页 ==================================================================== -->
				<div class="tab-pane" id="payedTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="payed_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="payed_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
				<!-- 6. 已退回tab页 ==================================================================== -->
				<div class="tab-pane" id="rabackedTab">
					<div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="rabacked_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div id="rabacked_pg" style="text-align: right;"></div>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
