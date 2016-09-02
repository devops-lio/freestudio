package com.freestudio.identification.dao;

import com.freestudio.identification.model.MerchantModel;

public interface MerchantDao {

	public MerchantModel getMerchantByAppKey(String appkey);

}
