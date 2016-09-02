<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<link rel="stylesheet" type="text/css" href="xascf/risk/style/evaluateReport.css">
<script type="text/javascript" src="xascf/risk/js/reportPreview.js"></script>  
<div id="reportPreviewDiv" class="widget-box">
<input type="hidden" id="requestType" >
	<div class="widget-body">
		${reportFormStr}
	</div>
	<div class="row-fluid">
		<div class="span6 control-group full offset2">
			<div class="btn-toolbar" style="text-align: center">
				<a class="btn btn-primary" href="javascript:void(0)" onclick="reportPreview.returnList();">返回</a>
			</div>
		</div>
	</div> 	
</div>