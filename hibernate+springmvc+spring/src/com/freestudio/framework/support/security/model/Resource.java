package com.freestudio.framework.support.security.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.freestudio.framework.support.core.model.BaseEntity;
import com.freestudio.framework.support.security.context.SecurityUtil;

/**
 * 资源实体类
 * 
 * 
 */
@Entity
@Table(name = "fs_system_resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Resource extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -5001183674597077342L;

	private String name; // 资源名称
	private String sn;// 资源编号
	private String url;// 资源的入口URL地址
	private Integer orderNo;// 资源的排序号
	private Resource parent;// 所属父类资源
	private Boolean isShowed = true;// 是否显示,默认显示
	private Integer level;// 层序
	private List<Resource> child = new ArrayList<Resource>();// 所属子类资源集合
	private List<Resource> checkChild = new ArrayList<Resource>();// 用户有权访问的所属子类资源集合

	@Column(length = 100)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(length = 50)
	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

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

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	public Resource getParent() {
		return parent;
	}

	public void setParent(Resource parent) {
		this.parent = parent;
	}

	@Column(columnDefinition = "BOOLEAN")
	public Boolean getIsShowed() {
		return isShowed;
	}

	public void setIsShowed(Boolean isShowed) {
		this.isShowed = isShowed;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	@OneToMany(cascade = { CascadeType.REFRESH, CascadeType.REMOVE }, fetch = FetchType.LAZY, mappedBy = "parent")
	@OrderBy("orderNo,id")
	public List<Resource> getChild() {
		return child;
	}

	public void setChild(List<Resource> child) {
		this.child = child;
	}

	@Transient
	public List<Resource> getCheckChild() {
		List<Resource> temp = this.child;
		List<Long> resList = SecurityUtil.getResourceMap().get("resourceMap");
		for (Resource res : temp) {
			if (!checkChild.contains(res) && resList.contains(res.getId())) {
				checkChild.add(res);
			}
		}
		return checkChild;
	}

	public void setCheckChild(List<Resource> checkChild) {
		this.checkChild = checkChild;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
