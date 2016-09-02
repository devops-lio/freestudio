package com.freestudio.framework.support.security.init;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.AntUrlPathMatcher;
import org.springframework.security.web.util.UrlMatcher;

import com.freestudio.framework.support.core.utils.Debug;
import com.freestudio.framework.support.security.model.Authority;

/**
 * 加载所有资源权限关系,并在请求时返回请求资源所需的权限
 * 
 * 
 */
public class InvocationSecurityMetadataSource implements
		FilterInvocationSecurityMetadataSource {

	private UrlMatcher urlMatcher = new AntUrlPathMatcher();
	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

	public InvocationSecurityMetadataSource() {
		loadResourceDefine();
	}

	/**
	 * 项目部署时加载所有URL及其对应的权限
	 */
	private void loadResourceDefine() {
		if (resourceMap == null) {
			// 资源权限map.key:资源;value:权限
			resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
			// // 加载spring配置文件
			// String[] param = new String[] {
			// "classpath:/resources/main/applicationContext.xml",
			// "classpath:/resources/security/applicationContext-security.xml"
			// };
			// ClassPathXmlApplicationContext context = new
			// ClassPathXmlApplicationContext(param);
			// BeanFactory beanFactory = context.getBeanFactory();
			// Debug.println("loadResourceDefine........");
			// // 取得服务类
			// AuthorityDao authorityDao = (AuthorityDao)
			// beanFactory.getBean("authorityDao");
			// List<Authority> authoritys = authorityDao.getAll();
			AuthorityJDBC authorityJDBC = new AuthorityJDBC();
			// 取出所有资源与权限对应的关系,并加入到resourceMap中
			List<Authority> authorityList = authorityJDBC.getAuthoritys();
			if (authorityList != null) {
				for (Authority authority : authorityList) {
					Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
					ConfigAttribute configAttribute = new SecurityConfig(
							authority.getPrefixedName());
					configAttributes.add(configAttribute);
					Debug.println("authority-Value:" + authority.getUrl()
							+ " authority-PrefixedName:"
							+ authority.getPrefixedName());
					resourceMap.put(authority.getUrl(), configAttributes);
				}
			}
		}
	}

	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return null;
	}

	public Collection<ConfigAttribute> getAttributes(Object object)
			throws IllegalArgumentException {
		String requestURL = ((FilterInvocation) object).getRequestUrl();
		// 如果后台更改了权限资源表,则须刷新内存,在这通过判断resourceMap是否为null来重载所有资源权限信息
		if (resourceMap == null) {
			loadResourceDefine();
		}
		Iterator<String> iterator = resourceMap.keySet().iterator();
		while (iterator.hasNext()) {
			String resRUL = iterator.next();
			// 判断请求的URL是否需要权限访问(在resourceMap中存在该URL则需要进行权限控制)
			if (urlMatcher.pathMatchesUrl(requestURL, resRUL)) {
				// 返回访问该URL需要的权限
				return resourceMap.get(resRUL);
			}
		}
		return null;
	}

	/**
	 * 刷新内存,后台权限资源有所更改,调用该方法进行刷新内存
	 */
	public static void reFresh() {
		resourceMap = null;
	}

	public boolean supports(Class<?> arg0) {
		return true;
	}

}
