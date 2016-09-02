package com.freestudio.framework.support.core.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.GenericGenerator;

import com.verisign.uuid.UUID;

/**
 * 统一定义id的entity基类.
 * 
 * 基类统一定义id的属性名称、数据类型、列名映射及生成策略. 子类可重载getId()函数重定义id的列名映射和生成策略.
 * 
 * 
 */
@MappedSuperclass
// JPA 基类的标识
public class BaseEntity {

	protected Long id;// 主键
	protected String pid;// 逻辑主键
	protected String creator;// 创建人
	protected Date createTime;// 创建时间
	protected String modifier;// 修改人

	protected Date modifyTime;// 修改时间
	protected String appendIp;// 添加IP（当前客户端IP）
	protected String modifyIp;// 修改IP（当前客户端IP）
	protected Boolean isRecycle = false;// 是否删除(标记记录是否删除（回收站）
										// ;是true,否false,默认值为false)
	protected Date recycleTime;// 放入回收站时间（默认为空）
	protected String recycleIp;// 放入回收站的用户IP（当前客户端IP）
	protected String remark;// 备注
	protected String version;// 版本

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	@Column(name = "pid", nullable = false, length = 100)
	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	@Column(name = "creator", nullable = true)
	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	@Column(name = "create_time", nullable = true)
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "modifier", nullable = true)
	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	@Column(name = "modify_time", nullable = true)
	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	@Column(nullable = true, updatable = false, length = 24, name = "append_ip")
	public String getAppendIp() {
		return appendIp;
	}

	public void setAppendIp(String appendIp) {
		this.appendIp = appendIp;
	}

	@Column(nullable = true, insertable = false, updatable = true, length = 24, name = "modify_ip")
	public String getModifyIp() {
		return modifyIp;
	}

	public void setModifyIp(String modifyIp) {
		this.modifyIp = modifyIp;
	}

	@Column(columnDefinition = "BOOLEAN", name = "is_recycle")
	public Boolean getIsRecycle() {
		return isRecycle;
	}

	public void setIsRecycle(Boolean isRecycle) {
		this.isRecycle = isRecycle;
	}

	@Column(insertable = false, updatable = true, name = "recycle_time")
	public Date getRecycleTime() {
		return recycleTime;
	}

	public void setRecycleTime(Date recycleTime) {
		this.recycleTime = recycleTime;
	}

	@Column(nullable = true, insertable = false, updatable = true, length = 24, name = "recycle_ip")
	public String getRecycleIp() {
		return recycleIp;
	}

	public void setRecycleIp(String recycleIp) {
		this.recycleIp = recycleIp;
	}

	@Column(name = "remark", nullable = true)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "version", nullable = true)
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public BaseEntity() {
		super();
		this.setPid(UUID.generate().toString());
		this.setCreateTime(new Date());
		this.setModifyTime(new Date());
	}

}
