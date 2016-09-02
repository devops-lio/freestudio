package com.freestudio.framework.support.security.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.google.common.collect.Lists;

/**
 * security登陆用户扩展实体类
 * 
 * 
 */
public class UserInfo extends User implements Serializable {

	private static final long serialVersionUID = 5264052166987962874L;

	private Long userId;// 用户Id
	private String realName;// 用户真实姓名
	private List<Long> roleIdList = Lists.newArrayList();// 角色对象集合
	private String roleNames;// 角色名字

	private String loggingIp;// 登录IP
	private Date loggingTime;// 登录时间

	public UserInfo(String username, String password, boolean enabled,
			boolean accountNonLocked, Set<GrantedAuthority> grantedAuths)
			throws IllegalArgumentException {
		// boolean accountNonExpired = true;// 账号是否过期
		// boolean credentialsNonExpired = true;
		super(username, password, enabled, true, true, accountNonLocked,
				grantedAuths);
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public List<Long> getRoleIdList() {
		return roleIdList;
	}

	public void setRoleIdList(List<Long> roleIdList) {
		this.roleIdList = roleIdList;
	}

	public String getRoleNames() {
		return roleNames;
	}

	public void setRoleNames(String roleNames) {
		this.roleNames = roleNames;
	}

	public String getLoggingIp() {
		return loggingIp;
	}

	public void setLoggingIp(String loggingIp) {
		this.loggingIp = loggingIp;
	}

	public Date getLoggingTime() {
		return loggingTime;
	}

	public void setLoggingTime(Date loggingTime) {
		this.loggingTime = loggingTime;
	}

}
