package com.freestudio.framework.support.security.listener;

import java.util.Date;

import org.hibernate.HibernateException;
import org.hibernate.event.SaveOrUpdateEvent;
import org.hibernate.event.SaveOrUpdateEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.freestudio.framework.support.core.model.BaseEntity;
import com.freestudio.framework.support.security.utils.SpringSecurityUtils;

/**
 * 
 * 系统实体保存或者更新事件监听
 * 
 * @author jun
 * @e-mail 15960266730@139.com
 * @version v1.0
 * @copyright 2010-2015
 * @create-time 2012-7-19 下午01:28:24
 * 
 */

public class AuditListener implements SaveOrUpdateEventListener {

	private static final long serialVersionUID = 3583548711163117674L;

	private static Logger logger = LoggerFactory.getLogger(AuditListener.class);

	public void onSaveOrUpdate(SaveOrUpdateEvent event)
			throws HibernateException {
		Object object = event.getObject();
		// 如果对象是BaseEntity子类,添加审计信息
		if (object instanceof BaseEntity) {
			BaseEntity entity = (BaseEntity) object;
			String loginName = SpringSecurityUtils.getCurrentUserName();
			String ip = SpringSecurityUtils.getCurrentUserIp();

			if (entity.getId() == null) {
				// 创建新对象
				entity.setCreateTime(new Date());
				entity.setCreator(loginName);
				entity.setAppendIp(ip);

				logger.info("{}对象(ID:{}) 被 {} 在 {} 添加",
						new Object[] { event.getEntityName(), entity.getId(),
								loginName, new Date() });
			} else {
				// 修改旧对象
				entity.setModifyTime(new Date());
				entity.setModifier(loginName);
				entity.setModifyIp(ip);

				logger.info("{}对象(ID:{}) 被 {} 在 {} 修改",
						new Object[] { event.getEntityName(), entity.getId(),
								loginName, new Date() });
			}
		}
	}

}
