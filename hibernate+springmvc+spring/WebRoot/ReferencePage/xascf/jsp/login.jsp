<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html >
<html>
    <head>
        <%@ include file="/xascf/common_xascf.jsp" %>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>登录</title> 
        <link rel="stylesheet" type="text/css" href="xascf/style/login.css">
        <script type="text/javascript" src="xascf/js/login.js"></script>
        <style type="text/css">

        </style>
    </head>
    <body>
    	<div class="pg-container">
    		<div class="space40"></div>
    		 <div class="top"></div>
    		<!-- <div style="font-size: 30px;font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应链金融产品管理系统</div>
    		--><div class="space10"></div>
    		<div class="contentbg">
    			<div class="content">
					<div class="login-div"> 
			            <div class="form-signin">
			            	<img src="./xascf/images/logo2.png" style="position: absolute; top: -50px; left: 140px;"></img>
			            	<div class="space50"></div>
			                <fieldset >
			                    <label>
			                        <span class="block" id="alert_msg">
			                        </span>
			                    </label>
			                    <label>
			                        <span class="block input-icon input-icon-right">
			                            <input type="hidden" id="errorMsg" class="input-block-level" value="${errorMsg}">
			                        </span>
			                    </label>
			                    <div style="position:relative;">
			                    	<label class="user"></label>
			                    	<label class="arrowright"></label>
			                    	<input id="loginname" type="text" name="condition.loginName" class="txt_field" placeholder="登录账号" value="${condition.loginName}">
			                    </div>
			                    <div class="space20"></div>
			                    <div style="position:relative;">
			                    	<label class="pwd"></label>
			                    	<label class="arrowright"></label>
			                    	<input id="loginpwd" type="password" name="condition.loginPwd" class="txt_field" placeholder="登录密码" value="${condition.loginPwd}">
			                    </div>
			                    <div class="space20"></div>
								<div style="position:relative;">
									<input id="verifyCode" type="text" name="verifyCode" class="txt_field" style="width:135px;padding-left:4px;" placeholder="验证码">
									<img id="authImg" src="xascf/common/securityCode.shtml" alt="看不清，换一张" title="验证码" onclick="Login.refreshcode()" style="top:0;position:absolute;right:8px;"
			                        	href="javascript:void(0);"/>
								</div>
								<div class="space20"></div>
			                    <div class="clearfix">    
			                        <a onclick="Login.login()" class="loginBtn" id="login_btn"></a>
			                    </div>
			                    <div class="space-4" style="height:20px;"></div>
			                </fieldset>
						</div>
			            <form id="loginForm" style="display: none;" action="xascf/common/login.shtml" method="post" >
				        	<input type="hidden" name="userName" id="loginName2">
				            <input type="hidden" name="password" id="password2">
				            <input type="hidden" name="securitycode" id="verifyCode2">
			            </form>
			       </div>
    			</div>	
    		</div>
    	</div>
    </body>
</html>