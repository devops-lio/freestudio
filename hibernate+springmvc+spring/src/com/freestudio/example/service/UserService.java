package com.freestudio.example.service;

import com.freestudio.example.entity.TestModel;
import com.freestudio.framework.support.view.JSONMessage;

public interface UserService {

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public JSONMessage addUser(TestModel user);
}
