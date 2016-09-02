package com.freestudio.framework.support.security.authentication.dao;

import org.apache.log4j.Logger;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.authentication.encoding.PlaintextPasswordEncoder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import com.freestudio.framework.support.security.core.userdetails.LoginUserDetailsService;

/**
 *
 */
public class LoginAuthenticationProvider extends
		AbstractUserDetailsAuthenticationProvider {

	public LoginAuthenticationProvider() {
		passwordEncoder = new PlaintextPasswordEncoder();
		includeDetailsObject = true;
	}

	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		Object salt = null;
		if (saltSource != null)
			salt = saltSource.getSalt(userDetails);
		if (authentication.getCredentials() == null) {
			logger.debug("Authentication failed: no credentials provided");
			throw new BadCredentialsException(messages.getMessage(
					"AbstractUserDetailsAuthenticationProvider.badCredentials",
					"Bad credentials"),
					includeDetailsObject ? ((Object) (userDetails)) : null);
		}
		String presentedPassword = authentication.getCredentials().toString();
		if (!passwordEncoder.isPasswordValid(userDetails.getPassword(),
				presentedPassword, salt)) {
			logger.debug("Authentication failed: password does not match stored value");
			throw new BadCredentialsException(messages.getMessage(
					"AbstractUserDetailsAuthenticationProvider.badCredentials",
					"Bad credentials"),
					includeDetailsObject ? ((Object) (userDetails)) : null);
		} else {
			return;
		}
	}

	protected void doAfterPropertiesSet() throws Exception {
		Assert.notNull(userDetailsService, "A UserDetailsService must be set");
	}

	protected final UserDetails retrieveUser(String username,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		UserDetails loadedUser;
		try {
			String password = (String) authentication.getCredentials();
			loadedUser = getUserDetailsService().loadUserByUsername(username,
					password);
		} catch (DataAccessException repositoryProblem) {
			throw new AuthenticationServiceException(
					repositoryProblem.getMessage(), repositoryProblem);
		}
		if (loadedUser == null)
			throw new AuthenticationServiceException(
					"UserDetailsService returned null, which is an interface contract violation");
		else
			return loadedUser;
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	protected PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public void setSaltSource(SaltSource saltSource) {
		this.saltSource = saltSource;
	}

	protected SaltSource getSaltSource() {
		return saltSource;
	}

	public void setUserDetailsService(LoginUserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	protected LoginUserDetailsService getUserDetailsService() {
		return userDetailsService;
	}

	protected boolean isIncludeDetailsObject() {
		return includeDetailsObject;
	}

	/**
	 * @deprecated Method setIncludeDetailsObject is deprecated
	 */

	public void setIncludeDetailsObject(boolean includeDetailsObject) {
		this.includeDetailsObject = includeDetailsObject;
	}

	private PasswordEncoder passwordEncoder;
	private SaltSource saltSource;
	private LoginUserDetailsService userDetailsService;
	private boolean includeDetailsObject;
}

/*
 * DECOMPILATION REPORT
 * 
 * Decompiled from:
 * C:\workjianfa\project\jianfa\WebRoot\WEB-INF\lib\spring-security
 * -core-3.0.5.RELEASE.jar Total time: 16 ms Jad reported messages/errors: Exit
 * status: 0 Caught exceptions:
 */