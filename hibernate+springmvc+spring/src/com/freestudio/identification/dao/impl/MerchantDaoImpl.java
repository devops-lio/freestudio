package com.freestudio.identification.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.freestudio.framework.support.core.dao.hibernate.HibernateDaoImpl;
import com.freestudio.identification.dao.MerchantDao;
import com.freestudio.identification.model.MerchantModel;

@Repository
public class MerchantDaoImpl extends HibernateDaoImpl<MerchantModel, Long>
		implements MerchantDao {

	@Override
	public MerchantModel getMerchantByAppKey(String appkey) {
		String hql = "select * from ca_merchant where app_key='" + appkey + "'";
		Map<String, Object> map = new HashMap<String, Object>();
		List<MerchantModel> list = this.createQuery(hql, map).list();
		return list.get(0);
	}

}
