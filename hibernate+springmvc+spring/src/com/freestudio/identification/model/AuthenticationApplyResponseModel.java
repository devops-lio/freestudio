package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_authentication_apply_response")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AuthenticationApplyResponseModel extends BaseEntity implements
		Serializable {

	private static final long serialVersionUID = 1L;
	private String clientNumber;// 网络业务系统客户编号
	private String terminalNumber;// 网络业务系统业务客户端编号
	private String timeStamp;// 身份认证申请时间，UNIX 时间格式
	private String businessTransaction;// 身份认证业务编号
	private String randomNumberLengh;// 随机数数据长度
	private String randomNumber;// 身份认证申请应答随机数数据（提交给“读卡控件”相关方法用于数据获取）
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

	@Column(name = "business_transaction", nullable = true)
	public String getBusinessTransaction() {
		return businessTransaction;
	}

	public void setBusinessTransaction(String businessTransaction) {
		this.businessTransaction = businessTransaction;
	}

	@Column(name = "random_number_lengh", nullable = true)
	public String getRandomNumberLengh() {
		return randomNumberLengh;
	}

	public void setRandomNumberLengh(String randomNumberLengh) {
		this.randomNumberLengh = randomNumberLengh;
	}

	@Column(name = "random_number", nullable = true)
	public String getRandomNumber() {
		return randomNumber;
	}

	public void setRandomNumber(String randomNumber) {
		this.randomNumber = randomNumber;
	}

	@Column(name = "certificate_serial_number", nullable = true)
	public String getCertificateSerialNumber() {
		return certificateSerialNumber;
	}

	public void setCertificateSerialNumber(String certificateSerialNumber) {
		this.certificateSerialNumber = certificateSerialNumber;
	}

	@Column(name = "appkey", nullable = true)
	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

}
