<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/credit/js/shipInfo.js"></script>
	<div class="widget-body">
		<div class="widget-grid">
			<div class="grid-toolbar">
				<a class="btn btn-primary" href="javascript:void(0)"
					onclick="ShipInfo.ship_add()"><i class=""></i>新增</a> <a
					class="btn btn-primary" href="javascript:void(0)"
					onclick="ShipInfo.editShip()"><i class=""></i>编辑</a> <a
					class="btn btn-primary" href="javascript:void(0)"
					onclick="ShipInfo.removeShipItem()"><i class=""></i>删除</a>
			</div>
			<table id="ship_mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div style="text-align: center;font-size: 12px;border-bottom: 1px #ccc solid;">
				运单总金额(元)：<span style="color: red;" id="ship_pices"></span> &nbsp;
				运单折扣后金额(元)：<span style="color: red;" id="ship_dis_pices"></span> &nbsp;
				运单总数量：<span style="color: red;" id="ship_nums"></span>
			</div>
		</div>
		<div class="row-fluid">
			<div class="win span6" id="tabwin_add_ship">
				<div class="win-header">
					<span>运单基本信息</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" style="margin-right: 30px;" id="tabwin_add_content_ship"></div>
			</div>
		</div>
		<script id="template_ship" type="text/x-handlebars-template">
			<div class="form-search">
				<form class="form-horizontal" id="ship_form">
					<input type="hidden" name="id" value="{{id}}">
					<input	type="hidden" value="{{rowIndex}}" id="ship_rowIndex"	name="rowIndex">
					<input type="hidden" id="shipOrderPid"	value="{{shipOrderPid}}">
					<div class="row-fluid">
						<div class="row-fluid span6">
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>运单号 </label>
									<div class="controls txt">
										<input type="text" value="{{shipNo}}" id="shipNo"
											data-required="运单号不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>起运地 </label>
									<div class="controls txt">
										<input type="text" id="startAddress" value="{{startAddress}}"
											data-required="起运地不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>目的地 </label>
									<div class="controls txt">
										<input type="text" id="aimName" value="{{aimName}}"
											data-required="目的地不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>货物名称 </label>
									<div class="controls txt">
										<input type="text" id="goodsName" value="{{goodsName}}"
											data-required="货物名称不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>件数 </label>
									<div class="controls txt">
										<input type="text" id="quantity" value="{{quantity}}"
											data-required="件数不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>重量 </label>
									<div class="controls txt">
										<input type="text" id="weight" value="{{weight}}"
											data-required="重量不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>状态 </label>
									<div class="controls">
										<select data-placeholder="请选择..."
											class="chzn-select span12 self-select" id="status"
											data-required="状态不能为空!">
											<option value='1'>已签收</option>
											<option value='2'>运输中</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="row-fluid span6">
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>发货人名称 </label>
										<div class="controls ">
											<input type="hidden" id="sendName" value="{{sendName}}">
											<select data-placeholder="请选择..." onchange="ShipInfo.senderChange()"
												class="chzn-select span12 self-select" 
												id="sendCode" data-required="发货人名称不能为空!">
												<c:forEach items="${buyList}" var="item">
													<option value='${item.buyPid }'>${item.buyName }</option>
												</c:forEach>
											</select>
				   						</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>发货人电话 </label>
									<div class="controls">
										<input type="text" value="{{sendPhone}}" id="sendPhone" 
											data-required="发货人电话不能为空!"> </select>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>收货人名称 </label>
									<div class="controls txt">
										<input type="text" id="receiverName" value="{{receiverName}}"
											data-required="收货人名称不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>收货人电话 </label>
									<div class="controls txt">
										<input type="text" id="receiverPhone" value="{{receiverPhone}}"
											data-required="收货人电话不能为空">
									</div>
								</div>
							</div>
							
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>运费 </label>
									<div class="controls txt">
										<input type="text" id="transferFee" value="{{transferFee}}"
											data-required="运费不能为空">
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 control-group full">
									<label class="control-label" for=""><span
										style="color: red;">*</span>有效期至 </label>
									<div class="controls time">
										<input type="text" id="toDate" value="{{toDate}}" data-required="有效期至不能为空">
											<i class="date" data-format="yyyy-MM-dd" ></i>
									</div>
								</div>
							</div>
							<input type="hidden" value="{{fileUrl}}" id="ship_fileUrl">
							<input type="hidden" value="{{fileName}}" id="ship_fileName">
							<input type="hidden" value="{{fileRename}}" id="ship_fileRename">
	        				<div class="row-fluid">    
	            				<div class="span11 control-group full">
	               					 <label class="control-label" for="">附件上传</label>
	                				<div class="controls" style="width:450px;">
	                  					<input type='button'  value='上传' class='btn' style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:56px;"
												onclick="javascript:ShipInfo.addUploadPop()" />
	                				</div>
	           					</div>
	        				</div>
						</div>
					</div>
				</form>
				<div class="form-search-btn">
					<a class="btn btn-primary" href="javascript:void(0)"
						onclick="ShipInfo.addShipRow()"><i class=""></i>确定</a> <a
						class="btn btn-primary" href="javascript:void(0)"
						onclick="ShipInfo.shipCancle()"><i class=""></i>取消</a>
				</div>
			</div>
		</script>
	</div>
