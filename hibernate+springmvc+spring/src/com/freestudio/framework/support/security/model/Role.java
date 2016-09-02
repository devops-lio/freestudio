package com.freestudio.framework.support.security.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
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
 * 用户角色实体类
 * 
 * 
 */
@Entity
@Table(name = "fs_system_role")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Role extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 3278263109664812672L;

	private String name;
	private Integer orderNo;// 角色的排序号
	private String descipt;// 备注
	private List<Authority> authorityList = Lists.newArrayList();// 角色对应的授权

	public Role() {
	}

	public Role(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	@Column(nullable = false, unique = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(Integer orderNo) {
		this.orderNo = orderNo;
	}

	public String getDescipt() {
		return descipt;
	}

	public void setDescipt(String descipt) {
		this.descipt = descipt;
	}

	@ManyToMany
	@JoinTable(name = "fs_system_role_authority", joinColumns = { @JoinColumn(name = "role_id") }, inverseJoinColumns = { @JoinColumn(name = "authority_id") })
	@Fetch(FetchMode.SUBSELECT)
	@OrderBy("id")
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Authority> getAuthorityList() {
		return authorityList;
	}

	public void setAuthorityList(List<Authority> authorityList) {
		this.authorityList = authorityList;
	}

	@Transient
	public String getAuthNames() {
		return ConvertUtils.convertElementPropertyToString(authorityList,
				"name", ", ");
	}

	@Transient
	@SuppressWarnings("unchecked")
	public List<Long> getAuthIds() {
		return ConvertUtils.convertElementPropertyToList(authorityList, "id");
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
