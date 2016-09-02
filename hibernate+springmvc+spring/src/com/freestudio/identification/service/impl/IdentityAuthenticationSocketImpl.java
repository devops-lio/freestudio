package com.freestudio.identification.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freestudio.identification.model.AuthenticationApplyModel;
import com.freestudio.identification.model.AuthenticationApplyResponseModel;
import com.freestudio.identification.service.IdentityAuthenticationSocket;
import com.freestudio.identification.view.AuthenticationApplyView;
import com.freestudio.identification.view.SocketFormatView;
import com.freestudio.utils.ByteUtil;
import com.freestudio.utils.Constant;
import com.freestudio.utils.ReflectUtil;

@Service
@Transactional(readOnly = true)
// 开启事务在方法上写@Transactional(readOnly = false)
public class IdentityAuthenticationSocketImpl implements
		IdentityAuthenticationSocket {

	/**
	 * 版本号统一处理
	 * 
	 * @param versionName
	 * @return
	 */
	public static byte[] getVersionBytes(String versionName) {
		if (StringUtils.isBlank(versionName)) {
			// 默认版本处理
			versionName = "0.0.0.0";
		}
		String[] versionNames = versionName.split("\\.");
		byte[] versionBytes = new byte[4];
		for (int i = 0; i < 4; i++) {
			if (i < versionNames.length) {
				if (StringUtils.isNumeric(versionNames[i])) {
					versionBytes[i] = (byte) (Integer.parseInt(versionNames[i]) & 0xFF);
				} else {
					versionBytes[i] = (byte) (versionNames[i].charAt(0) & 0xFF);
				}
			} else {
				versionBytes[i] = (byte) 0x00;
			}
		}

		return versionBytes;
	}

	public static AuthenticationApplyResponseModel getAuthenticationApplyResponseView(
			AuthenticationApplyModel condition) {
		byte[] dataArea = setAuthenticationDataArea(condition);
		SocketFormatView socketFormatView = new SocketFormatView();
		socketFormatView.setOrderType(ByteUtil
				.getByteOfInt(Constant.REQUEST_ORDER_TYPE));
		socketFormatView.setOrder(ByteUtil.getByteOfInt(Constant.APPLY_ORDER));
		socketFormatView.setData(dataArea);
		// 签名区
		// DSign ds = new DSign();
		// DSign.init(Constant.SIGNATURE_SERVER_FILE_LOCATION); // 通过配置文件读取参数
		// byte[] srccode = b11;
		// String signReturn =ds.p1Sign(Constant.CERTIFICATE_ID,
		// Constant.DIGEST_ALGORITHM, srccode);// 返回签名结果
		// byte[] signResult = Base64.decode(signReturn);
		return null;
	}

	private static byte[] setAuthenticationDataArea(
			AuthenticationApplyModel condition) {
		AuthenticationApplyView view = new AuthenticationApplyView();
		view.setReaderCardVersion(IdentityAuthenticationSocketImpl
				.getVersionBytes(condition.getReaderCardVersion()));
		view.setImageControlVersion(IdentityAuthenticationSocketImpl
				.getVersionBytes(condition.getImageControlVersion()));
		view.setCertificateSerialNumber(ByteUtil
				.hexStringToByteArray(Constant.CERTIFICATE_SERIAL_NUMBER));
		byte[] dataArea = ReflectUtil.reflectUtil(view);
		return dataArea;
	}

	public static void main(String[] args) {
		byte[] dataArea = setAuthenticationDataArea(new AuthenticationApplyModel());
		System.out.println(dataArea.length);
	}

}
