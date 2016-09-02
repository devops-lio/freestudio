package com.freestudio.identification.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.freestudio.framework.support.view.JSONMessage;
import com.freestudio.identification.model.AuthenticationApplyModel;
import com.freestudio.identification.model.AuthenticationApplyResponseModel;
import com.freestudio.identification.model.MerchantModel;
import com.freestudio.identification.service.MerchantService;
import com.freestudio.identification.service.impl.IdentityAuthenticationSocketImpl;
import com.freestudio.utils.Constant;

@Controller
@RequestMapping("/identification/authentication")
public class IdentificationController {

	@Autowired
	private MerchantService merchantService;

	/**
	 * 发起申请，获取认证随机数
	 * 
	 * @return
	 */
	@RequestMapping("/getrandomnumberfromplatform")
	@ResponseBody
	public JSONMessage getAuthenticationApplyResponseView(
			AuthenticationApplyModel condition) {
		JSONMessage jsonMessage = new JSONMessage();
		jsonMessage.setMsg(Constant.EXTCUTE_FAILED);
		jsonMessage.setResult(false);
		if (StringUtils.isEmpty(condition.getAppkey())) {
			jsonMessage.setMsg(Constant.APPKEY_IS__NULL);
			return jsonMessage;
		}
		MerchantModel merchantFromDatabase = merchantService
				.getMerchantByAppKey(condition.getAppkey());
		if (merchantFromDatabase == null) {
			jsonMessage.setMsg(Constant.APPKEY_IS_WRONG);
			return jsonMessage;
		}
		AuthenticationApplyResponseModel resultData = IdentityAuthenticationSocketImpl
				.getAuthenticationApplyResponseView(condition);
		if (resultData != null) {
			jsonMessage.setData(resultData);
			jsonMessage.setResult(true);
			jsonMessage.setMsg(Constant.EXTCUTE_SUCCESS);
		}
		return jsonMessage;
	}

}
