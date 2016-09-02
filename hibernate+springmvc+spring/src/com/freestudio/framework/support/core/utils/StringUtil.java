package com.freestudio.framework.support.core.utils;

import java.util.StringTokenizer;

/**
 * 字符串工具类
 * 
 */
public class StringUtil {

	/**
	 * 单词开头字母小写变大写
	 * 
	 * @param strSource
	 * @return
	 */
	public static String wordFrontUpperToLower(String strSource) {
		String strResult = "";
		String pe;
		char ch[];
		StringTokenizer st = new StringTokenizer(strSource);

		int count = 0;
		while (st.hasMoreTokens()) {
			pe = st.nextToken();
			ch = pe.toCharArray();
			if (ch[0] >= 'a' && ch[0] < 'z') {
				ch[0] = (char) (ch[0] - 32);
			}
			String s = new String(ch);
			if (count == 0) {
				strResult = strResult + s;
			} else {
				strResult = strResult + " " + s;
			}
			count++;
		}
		return strResult;
	}

	/**
	 * 单词开头字母大写写变小写
	 * 
	 * @param strSource
	 * @return
	 */
	public static String wordFrontLowerToUpper(String strSource) {
		String strResult = "";
		String pe;
		char ch[];
		StringTokenizer st = new StringTokenizer(strSource);
		while (st.hasMoreTokens()) {
			pe = st.nextToken();
			ch = pe.toCharArray();
			if (ch[0] >= 'A' && ch[0] < 'Z') {
				ch[0] = (char) (ch[0] + 32);
			}
			String s = new String(ch);
			strResult = strResult + " " + s;
		}
		return strResult;
	}

	/**
	 * 参数代替{0},{1}
	 * 
	 * @param strSource
	 * @param args
	 * @return
	 */
	public static String replaceArgs(String strSource, String... args) {
		for (int i = 0; i < args.length; i++) {
			strSource = strSource.replace("{0}", args[i]);
		}
		return strSource;
	}

	public static String substring(String str, int length) throws Exception {
		byte[] bytes = str.getBytes("Unicode");
		int n = 0; // 表示当前的字节数
		int i = 2; // 要截取的字节数，从第3个字节开始
		for (; i < bytes.length && n < length; i++) {
			// 奇数位置，如3、5、7等，为UCS2编码中两个字节的第二个字节
			if (i % 2 == 1) {
				n++;// 在UCS2第二个字节时n加1
			} else {
				// 当UCS2编码的第一个字节不等于0时，该UCS2字符为汉字，一个汉字算两个字节
				if (bytes[i] != 0) {
					n++;
				}
			}
		}
		// 如果i为奇数时，处理成偶数
		if (i % 2 == 1) {
			// 该UCS2字符是汉字时，去掉这个截一半的汉字
			if (bytes[i - 1] != 0) {
				i = i - 1;
			} else {
				// 该UCS2字符是字母或数字，则保留该字符
				i = i + 1;
			}
		}
		if (i > length) {
			return new String(bytes, 0, i, "Unicode") + "...";
		} else {
			return new String(bytes, 0, i, "Unicode");
		}
	}

	/**
	 * html代码转换
	 * 
	 * @param str
	 * @return
	 */
	public static String htmlSpecialchars(String str) {
		str = str.replaceAll("&", "&amp;");
		str = str.replaceAll("<", "&lt;");
		str = str.replaceAll(">", "&gt;");
		str = str.replaceAll("\"", "&quot;");
		return str;
	}

}
