package com.freestudio.framework.support.security.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.freestudio.framework.support.core.model.BaseEntity;
import com.freestudio.framework.support.core.utils.reflection.ConvertUtils;
import com.google.common.collect.Lists;

/**
 * 系统用户实体类
 * 
 * 
 */
@Entity
@Table(name = "fs_system_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -3496363548157676498L;
	private String loginName;// 登陆名称
	private String password;// 密码（加密）
	private String realName;// 真实姓名
	private Gender gender = Gender.MAN;// 性别
	private String mobile;// 手机
	private String tel;// 电话
	private String email;// email
	private String address;// 联系住址
	private Boolean isLocked = false;// 账号是否被锁住,默认为未锁住
	private Date loginTime;// 登录时间
	private String loginIp;// 登录ip

	private List<Role> roleList = Lists.newArrayList();// 有序的关联对象集合

	// 字段非空且唯一, 用于提醒Entity使用者及生成DDL
	@Column(nullable = false, unique = true, name = "login_name")
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@Column(nullable = true, name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(length = 20, name = "real_name")
	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 5, name = "gender")
	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	@Column(length = 50, name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(length = 20, name = "tel")
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@Column(length = 11, name = "mobile")
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(length = 100, name = "address")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(columnDefinition = "BOOLEAN", name = "is_locked")
	public Boolean getIsLocked() {
		return isLocked;
	}

	public void setIsLocked(Boolean isLocked) {
		this.isLocked = isLocked;
	}

	// 多对多定义
	@ManyToMany
	// 中间表定义,表名采用默认命名规则
	@JoinTable(name = "fs_system_user_role", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = { @JoinColumn(name = "role_id") })
	// Fecth策略定义
	@Fetch(FetchMode.SUBSELECT)
	// 集合按id排序
	@OrderBy("orderNo")
	// 集合中对象id的缓存
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	// 用户拥有的角色名称字符串, 多个角色名称用','分隔
	@Transient
	public String getRoleNames() {
		return ConvertUtils.convertElementPropertyToString(roleList, "name",
				", ");
	}

	// 用户拥有的角色id字符串, 多个角色id用','分隔
	@Transient
	@SuppressWarnings("unchecked")
	public List<Long> getRoleIds() {
		return ConvertUtils.convertElementPropertyToList(roleList, "id");
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true)
	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	@Column(nullable = true, length = 24)
	public String getLoginIp() {
		return loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
