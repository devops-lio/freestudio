package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_authentication_data_response")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AuthenticationDataResponseModel extends BaseEntity implements
		Serializable {

	private static final long serialVersionUID = 1L;
	private String clientNumber;// 网络业务系统客户编号
	private String terminalNumber;// 网络业务系统业务客户端编号
	private String timeStamp;// 身份认证申请时间，UNIX 时间格式
	private String businessTransaction;// 身份认证业务编号
	private String authenticationResult;// 认证结果 详细请参看5 认证服务返回结果
	private String authenticationResultFristLengh;// 描述认证结果保留数据1 长度字节数（保留，当前为0）
	private String authenticationResultFristData;// 认证结果保留数据1（认证结果保留数据1
													// 长度为0时，可为空）
	private String authenticationResultSecondLengh;// 描述认证结果保留数据2 长度（保留，当前为0））
	private String authenticationResultSecondData;// 认证结果保留数据2（认证结果保留数据2
													// 长度为0时，可为空
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

	@Column(name = "authentication_result", nullable = true)
	public String getAuthenticationResult() {
		return authenticationResult;
	}

	public void setAuthenticationResult(String authenticationResult) {
		this.authenticationResult = authenticationResult;
	}

	@Column(name = "authentication_result_frist_lengh", nullable = true)
	public String getAuthenticationResultFristLengh() {
		return authenticationResultFristLengh;
	}

	public void setAuthenticationResultFristLengh(
			String authenticationResultFristLengh) {
		this.authenticationResultFristLengh = authenticationResultFristLengh;
	}

	@Column(name = "authentication_result_frist_data", nullable = true)
	public String getAuthenticationResultFristData() {
		return authenticationResultFristData;
	}

	public void setAuthenticationResultFristData(
			String authenticationResultFristData) {
		this.authenticationResultFristData = authenticationResultFristData;
	}

	@Column(name = "authentication_result_second_lengh", nullable = true)
	public String getAuthenticationResultSecondLengh() {
		return authenticationResultSecondLengh;
	}

	public void setAuthenticationResultSecondLengh(
			String authenticationResultSecondLengh) {
		this.authenticationResultSecondLengh = authenticationResultSecondLengh;
	}

	@Column(name = "authentication_result_second_data", nullable = true)
	public String getAuthenticationResultSecondData() {
		return authenticationResultSecondData;
	}

	public void setAuthenticationResultSecondData(
			String authenticationResultSecondData) {
		this.authenticationResultSecondData = authenticationResultSecondData;
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
