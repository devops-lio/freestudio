package com.freestudio.framework.support.security.init;

import java.io.IOException;
import java.util.Properties;

import com.freestudio.framework.support.core.utils.Debug;

/**
 * JDBC配置文件读取工具类
 * 
 * 
 */
public class DBProperties {

	private static Properties properties = new Properties();

	static {
		try {
			properties.load(DBProperties.class.getClassLoader()
					.getResourceAsStream(
							"resources/main/application.properties"));
		} catch (IOException e) {
			Debug.println("application.properties文件失败，文件不存在或者路径不正确！"
					+ e.getMessage());
			e.printStackTrace();
		}
	}

	public static String readValue(String key) {
		return (String) properties.get(key);
	}

}
