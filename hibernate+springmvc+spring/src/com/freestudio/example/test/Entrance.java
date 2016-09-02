package com.freestudio.example.test;

import com.freestudio.utils.ByteUtil;

public class Entrance {

	public static void main(String[] args) {

		int a = 0x00;
		byte[] b = ByteUtil.getByteOfInt(a);
		System.out.println(b.length);
		byte[] c = { 0, 0, 0, 0 };
		System.out.println(c.length);
		for (int i = 0; i < b.length; i++) {
			System.out.println(b[i]);
		}
	}
}
