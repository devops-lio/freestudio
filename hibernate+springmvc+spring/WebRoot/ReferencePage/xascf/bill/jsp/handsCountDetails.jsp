<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/bill/js/handsCountDetails.js"></script>
<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
	 <div class="form-search">
	    <form class="form-horizontal" id="handsCountForm">
			<input type="hidden"  name="billHandsCountItem.menberPid" id="menberPid" value="${billItem.menberPid}" >
			<input type="hidden"  name="billHandsCountItem.menberName" value="${billItem.menberName}" >
			<input type="hidden" id="billNo" name="billHandsCountItem.billNo" value="${billItem.billNo}" >
			<input type="hidden" id="billPid"  value="${billItem.pid}" >
	        <div class="row-fluid">    
	            <div class="span8 control-group full">
	                <label class="control-label" for="">会员名称：</label>
	                <div class="controls" style="padding-top: 2px;font-size: 12px">
	                  <a href="#" onclick="customerDetailPop.customerDetail('${billItem.menberPid}')"> ${billItem.menberName}</a>
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="widget-grid">
						<div class="widget-body" style="border-top: none;" >
							<table id="benjin_mmg" class="mmg" >
								<tr>
									<th rowspan="" colspan=""></th>
								</tr>
							</table>
							<div  style="text-align: center;font-size: 12px;border-bottom: solid 1px #CDCDC1">
									合计总剩余：<span style="color: red;" id="allBillPrice"></span> 
								  	
					 		</div> 
						</div>	
					</div>
	        </div>
	        <div class="row-fluid" style="margin-top: 15px;">    
	            <div class="span3 control-group full">
	                <label class="control-label" for="">计息金额：</label>
	                <div class="controls details">
						<fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${billItem.remainingPrice}"/>
					</div>
	            </div>
	            <div class="span3 control-group full">
	                <label class="control-label" for="">账单类型：</label>
	                <div class="controls details">
						${billItem.billType}
					</div>
	            </div>
	            <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>计息类型</label>
	                <div class="controls">
						<slt:select cssClass="chzn-select"	name="billHandsCountItem.handsLxType" 	optionsType="HANDS_LXTYPE">
							<slt:outHTML>id="handsLxType"</slt:outHTML>
							<slt:outHTML>data-placeholder="请选择..."</slt:outHTML>
						</slt:select>
					</div>
	            </div>
	            <div class="span3 control-group full" id="inRate">
	                <label class="control-label" for="">计息利率：</label>
	                <div class="controls details">
						${billItem.rate}%
					</div>
	            </div>
	            <div class="span3 control-group full" id="outRate" style="display: none;">
	                <label class="control-label" for="">计息利率：</label>
	                <div class="controls details">
						${billItem.overdueRate}%
					</div>
	            </div>
	            </div>
	        <div class="row-fluid" style="margin-top: 15px;">    
	            <div class="span3 control-group full">
	                <label class="control-label" for="">计息开始日：</label>
	                <div class="controls details">
	                ${lastTime}
					</div>
	            </div>
	            <div class="span3 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>计息截止日</label>
	                <div class="controls time">
						<input type="text"  name="billHandsCountItem.toDate" data-required="计息截止日不能为空">
						<i class="date" data-format="yyyy-MM-dd"  data-minDate="${lastTime}"></i>
					</div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="HandsCountDetails.saveCount()"><i class=""></i>确定</a>
	        <a class="btn btn-primary" href="javascript:void(0)" onclick="HandsCountDetails.cancle()"><i class=""></i>取消</a>
	    </div>
	</div>
	</div></div>