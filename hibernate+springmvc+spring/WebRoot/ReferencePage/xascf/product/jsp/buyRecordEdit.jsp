<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/product/js/buyRecordEdit.js"></script>

<!-- 查询条件block -->
<div class="widget-body" style="padding: 3px; border-bottom-width: 0px;" >
	<div class="widget-main padding-6" style="margin-top:10px;">
		<form action="" id="purchaseEditForm">
			<div class="form-horizontal" >
				<input type="hidden" name="type" value="${type}"  id="type"/>
				<input type="hidden" name="amount" value="${amount}"  id="amount"/>
				<input type="hidden" name="share" value="${share}"  id="share"/>
				<input type="hidden" name="purchaseModel.purchasePid" value="${purchaseModel.purchasePid}"  id="purchasePid"/>
				<div  class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
							购买编号<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input type="text" 
								placeholder="产品编号不能为空" name="purchaseModel.purchaseNo"
								 value="${purchaseModel.purchaseNo}" id="purchaseNo"
								 readonly="readonly">
						</div>
						
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							产品编号<span style="color: red;">*</span>
						</label>
						<div class="controls xwin">
	                        <input type="hidden" name="purchaseModel.purchaseProductPid" id="purchaseProductPid" >
	                        <input onfocus="javascript:BuyRecordEdit.productChanged()" type="text" value="${purchaseModel.productNo}"  name="purchaseModel.productNo" data-required="理财产品不能为空！" id="productNo"
	                            data-xwin-params="product" 
	                             data-required="请选择理财产品">
	                        <i></i>
			            </div>
					</div>
					
				</div>
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
						购买人<span style="color: red;">*</span>
						</label>
						<div class="controls xwin">
	                        <input type="hidden" name="purchaseModel.purchaseUserPid" id="customersubPid" >
	                        <input type="text" value="${purchaseModel.loginName}"  name="purchaseModel.loginName" data-required="认购人不能为空！" id="customerName"
	                            data-xwin-params="commonComapanyPop" 
	                             data-required="请选择认购人">
	                        <i></i>
			            </div>
						
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
						  每份单价
						</label>
						<div class="controls txt">
							<input readonly="readonly"  type="text" data-required="产品状态不能为空！" 
								name="purchaseModel.unitPrice" value="${purchaseModel.unitPrice} "
								   id="unitPrice">
						</div>
						
					</div>
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
						<label class="control-label">
						  购买份额(份)
						</label>
						<div class="controls txt">
							<input  type="text" data-required="产品状态不能为空！" 
								name="purchaseModel.purchaseShare" onkeyup="javascript:BuyRecordEdit.textChanged()"
								 value="${purchaseModel.purchaseShare}"  id="purchaseShare">
						</div>
						
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							购买金额(元)<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input readonly="readonly" type="text" data-required="产品状态不能为空！" 
								name="purchaseModel.purchaseAmount"
								 value="${purchaseModel.purchaseAmount}" id="purchaseAmount">
						</div>
					</div>
				</div>
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span4 control-group full">
				
						<label class="control-label">
							剩余份数<span style="color: red;">*</span>
						</label>
						<div class="controls txt">
							<input readonly="readonly" type="text" data-required="产品状态不能为空！" 
								name="purchaseModel.surplus"
								  id="surplus">
						</div>
					</div>
				</div>
				
				
				<div style="margin-top:3px;" class="row-fluid">
					<div class="span6 control-group full offset2" style="margin-top: 20px;"  >
						<div id="buttonList" class="btn-toolbar" style="margin-left: 0px;">
							<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:BuyRecordEdit.save();">保存</a>
							<a name="needDisplay"   id="reSetBtn" class="btn btn-primary"  onclick="javascript:BuyRecordEdit.clear();">重置</a>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>




