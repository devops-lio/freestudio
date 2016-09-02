package com.freestudio.framework.support.core.utils;

import java.io.InputStream;
import java.util.Properties;

/**
 * 读取Properties配置文件工具类
 * 
 */
public class PropertieUtils {

	private static Properties prop = new Properties();

	/**
	 * 根据文件路径设置构造方法
	 * 
	 * @param path
	 *            文件路径
	 */
	public PropertieUtils(String path) {
		try {
			InputStream is = PropertieUtils.class.getClassLoader()
					.getResourceAsStream(path);
			prop.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读取属性值，假如为空的话，则读取默认值
	 * 
	 * @param key
	 *            属性名
	 * @param defaultv
	 *            属性的默认值
	 * @return String 属性值
	 */
	public String getValue(String key, String defaultv) {
		return prop.getProperty(key, defaultv);
	}

	/**
	 * 读取属性值
	 * 
	 * @param key
	 *            属性名
	 * @return String 属性值
	 */
	public String getValue(String key) {
		return prop.getProperty(key);
	}

}
