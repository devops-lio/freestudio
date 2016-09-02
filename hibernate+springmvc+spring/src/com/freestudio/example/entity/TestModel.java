package com.freestudio.example.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

@Entity
@Table(name = "fs_test_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TestModel extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String loginName;// 登陆名

	private String loginPwd;// 登陆密码

	private String userNameCn;// 中文名

	private String email;// 邮箱

	private String tel;// 电话

	private String extPhone;// 分机号

	private String mobile;// 手机

	private String fax;// 传真

	private String isenable;// 是否可用

	private String loginedCount;// 登陆次数

	private Date lastLoginTime;// 最后登陆时间

	@Column(name = "login_name", nullable = false)
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@Column(name = "login_pwd", nullable = false)
	public String getLoginPwd() {
		return loginPwd;
	}

	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}

	@Column(name = "user_name_cn", nullable = true)
	public String getUserNameCn() {
		return userNameCn;
	}

	public void setUserNameCn(String userNameCn) {
		this.userNameCn = userNameCn;
	}

	@Column(name = "email", nullable = true)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "tel", nullable = true)
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@Column(name = "ext_phone", nullable = true)
	public String getExtPhone() {
		return extPhone;
	}

	public void setExtPhone(String extPhone) {
		this.extPhone = extPhone;
	}

	@Column(name = "mobile", nullable = true)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "fax", nullable = true)
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	@Column(name = "is_enable", nullable = true)
	public String getIsenable() {
		return isenable;
	}

	public void setIsenable(String isenable) {
		this.isenable = isenable;
	}

	@Column(name = "logined_count", nullable = true)
	public String getLoginedCount() {
		return loginedCount;
	}

	public void setLoginedCount(String loginedCount) {
		this.loginedCount = loginedCount;
	}

	@Column(name = "last_login_time", nullable = true)
	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

}
