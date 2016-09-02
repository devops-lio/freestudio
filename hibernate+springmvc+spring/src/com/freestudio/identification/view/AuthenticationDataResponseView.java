package com.freestudio.identification.view;

public class AuthenticationDataResponseView {

	private byte[] clientNumber = new byte[8];// 网络业务系统客户编号
	private byte[] terminalNumber = new byte[2];// 网络业务系统业务客户端编号
	private byte[] timeStamp = new byte[4];// 身份认证申请时间，UNIX 时间格式
	private byte[] businessTransaction = new byte[9];// 身份认证业务编号
	private byte[] authenticationResult = new byte[4];;// 认证结果 详细请参看5 认证服务返回结果
	private byte[] authenticationResultFristLengh = new byte[2];;// 描述认证结果保留数据1
																	// 长度字节数（保留，当前为0）
	private byte[] authenticationResultFristData = new byte[0];;// 认证结果保留数据1（认证结果保留数据1
																// 长度为0时，可为空）
	private byte[] authenticationResultSecondLengh = new byte[2];;// 描述认证结果保留数据2
																	// 长度（保留，当前为0））
	private byte[] authenticationResultSecondData = new byte[0];;// 认证结果保留数据2（认证结果保留数据2
																	// 长度为0时，可为空
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

	public byte[] getAuthenticationResult() {
		return authenticationResult;
	}

	public void setAuthenticationResult(byte[] authenticationResult) {
		this.authenticationResult = authenticationResult;
	}

	public byte[] getAuthenticationResultFristLengh() {
		return authenticationResultFristLengh;
	}

	public void setAuthenticationResultFristLengh(
			byte[] authenticationResultFristLengh) {
		this.authenticationResultFristLengh = authenticationResultFristLengh;
	}

	public byte[] getAuthenticationResultFristData() {
		return authenticationResultFristData;
	}

	public void setAuthenticationResultFristData(
			byte[] authenticationResultFristData) {
		this.authenticationResultFristData = authenticationResultFristData;
	}

	public byte[] getAuthenticationResultSecondLengh() {
		return authenticationResultSecondLengh;
	}

	public void setAuthenticationResultSecondLengh(
			byte[] authenticationResultSecondLengh) {
		this.authenticationResultSecondLengh = authenticationResultSecondLengh;
	}

	public byte[] getAuthenticationResultSecondData() {
		return authenticationResultSecondData;
	}

	public void setAuthenticationResultSecondData(
			byte[] authenticationResultSecondData) {
		this.authenticationResultSecondData = authenticationResultSecondData;
	}

	public byte[] getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(byte[] certificateSerialNumber) {
		this.certificateSerialNumber = certificateSerialNumber;
	}

}
