<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/allBillList.js"></script>
<style>
.details {
	margin-top: 3px;
	color: blue;
}
.benjinRow{
font-weight: bold;
}
</style>
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:AllBillList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:AllBillList.clear();"><i class=""></i>重置<br /></a>
			  </div>
			  <form action="" id="billListQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									账单编号
								</label>
								<div class="controls txt">
									<input type="text" 	placeholder="请输入"  name="condition.fancingBillNo" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									会员名称
								</label>
								<div class="controls txt">
									<input type="text"  	placeholder="请输入" name="condition.memberName" >
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									账单类型
								</label>
								<div class="controls">
									<slt:select  cssClass="chzn-select" name="condition.billType" optionsType="BILL_TYPE"   >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									账单状态
								</label>
								<div class="controls">
									<slt:select  cssClass="chzn-select" name="condition.billStatus" optionsType="BILL_STATUS"   >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
								</div>
							</div>
						</div>
						<div class="row-fluid">
						
							<div class="span3 control-group full">
								<label class="control-label">
									账单到期从
								</label>
								<div class="controls time">
								<input type="text"  name="condition.createTimeFrom" id="expectedarrivetime1">
									<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
								  至
								</label>
								<div class="controls time">
									<input type="text"  name="condition.createTimeTo" id="expectedarrivetime2">
									<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
								</div>
							</div>
						</div>
				</form>
			</div>
		</div>
</div>
<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>账单列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
      <div class="widget-body">
       <div class="grid-toolbar">
                <a  class="btn btn-primary" href="javascript:void(0)" onclick="javascript:AllBillList.rebackByList();">批量还息</a>
            </div>
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
</div>
<div class="row-fluid">
    <div class="win span10" id="tabwin_add">
        <div class="win-header">
            <span id="add_span">账单还款</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content">
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="win span10" id="tabwin_add_detail">
        <div class="win-header">
            <span>账单明细</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_detail">
			        <form class="form-horizontal" style="margin-bottom: 20px;font-size: 12px">
			        	<div class="row-fluid">    
				            <div class="span8 control-group full">
				                <label class="control-label" for="">会员名称：</label>
				                <div class="controls details"  id="menberName">
				                </div>
				            </div>
				        </div>
				        <div class="row-fluid">    
				            <div class="widget-grid">
									<div class="widget-body" style="border-top: none;" >
										<table id="details_mmg" class="mmg" >
											<tr>
												<th rowspan="" colspan=""></th>
											</tr>
										</table>
										<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
												本期总剩余：<span style="color: red;" id="billPriceDiv"></span> 
											  	&nbsp; 	 本期总应还：<span style="color: red;" id="payPriceDiv"></span>
											  	 &nbsp; 	 本期已还：<span style="color: red;" id="rebackedPriceDiv"></span>
								 		</div> 
									</div>	
								</div>
				        </div>
				         <div class="form-search-btn">
					        <a class="btn btn-info save" href="javascript:void(0)" onclick="AllBillList.cancle()"><i class=""></i>确定</a>
					    </div>
			        </form>
        </div>
    </div>
</div>
