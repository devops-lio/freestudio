<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript" src="xascf/fancing/js/shipInfo.js"></script>	


<div class="widget-box">
	<div class="widget-header" style="background-color: #B9AF43">
		<span class="widget-title"><i class="icon-list"></i>预付票据 </span> <span
			class="widget-toolbar"><a href="#" data-action="collapse"><i
				class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">
			<div class="row-fluid " style="margin-top: -10px;width: 100%">
	<div class="widget-box">
	  <div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
		   <!--   <a class="btn btn-primary" href="javascript:void(0)" id="shipImport"><i class=""></i>导入</a> 
		      <a class="btn btn-primary" href="xascf/util/ExcelDownload.shtml" ><i class=""></i>导入模板下载</a> -->  
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="ShipInfo.ship_add()"><i class=""></i>新增</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="ShipInfo.editShip()"><i class=""></i>编辑</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="ShipInfo.removeShipItem()" ><i class=""></i>删除</a> 
			</div>
				<table id="ship_mmg" class="mmg">
					<tr>
	   					<th rowspan="" colspan=""></th>
					</tr>
				</table>
				<div  style="text-align: center;font-size: 12px;">运单总金额(元)：<span style="color: red;" id="ship_pices"></span> 
	  					&nbsp; 	 运单总数量：<span style="color: red;" id="ship_nums"></span>
		  	 </div> 
			</div>
		</div>
	</div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_ship">
        <div class="win-header">
            <span>运单基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_ship">
        </div>
    </div>
</div>
<script id="template_ship" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="ship_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" id="ship_rowIndex" name="rowIndex" >
			<input type="hidden" id="shipOrderPid" value="{{shipOrderPid}}"  >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运单号码<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{shipNo}}" id="shipNo" data-required="运单号码不能为空">
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">委托人<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{shipClient}}" id="shipClient" data-required="委托人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">收货人<span style="color: red;">*</span></label>
	                <div class="controls">
						<select data-placeholder="请选择..." onchange="ShipInfo.consigneeChange()"  class="chzn-select span12 self-select" id="shipConsigneePid" data-required="收货人不能为空!">
						</select>
				    </div>
 						<input type="hidden"  value="{{shipConsigneeName}}" id="shipConsigneeName" >
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">车牌号码<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipCarNo" value="{{shipCarNo}}" data-required="车牌号码不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">出发地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipFrom" value="{{shipFrom}}" data-required="出发地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">目的地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipTo" value="{{shipTo}}" data-required="目的地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运单金额<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipPrice" value="{{shipPrice}}" data-required="运单金额不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物名称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipName" value="{{shipName}}" data-required="货物名称不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物数量<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="shipNum" value="{{shipNum}}" data-required="货物数量不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">状态<span style="color: red;">*</span></label>
	                <div class="controls">
						<select data-placeholder="请选择..."   class="chzn-select span12 self-select" id="shipStatus" data-required="状态不能为空!">
							<option value='1'>已签收</option>						
							<option value='2'>运输中</option>						
						</select>
							<!--<slt:select  cssClass="chzn-select" name="" optionsType="SHIP_STATUS"   >
								<slt:outHTML>id="shipStatus"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="状态不能为空"</slt:outHTML>
							</slt:select>-->
				                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="ShipInfo.addShipRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="ShipInfo.shipCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>
	</div>
</div>

