<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Insert title here</title>
<script type="text/javascript" src="xascf/customer/js/customerUser.js"></script>
</head>
<body>
<div class="form-search">
    <form id="customerUserForm">
        <input type="hidden" name="memberPid" value="${memberPid }">
        <input type="hidden" name="customerType" value="${customerType }">
        <div class="row-fluid">
            <div class="span4">
                <div class="widget-box">
                    <div class="widget-header">
                        <span class="widget-title">可分配用户</span> 
                    </div>
                    <div class="widget-body" style="overflow-y:scroll;height: 320px;">
                        <div class="widget-form" style="height: 300px;" id="unassignedUserListDiv">
                            <c:forEach items="${unassignedUserList}" var="userItem">
                                <div class="row-fluid">
						            <div class="span12 control-group full">
						                <label class="checkbox" >
						                   <input type="checkbox" name="unassignedUser" value="${userItem.userPid }" data-text="${userItem.userNameCn}">${userItem.userNameCn}
						                </label>
						            </div>
                                </div>
					        </c:forEach>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span4">
                <div style="padding: 88px 25px;">
	                <div class="row-fluid">
	                    <a id="customerUserAddBtn" class="btn btn-info btn-block" href="javascript:void(0)">添加&gt;</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="customerUserAddAllBtn" class="btn btn-info btn-block" href="javascript:void(0)">全部添加&gt;&gt;</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="customerUserRemoveBtn" class="btn btn-info btn-block" href="javascript:void(0)">&lt;移除</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="customerUserRemoveAllBtn" class="btn btn-info btn-block" href="javascript:void(0)">&lt;&lt;全部移除</a>
	                </div>
                </div>
            </div>
            <div class="span4">
                <div class="widget-box">
                    <div class="widget-header">
                        <span class="widget-title">已分配用户</span> 
                    </div>
                    <div class="widget-body" style="overflow-y:scroll;height: 330px;">
                        <div class="widget-form" style="height: 300px;" id="assignedUserListDiv">
                            <c:forEach items="${assignedUserList}" var="userItem">
                                <div class="row-fluid">
                                    <div class="span12 control-group full">
                                        <label class="checkbox" >
                                            <input type="hidden" name="assignedUserPidList" value="${userItem.userPid }">
                                            <input type="checkbox" name="assignedUser" value="${userItem.userPid }" data-text="${userItem.userNameCn}">${userItem.userNameCn}
                                        </label>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div class="form-search-btn">
        <a id="customerUserSaveBtn" class="btn btn-primary" href="javascript:void(0)">保存</a>
        <a id="customerUserCancelBtn" class="btn btn-primary" href="javascript:void(0)">取消</a>
    </div>
</div>
</body>
</html>