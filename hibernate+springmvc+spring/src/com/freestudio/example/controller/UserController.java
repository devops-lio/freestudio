package com.freestudio.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.freestudio.example.entity.TestModel;
import com.freestudio.example.service.UserService;
import com.freestudio.framework.support.view.JSONMessage;

@Controller
@RequestMapping("/userhandler")
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 * 添加用户
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/adduser")
	public JSONMessage addUser() {
		TestModel user = new TestModel();
		user.setLoginName("admin");
		user.setLoginPwd("123456");
		// user.setPid(UUID.generate().toString());
		JSONMessage result = userService.addUser(user);
		return result;
	}

}
