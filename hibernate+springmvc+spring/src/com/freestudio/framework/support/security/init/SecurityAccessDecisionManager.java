package com.freestudio.framework.support.security.init;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * 判断用户是否能否访问请求资源
 * 
 * 
 */
public class SecurityAccessDecisionManager implements AccessDecisionManager {

	/**
	 * authentication 用户拥有的所有权限 object 请求的资源 configAttributes 访问所有请求资源所需的权限信息
	 */
	public void decide(Authentication authentication, Object object,
			Collection<ConfigAttribute> configAttributes)
			throws AccessDeniedException, InsufficientAuthenticationException {
		if (configAttributes == null) {
			// 请求的资源不需要任何权限
			return;
		}
		Iterator<ConfigAttribute> iterator = configAttributes.iterator();
		while (iterator.hasNext()) {
			ConfigAttribute configAttribute = iterator.next();
			// 访问所请求资源所需的权限
			String needPermission = ((SecurityConfig) configAttribute)
					.getAttribute();
			// 用户所拥有的权限
			for (GrantedAuthority grantedAuthority : authentication
					.getAuthorities()) {
				// 访问所请求资源所需多的权限与用户所拥有的权限匹配,则return
				if (needPermission.equals(grantedAuthority.getAuthority())) {
					return;
				}
			}
			// 1.所请求资源不需要权限控制
			// 2.用户拥有访问该资源的权限.除了前面两种情况,否则抛出无权限异常
			throw new AccessDeniedException("No Access");
		}
	}

	public boolean supports(ConfigAttribute arg0) {
		return true;
	}

	public boolean supports(Class<?> arg0) {
		return true;
	}

}
