package com.freestudio.example.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freestudio.example.dao.UserDao;
import com.freestudio.example.entity.TestModel;
import com.freestudio.example.service.UserService;
import com.freestudio.framework.support.view.JSONMessage;
import com.freestudio.utils.Constant;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	@Transactional(readOnly = false)
	public JSONMessage addUser(TestModel user) {
		JSONMessage jsonMessage = new JSONMessage();
		jsonMessage.setMsg(Constant.EXTCUTE_FAILED);
		jsonMessage.setResult(false);
		Integer addAffectedCount = userDao.addUser(user);
		if (0 != addAffectedCount) {
			jsonMessage.setResult(true);
			jsonMessage.setMsg(Constant.EXTCUTE_SUCCESS);
		}
		return jsonMessage;
	}

}
