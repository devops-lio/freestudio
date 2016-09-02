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
#innerprint .applyerInfo .tdTitle {
width: 60px;
font-size: 13px;
padding-left: 2px;
text-align: right;
padding-right: 10px;}
#innerprint .buytdTitle {
width: 40px;
font-weight: bold;
font-size: 13px;
padding-left: 2px;
text-align: center;}
#innerprint .tdContent {
width: 105px;font-size: 13px;
text-align: left;
padding-left: 5px;
}
#innerprint .buytdContent {
width: 105px;font-size: 13px;
text-align: center;
padding-left: 5px;
}
#printInnerReportForm .applyerInfo td {
line-height: 25px;
margin: 0;
padding: 0;
}
.tableDiv{
margin-top: 10px;font-weight: bold;font-size: 13px;
}
#innerprint td {
border: 1px solid #868383;
}
#innerprint .applyerInfo{
width: 100%;text-align: center;line-height: 30px;
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
    	<div class="widget-form" id="innerprint" style="border: 0">
			<form action="" id="printInnerReportForm" class="form-horizontal">
				<div id="applyerReport">
					<div style="padding-left: 50px;
padding-right: 50px;
padding-top: 10px;
padding-bottom: 60px;">
					<table class="applyerInfo" >
						<tr><td colspan="10" class="header noBorder" style="height: 60px;font-weight: bold;border-left: none;
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
							<td colspan="4" class="tblTitle" style="height: 30px;font-size: 20px;border-top: 0px;font-weight: bold;">批复内容</td>
						</tr>
						<tr>
							<td class="tdTitle">授信额度(元)</td>
							<td class="tdContent" style="padding-left: 5px;"><fmt:formatNumber type="number" pattern="#,#00.00  元" value="${resultModel.replyQuota}"/></td>
							<td class="tdTitle">账期利率(%)</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.termRate}</td>
						</tr>
						<!-- 
						<tr>
							<td class="tdTitle">授信开始日</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.creditStartTime}</td>
							<td class="tdTitle">授信结束日</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.creditEndTime}</td>
						</tr> -->
						<tr>
							<td class="tdTitle">逾期倍数</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.overdueRate}</td>
							<td class="tdTitle">保证金收取</td>
							<td class="tdContent" style="padding-left: 5px;">
							<c:if test="${resultModel.isBond=='Y'}">是</c:if>
							<c:if test="${resultModel.isBond=='N'}">否</c:if></td>
						</tr>
						<tr>
							<td class="tdTitle">产品类别</td>
							<td class="tdContent" style="padding-left: 5px;">
										<c:forEach items="${FANCING_TYPE}" var="item">
										<c:if test="${resultModel.financingType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">保证金占比(%)</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.bondRate}</td>
						</tr>
						<tr>
							<td class="tdTitle">保理类别</td>
							<td class="tdContent" style="padding-left: 5px;">
							<c:forEach items="${FANCING_FUNCTION}" var="item">
										<c:if test="${resultModel.financingMethod ==item.code }">${item.nameCn}</c:if>
										</c:forEach>
							</td>
							<td class="tdTitle">保证金额度</td>
							<td class="tdContent" style="padding-left: 5px;"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${resultModel.bondPrice}"/></td>
						</tr>
						<tr>
							<td class="tdTitle">保理方式</td>
							<td class="tdContent" style="padding-left: 5px;">
							<c:forEach items="${FANCING_KINDS}" var="item">
										<c:if test="${resultModel.financingNature ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">敞口额度</td>
							<td class="tdContent" style="padding-left: 5px;"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${resultModel.openPrice}"/></td>
						</tr>
						<tr>
							<td class="tdTitle">担保方式</td>
							<td class="tdContent" style="padding-left: 5px;">
							<c:forEach items="${GURANTEE_TYPE}" var="item">
										<c:if test="${resultModel.guaranteeType ==item.code }">${item.nameCn}</c:if>
										</c:forEach></td>
							<td class="tdTitle">手续费收取方式</td>
							<td class="tdContent" style="padding-left: 5px;"><c:if test="${resultModel.serveMethod=='TIMES'}">按次</c:if>
							<c:if test="${resultModel.serveMethod=='YEAR'}">按年</c:if></td>
						</tr>
						<tr>
							<td class="tdTitle"></td>
							<td class="tdContent"></td>
							<td class="tdTitle">手续费比例(%)</td>
							<td class="tdContent" style="padding-left: 5px;">${resultModel.serveRate}</td>
						</tr>
					</table>
					<div class="tableDiv">付款方</div>
					<table class="applyerInfo" style="width:750px">
						<tr>
							<td class="buytdTitle" style="width:456px">名称</td>
							<td class="buytdTitle" style="width:60px">票据类型</td>
							<td class="buytdTitle" style="width:120px">额度</td>
							<td class="buytdTitle" style="width:70px">票据折扣率</td>
							<td class="buytdTitle" style="width:50px">账期</td>
						</tr>
						<c:forEach items="${buyRelList}" var="item">
							<tr>
								<td class="buytdContent" style="text-align: left;">${item.buyName }</td>
								<td class="buytdContent">${item.billType}</td>
								<td class="buytdContent"><fmt:formatNumber type="currency" pattern="#,#00.00  元" value="${item.creditPercent }"/></td>
								<td class="buytdContent">${item.disCount }%</td>
								<td class="buytdContent">${item.billCycle }天</td>
							</tr>
						</c:forEach>
						
					</table>
					
					<div class="tableDiv">其他授信要求</div>
					<div style="border: 1px #868383 solid;height: 50px;word-spacing: inherit;">${resultModel.creditRemark }</div>
					<table class="applyerInfo" style="margin-top: 10px;">
						<tr>
							<td class="buytdTitle" colspan="4" style="font-size: 20px">评审委员会审议情况</td>
						</tr>
						<tr>
							<td class="buytdTitle">委员</td>
							<td class="buytdTitle">意见</td>
							<td class="buytdTitle">表决</td>
							<td class="buytdTitle">签字</td>
						</tr>
						<c:forEach items="${sugList}" var="item">
							<tr>
								<td class="buytdContent" style="width: 30px">${item.commitorName }</td>
								<td class="buytdContent">${item.replySuggestion}</td>
								<td class="buytdContent" style="width: 30px"><c:if test="${item.replyVote=='Y' }">同意</c:if>
								<c:if test="${item.replyVote=='N' }">否决</c:if>
								<c:if test="${item.replyVote=='A' }">再议</c:if>
								</td>
								<td class="buytdContent" style="width: 30px"></td>
							</tr>
						</c:forEach>
					</table>
					<table class="applyerInfo" style="margin-top: 10px;">
						<tr>
							<td class="buytdTitle" colspan="4" style="font-size: 20px">审议结果统计</td>
						</tr>
						<tr>
							<td class="buytdTitle"></td>
							<td class="buytdTitle">同意</td>
							<td class="buytdTitle">否决</td>
							<td class="buytdTitle">再议</td>
						</tr>
						<tr>
							<td class="buytdContent" >票数</td>
							<td class="buytdContent">${resultModel.passResult }</td>
							<td class="buytdContent">${resultModel.backResult }</td>
							<td class="buytdContent">${resultModel.againResult }</td>
						</tr>
						<tr>
							<td class="buytdContent">占比</td>
							<td class="buytdContent">${resultModel.passRate }%</td>
							<td class="buytdContent">${resultModel.backRate }%</td>
							<td class="buytdContent">${resultModel.gaginRate }%</td>
						</tr>
					</table>
					<table class="applyerInfo" style="margin-top: 10px;">
						<tr>
							<td class="buytdTitle" style="font-size: 20px">批复意见</td>
						</tr>
						<tr>
							<td class="buytdContent" ><div style="height: 50px;word-spacing: inherit;text-align: left">${resultModel.creditApproval }</div></td>
						</tr>
					</table>
					
				</div>
				
			</div>
			</form>
		</div>
	</div>
</div>


	</body>
</html>
