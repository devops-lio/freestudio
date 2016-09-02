package com.freestudio.identification.view;

public class AuthenticationApplyResponseView {

	private byte[] clientNumber = new byte[8];// 网络业务系统客户编号
	private byte[] terminalNumber = new byte[2];// 网络业务系统业务客户端编号
	private byte[] timeStamp = new byte[4];// 身份认证申请时间，UNIX 时间格式
	private byte[] businessTransaction = new byte[9];// 身份认证业务编号
	private byte[] randomNumberLengh = new byte[2];// 随机数数据长度
	private byte[] randomNumber = new byte[0];// 身份认证申请应答随机数数据（提交给“读卡控件”相关方法用于数据获取）
	private byte[] certificateSerialNumber = new byte[32];// 网络业务系统（网站）证书的序列号

	public byte[] getClientNumber() {
		return clientNumber;
	}

	public void setClientNumber(byte[] clientNumber) {
		this.clientNumber = clientNumber;
	}

	public byte[] getTerminalNumber() {
		return terminalNumber;
	}

	public void setTerminalNumber(byte[] terminalNumber) {
		this.terminalNumber = terminalNumber;
	}

	public byte[] getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(byte[] timeStamp) {
		this.timeStamp = timeStamp;
	}

	public byte[] getBusinessTransaction() {
		return businessTransaction;
	}

	public void setBusinessTransaction(byte[] businessTransaction) {
		this.businessTransaction = businessTransaction;
	}

	public byte[] getRandomNumberLengh() {
		return randomNumberLengh;
	}

	public void setRandomNumberLengh(byte[] randomNumberLengh) {
		this.randomNumberLengh = randomNumberLengh;
	}

	public byte[] getRandomNumber() {
		return randomNumber;
	}

	public void setRandomNumber(byte[] randomNumber) {
		this.randomNumber = randomNumber;
	}

	public byte[] getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(byte[] certificateSerialNumber) {
		this.certificateSerialNumber = certificateSerialNumber;
	}

}
