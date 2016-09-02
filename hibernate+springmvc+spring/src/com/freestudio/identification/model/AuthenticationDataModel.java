package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_authentication_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AuthenticationDataModel extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private String clientNumber;// 网络业务系统客户编号
	private String terminalNumber;// 网络业务系统业务客户端编号
	private String timeStamp;// 身份认证申请时间，UNIX 时间格式
	private String businessTransaction;// 身份认证业务编号
	private String authenticationMode;// 详细请参看4 认证模式说明，默认值为0X0F
	private String verifyAuthenLengh;// 描述ID验证数据字段和认证码数据字段的总长，取值为两个数据字段长度之和
	private String IDVerificationNumber;// ID验证数据字段
	private String IDAuthenticationNumbe;// 认证码数据字段
	private String photoDataLengh;// 描述照片数据长度
	private String photoData;// 人像照片数据（照片长度为0 时，可为空）
	private String authenticationApplyDataLengh;// 描述认证申请保留数据长度字节数
	private String authenticationApplyData;// 认证申请保留数据，用于网站上传数据（认证申请保留数据长度为0时，可为空）
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

	@Column(name = "authentication_mode", nullable = true)
	public String getAuthenticationMode() {
		return authenticationMode;
	}

	public void setAuthenticationMode(String authenticationMode) {
		this.authenticationMode = authenticationMode;
	}

	@Column(name = "verify_authen_lengh", nullable = true)
	public String getVerifyAuthenLengh() {
		return verifyAuthenLengh;
	}

	public void setVerifyAuthenLengh(String verifyAuthenLengh) {
		this.verifyAuthenLengh = verifyAuthenLengh;
	}

	@Column(name = "id_verification_number", nullable = true)
	public String getIDVerificationNumber() {
		return IDVerificationNumber;
	}

	public void setIDVerificationNumber(String iDVerificationNumber) {
		IDVerificationNumber = iDVerificationNumber;
	}

	@Column(name = "id_authentication_number", nullable = true)
	public String getIDAuthenticationNumbe() {
		return IDAuthenticationNumbe;
	}

	public void setIDAuthenticationNumbe(String iDAuthenticationNumbe) {
		IDAuthenticationNumbe = iDAuthenticationNumbe;
	}

	@Column(name = "photo_data_lengh", nullable = true)
	public String getPhotoDataLengh() {
		return photoDataLengh;
	}

	public void setPhotoDataLengh(String photoDataLengh) {
		this.photoDataLengh = photoDataLengh;
	}

	@Column(name = "photo_Data", nullable = true)
	public String getPhotoData() {
		return photoData;
	}

	public void setPhotoData(String photoData) {
		this.photoData = photoData;
	}

	@Column(name = "authentication_apply_lengh", nullable = true)
	public String getAuthenticationApplyDataLengh() {
		return authenticationApplyDataLengh;
	}

	public void setAuthenticationApplyDataLengh(
			String authenticationApplyDataLengh) {
		this.authenticationApplyDataLengh = authenticationApplyDataLengh;
	}

	@Column(name = "authentication_apply_data", nullable = true)
	public String getAuthenticationApplyData() {
		return authenticationApplyData;
	}

	public void setAuthenticationApplyData(String authenticationApplyData) {
		this.authenticationApplyData = authenticationApplyData;
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
