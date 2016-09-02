<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Insert title here</title>
<script type="text/javascript" src="xascf/system/js/userSystem.js"></script>
</head>
<body>
<div class="form-search">
    <form id="userSystemForm">
        <input type="hidden" name="userPid" value="${userPid }">
        <div class="row-fluid">
            <div class="span4">
                <div class="widget-box">
                    <div class="widget-header">
                        <span class="widget-title">可分配系统</span> 
                    </div>
                    <div class="widget-body">
                        <div class="widget-form" style="height: 300px;" id="unassignedSystemListDiv">
                            <c:forEach items="${unassignedSystemList}" var="systemModel">
                                <div class="row-fluid">
						            <div class="span12 control-group full">
						                <label class="checkbox" >
						                   <input type="checkbox" name="unassignedSystem" value="${systemModel.systemPid }" data-text="${systemModel.systemName}">${systemModel.systemName}
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
	                    <a id="userSystemAddBtn" class="btn btn-info btn-block" href="javascript:void(0)">添加&gt;</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="userSystemAddAllBtn" class="btn btn-info btn-block" href="javascript:void(0)">全部添加&gt;&gt;</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="userSystemRemoveBtn" class="btn btn-info btn-block" href="javascript:void(0)">&lt;移除</a>
	                </div>
	                <br />
	                <div class="row-fluid">
	                    <a id="userSystemRemoveAllBtn" class="btn btn-info btn-block" href="javascript:void(0)">&lt;&lt;全部移除</a>
	                </div>
                </div>
            </div>
            <div class="span4">
                <div class="widget-box">
                    <div class="widget-header">
                        <span class="widget-title">已分配系统</span> 
                    </div>
                    <div class="widget-body">
                        <div class="widget-form" style="height: 300px;" id="assignedSystemListDiv">
                            <c:forEach items="${assignedSystemList}" var="systemModel">
                                <div class="row-fluid">
                                    <div class="span12 control-group full">
                                        <label class="checkbox" >
                                            <input type="hidden" name="assignedSystemPidList" value="${systemModel.systemPid }">
                                            <input type="checkbox" name="assignedSystem" value="${systemModel.systemPid }" data-text="${systemModel.systemName}">${systemModel.systemName}
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
        <a id="userSystemSaveBtn" class="btn btn-primary" href="javascript:void(0)">保存</a>
        <a id="userSystemCancelBtn" class="btn btn-primary" href="javascript:void(0)">取消</a>
    </div>
</div>
</body>
</html>