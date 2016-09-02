<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<style>
.widget-box .checkBoxInput {
	margin-bottom: 7px;
	margin-right: 7px;
}

.lblTitle {
	border-bottom: 1px dashed #999;
	line-height: 35px;
	margin-bottom: 15px;
}
.details {
	margin-top: 3px;
	color: blue;
	font-size: 12px;
}
.lblTitle span {
	font-size: 14px;
	font-weight: bold;
	margin-left: 15px;
}

.tdTittl {
	background-attachment: scroll;
	background-color: #f3f3f3;
	background-image: linear-gradient(to bottom, #f8f8f8, #ececec);
	background-position: 0 0;
	background-repeat: repeat-x;
	font-size: 13px;
	font-weight: bold;
	text-align: center;
}

.materialInfoTr td {
	font-size: 12px;
	padding: 5px;
	vertical-align: middle;
}

.table th,.table td {
	padding: 3px;
}
#showInfo .control-label{
width:110px;
}
</style>
<form class="form-horizontal editFormPre" id="showInfo">
<div class="widget-box">  
	   <div class="widget-body" >
	   		<div class="widget-main padding-6" style="margin-top:10px;margin-left: 0px;">  
					 	<!-- 会员详细信息Pid -->	
						<input type="hidden" id="memberPid"  	value="${comInModel.memberPid}" />  
						<div class="row-fluid">
							<div class="span4 control-group full ">
								<label class="control-label" for="">会员编号：</label>
								<div class="controls details">${comInModel.memberNo}</div>
							</div>
							<div class="span4 control-group full ">
								<label class="control-label" for="">公司名称：</label>
								<div class="controls details">${companymodel.customerName}</div>
							</div>
							<div class="span4 control-group full ">
								<label class="control-label" for="">公司法人：</label>
								<div class="controls details">${companymodel.corporate}</div>
						</div>
							
							
						</div>
						<div class="row-fluid" >
							<div class="span4 control-group full ">
								<label class="control-label" for="">营业执照编码：</label>
								<div class="controls details">${companymodel.businesslicenseno}</div>
							</div>	 
							<div class="span4 control-group full ">
									<label class="control-label" for="">组织机构代码：</label>
									<div class="controls details">${companymodel.organizationCode}</div>
							</div>
							<div class="span4 control-group full ">
								<label class="control-label" for="">税务登记号：</label>
								<div class="controls details">${companymodel.taxNo}</div>
							</div>	
							
						</div>  
						<div class="row-fluid" >
							<div class="span4 control-group full ">
								<label class="control-label" for="">注册资金(万元)：</label>
								<div class="controls details"><fmt:formatNumber type="currency" pattern="#,#0" value="${companymodel.registeredFund}"/></div>
							</div>
							<div class="span4 control-group full ">
								<label class="control-label" for="">注册时间：</label>
								<div class="controls details">${companymodel.registeredTime}</div>
							</div>	 
							<div class="span4 control-group full ">
								<label class="control-label" for="">联系电话：</label>
								<div class="controls details">${companymodel.tel}</div>
							</div>
						</div>  
						<div class="row-fluid" >	
							<div class="span4 control-group full ">
								<label class="control-label" for="">公司传真：</label>
								<div class="controls details">${companymodel.fax}</div>
							</div>
							<div class="span4 control-group full">
							<label class="control-label">公司邮箱：</label>
							<div class="controls details">${companymodel.email}</div>
							</div> 
							<div class="span4 control-group full ">
								<label class="control-label" for="">主营业务：</label>
								<div class="controls details">${companymodel.mainbusiness}</div>
							</div>  
						</div>  
						<div class="row-fluid" >	 
							<div class="span4 control-group full ">
								<label class="control-label" for="">类别：</label>
								<div class="controls details">${companymodel.businessScope}</div>
							</div>
							<div class="span4 control-group full">
								<label class="control-label">
									公司办公地址：
								</label>
								<div class="controls details" style="width: 225px;text-align: left;">${companymodel.officeAddress}</div>
							</div> 
						</div>
						<div style="margin-top:3px;" class="row-fluid" align="center">
							<div class="span10 control-group full">
							<label class="control-label">
								公司概要：</label>
								<div class="controls details" style="width: 568px;word-wrap: break-word;text-align: left;">${companymodel.remark}
								</div>
							</div>	
						</div> 
					 
				</div>   
			</div> 
		</div>	
		<div class="row-fluid offset5"
					style="margin-top: 10px;margin-bottom: 10px;width: 50%">
					<a class="btn btn-primary" href="javascript:void(0)" onclick="customerDetailPop.buyerPopClose()"><i class=""></i>关闭</a>
			</div>
</form>