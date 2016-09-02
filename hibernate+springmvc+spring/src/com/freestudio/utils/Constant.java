package com.freestudio.utils;

public class Constant {

	/**
	 * 操作响应的信息
	 */
	public static final String EXTCUTE_SUCCESS = "执行成功！";
	public static final String EXTCUTE_FAILED = "执行失败！";
	public static final String APPKEY_IS_WRONG = "appKey无效，请联系管理员！";
	public static final String APPKEY_IS__NULL = "appKey不能为空！";

	/**
	 * 二代证认证使用的常量
	 */
	public static final Integer AGREEMENT_VERSION = 0x0001;// 协议版本 [0x0001（版本1）]
	public static final Integer ORDER_CONTENT = 0x00;// 命令内容[保留，0x00]
	public static final Integer OPERATION = 0x00;// 操作[保留，0x00]
	public static final Integer DEFAULT_AUTHENTICATION_MODE = 0X0F;// 操作[保留，0x00]
	public static final Integer REQUEST_ORDER_TYPE = 0x00;// 请求命令类型
	public static final Integer RESPONSE_ORDER_TYPE = 0x01;// 应答命令类型
	public static final Integer APPLY_ORDER = 0x00;// 申请命令
	public static final Integer AUTHENTICATION_ORDER = 0x00;// 认证命令

	public static final String CERTIFICATE_SERIAL_NUMBER = "1F89AA4F4D2B63E4";// 签名服务器证书序列号字符串
	public static final String CERTIFICATE_ID = "ywzd2";// 应用标识
	public static final String DIGEST_ALGORITHM = "sm3";// 摘要算法

	/**
	 * 系统使用的常量
	 */
	public static final String SIGNATURE_SERVER_FILE_LOCATION = "./resources/cssconfig.properties";

	/**
	 * 认证数组位数常量
	 */
	public static final int THIRTY_TWO_FOR_ARRAY_SPACE = 32;

}
