package com.freestudio.utils;

import java.nio.charset.Charset;

import org.apache.commons.codec.binary.Base64;

public class ByteUtil {
	/**
	 * @function 16进制字符串转字节数组
	 * @param byteArray
	 * @return
	 */
	public static byte[] hexStringToByteArray(String input) {
		byte[] ret = new byte[input.length() / 2];
		for (int i = 0; i < ret.length; i++) {
			String bytec = input.substring(i * 2, i * 2 + 2);
			ret[i] = (byte) (Integer.parseInt(bytec, 16) & 0xff);

		}
		return ret;
	}

	/**
	 * @function 字节数组转16进制字符串
	 * @param byteArray
	 * @return
	 */
	public static String byteArrayToHexString(byte[] byteArray) {
		String resultString = "";
		for (int i = 0; i < byteArray.length; i++) {
			String hex = Integer.toHexString(byteArray[i] & 0xff);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			resultString += hex;
		}

		return resultString;
	}

	/**
	 * @function 以十六进制打印字节数组,每8个换一行，第一个不换行
	 * @param byteArray
	 */
	public static void printByteArray(byte[] byteArray) {
		for (int i = 0, len = byteArray.length; i < len; i++) {
			System.out.print(Integer.toHexString(byteArray[i] & 0xFF) + "  ");

			if (i != 0 && i % 8 == 0) {
				System.out.println();
			}
		}
	}

	/**
	 * 将Base64的字符串解码成字节数组
	 * 
	 * @param source
	 * @return
	 */
	public static byte[] getByteOfStringBase64(String source) {
		return Base64.decodeBase64(source);
	}

	/**
	 * 将short类型的数据转为byte数组 short类型为两个字节将这个字节转为byte数组长度为二
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfShort(short data) {
		byte[] bytes = new byte[2]; // 创建一个byte数组，长度设置为2
		bytes[0] = (byte) (data & 0xff);// 参数与0xff做与运算
		bytes[1] = (byte) ((data & 0xff00) >> 8);// 做过‘与’运算之后右移8位
		return bytes;
	};

	/**
	 * 将char类型字符转为byte类型
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfChar(char data) {
		byte[] bytes = new byte[2];
		bytes[0] = (byte) data;
		bytes[1] = (byte) (data >> 8);
		return bytes;
	}

	/**
	 * 将int类型转换为byte数组，int类型为四个字节
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfInt(int data) {
		byte[] bytes = new byte[4];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data & 0xff00) >> 8);
		bytes[2] = (byte) ((data & 0xff0000) >> 16);
		bytes[3] = (byte) ((data & 0xff000000) >> 24);
		return bytes;
	}

	/**
	 * 将long类型转换为bytes数组
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfLong(long data) {
		byte[] bytes = new byte[8];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data >> 8) & 0xff);
		bytes[2] = (byte) ((data >> 16) & 0xff);
		bytes[3] = (byte) ((data >> 24) & 0xff);
		bytes[4] = (byte) ((data >> 32) & 0xff);
		bytes[5] = (byte) ((data >> 40) & 0xff);
		bytes[6] = (byte) ((data >> 48) & 0xff);
		bytes[7] = (byte) ((data >> 56) & 0xff);
		return bytes;
	}

	/**
	 * 将float类型转换为byte数组
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfFloat(float data) {
		int intBits = Float.floatToRawIntBits(data);
		return getByteOfInt(intBits);

	};

	/**
	 * 将double类型转为byte类型
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfDouble(double data) {
		long longBits = Double.doubleToLongBits(data);
		return getByteOfLong(longBits);
	}

	/**
	 * 将Sting类型转换为byte数组
	 * 
	 * @param data
	 * @param charsetName
	 * @return
	 */
	public static byte[] getByteOfString(String data, String charsetName) {
		Charset charset = Charset.forName(charsetName);
		return data.getBytes(charset);
	}

	/**
	 * 将字符串按照utf-8转为byte字节数组
	 * 
	 * @param data
	 * @return
	 */
	public static byte[] getByteOfStringUTF_8(String data) {
		return getByteOfString(data, "UTF-8");
	}

	// 以下是将byte转为基本类型-------------------------------------------------------------------------------------
	/**
	 * 将byte数组转换为short类型
	 */
	public static short getShort(byte[] bytes) {
		return (short) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
	}

	/**
	 * 将byte数组转换为char类型
	 * 
	 * @param bytes
	 * @return
	 */
	public static char getChar(byte[] bytes) {
		return (char) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
	}

	/**
	 * 将byte数组转换为int类型
	 * 
	 * @param bytes
	 * @return
	 */
	public static int getInt(byte[] bytes) {
		return (0xff & bytes[0]) | (0xff00 & (bytes[1] << 8))
				| (0xff0000 & (bytes[2] << 16))
				| (0xff000000 & (bytes[3] << 24));
	}

	/**
	 * 将byte转换为long类型
	 * 
	 * @param bytes
	 * @return
	 */
	public static long getLong(byte[] bytes) {
		return (0xffL & (long) bytes[0]) | (0xff00L & ((long) bytes[1] << 8))
				| (0xff0000L & ((long) bytes[2] << 16))
				| (0xff000000L & ((long) bytes[3] << 24))
				| (0xff00000000L & ((long) bytes[4] << 32))
				| (0xff0000000000L & ((long) bytes[5] << 40))
				| (0xff000000000000L & ((long) bytes[6] << 48))
				| (0xff00000000000000L & ((long) bytes[7] << 56));
	}

	/**
	 * 将byte数组转换为float类型
	 * 
	 * @param bytes
	 * @return
	 */
	public static float getFloat(byte[] bytes) {
		return Float.intBitsToFloat(getInt(bytes));
	}

	/**
	 * 将byte数组转换为double类型
	 * 
	 * @param bytes
	 * @return
	 */
	public static double getDouble(byte[] bytes) {
		long l = getLong(bytes);
		System.out.println(l);
		return Double.longBitsToDouble(l);
	}

	/**
	 * 将byte类型转换为string
	 * 
	 * @param bytes
	 * @param charsetName
	 * @return
	 */
	public static String getString(byte[] bytes, String charsetName) {
		return new String(bytes, Charset.forName(charsetName));
	}

	/**
	 * 将byte类型转换为字符
	 * 
	 * @param bytes
	 * @return
	 */
	public static String getString(byte[] bytes) {
		return getString(bytes, "UTF-8");
	}

	/**
	 * 将两个byte数组合并为一个
	 * 
	 * @param byte_1
	 * @param byte_2
	 * @return
	 */
	public static byte[] byteMerger(byte[] byte1, byte[] byte2) {
		byte[] byte3 = new byte[byte1.length + byte2.length];
		System.arraycopy(byte1, 0, byte3, 0, byte1.length);
		System.arraycopy(byte2, 0, byte3, byte1.length, byte2.length);
		return byte3;
	}

	/**
	 * 用可变参数将所有的bute数组拼接到一起
	 * 
	 * @param first
	 * @param rest
	 * @return
	 */
	public static byte[] concatAll(byte[] first, byte[]... rest) {
		// 第一个参数不再数组中
		int totalLength = first.length;
		for (int i = 0; i < rest.length; i++) {
			totalLength += rest[i].length;
		}
		byte[] result = new byte[totalLength];
		System.arraycopy(first, 0, result, 0, first.length);
		int offset = first.length;
		for (int i = 0; i < rest.length; i++) {
			System.arraycopy(rest[i], 0, result, offset, rest[i].length);
			offset += rest[i].length;
		}
		return result;
	}

	public static byte[] getByteOfString(byte[] bytes, String string) {

		for (int i = 0; i < string.length(); i++) {
			bytes[i] = (byte) string.charAt(i);
		}
		return bytes;
	}

	/**
	 * 截取数组
	 * 
	 * @param src
	 * @param begin
	 * @param count
	 * @return
	 */
	public static byte[] subBytes(byte[] src, int begin, int count) {
		byte[] bs = new byte[count];
		for (int i = begin; i < begin + count; i++) {
			bs[i - begin] = src[i];
		}
		return bs;
	}

	/**
	 * 将byte[]数组 转换16进制 打印到控制台
	 * 
	 * @param src
	 * @param begin
	 * @param count
	 * @return
	 */
	@SuppressWarnings("unused")
	public static void printHexString(byte[] b) {
		int num = 1;
		System.out.print("num " + num + ":");
		for (int i = 0; i < b.length; i++) {
			String hex = Integer.toHexString(b[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			System.out.print("0x" + hex.toUpperCase() + ",");
			if ((i + 1) % 8 == 0) {
				System.out.println();
				num++;
				System.out.print("num " + num + ":");
			}

		}

	}

}