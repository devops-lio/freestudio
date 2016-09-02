package com.freestudio.framework.support.security.filter;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.freestudio.framework.support.core.utils.Debug;
import com.freestudio.framework.support.security.utils.InitConstants;
import com.freestudio.framework.support.security.utils.SpringSecurityUtils;

/**
 * security自定义多登陆/退出拦截类
 * 
 * 
 */
public class LoginUrlEntryPoint implements AuthenticationEntryPoint {

	// 默认值定义
	public static final String DEFAULT_BACK_URL = InitConstants.DEFAULT_BACK_URL;
	public static final String DEFAULT_FRONT_URL = InitConstants.DEFAULT_FRONT_URL;

	public void commence(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		if (StringUtils.isBlank(SpringSecurityUtils.getCurrentUserName())) {
			Debug.println("LoginUrlEntryPoint....");
			String targetUrl = null;
			String url = request.getRequestURI();
			if (url.contains("backcontrol")) {
				Debug.println("backcontrol....");
				// 未登录而访问后台受控资源时（或session失效），跳转到后台登录页面
				targetUrl = DEFAULT_BACK_URL;
			} else {
				Debug.println("front....");
				// 未登录而访问前台受控资源时（或session失效），跳转到前台登录页面
				targetUrl = DEFAULT_FRONT_URL;
			}
			targetUrl = request.getContextPath() + targetUrl;
			response.sendRedirect(targetUrl);
		}

	}

}
