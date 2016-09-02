<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Insert title here</title>
<script type="text/javascript" src="xascf/system/js/roleQuery.js"></script>
</head>
<body>
<div class="widget-box">
    <div class="widget-header">
        <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
    <div class="widget-body">
        <div class="widget-form">
            <div class="form-toolbar">
                <a id="queryBtn" class="btn btn-primary" href="javascript:void(0)">
                   	查询
                </a> 
                <a id="resetBtn" class="btn btn-primary" href="javascript:void(0)">
                                        重置
                </a>
            </div>
            <form class="form-horizontal fromPre" id="roleQueryForm">
                <div class="row-fluid">
                    <div class="span3 control-group full">
                        <label class="control-label" for="">角色名称</label>
                        <div class="controls txt">
                            <input type="text" name="condition.roleName" placeholder="请输入">
                            	<input type="hidden" id="systemPid" name="condition.systemPid" value="${systemPid }">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="widget-box">
    <div class="widget-header">
        <span class="widget-title"><i class="icon-list"></i>角色列表</span> <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
    </div>
    <div class="widget-body">
        <div class="widget-grid">
            <div class="grid-toolbar">
                <a id="menuAddBtn" class="btn btn-primary" href="javascript:void(0)">添加</a>
                <a id="menuEditBtn" class="btn btn-primary" href="javascript:void(0)">修改</a>
                <a id="menuDeleteBtn" class="btn btn-primary" href="javascript:void(0)">删除</a>
                <a id="menuAssignBtn" class="btn btn-primary" href="javascript:void(0)">功能权限分配</a>
            </div>
            <!-- mmGrid -->
            <table id="mmg" class="mmg">
                <tr>
                    <th rowspan="" colspan=""></th>
                </tr>
            </table>
            <div id="pg" style="text-align: right;"></div>
        </div>
    </div>
</div>

<div class="row-fluid">
    <div class="win span4" id="tabwin_add_role">
        <div class="win-header">
            <span>角色信息</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_role">
        </div>
    </div>
</div>
<div id="role-detail-template" style="display: none;">
    <div class="form-search">
	    <form class="form-horizontal" id="roleEditForm">
	        <input type="hidden" name="id" value="{{id}}">
	        <input type="hidden" name="rolePid" value="{{rolePid}}">
	        <input type="hidden" name="systemPid" value="${systemPid }">
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>角色编码</label>
	                <div class="controls txt">
	                    <input type="text" name="roleCode" value="{{roleCode}}" placeholder="请输入" data-required="此项必填">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">
	            <div class="span10 control-group full">
	                <label class="control-label" for=""><span style="color: red;">*</span>角色名称</label>
	                <div class="controls txt">
	                    <input type="text" name="roleName" value="{{roleName}}" placeholder="请输入" data-required="此项必填">
	                </div>
	            </div>
	        </div>
	        <div class="row-fluid">    
	            <div class="span10 control-group full">
	                <label class="control-label" for="">角色描述</label>
	                <div class="controls txt">
	                    <input type="text" name="description" value="{{description}}" placeholder="请输入">
	                </div>
	            </div>
	        </div>
	    </form>
	    <div class="form-search-btn">
	        <a class="btn btn-primary save" href="javascript:void(0)">保存</a>
	        <a class="btn btn-primary cancel" href="javascript:void(0)">取消</a>
	    </div>
	</div>
</div>

<div class="row-fluid">
    <div class="win span5" id="tabwin_add_menu">
        <div class="win-header">
            <span>角色功能权限分配</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_menu">
        </div>
    </div>
</div>

<div class="row-fluid">
    <div class="win span7" id="tabwin_add_node">
        <div class="win-header">
            <span>流程节点配置</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="tabwin_add_content_node">
        </div>
    </div>
</div>
</body>
</html>