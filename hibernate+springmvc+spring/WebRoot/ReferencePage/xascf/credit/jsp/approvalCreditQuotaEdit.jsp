<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<style>
.long85Lable{
margin-left: -8px;
width: 85px
}

</style>
<script type="text/javascript"	src="xascf/credit/js/approvalCreditQuotaEdit.js"></script>
<%
//产品类型
	pageContext.setAttribute("FANCING_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_TYPE"));
	//保理类别
	pageContext.setAttribute("FANCING_FUNCTION", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_FUNCTION"));
	//保理方式
	pageContext.setAttribute("FANCING_KINDS", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("FANCING_KINDS"));
	//担保方式
	pageContext.setAttribute("GURANTEE_TYPE", 
	com.sinoservices.xascf.utils.DataConfigUtil.getDataByParentCode("GURANTEE_TYPE"));
	%>
<div class="widget-box">
	<div class="widget-header" style="background-color: #438eb9;">
		<span class="widget-title"><i class="icon-list"></i>授信批复结果 </span>
	</div>
	<div class="widget-body" style="font-size: 12px;margin-bottom: -5px;border-bottom: 1px solid #ccc;" id="approdPassDiv">
	<div class="widget-box" style="margin-top:0px;">
	<div class="widget-form">
		<form class="form-horizontal fromPre" id="approval_editForm" style="margin-right: 10px;">
		<input type="hidden" name="creditEntity.creditModel.creditNo"	value="${creditEntity.creditApplyItem.creditNo }">
		<input type="hidden" name="creditEntity.creditModel.status"	value="${creditEntity.creditApplyItem.status }">
		<input type="hidden" name="creditEntity.approvalRecordModel.approvalStatus"	value="${creditEntity.creditApplyItem.status }">
			<input type="hidden"  name="creditEntity.approvalRecordModel.objectPid"		value="${creditEntity.creditApplyItem.pid }">
			<input type="hidden" name="creditEntity.approvalRecordModel.approvalBussnessNo"	value="${creditEntity.creditApplyItem.creditNo }">
			<input type="hidden" name="creditEntity.creditResultModel.pid"	value="${creditEntity.creditResultModel.pid }">
			<input type="hidden" name="creditEntity.creditResultModel.creditNo"	value="${creditEntity.creditApplyItem.creditNo }">
			<input type="hidden" name="creditEntity.creditResultModel.creditResultNo"	value="${creditEntity.creditResultModel.creditResultNo }">
			<input type="hidden" name="creditEntity.creditResultModel.memberPid"	value="${creditEntity.creditApplyItem.memberPid }">
			<input type="hidden" name="creditEntity.creditResultModel.memberNo"	value="${creditEntity.creditApplyItem.memberNo }">
			<input type="hidden"  name="creditEntity.approvalRecordModel.approvaledStatus"		value="${passedStatus }">
			<input type="hidden"  name="creditEntity.approvalRecordModel.approvaledName"		value="${passedNames}">
			<div class="row-fluid">
				<div class="row-fluid" id="result_div" >
					<div class="row-fluid"  >
					<div class="span3 control-group full ">
						<label class="control-label long85Lable" for="" style="width: 90px;margin-left: -14px;"><span
							style="color: red;">*</span>批复额度(元)</label>
						<div class="controls txt">
							<input type="text" 
								 data-required="批复额度不能为空！" data-number="只能输入数字"
								name="creditEntity.creditResultModel.replyQuota" id="replyQuota"
								value="${creditEntity.creditResultModel==null?creditEntity.creditApplyItem.creditQuota:creditEntity.creditResultModel.replyQuota}">
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for=""><span
							style="color: red;">*</span>产品类别</label>
						<div class="controls">
							<select name="creditEntity.creditResultModel.financingType"  
								data-required="产品类别不能为空"
								class="chzn-select"  >
										<c:forEach items="${FANCING_TYPE}" var="item">
										<option value="${item.code}" ${(creditEntity.creditResultModel==null?creditEntity.creditApplyItem.financingType:creditEntity.creditResultModel.financingType )== item.code ? "selected" : "" }>${item.nameCn}</option>
										</c:forEach>
							</select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" for=""><span
							style="color: red;">*</span>保理类别</label>
						<div class="controls">
							<select name="creditEntity.creditResultModel.financingMethod"  
								data-required="保理类别不能为空"
								class="chzn-select"  >
								<c:forEach items="${FANCING_FUNCTION}" var="item">
								<option value="${item.code}" ${(creditEntity.creditResultModel==null?creditEntity.creditApplyItem.financingMethod:creditEntity.creditResultModel.financingMethod )== item.code ? "selected" : "" }>${item.nameCn}</option>
										
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" for=""><span
							style="color: red;">*</span>保理方式 </label>
						<div class="controls">
							<select name="creditEntity.creditResultModel.financingNature"  
								data-required="保理方式不能为空"
								class="chzn-select"  >
								<c:forEach items="${FANCING_KINDS}" var="item">
								<option value="${item.code}" ${(creditEntity.creditResultModel==null?creditEntity.creditApplyItem.financingNature:creditEntity.creditResultModel.financingNature )== item.code ? "selected" : "" }>${item.nameCn}</option>
								
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				
				<div class="row-fluid"  >
					<div class="span3 control-group full" >
						<label class="control-label" for=""><span
							style="color: red;">*</span>担保方式 </label>
						<div class="controls">
							<select name="creditEntity.creditResultModel.guaranteeType"  
								data-required="保理方式不能为空"
								class="chzn-select"  >
								<c:forEach items="${GURANTEE_TYPE}" var="item">
								<option value="${item.code}" ${creditEntity.creditResultModel.guaranteeType == item.code ? "selected" : "" }>${item.nameCn}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<!-- 
					<div class="span3 control-group full">
						<label class="control-label" for=""><span
							style="color: red;">*</span>开始日期</label>
						<div class="controls time">
							<input type="text" data-required="开始日期不能为空！"  placeholder="请选择"
								name="creditEntity.creditResultModel.creditStartTime" id="expectedarrivetime1"
								value="${creditEntity.creditResultModel==null?creditEntity.creditApplyItem.effectiveStartTime:creditEntity.creditResultModel.creditStartTime}">
							<i class="date" data-format="yyyy-MM-dd"
								 data-maxDate="#F{$dp.$D('expectedarrivetime2')}"></i>
						</div>
					</div>
					<div class="span3 control-group full">
						<label class="control-label" for=""><span
							style="color: red;">*</span>结束日期</label>
						<div class="controls time">
							<input type="text" data-required="结束日期不能为空！"  placeholder="请选择"
								name="creditEntity.creditResultModel.creditEndTime" id="expectedarrivetime2"
								value="${creditEntity.creditResultModel==null?creditEntity.creditApplyItem.effectiveEndTimeStr:creditEntity.creditResultModel.creditEndTime}">
							<i class="date" data-format="yyyy-MM-dd"
								data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
						</div>
					</div> -->
					<div class="span3 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>账期利率(%)
						</label>
						<div class="controls txt">
							<input type="text" 
								data-required="账期利率不能为空！"   placeholder="请输入数字"
								data-number="只能输入数字"
								name="creditEntity.creditResultModel.termRate" value="${creditEntity.creditResultModel.termRate==null?16: creditEntity.creditResultModel.termRate}">
						</div>
					</div>
					<div class="span3 control-group full ">
						<label class="control-label" for=""><span
							style="color: red;">*</span>逾期倍数
						</label>
						<div class="controls txt">
							<input type="text" 
								id="creditNo" data-required="逾期倍数不能为空！"   placeholder="请输入数字"
								data-number="只能输入数字" value="${creditEntity.creditResultModel.overdueRate==null?4: creditEntity.creditResultModel.overdueRate}"
								name="creditEntity.creditResultModel.overdueRate">
						</div>
					</div>
				</div>
				<div class="row-fluid"  >
					<div class="span3 control-group full" >
						<label class="control-label" for=""><span
							style="color: red;">*</span>保证金收取</label>
						<div class="controls">
							<slt:select cssClass="chzn-select" 
								name="creditEntity.creditResultModel.isBond"
								value="${creditEntity.creditResultModel.isBond}"
								optionsType="IS_BOND">
								<slt:outHTML>id="isBond"</slt:outHTML>
								<slt:outHTML>onchange="ApprovaelFancingQuotaEdit.changeCheck();"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label long85Lable" for="" style="width: 85px;"><span
							style="color: red;">*</span>保证金占比(%)</label>
							<div class="controls txt">
								<input type="text"
									id="bondRate"
									data-number="只能输入数字" placeholder="请输入数字"
									data-required="保证金收取占不能为空！"  onchange="ApprovaelFancingQuotaEdit.jsBond()"
									name="creditEntity.creditResultModel.bondRate"
									value="${creditEntity.creditResultModel.bondRate==null?5:creditEntity.creditResultModel.bondRate}">
							</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label long85Lable" style="width: 90px;margin-left: -14px;"><span
							style="color: red;">*</span>保证金额度(元)</label>
							<div class="controls txt">
								<input type="text"
									id="bondPrice" readonly="readonly"
									name="creditEntity.creditResultModel.bondPrice"
									value="${creditEntity.creditResultModel.bondPrice}">
							</div>
					</div>
				</div>
				<div class="row-fluid"  >
					<div class="span3 control-group full" >
						<label class="control-label long85Lable" style="width: 85px;"><span
							style="color: red;">*</span>敞口额度(元)</label>
							<div class="controls txt">
								<input type="text" readonly="readonly"
									id="openPrice"
									name="creditEntity.creditResultModel.openPrice"
									value="${creditEntity.creditResultModel.openPrice}">
							</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label" for="" style="width: 90px;margin-left: -14px;"><span
							style="color: red;">*</span>手续费收取方式</label>
						<div class="controls">
							<slt:select cssClass="chzn-select" 
								name="creditEntity.creditResultModel.serveMethod"
								value="${creditEntity.creditResultModel.serveMethod}"
								optionsType="SERVE_METHOD">
								<slt:outHTML>id="serveMethod"</slt:outHTML>
							</slt:select>
						</div>
					</div>
					<div class="span3 control-group full" >
						<label class="control-label long85Lable" style="width: 85px;"><span
							style="color: red;">*</span>手续费比例(%)</label>
							<div class="controls txt">
								<input type="text"
									id="serveRate"
									data-number="只能输入数字" placeholder="请输入数字"
									name="creditEntity.creditResultModel.serveRate"
									data-required="手续费收取占比不能为空！"
									value="${creditEntity.creditResultModel.serveRate==null?1:creditEntity.creditResultModel.serveRate}">
							</div>
					</div>
				</div>
				<div class="row-fluid" >
					<div class="span10 control-group full">
						<label class="control-label" >其他授信要求</label>
						<div class="controls txt">
							<textarea rows="300"  name="creditEntity.creditResultModel.creditRemark" 
					 		cols="500" style="width: 100%;height: 100px;resize:none;">${creditEntity.creditResultModel.creditRemark}</textarea>
						</div>
					</div>
				</div>
				<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
				<!-- 评审委员会审议情况jsp -->
				<script type="text/javascript"	src="xascf/credit/js/creditResultSugEdit.js"></script>
					<div class="widget-box">
						<div class="widget-header">
							<span class="widget-title"><i class="icon-list"></i>评审委员会审议情况 </span> <span class="widget-toolbar"><a
								href="#" data-action="collapse"><i class="icon-chevron-up"></i> </a>
							</span>
						</div>
						<div class="widget-body">
							<div class="widget-grid">
								<div class="grid-toolbar">
									<a class="btn btn-primary" href="javascript:void(0)"	onclick="CreditResultSugEdit.sugAdd()"><i class=""></i>新增</a> 
									<a id="delete" class="btn btn-primary" href="javascript:void(0)"   onclick="CreditResultSugEdit.edit()"><i class=""></i>编辑</a>	
									<a id="delete" class="btn btn-primary" href="javascript:void(0)"   onclick="CreditResultSugEdit.removeItem()"><i class=""></i>删除</a>
								</div>
								<table id="sug_mmg" class="mmg">
									<tr>
										<th rowspan="" colspan=""></th>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="widget-box" style="border-bottom: 0px;">
						<div class="widget-header" style="background-color: #438eb9;">
							<span class="widget-title"><i class="icon-list"></i>审议结果统计 </span><span
								class="widget-toolbar"><a href="#" data-action="collapse"><i
									class="icon-chevron-up"></i> </a> </span>
						</div>
						<div class="widget-body"
							style="font-size: 12px;margin-bottom: -5px;">
							<table class="table table-bordered" id="buyerTable">
								<tr>
									<th style="text-align: center;"></th>
									<th style="text-align: center;" >同意</th>
									<th style="text-align: center;">否决</th>
									<th style="text-align: center;" >再议</th>
								</tr>
									<tr>
									<td style="text-align: center;">票数</td>
									<td style="text-align: center;" id="passResultTd"></td>
									<td style="text-align: center;" id="backResultTd"></td>
									<td style="text-align: center;" id="againResultTd"></td>
									</tr>
									<tr>
									<td style="text-align: center;">占比</td>
									<td style="text-align: center;" id="passRateTd"></td>
									<td style="text-align: center;" id="backRateTd"></td>
									<td style="text-align: center;" id="gaginRateTd"></td>
									</tr>
							</table>
						</div>
						<input type="hidden" id="passResult" name="creditEntity.creditResultModel.passResult" value="${creditEntity.creditResultModel.passResult}">
						<input type="hidden" id="backResult" name="creditEntity.creditResultModel.backResult" value="${creditEntity.creditResultModel.backResult}">
						<input type="hidden" id="againResult" name="creditEntity.creditResultModel.againResult" value="${creditEntity.creditResultModel.againResult}">
						<input type="hidden" id="passRate" name="creditEntity.creditResultModel.passRate" value="${creditEntity.creditResultModel.passRate}">
						<input type="hidden" id="backRate" name="creditEntity.creditResultModel.backRate" value="${creditEntity.creditResultModel.backRate}">
						<input type="hidden" id="gaginRate" name="creditEntity.creditResultModel.gaginRate" value="${creditEntity.creditResultModel.gaginRate}">
					</div>
				</div>
				<div class="row-fluid" style="margin-top: 10px">
					<div class="span3 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>是否通过</label>
							<div class="controls">
								<slt:select cssClass="chzn-select"
									name="creditEntity.approvalRecordModel.approvalIspassed"
									optionsType="SUG_STATUS">
									<slt:outHTML>id="approvaelPass"</slt:outHTML>
								</slt:select>
							</div>
					</div>
				</div>
				<input type="hidden" name="creditEntity.approvalRecordModel.approvalNext" id="approvalNext" >
				<div class="row-fluid" id="backDiv" style="display: none;">
					<div class="span3 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>驳回至</label>
							<div class="controls txt" >
							<select data-placeholder="请选择..." onchange="ApprovaelFancingQuotaEdit.backChange()"  
							name="creditEntity.approvalRecordModel.rebackStatus"
							class="chzn-select span12 self-select" id="backTo" >
								<c:forEach items="${processList}" var="item">
									<option value='${item.statusValue }'>${item.statusName }</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row-fluid" id="backDiv"  style="margin-top:0px;">
					<div class="span10 control-group full">
						<label class="control-label" ><span style="color:red;">*</span>批复内容</label>
						<div class="controls txt">
							<textarea rows="300" id="approvalRemark" data-required="批复内容不能为空！" name="creditEntity.creditResultModel.creditApproval" 
					 		cols="500" style="width: 100%;height: 100px;resize:none;">${creditEntity.creditResultModel.creditApproval}</textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid"	style="margin-top: 20px;margin-bottom: 20px;text-align: center;">
					<div class="span12 control-group full" >
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovaelFancingQuotaEdit.save()"><i class=""></i>保存审批</a>
					<a class="btn btn-primary" href="javascript:void(0)" onclick="ApprovaelFancingQuotaEdit.rebackList()"><i class=""></i>返回列表</a>
			</div>
			</div>
		</form>
		</div>
	</div>
	</div>
</div>
<div class="row-fluid">
			<div class="win span4" id="tabwin_add_sug" style="overflow: visible;">
				<div class="win-header">
					<span>委员会意见信息</span> <i class="close">&times;</i>
				</div>
				<div class="win-content" id="tabwin_add_content_sug"></div>
			</div>
		</div>
		<script id="template_sug" type="text/x-handlebars-template">
	    	<div class="form-search">
		    	<form class="form-horizontal" id="sug_form" >
					<input	type="hidden" value="{{rowIndex}}" id="sug_rowIndex"	name="rowIndex">					
					<div class="row-fluid">
		      	  		<div class="span10 control-group full" >
							<label class="control-label" ><span style="color:red;">*</span>委员名称</label>
							<div class="controls txt">
								<input type="text" 
									id="commitorName"   placeholder="请输入" 
									value="{{commitorName}}"
									data-required="委员名称不能为空！">
							</div>			
						</div>
					</div>
					<div class="row-fluid">
						<div class="span10 control-group full ">
							<label class="control-label" for=""><span style="color: red;">*</span>意见</label>
							<div class="controls txt">
								<textarea rows="300" data-required="意见不能为空！" id="replySuggestion" 
					 		cols="500" style="width: 100%;height: 100px;resize:none;">{{replySuggestion}}</textarea>
							</div>
						</div>
					</div>		
					<div class="row-fluid">	
						<div class="span10 control-group full ">
							<label class="control-label" for=""><span
								style="color: red;">*</span>表决
							</label>
							<div class="controls">
								<slt:select cssClass="chzn-select"
									optionsType="SUG_STATUS">
									<slt:outHTML>id="replyVote"</slt:outHTML>
								</slt:select>
							</div>
						</div>
					</div>
		    	</form>
		    	<div class="form-search-btn" >
		       	 	<a class="btn btn-info save" href="javascript:void(0)" onclick="CreditResultSugEdit.addSugRow()"><i class=""></i>确定</a>
		        	<a class="btn btn-info cancel" href="javascript:void(0)" onclick="popCancle('sug')""><i class=""></i>取消</a>
		    	</div>
			</div>
		</script>
	
