<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/product/js/product.js"></script>


<div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class=""></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
					<a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:Product.query();"><i class=""></i>查询<br /></a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:Product.clear();"><i class=""></i>重置<br /></a>
				</div>
				<form action="" id="productQueryForm" class="form-horizontal fromPre">
						<input type="hidden" name="condition.status" value="${condition.status}"  id="status"/>
						<div class="row-fluid">
							<div class="span4 control-group full">
								<label class="control-label">
									产品编号
								</label>
								<div class="controls txt">
									<input type="text"  placeholder="请输入"
										name="condition.productNo"
										 >
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									产品名称
								</label>
								<div class="controls txt">
									<input type="text" placeholder="请输入" 
										name="condition.name"
										>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									募集金额
								</label>
								<div class="controls txt">
									<input  type="text" placeholder="请输入" 
										name="condition.amount"
										 >
								</div>
							</div>
						</div>
						<div class="row-fluid">
						<div  class="span4 control-group full">
								<label class="control-label">
									续存期
								</label>
								<div class="controls txt">
									<input  type="text" placeholder="请输入" 
										name="condition.renewTerm"
										 >
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									募集开始时间
								</label>
								<div class="controls time">
									<input type="text" name="condition.startTime" id="fm">
									<i  class="date" data-format="yyyy-MM-dd"  data-maxDate="#F{$dp.$D('to')}"></i>
								</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									募集结束时间
								</label>
								<div class="controls time"">
									<input  type="text" name="condition.endTime" id="to">
									<i  class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('fm')}"></i>
								</div>
							</div>
							
							
						</div>
				</form>
			</div>
		</div>
	</div>
<!-- 查询列表-->
<div class="widget-box">
   <div class="widget-body">
   		<div class="widget-grid">
			<ul  class="nav nav-tabs" style="margin-bottom: 0">
				<li id="oneNew" class="active">
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('1');">新建</a>
				</li>
				<li id="twoPublish">
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('2');">发布</a>
				</li>
				<li>
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('3');">募集</a>
				</li>
				<li>
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('4');">续存</a>
				</li>
				<li>
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('5');">结束</a>
				</li>
				<li>
					<a href="javascript:void(0)" data-toggle="tab" onclick="Product.tabQuery('6');">募集失败</a>
				</li>
			</ul>
			<div class="grid-toolbar">
		      <a id="add" class="btn btn-primary" href="javascript:void(0)" onclick="Product.add()"><i class=""></i>新增</a> 
		      <a id="edit" class="btn btn-primary" href="javascript:void(0)" onclick="Product.edit()"><i class=""></i>编辑</a> 
		      <a id="look" class="btn btn-primary" href="javascript:void(0)" onclick="Product.look()"><i class=""></i>查看</a> 
		      <a id="updateRate" class="btn btn-primary" href="javascript:void(0)" onclick="Product.updateRate()"><i class=""></i>修改年化率</a>
		      <a id="come" class="btn btn-primary" href="javascript:void(0)" onclick="Product.come()"><i class=""></i>来源</a>
		      <a id="publish" class="btn btn-primary" href="javascript:void(0)" onclick="Product.publish()">发布<i class=""></i></a>  
		      <a id="deleteProduct" class="btn btn-primary" href="javascript:void(0)" onclick="Product.deleteProduct()" ><i class=""></i>删除</a> 
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
