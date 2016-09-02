package com.freestudio.framework.support.security.utils;

import com.freestudio.framework.support.core.utils.PropertieUtils;

/**
 * 系统初始化参数设置
 * 
 * 
 */
public class InitConstants {

	public static String DEFAULT_FRONT_URL = "/";// 前台失败跳转url
	public static String DEFAULT_BACK_URL = "/backcontrol/main/logout";// 后台失败跳转url

	public static Long ID_SUPERVISOR = 1l;// 超级管理员ID

	static {
		try {
			String path = "resources/main/init.properties";
			PropertieUtils propertieUtil = new PropertieUtils(path);
			// 获取前后台session失效跳转的URL值
			String backurl = propertieUtil.getValue("suncco.session.backurl");
			String fronturl = propertieUtil.getValue("suncco.session.fronturl");
			if (fronturl != null && !fronturl.equals("")) {
				DEFAULT_FRONT_URL = fronturl;
			}
			if (backurl != null && !backurl.equals("")) {
				DEFAULT_BACK_URL = backurl;
			}

			String supervisorId = propertieUtil
					.getValue("suncco.supervisor.id");
			if (supervisorId != null && !supervisorId.equals("")) {
				ID_SUPERVISOR = Long.valueOf(supervisorId);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
