<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/businessQuery/js/businessQuery.js"></script>
<style>
#showMsgTable td{

text-align: right;
}
#showMsgTable{
margin-left: 30px;
}
.tabCont{
color:blue;
width: 300px;
text-align: left;
}
</style>
<style>
</style>
<div class="widget-box">
	<div class="widget-header">
	    <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
	    <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
    <div class="widget-body">
    	<div class="widget-form">
        	<div class="form-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:BusinessQuery.query();"><i class=""></i>查询<br /></a>
				<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:BusinessQuery.clear();"><i class=""></i>重置<br /></a>
	  		</div>
			<form action="" id="bussinessQueryForm" class="form-horizontal fromPre">
				<div class="row-fluid">
					<div class="span3 control-group full">
						<label class="control-label">
							会员名称
						</label>
						<div class="controls txt">
							<input type="text" 	placeholder="请输入"  name="condition.memberName" >
						</div>
					</div>
					
					<div class="span3 control-group full">
						<label class="control-label">
							业务经理
						</label>
						<div class="controls txt">
							<input type="text"  	placeholder="请输入" name="condition.operator" >
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>业务综合查询列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
    	<div class="widget-grid">
			<div class="widget-body" style="border-top: none;" >
				<table id="_mmg" class="mmg" >
				</table>
				<div class="row-fluid">
					<div class="span7  control-group full" id="allMsg" style="line-height:20px;height: 100px;text-align: left;font-size: 12px;margin-bottom:-10px;padding-top: 8px">&nbsp;</div>
					<div class="span5 control-group full" id="pg" style="text-align: right;"></div>
				</div>
				
			</div>	
		</div>
	</div>
</div>

