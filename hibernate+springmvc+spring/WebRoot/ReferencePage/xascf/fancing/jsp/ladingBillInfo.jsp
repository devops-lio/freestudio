<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>	
<script type="text/javascript" src="xascf/fancing/js/ladingBillInfo.js"></script>	
<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
		提单清单<span style="color:red;">*</span>
</div>
<div class="row-fluid " style="margin-top: -10px;">
	<div class="widget-box">
   <div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="LadingBillInfo.ladingAdd('ladingBill')"><i class=""></i>新增</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="LadingBillInfo.editLadingBill()"><i class=""></i>编辑</a> 
		      <a class="btn btn-primary" href="javascript:void(0)" onclick="LadingBillInfo.removeLadingBillItem()" ><i class=""></i>删除</a> 
			</div>
				<table id="ladingBill_mmg" class="mmg">
      					<tr>
          					<th rowspan="" colspan=""></th>
      					</tr>
  					</table>
  					<div  style="text-align: center;font-size: 12px;">
				  提单总金额(元)：<span style="color: red;" id="ladingBillpices"></span> 
				  	&nbsp; 	 提单总数量：<span style="color: red;" id="ladingBillnums"></span>
				  	 </div> 
		</div>
	</div>
</div>
</div>
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_ladingBill">
        <div class="win-header">
            <span>提单基本信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_ladingBill">
        </div>
    </div>
</div>
<script id="template_ladingBill" type="text/x-handlebars-template">
    <div class="form-search">
	    <form class="form-horizontal" id="ladingBill_form">
	        <input type="hidden" name="id" value="{{id}}">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" >
			<input type="hidden" id="ladingBillPid" value="{{ladingBillPid}}"  >
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">提单号<span style="color: red;">*</span></label>
					<div class="controls txt">
							 <input type="text"  value="{{ladingBillNo}}" id="ladingBillNo" data-required="提单号不能为空">
				                </div>
	            </div>
	        </div>
 			<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">提单类型<span style="color: red;">*</span></label>
					<div class="controls">
							<slt:select  cssClass="chzn-select" name="" optionsType="FANCING_LADINGBILL_TYPE"  >
								<slt:outHTML>id="ladingBillType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
				                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">发货人<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{ladingBillClient}}" id="ladingBillClient" data-required="发货人不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">起运地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillFrom" value="{{ladingBillFrom}}" data-required="起运地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">目的地<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillTo" value="{{ladingBillTo}}" data-required="目的地不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">航次<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillCarNo" value="{{ladingBillCarNo}}" data-required="航次不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物名称<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillGoodsname" value="{{ladingBillGoodsname}}" data-required="货物名称不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">货物数量<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillNum" value="{{ladingBillNum}}" data-required="货物数量不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">运费<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  id="ladingBillPrice" value="{{ladingBillPrice}}" data-required="运费不能为空">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">承运时间<span style="color: red;">*</span></label>
						<div class="controls time">
			                <input type="text" id="ladingBillDate" data-required="承运时间不能为空！"
			                 value="{{ladingBillDate}}">
			                <i  class="date" data-format="yyyy-MM-dd" ></i>
			              </div>
	            </div>
	        </div>
	       <input type="hidden" value="{{ladingBillFileurl}}" id="ladingBill_url" >
				<input type="hidden" value="{{ladingBillFilename}}" id="ladingBill_fileName" >
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">附件上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;">
	                  <input type='text' name='textfield' data-required="附件不能为空！" value="{{ladingBillFilename}}"
							 id='textfielid_ladingBill' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_ladingBill" size="28" style="height:25px;width:80px;"
								onchange="LadingBillInfo.upLoadChange('ladingBill')" contenteditable="false" />	
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-info save" href="javascript:void(0)" onclick="LadingBillInfo.addLadingBillRow()"><i class=""></i>确定</a>
	        <a class="btn btn-info cancel" href="javascript:void(0)" onclick="LadingBillInfo.ladingCancle()"><i class=""></i>取消</a>
	    </div>
	</div>
</script>