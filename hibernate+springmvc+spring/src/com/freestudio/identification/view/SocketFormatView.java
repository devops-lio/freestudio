package com.freestudio.identification.view;

import com.freestudio.utils.ByteUtil;
import com.freestudio.utils.Constant;

public class SocketFormatView {

	private byte[] agreementVersion = new byte[2];// 协议版本 [0x0001（版本1）]
	private byte[] orderType = new byte[1];// 命令类型[0x00（请求），0x01（应答）]
	private byte[] order = new byte[1];// 命令[0x00（身份认证申请），0x01（身份认证）]
	private byte[] orderContent = new byte[1];// 命令内容[保留，0x00]
	private byte[] operation = new byte[1];// 操作[保留，0x00]
	private byte[] dataLengh = new byte[4];// 描述数据区的实际长度
	private byte[] data = new byte[0];// 业务数据，变长
	private byte[] signatureLengh = new byte[1];// 描述签名区长度
	private byte[] signature = new byte[0];// Socket 数据签名

	public SocketFormatView() {
		super();
		this.setAgreementVersion(ByteUtil
				.getByteOfInt(Constant.AGREEMENT_VERSION));
		this.setOrderContent(ByteUtil.getByteOfInt(Constant.ORDER_CONTENT));
		this.setOperation(ByteUtil.getByteOfInt(Constant.OPERATION));

	}

	public byte[] getAgreementVersion() {
		return agreementVersion;
	}

	public void setAgreementVersion(byte[] agreementVersion) {
		this.agreementVersion = agreementVersion;
	}

	public byte[] getOrderType() {
		return orderType;
	}

	public void setOrderType(byte[] orderType) {
		this.orderType = orderType;
	}

	public byte[] getOrder() {
		return order;
	}

	public void setOrder(byte[] order) {
		this.order = order;
	}

	public byte[] getOrderContent() {
		return orderContent;
	}

	public void setOrderContent(byte[] orderContent) {
		this.orderContent = orderContent;
	}

	public byte[] getOperation() {
		return operation;
	}

	public void setOperation(byte[] operation) {
		this.operation = operation;
	}

	public byte[] getDataLengh() {
		return dataLengh;
	}

	public void setDataLengh(byte[] dataLengh) {
		this.dataLengh = dataLengh;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public byte[] getSignatureLengh() {
		return signatureLengh;
	}

	public void setSignatureLengh(byte[] signatureLengh) {
		this.signatureLengh = signatureLengh;
	}

	public byte[] getSignature() {
		return signature;
	}

	public void setSignature(byte[] signature) {
		this.signature = signature;
	}

}
