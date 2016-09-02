<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<!-- 放款单详情、对账单详情、再融资详情 -->
<jsp:include page="../loan/jsp/fancingOrderPopDiv.jsp"></jsp:include>
<!-- 上传控件 -->
<div class="row-fluid">
	<div class="win span8" id="tabwin_upload"
		style="width:750px;height: 383px">
		<jsp:include page="/xascf/jsp/plupload.jsp"></jsp:include>
	</div>
</div>
<!-- 图片预览 -->
<div class="row-fluid">
	<div class="win span10" id="tabwin_picture">
		<div class="win-header">
			<span>图片</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_picture_content">
			<div style="text-align: center;">
				<img id="downPicture" onload="FileUtil.pup();"
					onerror="FileUtil.pupError();" alt=""
					style="width: 100%;height: 100%">
			</div>
		</div>
	</div>
</div>
<!-- 会员详情 -->
<jsp:include page="/xascf/customer/jsp/customerDetailPop.jsp"></jsp:include>
<!-- 委托方详情 -->
<jsp:include page="/xascf/customer/jsp/buyerDetailPop.jsp"></jsp:include>
<!-- 调查报告 -->
<div class="row-fluid">
	<div class="win span11" id="tabwin_add_evaluateReportPop">
		<div class="win-header">
			<span id="popTitle">调查报告</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="evaluateReportContentDiv">
			<div class="row-fluid" id="evaluateReportContent"></div>
			<div class="row-fluid">
				<div style="padding: 12px; margin: 0 auto;width: 1100px">
					<label class="control-label" style="text-align: left;float: left" for="">附件
					</label>
					<div class="controls" style="width: 450px;float: left;margin-left: 10px"> 
						<span id="show_fileName"></span>
					</div>
				</div>
			</div>
			<div class="row-fluid "
				style="margin-top: 20px;margin-bottom:20px; text-align: center;">
				<div class="span12 control-group full">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="popCancle('evaluateReportPop')"><i class=""></i>关闭</a>
				</div>
			</div>

		</div>
	</div>
</div>
<!-- 合同详情 -->
<div class="row-fluid">
	<div class="win span11" id="tabwin_add_contractDetailPop">
		<div class="win-header">
			<span>合同信息</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="contractDetailPopDiv">
			<div class="widget-box" style="font-size: 12px;">
				<div class="widget-body">
					<div class="widget-form">
						<div class="row-fluid">
							<div class="row-fluid" id="contractDetailPop"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="win span8" id="tabwin_buyMaterail" style="width:950px;">
		<div class="win-header">
			<span>委托方附加材料</span> <i class="close">&times;</i>
		</div>
		<div class="win-content" id="tabwin_buyMaterail_content"></div>
	</div>
</div>
<div class="row-fluid">
	<div class="win" id="tabwin_add_scoreDetail" style="width:1150px;">
		<div class="win-header">
			<span>评分详细</span><i class="close">&times;</i>
		</div>
		<div class="win-content" id="scoreDetailContent" style="padding:10px;"></div>
		<div class="row-fluid "
			style="margin-top: 20px;margin-bottom:20px; text-align: center;">
			<div class="span12 control-group full">
				<a class="btn btn-primary" href="javascript:void(0)"
					onclick="popCancle('scoreDetail')"><i class=""></i>关闭</a>
			</div>
		</div>
	</div>
</div>