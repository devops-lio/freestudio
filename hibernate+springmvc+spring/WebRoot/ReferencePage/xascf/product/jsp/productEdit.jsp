<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/product/js/productEdit.js"></script>

<!-- 查询条件block -->
<div class="widget-body" style="padding: 3px; border-bottom-width: 0px;" >
	<div class="widget-main padding-6" style="margin-top:10px;">
		<form action="" id="productEditForm">
			<div class="form-horizontal" >
				<input type="hidden" name="fancingPids" value="${fancingPids}"  id="fancingPids"/>
				<input type="hidden" name="type" value="${type}"  id="type"/>
				<input type="hidden" name="productModel.productPid" value="${productModel.productPid}"  id="productPid"/>
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							最大募集金额(元)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input readonly="readonly"  type="text"  maxlength=20 data-required="最大募集金额不能为空！" data-number="只能输入数字"
								placeholder="" name="productModel.mostAmount" value="${productModel.mostAmount}" id="mostAmount">
						</div>
					</div>
				</div>
				
				
				<div style="margin-top:0px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
						</label>
						<div class="controls txt">
						<a href="#" onclick="ProductEdit.trade();">融资交易单选择</a>
						</div>
					</div>
				</div>
				<hr>
				<div  class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							产品编号<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" 
								placeholder="产品编号不能为空" name="productModel.productNo"
								 value="${productModel.productNo}" id="productNo"
								 readonly="readonly">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							产品名称<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="产品名称不能为空！" 
								name="productModel.name"
								 value="${productModel.name}" id="name">
						</div>
					</div>
					
				</div>
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							每份价格(元)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input onkeyup="javascript:ProductEdit.changed()"  type="text" data-required="每份价格不能为空" data-number="只能输入数字"
							maxlength=20	placeholder="" name="productModel.unitPrice" value="${productModel.unitPrice}" id="unitPrice">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							总份额<span style="color: red;">*</span>
						</label>
						<div class="controls">
							<input onkeyup="javascript:ProductEdit.textChanged()" type="text" data-required="总份额不能为空" maxlength=20 data-number="只能输入数字"
								placeholder="" name="productModel.share" value="${productModel.share}" id="share">
						</div>
					</div>
					
					
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					
					<div class="span4 control-group full">
						<label class="control-label">
							设置的募集金额(元)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input readonly="readonly" type="text" data-required="设置募集金额不能为空" data-number="只能输入数字"
							maxlength=20	placeholder="" name="productModel.amount" value="${productModel.amount}" id="amount">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							最低起购份<span style="color: red;">*</span>
						</label>
						<div class="controls">
							<input type="text" data-required="最低起购份不能为空！" maxlength=20 data-number="只能输入数字"
								placeholder="" name="productModel.leastCost" value="${productModel.leastCost}" id="leastCost">
						</div>
					</div>
					
					
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					
					<div class="span4 control-group full">
						<label class="control-label">
							续存期(天)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="续存期不能为空" maxlength=20 
								placeholder="" name="productModel.renewTerm" value="${productModel.renewTerm}" id="renewTerm">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							年化率(%)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="年化率不能为空" data-number="只能输入数字" maxlength=20 
								placeholder="" name="productModel.aunualRate" value="${productModel.aunualRate}" id="aunualRate">
						</div>
					</div>
				</div>
				
				<div style="margin-top:3px;" class="row-fluid">
					
					<div class="span4 control-group full">
						<label class="control-label">
							最小年化率(%)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="最小年化率不能为空" maxlength=20 
								placeholder="" name="productModel.minRate" value="${productModel.minRate}" id="minRate">
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							最大年化率(%)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="最小年化率不能为空" data-number="只能输入数字" maxlength=20 
								placeholder="" name="productModel.maxRate" value="${productModel.maxRate}" id="maxRate">
						</div>
					</div>
				</div>
				
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							赎回方式<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<slt:select   cssClass="chzn-select" name="productModel.redeemType" optionsType="PRODUCT_REDEEMTYPE"  value="${productModel.redeemType}" >
								<slt:outHTML>id="productStatus"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							募集达标比例(%)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" data-required="募集达标比例不能为空" maxlength=20 data-number="只能输入数字"
								placeholder="" name="productModel.leastRate" value="${productModel.leastRate}" id="leastRate">
						</div>
					</div>
					
				</div>
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							募集开始时间<span style="color: red;">*</span>
						</label>
						<div class="controls time">
							<input   type="text" data-required="开始时间不能为空！" name="productModel.startTime" value="${productModel.startTime}" id="fm">
							<i  class="date" data-format="yyyy-MM-dd " data-minDate="%y-%M-{%d+1}" data-maxDate="#F{$dp.$D('to')}"></i>
						</div>
					</div>
				
					<div class="span4 control-group full">
						<label class="control-label">
							募集结束时间<span style="color: red;">*</span>
						</label>
						<div class="controls time">
							<input  type="text" data-required="结束时间不能为空！" name="productModel.endTime" value="${productModel.endTime}" id="to">
							<i  class="date" data-format="yyyy-MM-dd "  data-minDate="#F{$dp.$D('fm')}"></i>
						</div>
					</div>
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
						发布日期
						</label>
						<div class="controls time">
							<input readonly="readonly" type="text" value="${timeStr}" name="productModel.publicTime" id="expectedarrivetime1">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
						  产品状态
						</label>
						<div class="controls txt">
							<input readonly="readonly" type="text" data-required="产品状态不能为空！" 
								name="productModel.status"
								 value="${productModel.status}" id="status">
						</div>
						
					</div>
				</div>
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							实际募集金额(元)
						</label>
						<div class="controls">
							<input readonly="readonly" type="text" data-number="只能输入数字"
								name="productModel.actualAmount" value="${productModel.actualAmount}" id="actualAmount">
						</div>
					</div>
				</div>
				<div style="margin-top:10px;" class="row-fluid">
					<div class="span8 control-group full">
					<label class="control-label" >
						产品描述<span style="color: red;">*</span></label>
						<div class="controls" style="margin-top: 0px;">
							<textarea data-required="技术参数不能为空" data-maxlength="产品描述不能超过200个字"
							data-maxlength-param="200"
							rows="350" cols="350" style="width: 100%;height: 113px;resize:none;" name="productModel.description"  id="description">${productModel.description}</textarea>
						</div>
					</div>	
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span6 control-group full offset2" style="margin-top: 20px;"  >
						<div class="btn-toolbar" style="margin-left: 0px;">
							<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:ProductEdit.save();">保存</a>
							<a name="needDisplay" id="publish" class="btn btn-primary"  onclick="javascript:ProductEdit.editPublish();">发布</a>
							<a name="needDisplay"   id="reSetBtn" class="btn btn-primary"  onclick="javascript:ProductEdit.clear();">重置</a>
						</div>
						</div>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- 弹出框 -->
<div class="row-fluid">
  <div class="win span8" id="tabwin_trade" style="height: 395px;width: 700px; ">
      <div style="height: 50px;" class="win-header">
          <span>融资交易单列表</span> <i class="close">&times;</i>
      </div>
      <div class="win-content" id="tabwin_product_content" style="height: 395px;">
  	    <div class="row-fluid" style="font-size: 12px;">
	        <table id="mmg" class="mmg" >
		        <tr>
		            <th rowspan="" colspan=""></th>
		        </tr>
		    </table>
		 </div>
		 <div class="row-fluid">
			<div class="span4 control-group full" style="margin-left: 20px; margin-top:10px; width:100%;" align="left">
					最大募集金额：<input id="tempMostAmount" readonly="readonly" style="width: 100px;">万元
					<a class="btn btn-primary"  onclick="javascript:ProductEdit.sure();">完成</a>
			</div>
		 </div> 
      </div>
  </div>
</div>



