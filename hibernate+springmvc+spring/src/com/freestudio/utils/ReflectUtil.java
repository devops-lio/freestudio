package com.freestudio.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ReflectUtil {

	private final static String FORMAT_STR = "HH:mm:ss";

	/**
	 * 返回字符串类型的日期格式
	 * 
	 * @param time
	 * @return
	 */
	public static String long2str(long time) {
		Date d = new Date(time);
		DateFormat df = new SimpleDateFormat(FORMAT_STR);

		return df.format(d);
	}

	public static void main(String[] args) {
		long l = System.currentTimeMillis();
		System.out.println(l);
		int i = (int) l;
		System.out.println(Math.abs(i));
		long l1 = (long) i;
		System.out.println(Math.abs(l1));
		String string = long2str(Math.abs(l1));
		System.out.println(string);
	}

	/**
	 * 遍历javaBean属性（byte[]数组）
	 * 
	 * @param model
	 */
	public static byte[] reflectUtil(Object model) {
		byte[] initByte = new byte[0];

		// 获取实体类的所有属性，返回Field数组
		Field[] field = model.getClass().getDeclaredFields();
		// 遍历所有属性
		for (int j = 0; j < field.length; j++) {
			// 获取属性的名字
			String name = field[j].getName();
			// 将属性的首字符大写，方便构造get，set方法
			name = name.substring(0, 1).toUpperCase() + name.substring(1);
			try {
				Method m = model.getClass().getMethod("get" + name);
				byte[] byteFromForeach = null;
				byteFromForeach = (byte[]) m.invoke(model);
				initByte = ByteUtil.byteMerger(initByte, byteFromForeach);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return initByte;
	}
}
