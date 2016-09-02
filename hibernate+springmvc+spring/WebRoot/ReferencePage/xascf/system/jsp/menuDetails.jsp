<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%
    boolean inserting = (Boolean)request.getAttribute("inserting");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Insert title here</title>
</head>
<body>
<form>
<div class="row-fluid">
    <div class="widget-box" style="margin: -1px -1px 0 0;" style="height: 500px; ">
        <div class="widget-header">
            <span class="widget-title"><i class="icon-edit"></i>
            	<c:if test="${not empty menuResourceItem.resourcePid}">修改菜单信息</c:if>
            	<c:if test="${empty menuResourceItem.resourcePid}">新增菜单信息</c:if>
            </span>
        </div>
        <div class="widget-body">
            <div class="widget-form">
                <div class="form-horizontal">
                    <input type="hidden" name="resourcePid" value="${menuResourceItem.resourcePid }">
                    <input type="hidden" name="menuPid" value="${menuResourceItem.menuPid }">
                    <input type="hidden" name="id" value="${menuResourceItem.id }">
                    <input type="hidden" name="systemPid" value="${menuResourceItem.systemPid }">
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">菜单名称<span style="color: red;">*</span></label>
                            <div class="controls txt">
                                <input type="text" name="menuName" value="${menuResourceItem.menuName }"
                                    data-required="菜单名称不能为空">
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">菜单编码<span style="color: red;">*</span></label>
                            <div class="controls txt">
                                <input type="text" name="resourceCode" value="${menuResourceItem.resourceCode }"
                                    data-required="菜单名称不能为空">
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">序号<span style="color: red;">*</span></label>
                            <div class="controls txt">
                                <input type="text" name="orderNo" value="${menuResourceItem.orderNo }" data-required="序号不能为空">
                            </div>
                        </div>
                    </div>         
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">菜单图标</label>
                            <div class="controls txt">
                                <input type="text" name="iconClass" value="${menuResourceItem.iconClass }">
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">菜单链接</label>
                            <div class="controls txt">
                                <input type="text" name="url" value="${menuResourceItem.url }">
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12 control-group full">
                            <label class="control-label" for="">父项</label>
                          
                            <div class="controls">
                    		<c:if test="${not empty menuResourceItem.resourcePid}">
                                <select data-placeholder="请选择..." class="chzn-select span12 self-select" name="resourceParentPid">
                                    <c:forEach var="menu" items="${menuList}">
                                    <option value="${menu.resourcePid}" ${menuResourceItem.resourceParentPid == menu.resourcePid ? "selected" : "" }>${menu.resourceName}</option>
                                    </c:forEach>
                                </select>
                    		</c:if>
                    		<c:if test="${empty menuResourceItem.resourcePid}">
                                <input type="hidden" name="resourceParentPid" value="${menuResourceItem.resourceParentPid}">
                                <c:forEach var="menu" items="${menuList}">
                                    ${menuResourceItem.resourceParentPid == menu.resourcePid ? menu.resourceName : "" }
                                </c:forEach>
                    		</c:if>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-search-btn" style="margin-top:5px;">
                    <a id="menuDetailsSaveBtn" class="btn btn-primary" href="javascript:void(0);">保存</a>
                    <c:if test="${not empty menuResourceItem.resourcePid}">
                    	<a id="menuDetailsAddChildrenBtn" class="btn btn-primary" href="javascript:void(0);">增加子项</a>
                    </c:if>
                    <c:if test="${empty menuResourceItem.resourcePid}">
                    	<a id="menuDetailsBackBtn" class="btn btn-primary" href="javascript:void(0);">返回编辑父项</a>
                    </c:if>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
<script type="text/javascript" src="xascf/system/js/menuDetails.js"></script>
</body>
</html>