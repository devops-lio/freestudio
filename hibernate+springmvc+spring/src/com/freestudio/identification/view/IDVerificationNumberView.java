package com.freestudio.identification.view;

public class IDVerificationNumberView {

	private byte[] verificationNumberLengh = new byte[2];// 描述ID 验证数据字段数据长度字节数
	private byte[] verificationNumber = new byte[0];// ID 验证数据

	public byte[] getVerificationNumberLengh() {
		return verificationNumberLengh;
	}

	public void setVerificationNumberLengh(byte[] verificationNumberLengh) {
		this.verificationNumberLengh = verificationNumberLengh;
	}

	public byte[] getVerificationNumber() {
		return verificationNumber;
	}

	public void setVerificationNumber(byte[] verificationNumber) {
		this.verificationNumber = verificationNumber;
	}

}
