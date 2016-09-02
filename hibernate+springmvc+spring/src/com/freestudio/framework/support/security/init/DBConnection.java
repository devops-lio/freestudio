package com.freestudio.framework.support.security.init;

import java.sql.Connection;
import java.sql.DriverManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.freestudio.framework.support.core.utils.encode.MessageDigestUtils;

/**
 * 数据库连接工具类
 * 
 * 
 */
public class DBConnection {

	private static Logger logger = LoggerFactory.getLogger(DBConnection.class);

	private static String driver = DBProperties.readValue("jdbc.driver");
	private static String url = DBProperties.readValue("jdbc.url");
	private static String user = DBProperties.readValue("jdbc.username");
	private static String password = DBProperties.readValue("jdbc.password");
	private static Connection conn;

	public static Connection getDBConnection() {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager.getConnection(url,
					MessageDigestUtils.encode(user),
					MessageDigestUtils.encode(password));
		} catch (Exception e) {
			logger.error("连接数据库出错!" + e.getMessage());
			e.printStackTrace();
		}
		return conn;
	}

	public static Connection getConnection() {
		return conn;
	}

}
