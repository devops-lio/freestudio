<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/fancing/js/agfancingList.js"></script>


<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:AgfancingList.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:AgfancingList.clear();"><i class=""></i>重置<br /></a>
				</div>
				<form action="" id="agfancingQueryForm" class="form-horizontal fromPre">
						<input type="hidden" name="condition.status" value="${condition.status}"  id="status"/>
						<div class="row-fluid">
							<div class="span3 control-group full">
								<label class="control-label">
									再融资编号
								</label>
								<div class="controls txt">
									<input type="text"  placeholder="请输入"
										name="condition.agfancingOrderNo">
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
		<span class="widget-title"><i class="icon-list"></i>再融资列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="	widget-body">
   		<div class="widget-grid"> 
			<div class="grid-toolbar" >
		      <a id="add" class="btn btn-primary" href="javascript:void(0)" onclick="AgfancingList.add()"><i class=""></i>新增</a> 
		      <a id="edit" class="btn btn-primary" href="javascript:void(0)" onclick="AgfancingList.edit()"><i class=""></i>编辑</a>  
		      <a id="deleteProduct" class="btn btn-primary" href="javascript:void(0)" onclick="AgfancingList.deleteProduct()" ><i class=""></i>删除</a> 
			</div>
			<div class="tab-content">
				<div class="tab-pane active" id="finalPriceTab" style="overflow: auto;">
					<div class="widget-grid">
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
	    </div>
	</div>
</div>

<!-- 弹出框 -->
<div class="row-fluid">
  <div class="win span8" id="tabwin_finanacial" style="height: 395px;width: 700px; ">
      <div style="height: 50px;" class="win-header">
          <span>融资交易单列表</span> <i class="close">&times;</i>
      </div>
      <div class="win-content" id="tabwin_finanacial_content" style="height: 395px;">
  	    <div class="row-fluid" style="font-size: 12px;">
	        <table id="financial_mmg" class="financial_mmg" >
		        <tr>
		            <th rowspan="" colspan=""></th>
		        </tr>
		    </table>
		 </div>
      </div>
  </div>
</div>	
