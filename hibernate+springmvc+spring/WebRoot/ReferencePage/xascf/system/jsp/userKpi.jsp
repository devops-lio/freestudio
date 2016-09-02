<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/system/js/userKpi.js"></script>
 
 <style>
.widget-box .checkBoxInput{
margin-bottom: 7px;
margin-right: 7px;

}
.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px;left:10px; }
.table th, .table td {
padding: 3px;
}
.table{
margin-bottom: 5px;
}
</style>
<script type="text/javascript" src="xascf/js/ajaxfileupload_2.1.js"></script>
<form class="form-horizontal" id="userKpiSearchForm">
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>考核时间</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-primary" onclick="userKpi.load();">确定</a>
				<a class="btn btn-primary" onclick="userKpi.reset();">重置</a>
			</div> 
				<div class="row-fluid "> 
					<div class="span4 control-group full">
						<label class="control-label">
							时间从：
						</label>
						<div class="controls time">
							<input type="text" name="kpiIndexModel.startTime" id="expectedarrivetime2" value="${kpiIndexModel.startTime}">
							<i class="date" data-format="yyyy-MM-dd" data-maxDate="#F{$dp.$D('expectedarrivetime2')}">
							</i>
						</div>
					</div>
					<div class="span4 control-group full">
						<label class="control-label">
							至：
						</label>
						<div class="controls time"">
							<input  type="text" name="kpiIndexModel.endTime" id="expectedarrivetime1" value="${kpiIndexModel.endTime}">
							<i class="date" data-format="yyyy-MM-dd" data-minDate="#F{$dp.$D('expectedarrivetime1')}"></i>
						</div>
					</div> 
				</div> 
		</div>
	</div>
</div>



<div class="widget-box" style="font-size: 12px;">
	<div class="widget-body">
		<div class="widget-form"> 
		 	<div class="row-fluid"> 
		 			<div class="row-fluid " style="margin-top: -10px;width: 90.5%">
		 				<!-- 用户 PID -->
					 	<input type="hidden" value="${kpiIndexModel.userPid}" id="userPid"
					 	name="kpiIndexModel.userPid">
					 	<!-- kpi考核主表PID -->
					 	<input type="hidden" value="${kpiIndexModel.kpiindexPid}" id="kpiindexPid"
					 	name="kpiIndexModel.kpiindexPid">
					 	<!-- 考核季度 -->
					 	<input type="hidden" value="${kpiIndexModel.workstatus}" id="workstatus"
					 	name="workstatus">
					 	
	 			 	   <table class="table table-bordered" style="margin-top: 10px" id="rootMaterialTable">
					   	<tr>
					   		<td style="text-align: center; width:80px;">员工编号</td>
							<td style="text-align: center; width:100px; color: red;" id="userNo"> 
								${kpiIndexModel.userNo}
							</td> 
					   		<td style="text-align: center; width:80px;">员工姓名</td>
							<td style="text-align: center; width:100px; color: red;" id="userNameCn">${kpiIndexModel.userNameCn}</td>    
					   	</tr>
					   	<tr>
					   		<td style="text-align: center; width:80px;">考核季度</td>
							<td style="text-align: center; width:100px; color: red;" id="kpidetalQuarter">${kpiIndexModel.kpidetalQuarter}</td>
					   		<td style="text-align: center; width:80px;">岗位状态</td>
							<td style="text-align: center; width:100px; color: red;" id= "workstatus1"> 
								<c:if test="${kpiIndexModel.workstatus=='0'}">正常</c:if>
								<c:if test="${kpiIndexModel.workstatus=='1'}">请假</c:if>
								<c:if test="${kpiIndexModel.workstatus=='2'}">离职</c:if>  
							</td>    
					   	</tr>
	 			 	   </table>
					   <table class="table table-bordered" style="margin-top: 10px" id="rootMaterialTable">  
						<tr>
							<td style="text-align: center; width:80px;">企业会员个数</td>
							<td style="text-align: center; width:100px; color: red;" id="entCount">
								${memberIndexModel.entCount}
							</td>
							<td style="text-align: center; width:80px;">个人会员个数</td>
							<td style="text-align: center; width:100px; color: red;" id="perCount">
								${memberIndexModel.perCount}
							</td>
						</tr> 
						<tr>
							<td style="text-align: center; width:80px;">会员总数</td>
							<td style="text-align: center; color: red;" colspan="3"; id="customerCount">
								${memberCountModel.customerCount}
							</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">新建融资单数</td>
							<td style="text-align: center; width:100px; color: red;" id="newfancingCount">
								${newFancingCountModel.newfancingCount}
							</td>
							<td style="text-align: center; width:80px;">融资单总数</td>
							<td style="text-align: center; width:100px; color: red;" id="fancingCount">
								${fancingCountModel.fancingCount}
							</td>
						</tr>  
						<tr> 
							<td style="text-align: center; width:80px;">新建融资单总金额</td>
							<td style="text-align: center; color: red;" id="newfancingMoney">
								${newFancingCountModel.newfancingMoney}
							</td> 
							<td style="text-align: center; width:80px;">本次融资单差额</td>
							<td style="text-align: center; color: red;" id="fancingdifference">
								${kpiIndexModel.fancingdifference}
							</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">总差额</td>
							<td style="text-align: center; color: red;" colspan="3"; id="totalFancingdifference">
								${kpiIndexModel.totalFancingdifference}
							</td>
						</tr>
						<tr> 
							<td style="text-align: center; width:80px;">融资单总金额</td>
							<td style="text-align: center; color: red;" colspan="3"; id="fancingMoney">
								${fancingCountModel.fancingMoney}
							</td>
						</tr> 
						<tr>
							<td style="text-align: center; width:80px;">本月已发生放款融资单数</td>
							<td style="text-align: center; color: red;" colspan="3"; id="singularbBacksection"> 
								${newFancingCountModel.singularbBacksection}
							</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">融资单放款总额</td>
							<td style="text-align: center; color: red;" colspan="3"; id="totalBacksectionmoney">
								${fancingCountModel.totalBacksectionmoney}
							</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">本月已发生还款融资单数</td>
							<td style="text-align: center; color: red;" colspan="3"; id="singularRepayment">${newFancingCountModel.singularRepayment}</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">本月已发生还款总金额</td>
							<td style="text-align: center; color: red;" colspan="3"; id="totalRepayment">${newFancingCountModel.totalRepayment}</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">本月产出收益总额</td>
							<td style="text-align: center; color: red;" colspan="3"; id="totalEarnings">${billSumModel.totalEarnings}</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">本月坏账融资单数</td>
							<td style="text-align: center; color: red;" colspan="3"; id="singularBadbill">${kpiIndexModel.singularBadbill}</td>
						</tr>
						<tr>
							<td style="text-align: center; width:80px;">坏账总数</td>
							<td style="text-align: center; color: red;" colspan="3"; id="totalBadbill">${kpiIndexModel.totalBadbill}</td>
						</tr> 
				   		<tr> 
							<td style="text-align: center; width:80px;">考核时间</td>
							<td style="text-align: center; colspan="3"; id="kpidetalDateblock"></td>
				   		</tr>
						<tr>
							<td style="text-align: center; width:80px;">考核得分</td> 
							<td style="text-align: left;" colspan="3";> 
									<div class="span8 control-group full"> 
										<div class="txt">
											<input type="text" id="kpidetalScores" name="kpiIndexModel.kpidetalScores" 
											values="${kpiIndexModel.kpidetalScores}">
										</div>
									</div>
							</td>
				   		</tr>  
				   		<tr>
							<td style="text-align: center; width:183px;">备注</td> 
				   			<td style="text-align: left;" colspan="3";> 
				   					<div style="margin-top: 0px;">
											<textarea data-maxlength="备注不能超过200个字"
											data-maxlength-param="200"
											rows="300" cols="350" style="width: 60%;height: 65px;resize:none;" 
											name="kpiIndexModel.remark" id="remark">${kpiIndexModel.remark}</textarea>
									</div> 
							</td>
				   		</tr> 
					</table>     
			 	</div>  
					 	<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
					 		企业个人会员列表<span style="color:red;">*</span>
				 		</div>
					 	<div class="row-fluid " style="margin-top: -10px;width: 90.5%"">
					 			<div class="widget-box">
								   <div class="widget-body">
										<div class="widget-grid">
										<ul  class="nav nav-tabs" style="margin-bottom: 0"> 
											<li id="onenew" class="active">
												<a href="#oneTab" data-toggle="tab" id="oneTabBtn" >企业</a>
											</li>
											<li>
												<a href="#twoTab" data-toggle="tab" id="twoTabBtn">个人</a>
											</li> 
										</ul>  
										<!-- 企业 -->
										<div class="tab-pane" id="twoTab" style="overflow: auto;">
											<div class="widget-grid">
												<table id="" class="">
													<tr><th rowspan="" colspan=""></th></tr>
												</table> 
												<div id="twofancpg" style="text-align: right;"></div>
											</div>
										</div>	
										<!-- 个人 -->
										<div class="tab-pane" id="" style="overflow: auto;">
											<div class="vidget-grid">
												<table id="" class="">
													<tr><th rowspan="" colspan=""></th></tr>
												</table>
											</div>
											<div id="twofancpg" style="text-align: right;"></div>
										</div> 
										</div>
									</div>
								</div>
					 		</div>
		 			<div class="row-fluid" style="margin-top: 5px;font-size: 14px;">
		 					融资信息列表<span style="color:red;">*</span>
			 		</div>
		 			<div class="row-fluid " style="margin-top: -10px;width: 90.5%">
			 			<div class="widget-box">
						   <div class="widget-body">
								<div class="widget-grid">
								<!--  
									<div class="grid-toolbar"> 
									</div>
								-->
										<table id="ship_mmg" class="mmg">
					       					<tr>
					           					<th rowspan="" colspan=""></th>
					       					</tr>
					   					</table> 
								</div>
							</div>
						</div>
			 		</div> 
		 		</div> 
		 		<div class="row-fluid offset4" style="margin-top: 20px;margin-bottom: 30px;width: 62%">
		 		 
					      <a class="btn btn-primary" href="javascript:void(0)" onclick="userKpi.save()"><i class=""></i>保存</a>  
					      <a  class="btn btn-primary" href="javascript:void(0)" id="edit" onclick="userKpi.backtrack()"><i class=""></i>返回</a> 
		      	
		 		</div>  
	 	</div>
	 </div>	
</div>
</form>

 	