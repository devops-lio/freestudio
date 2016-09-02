package com.freestudio.identification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "ca_merchant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MerchantModel extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private String companyName;// 接入商名称
	private String ownerMobile;// 负责人移动电话
	private String companyTel;// 企业电话
	private String ipAddress;// 访问的ip地址
	private String companyAddress;// 企业地址
	private String companyEmail;// 企业邮箱
	private String isEnable;// 是否可用
	private String appKey;// 接入商appKey

	@Column(name = "company_name", nullable = true)
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@Column(name = "owner_mobile", nullable = true)
	public String getOwnerMobile() {
		return ownerMobile;
	}

	public void setOwnerMobile(String ownerMobile) {
		this.ownerMobile = ownerMobile;
	}

	@Column(name = "company_tel", nullable = true)
	public String getCompanyTel() {
		return companyTel;
	}

	public void setCompanyTel(String companyTel) {
		this.companyTel = companyTel;
	}

	@Column(name = "ip_address", nullable = true)
	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	@Column(name = "company_address", nullable = true)
	public String getCompanyAddress() {
		return companyAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	@Column(name = "company_email", nullable = true)
	public String getCompanyEmail() {
		return companyEmail;
	}

	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}

	@Column(name = "is_enable", nullable = true)
	public String getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(String isEnable) {
		this.isEnable = isEnable;
	}

	@Column(name = "app_key", nullable = false)
	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

}
