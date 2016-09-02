package com.freestudio.identification.view;

import com.freestudio.utils.ByteUtil;
import com.freestudio.utils.Constant;

public class AuthenticationApplyView {

	private byte[] clientNumber = new byte[8];// 网络业务系统客户编号
	private byte[] terminalNumber = new byte[2];// 网络业务系统业务客户端编号
	private byte[] timeStamp = new byte[4];// 身份认证申请时间，UNIX 时间格式
	private byte[] readerCardVersion = new byte[4];// 客户端读卡控件的版本号（通过“读卡控件”的KongJianBanBen方法获取）
	private byte[] imageControlVersion = new byte[4];// 客户端人像控件的版本号（通过“人像控件”的KongJianBanBen方法获取）
	private byte[] certificateSerialNumber = new byte[32];// 网络业务系统（网站）证书的序列号

	public AuthenticationApplyView() {
		super();
		this.setTimeStamp(ByteUtil.getByteOfInt((int) System
				.currentTimeMillis()));
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

	public byte[] getReaderCardVersion() {
		return readerCardVersion;
	}

	public void setReaderCardVersion(byte[] readerCardVersion) {
		this.readerCardVersion = readerCardVersion;
	}

	public byte[] getImageControlVersion() {
		return imageControlVersion;
	}

	public void setImageControlVersion(byte[] imageControlVersion) {
		this.imageControlVersion = imageControlVersion;
	}

	public byte[] getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(byte[] certificateSerialNumber) {
		int byteLengh = certificateSerialNumber.length;
		if (byteLengh < Constant.THIRTY_TWO_FOR_ARRAY_SPACE) {
			byte[] appendByteArraySpace = new byte[Constant.THIRTY_TWO_FOR_ARRAY_SPACE
					- byteLengh];
			this.certificateSerialNumber = ByteUtil.byteMerger(
					certificateSerialNumber, appendByteArraySpace);
		} else {
			this.certificateSerialNumber = certificateSerialNumber;
		}

	}

}
