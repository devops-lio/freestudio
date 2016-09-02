package com.freestudio.framework.support.core.utils.encode;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

/**
 * 字符串进行数值摘要的加密和解密处理.
 * 
 * 
 */
public class MessageDigestUtils {

	/**
	 * 加密.先进行64位的加密 再继续16进制的加密
	 * 
	 * @param encode
	 *            要加密的字符串
	 * @return
	 */
	public static String encode(String encode) {
		encode = new String(Base64.encode(encode.getBytes()));
		encode = new String(Hex.encodeHex(encode.getBytes()));
		return encode;
	}

	/**
	 * 解密.先进行16进制的解密，再进行64位的解密
	 * 
	 * @param decode
	 *            要解密的字符串
	 * @return
	 */
	public static String decode(String decode) {
		try {
			decode = new String(Hex.decodeHex(decode.toCharArray()));
			decode = new String(Base64.decode(decode.toCharArray()));
		} catch (DecoderException e) {
			e.printStackTrace();
		}
		return decode;
	}

	public static void main(String[] args) {
		String str = MessageDigestUtils.encode("root");
		System.out.println(str);

	}

}
