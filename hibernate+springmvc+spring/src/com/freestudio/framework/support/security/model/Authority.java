package com.freestudio.framework.support.security.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;

/**
 * 用户授权实体类
 * 
 * 
 */
@Entity
@Table(name = "fs_system_authority")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Authority extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 5753874126753625039L;

	public static final String AUTHORITY_PREFIX = "ROLE_";// 角色/授权名前缀

	private String name;// 授权名称
	private String url;// URL
	private Integer orderNo = 0;// 授权排序号
	private Resource resource;// 所属资源

	public Authority() {
	}

	public Authority(String name, String url, Resource resource) {
		super();
		this.name = name;
		this.url = url;
		this.resource = resource;
	}

	public Authority(String name, String url, Integer orderNo, Resource resource) {
		super();
		this.name = name;
		this.url = url;
		this.orderNo = orderNo;
		this.resource = resource;
	}

	@Column(nullable = false, unique = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(nullable = false)
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(Integer orderNo) {
		this.orderNo = orderNo;
	}

	@ManyToOne(cascade = CascadeType.REFRESH, optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "resource_id")
	public Resource getResource() {
		return resource;
	}

	public void setResource(Resource resource) {
		this.resource = resource;
	}

	@Transient
	public String getPrefixedName() {
		return AUTHORITY_PREFIX + name;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
