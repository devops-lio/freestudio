<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipTurnEdit.js"></script>
			<div class="widget-body">
				<div class="widget-grid">
					<div class="grid-toolbar">
						<a class="btn btn-primary" href="javascript:void(0)"
							onclick="ShipTurnEdit.shipTurn_add()"><i class=""></i>新增</a> <a
							class="btn btn-primary" href="javascript:void(0)"
							onclick="ShipTurnEdit.editShipTurn()"><i class=""></i>编辑</a> <a
							class="btn btn-primary" href="javascript:void(0)"
							onclick="ShipTurnEdit.removeShipTurnItem()"><i class=""></i>删除</a>
					</div>
					<table id="shipTurn_mmg" class="mmg">
						<tr>
							<th rowspan="" colspan=""></th>
						</tr>
					</table>
					<div style="text-align: center;font-size: 12px;border-bottom: 1px #ccc solid;">
						回单总金额(元)：<span style="color: red;" id="shipTurn_pices"></span>
						&nbsp; 	 折扣后金额(元)：<span style="color: red;" id="shipTurnDisount"></span>
						 &nbsp;
						回单总数量：<span style="color: red;" id="shipTurn_nums"></span>
					</div>
				</div>
			</div>
	<div class="row-fluid">
		<div class="win span6" id="tabwin_add_shipTurn">
			<div class="win-header">
				<span>回单基本信息</span> <i class="close">&times;</i>
			</div>
			<div class="win-content" style="margin-right: 30px;" id="tabwin_add_content_shipTurn"></div>
		</div>
	</div>
	<script id="template_shipTurn" type="text/x-handlebars-template">
			<div class="form-search">
				<form class="form-horizontal" id="shipTurn_form">
					<input type="hidden" name="id" value="{{id}}"> 
					<input	type="hidden" value="{{rowIndex}}" id="shipTurn_rowIndex"	name="rowIndex">
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>回单号</label>
									<div class="controls txt">
										<input type="text" value="{{turnNo}}" id="turnNo"
											data-required="回单号不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>运输订单号</label>
									<div class="controls txt">
										<input type="text" value="{{customerOrderNo}}" id="customerOrderNo" 
											data-required="运输订单号不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>物流运单号</label>
									<div class="controls">
										<input type="text" value="{{shipNo}}" id="turnShipNo"
											data-required="物流运单号不能为空!"> </select>
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>运输派车单号</label>
									<div class="controls txt">
										<input type="text" id="dispatchOrder" value="{{dispatchOrder}}"
											data-required="运输派车单号不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>车牌号</label>
									<div class="controls txt">
										<input type="text" id="carNo" value="{{carNo}}"
											data-required="车牌号不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>起运地</label>
									<div class="controls txt">
										<input type="text" id="startPlace" value="{{startPlace}}"
											data-required="起运地不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>目的地</label>
									<div class="controls txt">
										<input type="text" id="shipTurnToPlace" value="{{toPlace}}"
											data-required="目的地不能为空">
									</div>
								</div>
								<input type="hidden" id="turnBuyName" value="{{turnBuyName}}"> 
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>发货人名称</label>
										<div class="controls ">
											<select data-placeholder="请选择..." 
												class="chzn-select span12 self-select" 
												onchange="ShipTurnEdit.consigneeChange()"
												id="turnBuyPid" data-required="发货人名称不能为空!">
												<c:forEach items="${buyList}" var="item">
													<option value='${item.buyPid }'>${item.buyName }</option>
												</c:forEach>
											</select>
				   						</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>收货人名称</label>
									<div class="controls txt">
										<input type="text" id="shipTurnConsigneeName"  value="{{consigneeName}}"
											data-required="收货人名称不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>收货地址</label>
									<div class="controls txt">
										<input type="text" id="consigneeAddress" value="{{consigneeAddress}}"
											data-required="收货地址不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>签回人</label>
										<div class="controls txt">
										<input type="text" id="signPerson" value="{{signPerson}}"
											data-required="签回人不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>签回时间</label>
									<div class="controls time">
										<input type="text" value="{{signTime}}" id="signTime" 
											data-required="签回时间不能为空!"><i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>客户回执人</label>
									<div class="controls txt">
										<input type="text" id="confirmCustomer" value="{{confirmCustomer}}"
											data-required="客户回执人不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>客户回执时间</label>
									<div class="controls time">
										<input type="text" id="confirmTime" value="{{confirmTime}}"
											data-required="客户回执时间不能为空"><i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>件数</label>
									<div class="controls txt">
										<input type="text" id="shipTurnquantity" value="{{quantity}}"
											data-required="件数不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>重量</label>
									<div class="controls txt">
										<input type="text" id="shipTurnweight" value="{{weight}}"
											data-required="重量不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>体积</label>
									<div class="controls txt">
										<input type="text" id="shipTurnvolume" value="{{volume}}"
											data-required="体积不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>总金额</label>
									<div class="controls txt">
										<input type="text" id="totalPrice" value="{{totalPrice}}"
											data-required="总金额不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>签收金额</label>
									<div class="controls txt">
										<input type="text" id="signPrice" value="{{signPrice}}" data-required="签收金额不能为空">
									</div>
								</div>
								<div class="span5 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>到期日期</label>
									<div class="controls time">
										<input type="text" id="shipTurntoDate" value="{{toDate}}" data-required="到期日期不能为空">
											<i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
							</div>
							<input type="hidden" value="{{fileUrl}}" id="shipTurn_fileUrl">
							<input type="hidden" value="{{fileName}}" id="shipTurn_fileName">
							<input type="hidden" value="{{fileRename}}" id="shipTurn_fileRename">
	        				<div class="row-fluid">    
	            				<div class="span5 control-group full">
	               					 <label class="control-label" for="">附件上传</label>
	                				<div class="controls" style="width:450px;">
	                  					<input type='button'  value='上传' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
												onclick="javascript:ShipTurnEdit.addUploadPop()" />
	                				</div>
	           					</div>
	        				</div>
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="ShipTurnEdit.addshipTurnRow()"><i class=""></i>确定</a> <a
						class="btn btn-primary" href="javascript:void(0)"
						onclick="ShipTurnEdit.shipTurnCancle()"><i class=""></i>取消</a>
				</div>
			</div>
		</script>
