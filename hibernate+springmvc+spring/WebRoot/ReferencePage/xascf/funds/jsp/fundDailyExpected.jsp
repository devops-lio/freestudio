<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/funds/js/fundDailyExpected.js"></script>
<body>  
	<div class="widget-box">
		<div class="widget-header">
	    	<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	    	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body">
			<div class="row-fluid">
				<form class="form-horizontal" id="queryCondition" style="margin-top: 10px;padding-bottom: 46px">
					<div class="span4 control-group full">
						<label class="control-label" style="width: 60px">用途:</label>
						<div class="controls" style="margin-left: 70px;width: 150px">
							<slt:select cssClass="chzn-select"  optionsType="ACCOUNT_USAGE" name="condition.accountUsage">
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>id="accountUsage"</slt:outHTML>
							</slt:select>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
    <div id="fundDailyExpectedContainer" style="height: 400px"></div>  
</body> 