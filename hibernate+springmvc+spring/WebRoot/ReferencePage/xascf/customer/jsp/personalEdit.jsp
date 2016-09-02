<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/customer/js/personalEdit.js"></script>
<!-- 选择文件上传 -->
<script type="text/javascript" src="xascf/js/ajaxfileupload_2.1.js"></script>
<style>
.widget-box .checkBoxInput{
margin-bottom: 7px;
margin-right: 7px;

}
.file{ position:absolute;right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px;left:10px; }
</style>
<!-- 会员登入信息 --> 

<form class="form-horizontal" id="personalEditForm">
	<div class="widget-box">  
		<div class="widget-header">
			<span class="widget-title"><i class="icon-search"></i>个人会员基本信息</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
	   <div class="widget-body">
	   		<div class="widget-main padding-6" style="margin-top:20px;margin-left: 0px;">  
					<div class="row-fluid" style="font-size: 14px;width: 65.5%;margin-top: 5px;" align="left">
			 			个人登陆信息<span style="color:red;">*</span>
			 		</div>  
					<input type="hidden" id="memberPid" name="customerOrderEntity.customerItemView.memberPid" 
					value="${customermodel.memberPid}" />  
					<input type="hidden" id="customerPid" name="customerOrderEntity.customerItemView.customerPid" 
					value="${customermodel.customerPid}" />  
					<div class="row-fluid" align="center"> 
						<div class="span4 control-group full">
							<label class="control-label">
								会员编号<span style="color: red;">*</span>
							</label>
							<div class="controls txt">
								<input type="text" 
									 name="customerOrderEntity.customerItemView.memberNo"
									 value="${customermodel.memberNo}" id="memberNo">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">登录名<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="登录名不能为空！"  id="loginName"
									name="customerOrderEntity.customerItemView.loginName" value="${customermodel.loginName}">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">真实姓名<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="真实姓名不能为空！"	 
										data-maxlength-param="30" maxlength=30 id="userNameCn" 
										name="customerOrderEntity.customerItemView.userNameCn" value="${customermodel.userNameCn}">
							</div>
						</div>		
					</div>
					<div class="row-fluid" align="center">  
						<div class="span4 control-group full">
							<label class="control-label">身份证号码<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="邮箱不能为空！"	 
								name="customerOrderEntity.customerItemView.cardNo" value="${customermodel.cardNo}" 
								data-maxlength-param="30" maxlength=30 id="cardNo">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">手机<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="手机不能为空！" 
										data-mobile="手机输入有误!"  maxlength=11 
										data-maxlength-param="11" id="tel"
										name="customerOrderEntity.customerItemView.tel" value="${customermodel.tel}">
							</div>
						</div>   	
						<div class="span4 control-group full">
							<label class="control-label">邮箱<span style="color: red;">*</span></label>
							<div class="controls txt">
								<input type="text" data-required="邮箱不能为空！" data-myEmail="邮箱地址格式不正确！"	 
								name="customerOrderEntity.customerItemView.emill" value="${customermodel.emill}" 
								data-maxlength-param="30" maxlength=30 id="emill">
							</div>
						</div>	
					</div>  
		 	<div class="row-fluid" style="font-size: 14px;width: 65.5%;margin-top: 5px;" align="left">
				个人基本信息<span style="color:red;">*</span>
	 		</div> 
					<div class="row-fluid" align="center"> 
						<div class="span4 control-group full">
							<label class="control-label">
								婚否<span style="color: red;">*</span>
							</label>
							<div class="controls"> 
								<slt:select  cssClass="chzn-select" name="customerOrderEntity.customerItemView.ismarry" optionsType="IS_YES_NO" 
								value="${customermodel.ismarry}" > 
									<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									<slt:outHTML>id="ismarry"</slt:outHTML>
									<slt:outHTML>data-required="不能为空"</slt:outHTML> 
								</slt:select>  
							</div>
						</div>  
						<div class="span4 control-group full">
							<label class="control-label">
								现居住地址<span style="color: red;">*</span>
							</label>
							<div class="controls txt">
								<input type="text" data-required="联系人地址不能为空！" 
									name="customerOrderEntity.customerItemView.contactsAddr" value="${customermodel.contactsAddr}" id="contactsAddr">
							</div>
						</div>
						<div class="span4 control-group full">
							<label class="control-label">
								当地居住证编号
							</label>
							<div class="controls txt">
								<input type="text"  
									name="customerOrderEntity.customerItemView.contactsAddr" value="${customermodel.contactsAddr}" id="contactsAddr">
							</div>
						</div>
					</div>   
					<div style="margin-top:3px;" class="row-fluid" align="center">
						<div class="span8 control-group full">
						<label class="control-label">
							备注</label>
							<div class="controls" style="margin-top: 0px;">
								<textarea  data-maxlength="备注不能超过200个字"
								data-maxlength-param="200"
								rows="350" cols="350" style="width: 100%;height: 113px;resize:none;" 
								name="customerOrderEntity.customerItemView.remark"  id="remark">${customermodel.remark}</textarea>
							</div>
						</div>	
					</div> 
				</div> 
				<div class="row-fluid" style="margin-top: 10px;"> 		
				</div> 
			
				<!-- 融资账单日期、还款日期 
				<form class="form-horizontal" style="display: none;" id="billonForm"> 
			 	<input type="hidden" name="billon.billonOwerPid" id="billonOwerPid" value="${billon.billonOwerPid}">  
					<input type="hidden" name="customerOrderEntity.billonSetItemList.billonDate" id="billonDate" 
					value="${customerOrderEntity.billonSetItemList.billonDate}"> 
				</form> 
				-->
			</div> 
		</div>  

	<!-- 个人监管账户 --> 
	<div class="widget-box" > 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>个人监管账户信息</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body"> 
			<div class="widget-grid">
				<div class="grid-toolbar">
			      <a id="addbtn" class="btn btn-primary" href="javascript:void(0)" onclick="PersonalEdit.addbank()"><i class=""></i>新增</a>  
			      <a id="editbanbtn" class="btn btn-primary" href="javascript:void(0)" onclick="PersonalEdit.editbankRow()"><i class=""></i>编辑</a>  
			      <a id="deletebtn" class="btn btn-primary" href="javascript:void(0)" onclick="PersonalEdit.removeBankRow()"><i class=""></i>删除</a> 
				</div>
				<table id="bank_mmg" class="mmg">
	  					<tr>
	      					<th rowspan="" colspan=""></th>
	  					</tr>
				</table>
			</div>
		</div>
	</div>
	<!-- 资质材料信息记录 -->
	<div class="widget-box"> 
		<div class="widget-header">
			<span class="widget-title"><i class="icon-list"></i>证件材料信息</span> 
        	<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
		</div>
		<div class="widget-body">  
			<div class="widget-grid">
	   		<div class="widget-main padding-6" style="margin-top:20px;margin-left: 0px;"> 
					<div class="row-fluid">   
						<table class="table table-bordered">  
							<tr>
								<td style="text-align: center;">证件材料类型</td>
								<!--  
								<td style="text-align: center;">材料名称</td>
								-->
								<td style="text-align: center;">上传文件名</td>
								<td style="text-align: center;">上传时间</td>
								<td style="text-align: center;">上传材料操作</td>
							</tr>
							<tr>
								<!-- card -->
								<td style="text-align: center;color: red;">身份证</td>
								<!--  
								<td style="text-align: center; width:350px;">  
									 <input type="text" style="width : 300px;"  value="${card.qualificationName}" 
									 name="customerOrderEntity.cardItemView.qualificationName" id="QualificationName_sf">
								</td>  
								-->
								<td style="text-align: center;" id="textfielid_sf"> 
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${card.qualificationFileName}&url=${card.qualificationUrl}">
										${card.qualificationFileName}
								    </a>   
								</td>
								<td style="text-align: center;" id="textfielDate_sf">${card.createTime}</td>
								<td style="text-align: center; width:90px;" > 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 身份证Pid -->
									 	<input type="hidden" value="${card.qualificationPid}" id="filePid_sf"
									 	name="customerOrderEntity.cardItemView.qualificationPid">
										<!-- 身份证上传文件名 -->
										<input type="hidden" value="${card.qualificationFileName}" id="fileName_sf" 
										name="customerOrderEntity.cardItemView.qualificationFileName">
										<!-- 身份证上传路径 -->
										<input type="hidden" value="${card.qualificationUrl}" id="url_sf" 
										name="customerOrderEntity.cardItemView.qualificationUrl" >
										<!-- 身份证上传时间 -->
										<input type="hidden" value="${card.createTime}" id="date_sf" 
										name="customerOrderEntity.cardItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_sf" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/>
										<input type="file" name="file" class="file" id="file_sf" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('sf')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
							<tr>
								<!--marriage -->
								<td style="text-align: center;color: red;">结婚证</td>
								<!--  
								<td style="text-align: center;"> 
									 <input type="text" style="width : 300px;"  value="${marriage.qualificationName}" 
									 name="customerOrderEntity.marriageItemView.qualificationName" id="QualificationName_jh"> 
									 
								</td>
								-->
								<td style="text-align: center;" id="textfielid_jh">
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${marriage.qualificationFileName}&url=${marriage.qualificationUrl}">
										${marriage.qualificationFileName}
								    </a>   
								</td>
								<td style="text-align: center;" id="textfielDate_jh">${marriage.createTime}</td>
								<td style="text-align: center;"> 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 结婚证Pid -->
									 	<input type="hidden" value="${marriage.qualificationPid}" id="filePid_jh"
									 	name="customerOrderEntity.marriageItemView.qualificationPid">
										<!-- 结婚证上传文件名 -->
										<input type="hidden" value="${marriage.qualificationFileName}" id="fileName_jh" 
										name="customerOrderEntity.marriageItemView.qualificationFileName">
										<!-- 结婚证上传路径 -->
										<input type="hidden" value="${marriage.qualificationUrl}" id="url_jh" 
										name="customerOrderEntity.marriageItemView.qualificationUrl">
										<!-- 结婚证上传时间 -->
										<input type="hidden" value="${marriage.createTime}" id="date_jh" 
										name="customerOrderEntity.marriageItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_jh" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/> 
										<input type="file" name="file"  class="file" id="file_jh" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('jh')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
							<tr>
								<!-- registered -->
								<td style="text-align: center;color: red;">户口本复印件</td>
								<!--  
								<td style="text-align: center;"> 
									 <input type="text" style="width : 300px;"  value="${registered.qualificationName}" 
									 name="customerOrderEntity.registeredItemView.qualificationName" id="QualificationName_hk" >  
								</td>
								-->
								<td style="text-align: center;" id="textfielid_hk">
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${registered.qualificationFileName}&url=${registered.qualificationUrl}">
										${registered.qualificationFileName}
								    </a>  
								</td>
								<td style="text-align: center;"id="textfielDate_hk">${registered.createTime}</td>
								<td style="text-align: center;"> 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 户口本复印件Pid -->
									 	<input type="hidden" value="${registered.qualificationPid}" id="filePid_hk"
									 	name="customerOrderEntity.registeredItemView.qualificationPid">
										<!-- 户口本复印件上传文件名 -->
										<input type="hidden" value="${registered.qualificationFileName}" id="fileName_hk" 
										name="customerOrderEntity.registeredItemView.qualificationFileName">
										<!-- 户口本复印件上传路径 -->
										<input type="hidden" value="${registered.qualificationUrl}" id="url_hk" 
										name="customerOrderEntity.registeredItemView.qualificationUrl">
										<!-- 户口本复印件上传时间 -->
										<input type="hidden" value="${registered.createTime}" id="date_hk" 
										name="customerOrderEntity.registeredItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_hk" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/> 
										<input type="file" name="file"  class="file" id="file_hk" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('hk')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
							<tr>
								<!-- estate -->
								<td style="text-align: center;color: red;">房产证复印件</td>
								<!-- 
								<td style="text-align: center;"> 
									 <input type="text" style="width : 300px;"  value="${estate.qualificationName}" 
									 name="customerOrderEntity.estateItemView.qualificationName" id="QualificationName_fc" > 
								</td>
								 -->
								<td style="text-align: center;" id="textfielid_fc">
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${estate.qualificationFileName}&url=${estate.qualificationUrl}">
										${estate.qualificationFileName}
								    </a>  
								</td>
								<td style="text-align: center;" id="textfielDate_fc">${estate.createTime}</td>
								<td style="text-align: center;"> 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 房产证复印件Pid -->
									 	<input type="hidden" value="${estate.qualificationPid}" di="filePid_fc"
									 	name="customerOrderEntity.estateItemView.qualificationPid">
										<!-- 房产证复印件上传文件名 -->
										<input type="hidden" value="${estate.qualificationFileName}" id="fileName_fc" 
										name="customerOrderEntity.estateItemView.qualificationFileName">
										<!-- 房产证复印件上传路径 -->
										<input type="hidden" value="${estate.qualificationUrl}" id="url_fc" 
										name="customerOrderEntity.estateItemView.qualificationUrl">
										<!-- 房产证复印件上传时间 -->
										<input type="hidden" value="${estate.createTime}" id="date_fc" 
										name="customerOrderEntity.estateItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_fc" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/> 
										<input type="file" name="file"  class="file" id="file_fc" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('fc')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
							<tr>
								<!-- vehicle  -->
								<td style="text-align: center;color: red;">车辆行驶证复印件</td> 
								<!-- 
								<td style="text-align: center;"> 
									 <input type="text" style="width : 300px;"  value="${vehicle.qualificationName}" 
									 name="customerOrderEntity.vehicleItemView.qualificationName" id="QualificationName_cl" > 
									 
								</td>
								 -->
								<td style="text-align: center;" id="textfielid_cl">
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${vehicle.qualificationFileName}&url=${vehicle.qualificationUrl}">
										${vehicle.qualificationFileName}
								    </a>  
								</td>
								<td style="text-align: center;" id="textfielDate_cl">${vehicle.createTime}</td>
								<td style="text-align: center;"> 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 车辆行驶证复印件Pid -->
									 	<input type="hidden" value="${vehicle.qualificationPid}" di="filePid_cl"
									 	name="customerOrderEntity.vehicleItemView.qualificationPid">
										<!-- 车辆行驶证复印件上传文件名 -->
										<input type="hidden" value="${vehicle.qualificationFileName}" id="fileName_cl" 
										name="customerOrderEntity.vehicleItemView.qualificationFileName">
										<!-- 车辆行驶证复印件上传路径 -->
										<input type="hidden" value="${vehicle.qualificationUrl}" id="url_cl" 
										name="customerOrderEntity.vehicleItemView.qualificationUrl">
										<!-- 车辆行驶证复印件上传时间 -->
										<input type="hidden" value="${vehicle.createTime}" id="date_cl" 
										name="customerOrderEntity.vehicleItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_cl" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/> 
										<input type="file" name="file"  class="file" id="file_cl" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('cl')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
							<tr>
								<!-- vehicle  -->
								<td style="text-align: center;color: red;">居住证复印件</td> 
								<!-- 
								<td style="text-align: center;"> 
									 <input type="text" style="width : 300px;"  value="${vehicle.qualificationName}" 
									 name="customerOrderEntity.vehicleItemView.qualificationName" id="QualificationName_cl" > 
									 
								</td>
								 -->
								<td style="text-align: center;" id="textfielid_cl">
									<a target="_blank"
									   href=
									   "xascf/util/download.shtml?fileName=${vehicle.qualificationFileName}&url=${vehicle.qualificationUrl}">
										${vehicle.qualificationFileName}
								    </a>  
								</td>
								<td style="text-align: center;" id="textfielDate_cl">${vehicle.createTime}</td>
								<td style="text-align: center;"> 
									<div class="controls" style="width: 90px; margin-left: 0px;">
									 	<!-- 车辆行驶证复印件Pid -->
									 	<input type="hidden" value="${vehicle.qualificationPid}" di="filePid_cl"
									 	name="customerOrderEntity.vehicleItemView.qualificationPid">
										<!-- 车辆行驶证复印件上传文件名 -->
										<input type="hidden" value="${vehicle.qualificationFileName}" id="fileName_cl" 
										name="customerOrderEntity.vehicleItemView.qualificationFileName">
										<!-- 车辆行驶证复印件上传路径 -->
										<input type="hidden" value="${vehicle.qualificationUrl}" id="url_cl" 
										name="customerOrderEntity.vehicleItemView.qualificationUrl">
										<!-- 车辆行驶证复印件上传时间 -->
										<input type="hidden" value="${vehicle.createTime}" id="date_cl" 
										name="customerOrderEntity.vehicleItemView.createTime"> 
										<input type='button'  value='浏览...' id="Upload_cl" class='btn' 
										style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;"/> 
										<input type="file" name="file"  class="file" id="file_cl" size="28" style="height: 30px;width: 70px;margin-top: -3px;"
											onchange="PersonalEdit.upLoadChange('cl')" contenteditable="false" /> 
									</div>
								</td>
							</tr>
						</table>  
					</div>	 
			</div>
		</div>
		</div>
	</div>
	<div style="margin-top:3px;" class="row-fluid" align="center">
		<div class="span6 control-group full offset2" style="margin-top: 20px;">
			<div class="btn-toolbar" style="margin-left: 0px;"> 
				<a name="needDisplay" id="saveBt" class="btn btn-primary"  onclick="javascript:PersonalEdit.save();">保存</a>
				<a name="needDisplay" id="reSetBtn" class="btn btn-primary"  onclick="javascript:PersonalEdit.clear();">重置</a>
			</div>
		</div>
	</div>
</form>

<!-- 新增弹出框 --> 
<div class="row-fluid">
    <div class="win span4" id="pop_up_delay" >
        <div class="win-header">
            <span id="check_span">银行账户信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="pop_up_show_content">
        </div> 
    </div>
</div> 
<script id="pop_up_bank" type="text/x-handlebars-template"> 
	<div class="form-search" style="font-size: 13px;margin: 20px;">
		<form class="form-horizontal" id="editForm">
			<input type="hidden" value="{{rowIndex}}" name="rowIndex" > 
	 		<div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">监管机构类型：<span style="color: red;">*</span></label>
	                <div class="controls txt"> 
						<select data-placeholder="请选择" class="chzn-select span12 self-select" id="bankProperty" 
						data-required="监管机构类型不能为空!" onChange="javascript:PersonalEdit.typechange();">
							<option value=''></option>
							<option value='1'>银行</option>						
							<option value='2'>第三方支付</option>						
						</select> 
						<!--
							<slt:select  cssClass="chzn-select" name="bankProperty" optionsType="CUS_BANK_PROPERTY" >
								<slt:outHTML>id="bankProperty"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="账户属性不能为空"</slt:outHTML>
							</slt:select> -->
	                </div>
	            </div> 
			</div>  
	 		<div class="row-fluid" id="zh-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">监管账户：<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text" data-required="监管机构名称不能为空" value="{{bankNo}}" id="bankNo" >
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid" id="jg-div">
	            <div class="span10 control-group full">
	                <label class="control-label" for="">监管机构名称：<span style="color: red;">*</span></label>
	                <div class="controls txt">
	                    <input type="text"  value="{{bankName}}" id="bankName" >
	                </div>
	            </div> 
			</div> 
	 		<div class="row-fluid" id="lx-div">
	            <div class="span10 control-group full"> 
	                <label class="control-label" for="">账户类型：<span style="color: red;">*</span></label>
	                <div class="controls txt"> 
							<slt:select  cssClass="chzn-select" name="bankType" optionsType="CUS_BANKNO_TYPE">
								<slt:outHTML>id="bankType"</slt:outHTML>
								<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
								<slt:outHTML>data-required="账户类型不能为空"</slt:outHTML>
							</slt:select> 
	                </div>
	            </div> 
			</div>  
			<div class="row-fluid" id="xy-div">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">托管协议上传<span style="color: red;">*</span></label>
	                <div class="controls" style="width:250px;"> 
					  <input type="hidden" value="{{agreementUrl}}" id="agreementUrl" name="agreementUrl">
	                  <input type='text' name='agreementName' value="{{agreementName}}"   textfielid_xy
							 id='agreementName' style="height:22px; border:1px solid #cdcdcd; width:120px;" />
							<input type='button'  value='浏览...' class='btn' id='btnxy' style="background-color:#FFF; 
									border:1px solid #CDCDCD;height:24px; width:64px;"/>
							<input type="file" name="file"  class="file" id="file_xy" size="28" style="height:24px;width:64px;left: 130px;"
								onchange="PersonalEdit.upLoadMaterials('xy')" contenteditable="false"  />	
	                </div>
				</div>	
			</div>			
			<div class="row-fluid" id="qd-div">
	    		<div class="form-search-btn">
	       			<a class="btn btn-info save" href="javascript:void(0)" onclick="PersonalEdit.addBankRow()"><i class=""></i>确定</a>
	        		<a class="btn btn-info cancel" href="javascript:void(0)" onclick="PersonalEdit.canclebank()"><i class=""></i>取消</a>
	    		</div>
			</div>
		</form> 
	</div>
</script>

<div id="pop_up_show" style="display: none;"> 
   
</div>
 

 


