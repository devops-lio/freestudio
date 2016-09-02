<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/information/js/noticeInfoList.js"></script>


<!-- 查询条件block -->
<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:noticeInfoList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:noticeInfoList.clear();"><i class=""></i>重置<br /></a>
				
			</div>
				<form action="" id="noticeInfoListQueryForm" class="form-horizontal fromPre">
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									标题
								</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入" 	 name="condition.noticeTitle" value="">
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									类型
								</label>
								<div class="controls">
									<slt:select cssClass="chzn-select" name="condition.noticeType" optionsType="NOTICE_TYPE">
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
								</div>
							</div>
							<div class="span3 control-group full">
								<label class="control-label">
									状态
								</label>
								<div class="controls">
									<slt:select cssClass="chzn-select" name="condition.status" optionsType="NOTICE_STATUS">
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
		<span class="widget-title"><i class="icon-list"></i>公告信息列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
    <div class="widget-body">
      <div class="widget-grid">
		<div class="grid-toolbar">
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="noticeInfoList.add()"><i class=""></i>新增</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="noticeInfoList.edit()" ><i class=""></i>编辑</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="noticeInfoList.deleteByPids()" ><i class=""></i>删除</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="noticeInfoList.publish()" ><i class=""></i>发布</a> 
	      <a class="btn btn-primary" href="javascript:void(0)" onclick="noticeInfoList.toTop()" ><i class=""></i>置顶</a>
		</div>
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