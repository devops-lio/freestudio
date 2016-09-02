package com.freestudio.identification.view;

import com.freestudio.utils.ByteUtil;
import com.freestudio.utils.Constant;

public class AuthenticationDataView {

	private byte[] clientNumber = new byte[8];// 网络业务系统客户编号
	private byte[] terminalNumber = new byte[2];// 网络业务系统业务客户端编号
	private byte[] timeStamp = new byte[4];// 身份认证申请时间，UNIX 时间格式
	private byte[] businessTransaction = new byte[9];// 身份认证业务编号
	private byte[] authenticationMode = new byte[1];// 详细请参看4 认证模式说明，默认值为0X0F
	private byte[] idForValidateAndAuthenticationLengh = new byte[2];// 描述ID
																		// 验证数据字段和认证码数据字段的总长，取值为两个数据字段长度之和
	private byte[] IDValidateNumber = new byte[0];// ID验证数据字段
	private byte[] IDAuthenticationNumbe = new byte[0];// 认证码数据字段
	private byte[] photoDataLengh = new byte[4];// 描述照片数据长度
	private byte[] photoData = new byte[0];// 人像照片数据（照片长度为0 时，可为空）
	private byte[] authenticationApplyDataLengh = new byte[2];// 描述认证申请保留数据长度字节数
	private byte[] authenticationApplyData = new byte[0];// 认证申请保留数据，用于网站上传数据（认证申请保留数据长度为0
															// 时，可为空）
	private byte[] certificateSerialNumber = new byte[32];// 网络业务系统（网站）证书的序列号

	public AuthenticationDataView() {
		super();
		this.setTimeStamp(ByteUtil.getByteOfLong(System.currentTimeMillis()));
		this.setAuthenticationMode(ByteUtil
				.getByteOfInt(Constant.DEFAULT_AUTHENTICATION_MODE));
	}

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

	public byte[] getAuthenticationMode() {
		return authenticationMode;
	}

	public void setAuthenticationMode(byte[] authenticationMode) {
		this.authenticationMode = authenticationMode;
	}

	public byte[] getIdForValidateAndAuthenticationLengh() {
		return idForValidateAndAuthenticationLengh;
	}

	public void setIdForValidateAndAuthenticationLengh(
			byte[] idForValidateAndAuthenticationLengh) {
		this.idForValidateAndAuthenticationLengh = idForValidateAndAuthenticationLengh;
	}

	public byte[] getIDValidateNumber() {
		return IDValidateNumber;
	}

	public void setIDValidateNumber(byte[] iDValidateNumber) {
		IDValidateNumber = iDValidateNumber;
	}

	public byte[] getIDAuthenticationNumbe() {
		return IDAuthenticationNumbe;
	}

	public void setIDAuthenticationNumbe(byte[] iDAuthenticationNumbe) {
		IDAuthenticationNumbe = iDAuthenticationNumbe;
	}

	public byte[] getPhotoDataLengh() {
		return photoDataLengh;
	}

	public void setPhotoDataLengh(byte[] photoDataLengh) {
		this.photoDataLengh = photoDataLengh;
	}

	public byte[] getPhotoData() {
		return photoData;
	}

	public void setPhotoData(byte[] photoData) {
		this.photoData = photoData;
	}

	public byte[] getAuthenticationApplyDataLengh() {
		return authenticationApplyDataLengh;
	}

	public void setAuthenticationApplyDataLengh(
			byte[] authenticationApplyDataLengh) {
		this.authenticationApplyDataLengh = authenticationApplyDataLengh;
	}

	public byte[] getAuthenticationApplyData() {
		return authenticationApplyData;
	}

	public void setAuthenticationApplyData(byte[] authenticationApplyData) {
		this.authenticationApplyData = authenticationApplyData;
	}

	public byte[] getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(byte[] certificateSerialNumber) {
		this.certificateSerialNumber = certificateSerialNumber;
	}

}
