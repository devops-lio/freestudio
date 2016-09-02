package com.freestudio.identification.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freestudio.identification.dao.MerchantDao;
import com.freestudio.identification.model.MerchantModel;
import com.freestudio.identification.service.MerchantService;

@Service
@Transactional(readOnly = true)
public class MerchantServiceImpl implements MerchantService {

	@Autowired
	private MerchantDao merchantDao;

	/**
	 * 根据appkey获取商户信息
	 * 
	 * @return
	 */
	public MerchantModel getMerchantByAppKey(String appkey) {
		MerchantModel modelFromDatabaseByAppKey = merchantDao
				.getMerchantByAppKey(appkey);
		return modelFromDatabaseByAppKey;
	}
}
