package com.freestudio.example.dao;

import com.freestudio.example.entity.TestModel;
import com.freestudio.framework.support.core.dao.hibernate.HibernateDao;

public interface UserDao extends HibernateDao<TestModel, Long> {

	public Integer addUser(TestModel user);

}
