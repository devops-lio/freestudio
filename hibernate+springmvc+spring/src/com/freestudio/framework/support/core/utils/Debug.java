package com.freestudio.framework.support.core.utils;

/**
 * 开发调试日志输出工具
 * 
 */
public class Debug {

	public static Boolean DEBUGON = true;// 是否输出调试信息

	static {
		try {
			String path = "resources/main/init.properties";
			PropertieUtils propertieUtil = new PropertieUtils(path);
			// 获取配置信息的是否输出信息
			String debug = propertieUtil.getValue("suncco.debug");
			if (debug != null && !debug.equals("")) {
				if (debug.equals("true")) {
					DEBUGON = true;
				} else {
					DEBUGON = false;
				}
			}
		} catch (Exception e) {
			DEBUGON = false;
			e.printStackTrace();
		}
	}

	public static void println(String message) {
		if (DEBUGON) {
			System.out.println(message);
		}
	}

}
