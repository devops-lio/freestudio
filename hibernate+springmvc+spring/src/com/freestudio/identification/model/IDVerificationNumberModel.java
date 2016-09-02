package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_id_verification_number")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class IDVerificationNumberModel extends BaseEntity implements
		Serializable {

	private static final long serialVersionUID = 1L;
	private String authenticationDataPid;// 身份认证数据表，逻辑主键
	private String verificationNumberLengh;// 描述ID 验证数据字段数据长度字节数
	private String verificationNumber;// ID 验证数据
	private String appkey;

	@Column(name = "authentication_data_pid", nullable = true)
	public String getAuthenticationDataPid() {
		return authenticationDataPid;
	}

	public void setAuthenticationDataPid(String authenticationDataPid) {
		this.authenticationDataPid = authenticationDataPid;
	}

	@Column(name = "verification_number_lengh", nullable = true)
	public String getVerificationNumberLengh() {
		return verificationNumberLengh;
	}

	public void setVerificationNumberLengh(String verificationNumberLengh) {
		this.verificationNumberLengh = verificationNumberLengh;
	}

	@Column(name = "verification_number", nullable = true)
	public String getVerificationNumber() {
		return verificationNumber;
	}

	public void setVerificationNumber(String verificationNumber) {
		this.verificationNumber = verificationNumber;
	}

	@Column(name = "appkey", nullable = true)
	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

}
