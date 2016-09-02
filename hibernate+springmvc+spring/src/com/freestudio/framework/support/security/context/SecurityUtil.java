package com.freestudio.framework.support.security.context;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;

import com.freestudio.framework.support.security.model.UserInfo;
import com.freestudio.framework.support.security.utils.SpringSecurityUtils;

/**
 * WEB站点Security工具类
 * 
 * 
 */
public class SecurityUtil {

	public static Map<String, List<Long>> resourceMap = new HashMap<String, List<Long>>();

	/**
	 * 得到登陆者实体
	 * 
	 * @return
	 */
	public static UserInfo getUserInfo() {
		return (UserInfo) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
	}

	/**
	 * 得到管理员登录名称
	 * 
	 * @return
	 */
	public static String getLoginName() {
		return SpringSecurityUtils.getCurrentUserName();
	}

	/**
	 * 得到用户的登录IP
	 * 
	 * @return
	 */
	public static String getUserIp() {
		return SpringSecurityUtils.getCurrentUserIp();
	}

	/**
	 * 得到登陆用户的资源信息,装载进Map对象中
	 * 
	 * @return
	 */
	public static Map<String, List<Long>> getResourceMap() {
		return resourceMap;
	}

}
