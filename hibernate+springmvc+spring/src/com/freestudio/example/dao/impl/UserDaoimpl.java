package com.freestudio.example.dao.impl;

import org.springframework.stereotype.Repository;

import com.freestudio.example.dao.UserDao;
import com.freestudio.example.entity.TestModel;
import com.freestudio.framework.support.core.dao.hibernate.HibernateDaoImpl;

@Repository
public class UserDaoimpl extends HibernateDaoImpl<TestModel, Long> implements
		UserDao {

	@Override
	public Integer addUser(TestModel user) {
		Integer resultAffectedCount = 0;
		this.save(user);
		resultAffectedCount = Integer.valueOf(user.getId().toString());
		return resultAffectedCount;
	}

}
