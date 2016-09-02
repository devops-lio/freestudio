package com.freestudio.identification.service;

import com.freestudio.identification.model.MerchantModel;

public interface MerchantService {
	/**
	 * 根据appkey获取商户信息
	 * 
	 * @return
	 */
	public MerchantModel getMerchantByAppKey(String appkey);
}
