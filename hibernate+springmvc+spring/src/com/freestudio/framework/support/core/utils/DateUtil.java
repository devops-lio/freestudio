package com.freestudio.framework.support.core.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 日期工具类
 * 
 */
public class DateUtil {

	public static String DATE_PATTERN_01 = "yyyy-MM-dd HH:mm:ss";
	public static String DATE_PATTERN_02 = "yyyy-MM-dd";
	public static String DATE_PATTERN_03 = "yyyy年MM月dd日";
	public static String DATE_PATTERN_04 = "MM月dd日";
	public static String DATE_PATTERN_05 = "yyyy-MM-dd-HH-mm";
	public static String DATE_PATTERN_06 = "yyyy-MM";

	/**
	 * 根据传入日期返回日期字符串
	 * 
	 * @param date
	 *            日期参数
	 * @return 格式化的日期字符串
	 */
	public static String DateToString(Date date) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
				DATE_PATTERN_02);
		return simpleDateFormat.format(date);
	}

	/**
	 * 根据传入日期返回日期字符串
	 * 
	 * @param date
	 *            日期参数
	 * @param pattern
	 *            格式化类型
	 * @return 格式化的日期字符串
	 */
	public static String DateToString(Date date, String pattern) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		return simpleDateFormat.format(date);
	}

	/**
	 * Timestamp转化为String
	 * 
	 * @param time
	 * @return
	 */
	public static String DateToString(Timestamp time) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = "";
		strDate = format.format(time);
		return strDate;
	}

	/**
	 * String转化为Date
	 * 
	 * @param Time
	 * @return
	 */
	public static Date StringToDate(String dateStr) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_PATTERN_01);
		Date date = null;
		try {
			date = format.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 根据传入日期字符串返回日期
	 * 
	 * @param dateStr
	 *            日期字符串参数
	 * @param pattern
	 *            格式化类型
	 * @return 格式化的日期
	 */
	public static Date StringToDate(String dateStr, String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		Date date = null;
		try {
			date = format.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * String转化为Timestamp
	 * 
	 * @param Time
	 * @return
	 */
	public static Timestamp StringToTimestamp(String timeStr) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_PATTERN_01);
		Date time = null;
		try {
			time = format.parse(timeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Timestamp ts = new Timestamp(time.getTime());
		return ts;
	}

	public static String getNowTime() {
		// 获得系统时间
		Date date = new Date();
		// 将时间格式转换成符合Timestamp要求的格式
		String nowTime = new SimpleDateFormat(DATE_PATTERN_04).format(date);
		return nowTime;
	}

	public static String getSystemTime() {
		// 获得系统时间
		Date date = new Date();
		String systemTime = new SimpleDateFormat(DATE_PATTERN_01).format(date);
		return systemTime;
	}

	/**
	 * 判断日期格式是否正确
	 * 
	 * @param date
	 *            要判断的日期
	 * @return
	 */
	public static boolean valid(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_PATTERN_02);
		String strDate = format.format(date);
		try {
			Date newDate = (Date) format.parse(strDate);
			return strDate.equals(format.format(newDate));
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 正则验证字符串是否为Date类型
	 * 
	 * @param content
	 *            字符串
	 * @return
	 */
	public static boolean isDate(String strDate) {
		boolean result = false;
		String datePattern = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";
		// String he =
		// "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)";
		Pattern pattern = Pattern.compile(datePattern);
		Matcher matcher = pattern.matcher(strDate);
		result = matcher.matches();
		return result;
	}

	public static String getBeforeOneDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - 1);
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String beforeOneDate = dft.format(calendar.getTime());
		return beforeOneDate;
	}

	public static String getBeforeTwoDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - 2);
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String beforeTwoDate = dft.format(calendar.getTime());
		return beforeTwoDate;
	}

	public static long DateToLong(String dateStr) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = sdf.parse(dateStr);
		return date.getTime();
	}

	/**
	 * 日期转化时间戳
	 * 
	 * @param dateStr
	 *            yyyy/MM/dd HH:mm:ss
	 * @return
	 * @throws ParseException
	 */
	public long getTimestamp(String dateStr) throws ParseException {

		Date date1 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(dateStr);
		Date date2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss")
				.parse("1970/01/01 08:00:00");
		long l = date1.getTime() - date2.getTime() > 0 ? date1.getTime()
				- date2.getTime() : date2.getTime() - date1.getTime();
		long rand = (int) (Math.random() * 1000);
		return rand;
	}

	/**
	 * 计算两个日期时间差
	 * 
	 * @param accessTime
	 * @param date
	 */
	public static int getHourDifference(Date accessTime, Date date) {
		long total_minute = 0;
		int hour;
		total_minute = (date.getTime() - accessTime.getTime()) / (1000 * 60);
		hour = (int) total_minute / 60;
		return hour;
	}

	/**
	 * 计算两个日期分钟差
	 * 
	 * @param accessTime
	 * @param date
	 */
	public static Long getMinuteDifference(Date accessTime, Date date) {
		Long minute = 0l;
		minute = (Long) (date.getTime() - accessTime.getTime()) / (1000 * 60);
		return minute;
	}

}
