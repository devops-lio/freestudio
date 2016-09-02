package com.freestudio.framework.support.core.utils.spring;

import java.util.Enumeration;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.util.ObjectUtils;

import com.freestudio.framework.support.core.utils.encode.MessageDigestUtils;

/**
 * 对spring applicationContext.xml进行64位解密.
 * 
 * 
 */
public class DecryptPropertyPlaceholderConfigurer extends
		PropertyPlaceholderConfigurer {

	private List<String> decodePropertyNames;

	public List<String> getDecodePropertyNames() {
		return decodePropertyNames;
	}

	public void setDecodePropertyNames(List<String> decodePropertyNames) {
		this.decodePropertyNames = decodePropertyNames;
	}

	@Override
	protected void convertProperties(Properties props) {
		Enumeration<?> propertyNames = props.propertyNames();
		while (propertyNames.hasMoreElements()) {
			String propertyName = (String) propertyNames.nextElement();
			String propertyValue = props.getProperty(propertyName);
			String convertedValue = null;
			if (this.decodePropertyNames != null
					&& decodePropertyNames.size() > 0) {
				if (this.decodePropertyNames.contains(propertyName)) {
					convertedValue = MessageDigestUtils.encode(propertyValue);
				} else {
					convertedValue = convertPropertyValue(propertyValue);
				}
			} else {
				convertedValue = convertPropertyValue(propertyValue);
			}
			if (!ObjectUtils.nullSafeEquals(propertyValue, convertedValue)) {
				props.setProperty(propertyName, convertedValue);
			}
		}
	}

}
