package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_socket_format")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SocketFormatModel extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private String agreementVersion;// 协议版本 [0x0001（版本1）]
	private String commandType;// 命令类型[0x00（请求），0x01（应答）]
	private String command;// 命令[0x00（身份认证申请），0x01（身份认证）]
	private String commandContent;// 命令内容[保留，0x00]
	private String operation;// 操作[保留，0x00]
	private String dataLengh;// 描述数据区的实际长度
	private String data;// 业务数据，变长
	private String signatureLengh;// 描述签名区长度
	private String signature;// Socket 数据签名
	private String appKey;// 接入商的appKey

	@Column(name = "agreement_version", nullable = true)
	public String getAgreementVersion() {
		return agreementVersion;
	}

	public void setAgreementVersion(String agreementVersion) {
		this.agreementVersion = agreementVersion;
	}

	@Column(name = "command_type", nullable = true)
	public String getCommandType() {
		return commandType;
	}

	public void setCommandType(String commandType) {
		this.commandType = commandType;
	}

	@Column(name = "command", nullable = true)
	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
	}

	@Column(name = "command_content", nullable = true)
	public String getCommandContent() {
		return commandContent;
	}

	public void setCommandContent(String commandContent) {
		this.commandContent = commandContent;
	}

	@Column(name = "operation", nullable = true)
	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	@Column(name = "data_lengh", nullable = true)
	public String getDataLengh() {
		return dataLengh;
	}

	public void setDataLengh(String dataLengh) {
		this.dataLengh = dataLengh;
	}

	@Column(name = "data", nullable = true)
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Column(name = "signature_lengh", nullable = true)
	public String getSignatureLengh() {
		return signatureLengh;
	}

	public void setSignatureLengh(String signatureLengh) {
		this.signatureLengh = signatureLengh;
	}

	@Column(name = "signature", nullable = true)
	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	@Column(name = "appkey", nullable = true)
	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

}
