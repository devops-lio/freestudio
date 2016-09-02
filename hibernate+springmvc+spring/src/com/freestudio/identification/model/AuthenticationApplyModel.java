package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_authentication_apply")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AuthenticationApplyModel extends BaseEntity implements
		Serializable {

	private static final long serialVersionUID = 1L;
	private String clientNumber;// 网络业务系统客户编号
	private String terminalNumber;// 网络业务系统业务客户端编号
	private String timeStamp;// 身份认证申请时间，UNIX 时间格式,时间戳
	private String readerCardVersion;// 客户端读卡控件的版本号（通过“读卡控件”的KongJianBanBen方法获取）
	private String imageControlVersion;// 客户端人像控件的版本号（通过“人像控件”的KongJianBanBen方法获取）
	private String certificateSerialNumber;// 网络业务系统（网站）证书的序列号
	private String appkey;// 接入商的appKey

	@Column(name = "client_number", nullable = true)
	public String getClientNumber() {
		return clientNumber;
	}

	public void setClientNumber(String clientNumber) {
		this.clientNumber = clientNumber;
	}

	@Column(name = "terminal_number", nullable = true)
	public String getTerminalNumber() {
		return terminalNumber;
	}

	public void setTerminalNumber(String terminalNumber) {
		this.terminalNumber = terminalNumber;
	}

	@Column(name = "time_stamp", nullable = true)
	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	@Column(name = "reder_card_version", nullable = true)
	public String getReaderCardVersion() {
		return readerCardVersion;
	}

	public void setReaderCardVersion(String readerCardVersion) {
		this.readerCardVersion = readerCardVersion;
	}

	@Column(name = "image_control_version", nullable = true)
	public String getImageControlVersion() {
		return imageControlVersion;
	}

	public void setImageControlVersion(String imageControlVersion) {
		this.imageControlVersion = imageControlVersion;
	}

	@Column(name = "certificate_serial_number", nullable = true)
	public String getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(String certificateSerialNumber) {
		this.certificateSerialNumber = certificateSerialNumber;
	}

	@Column(name = "appkey", nullable = false)
	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

}
