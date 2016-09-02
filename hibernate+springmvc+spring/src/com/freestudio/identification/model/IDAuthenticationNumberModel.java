package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_id_authentication_number")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class IDAuthenticationNumberModel extends BaseEntity implements
		Serializable {

	private static final long serialVersionUID = 1L;
	private String authenticationDataPid;// 身份认证数据表，逻辑主键
	private String authenticationNumberLengh;// 描述认证码数据长度字节数
	private String authenticationNumber;// 认证码数据
	private String appkey;

	@Column(name = "authentication_data_pid", nullable = true)
	public String getAuthenticationDataPid() {
		return authenticationDataPid;
	}

	public void setAuthenticationDataPid(String authenticationDataPid) {
		this.authenticationDataPid = authenticationDataPid;
	}

	@Column(name = "authentication_number_lengh", nullable = true)
	public String getAuthenticationNumberLengh() {
		return authenticationNumberLengh;
	}

	public void setAuthenticationNumberLengh(String authenticationNumberLengh) {
		this.authenticationNumberLengh = authenticationNumberLengh;
	}

	@Column(name = "authentication_number", nullable = true)
	public String getAuthenticationNumber() {
		return authenticationNumber;
	}

	public void setAuthenticationNumber(String authenticationNumber) {
		this.authenticationNumber = authenticationNumber;
	}

	@Column(name = "appkey", nullable = true)
	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

}
