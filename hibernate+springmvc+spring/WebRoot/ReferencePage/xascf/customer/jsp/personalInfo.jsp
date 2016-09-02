<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<script type="text/javascript" src="xascf/customer/js/personalInfo.js"></script>  
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>个人会员登记查询</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="PersonalInfo.load();">查询</a>
				<a class="btn btn-primary" onclick="PersonalInfo.clear();">重置</a>
			</div>
			<form class="form-horizontal fromPre" id="personalSearchForm">
				<div class="row-fluid ">
					<div class="span3 control-group full">
						<label class="control-label" for="">会员编号</label>
						<div class="controls txt">
							<input type="text" name="condition.memberno">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for="">姓名</label>
						<div class="controls txt">
							<input type="text" name="condition.userNameCn">
						</div>
					</div> 
					<div class="span3 control-group full">
						<label class="control-label" for="">客户来源</label>
						<div class="controls txt">
							<slt:select  cssClass="chzn-select" name="condition.customerSource" optionsType="CUS_COM_SOURCE">
								<slt:outHTML>id="customerSource"</slt:outHTML>
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
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>个人会员登记列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
		    <div class="grid-toolbar">  
                <a class="btn btn-primary" onclick="PersonalInfo.add();">新增</a>
                <a class="btn btn-primary" onclick="PersonalInfo.update();">编辑</a> 
                <a class="btn btn-primary" onclick="PersonalInfo._delete();">删除</a> 
                <a class="btn btn-primary" onclick="PersonalInfo.personResetPws();">重置密码</a> 
            </div>
			<!-- mmGrid -->
			<table id="mmg-personal" class="mmg">
			</table>
			<div id=pig style="text-align: right;">
			</div>
		</div>
	</div>
</div> 
 
