<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript" src="xascf/credit/js/buyerInfo.js"></script>


<div class="widget-box">
	<div class="widget-header" >
		<span class="widget-title"><i class="icon-list"></i>委托方<span
			style="color:red;">*</span> </span> <span class="widget-toolbar"><a
			href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
		</span>
	</div>
	<div class="widget-body">
		<div class="row-fluid " style="margin-top: -10px;">
			<div class="widget-box">
				<div class="widget-body">
					<div class="widget-grid">
						<div class="grid-toolbar">
							<a class="btn btn-primary" href="javascript:void(0)"
								onclick="BuyerInfo.buyerAdd('buyer')"><i class=""></i>新增</a> <a
								id="delete" class="btn btn-primary" href="javascript:void(0)"
								onclick="BuyerInfo.removeBuyerItem()"><i class=""></i>删除</a>
						</div>
						<table id="buyer_mmg" class="mmg">
							<tr>
								<th rowspan="" colspan=""></th>
							</tr>
						</table>
					</div>
			     	 <a id="uploader" class="btn btn-primary" href="javascript:void(0)" onclick="BuyerInfo.uploadFile()" ><i class=""></i>上传</a> 
				</div>
			</div>
		</div>
		<input type="hidden" id="buyerExist">
		<div class="row-fluid">
			<div class="win span4" id="tabwin_add_buyer">
				<div class="win-header">
					<span>选择采购商信息</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" id="tabwin_add_content_buyer"></div>
			</div>
		</div>
		<script id="template_buyer" type="text/x-handlebars-template">
	    	<div class="form-search">
		    	<form class="form-horizontal" id="buyer_form" >
					<div class="row-fluid">
		      	  		<div class="span10 control-group full" >
							<label class="control-label" >采购商名称：<span style="color:red;">*</span></label>
							<div class="controls xwin">
								<input type="hidden"  id="buyPid">
								<input type="hidden" id="ispurchase" value="1">
								<input type="text" data-required="采购商名称不能为空！"	id="buyName" data-xwin-params="buyerComapanyPop" ><i></i>
							</div>			
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full ">
							<label class="control-label" for="">结算周期<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text"
									id="billCycle"
									data-required="结算周期不能为空！">
							</div>
						</div>
					</div>		
					<div class="row-fluid">	
						<div class="span10 control-group full ">
							<label class="control-label" for="">业务百分比<span
								style="color: red;">*</span>
							</label>
							<div class="controls txt">
								<input type="text"
									id="businessPercent"
									data-required="业务百分比不能为空！">
							</div>
						</div>
					</div>	
	
		    	</form>
		    	<div class="form-search-btn" >
		       	 	<a class="btn btn-info save" href="javascript:void(0)" onclick="BuyerInfo.addBuyerRow()"><i class=""></i>确定</a>
		        	<a class="btn btn-info cancel" href="javascript:void(0)" onclick="BuyerInfo.buyerCancle()"><i class=""></i>取消</a>
		    	</div>
			</div>
		</script>
	</div>
</div>
<input type="hidden" id="buyerExist" >
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_buyer">
        <div class="win-header">
            <span>选择采购商信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_buyer">
        </div>
    </div>
</div>
<script id="template_buyer" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="buyer_form" >
<div class="row-fluid">
	        <div class="span10 control-group full" >
					<label class="control-label" >采购商名称：<span style="color:red;">*</span></label>
					<div class="controls xwin">
						<input type="hidden"  id="customersubBuyPid">
						<input type="hidden" id="ispurchase" value="1">
						<input type="text" data-required="采购商名称不能为空！"	id="customerBuyName" data-xwin-params="buyerComapanyPop" ><i></i>
					</div>			
				</div></div>
	    </form>
	    <div class="form-search-btn" >
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="BuyerInfo.addBuyerRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="BuyerInfo.buyerCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>	
