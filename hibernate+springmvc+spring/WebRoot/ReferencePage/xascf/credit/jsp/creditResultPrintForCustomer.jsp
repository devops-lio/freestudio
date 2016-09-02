<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>	
<%@ taglib uri="/pui-tag" prefix="slt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<!DOCTYPE html>
<html>
	<head>
		<%@ include file="/xascf/common_xascf.jsp" %>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>首页</title>
<link rel="stylesheet" type="text/css" href="xascf/risk/style/evaluateReport.css?v=20150808">
	</head>
	<style>
td{border:1px solid #e4e4e4}
#applyerReport{
width: 850px;
margin: 0 auto;
background: white;
}
#print td {
border: 1px solid #868383;
}
#print .tdContent {
width: 105px;font-size: 13px;
text-align: left;
padding-left: 5px;
}
#print .applyerInfo .tdTitle {
width: 60px;
font-size: 14px;
padding-left: 2px;
text-align: right;
padding-right: 10px;}
.buytdTitle {
width: 60px;
font-weight: bold;
font-size: 14px;
padding-left: 2px;
text-align: center;}
#print .buytdContent {
text-align: center;
padding-left: 5px;
}
#print .applyerInfo{
width: 100%;text-align: center;
line-height: 30px;
}
</style>
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
	<body>
<div class="widget-box" style="border: 0">
    <div class="widget-body" style="border: 0">
    	<div class="widget-form" id="print" style="border: 0">
			<form action="" id="evaluateReportForm" class="form-horizontal">
				<div id="applyerReport">
					<div style="padding-left: 50px;
padding-right: 50px;
padding-top: 20px;
padding-bottom: 60px;">
					<table class="applyerInfo" >
						<tr><td colspan="10" class="header noBorder" style="height: 90px;font-weight: bold;border-left: none;
border-top: none;
border-right: none;
font-size: 30px">授信批复</td></tr>
						<tr>
							<td class="noBorder" style="padding-left: 5px;font-size: 12px;text-align: left;">客户名称：</td>
							<td class="noBorder"  style="width: 30%;font-size: 12px;">${creditItem.memberName}</td>
							<td class="noBorder" style="text-align: right;font-size: 12px;">客户经理：</td>
							<td class="noBorder"  style="width: 13%;font-size: 12px;">${creditItem.userNameCn}</td>
							<td class="noBorder" style="text-align: right;font-size: 12px;">审核：</td>
							<td class="noBorder"  style="width: 13%;font-size: 12px;">${userName}</td>
							<td class="noBorder" style="text-align: right;font-size: 12px;">日期：</td>
							<td class="noBorder"  style="width: 13%;font-size: 12px;">${dateStr}</td>
						</tr>
					</table>
					<table class="applyerInfo" >
						<tr>
							<td colspan="4" class="tblTitle" style="height: 45px;font-size: 20px;border-top: 0px;font-weight: bold;">批复内容</td>
						</tr>
						<tr>
							<td class="tdTitle">授信额度(元)</td>
							<td class="tdContent"><fmt:formatNumber type="number" pattern="#,#00.00元" value="${resultModel.replyQuota}"/></td>
							<td class="tdTitle">账期利率(%)</td>
							<td class="tdContent">${resultModel.termRate}</td>
						</tr>
						<!-- 
						<tr>
							<td class="tdTitle">授信开始日</td>
							<td class="tdContent">${resultModel.creditStartTime}</td>
							<td class="tdTitle">授信结束日</td>
							<td class="tdContent">${resultModel.creditEndTime}</td>
						</tr> -->
						<tr>
							<td class="tdTitle">逾期倍数</td>
							<td class="tdContent">${resultModel.overdueRate}</td>
							<td class="tdTitle">保证金收取</td>
							<td class="tdContent">
							<c:if test="${resultModel.isBond=='Y'}">是</c:if>
							<c:if test="${resultModel.isBond=='N'}">否</c:if></td>
						</tr>
						<tr>
							<td class="tdTitle">产品类别</td>
							<td class="tdContent">
										<c:forEach items="${FANCING_TYPE}" var="item">
										<c:if test="${resultModel.financingType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">保证金占比(%)</td>
							<td class="tdContent">${resultModel.bondRate}</td>
						</tr>
						<tr>
							<td class="tdTitle">保理类别</td>
							<td class="tdContent">
							<c:forEach items="${FANCING_FUNCTION}" var="item">
										<c:if test="${resultModel.financingMethod ==item.code }">${item.nameCn}</c:if>
										</c:forEach>
							</td>
							<td class="tdTitle">保证金额度(元)</td>
							<td class="tdContent"><fmt:formatNumber type="currency" pattern="#,#00.00元" value="${resultModel.bondPrice}"/></td>
						</tr>
						<tr>
							<td class="tdTitle">保理方式</td>
							<td class="tdContent">
							<c:forEach items="${FANCING_KINDS}" var="item">
										<c:if test="${resultModel.financingNature ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">敞口额度(元)</td>
							<td class="tdContent"><fmt:formatNumber type="currency" pattern="#,#00.00元" value="${resultModel.openPrice}"/></td>
						</tr>
						<tr>
							<td class="tdTitle">担保方式</td>
							<td class="tdContent">
							<c:forEach items="${GURANTEE_TYPE}" var="item">
										<c:if test="${resultModel.guaranteeType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">手续费收取方式</td>
							<td class="tdContent"><c:if test="${resultModel.serveMethod=='TIMES'}">按次</c:if>
							<c:if test="${resultModel.serveMethod=='YEAR'}">按年</c:if></td>
						</tr>
						<tr>
							<td class="tdTitle"></td>
							<td class="tdContent"></td>
							<td class="tdTitle">手续费比例(%)</td>
							<td class="tdContent">${resultModel.serveRate}</td>
						</tr>
					</table>
					<div style="margin-top: 20px;font-weight: bold;font-size: 18px;">付款方</div>
					<table class="applyerInfo" style="width:750px">
						<tr>
							<td class="buytdTitle" style="width:270px">名称</td>
							<td class="buytdTitle" style="width:60px">票据类型</td>
							<td class="buytdTitle" style="width:120px">额度</td>
							<td class="buytdTitle" style="width:70px">票据折扣率</td>
							<td class="buytdTitle" style="width:50px">账期</td>
						</tr>
						<c:forEach items="${buyRelList}" var="item">
							<tr>
								<td class="buytdContent" style="text-align: left;">${item.buyName }</td>
								<td class="buytdContent" width="40px">${item.billType}</td>
								<td class="buytdContent"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${item.creditPercent }"/></td>
								<td class="buytdContent">${item.disCount }%</td>
								<td class="buytdContent">${item.billCycle }天</td>
							</tr>
						</c:forEach>
						
					</table>
					<div style="margin-top: 20px;font-weight: bold;font-size: 18px;">其他授信要求</div>
					<div style="border: 1px #868383 solid;height: 100px">${resultModel.creditRemark }</div>
					<div style="margin-top: 5px;text-align: right;font-size: 12px;"><span style="margin-right: 125px;">签字：</span>
					<span style="margin-right: 105px;">日期：</span></div>
				</div>
				
			</div>
			</form>
		</div>
	</div>
</div>


	</body>
</html>
