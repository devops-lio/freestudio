package com.freestudio.identification.view;

public class IDAuthenticationNumberView {

	private byte[] authenticationNumberLengh = new byte[2];// 描述认证码数据长度字节数
	private byte[] authenticationNumber = new byte[0];// 认证码数据

	public byte[] getAuthenticationNumberLengh() {
		return authenticationNumberLengh;
	}

	public void setAuthenticationNumberLengh(byte[] authenticationNumberLengh) {
		this.authenticationNumberLengh = authenticationNumberLengh;
	}

	public byte[] getAuthenticationNumber() {
		return authenticationNumber;
	}

	public void setAuthenticationNumber(byte[] authenticationNumber) {
		this.authenticationNumber = authenticationNumber;
	}

}
