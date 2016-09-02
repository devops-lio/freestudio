<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script  type="text/javascript" src="xascf/js/top.js"></script>
<div class="navbar">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="brand" href="#">
                <small>自由工作室保理后端管理系统</small>
            </a>
            <div class="nav-collapse collapse">
                <ul class="nav erp-nav pull-right">
                    <li>
                        <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                            <span id="loginUser" class="user-info">${sessionScope["loggedin.user.session.id"].userName}</span>
                            <i class="icon-caret-down"></i>
                        </a>
                        <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer">
                            <li>
                                <a id="changePasswordBtn" href="javascript:void(0);">
                                    <i class="icon-key"></i>修改密码
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>    
                                <a id="logoutBtn" href="javascript:void(0)">
                                    <i class="icon-off"></i>退出
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>