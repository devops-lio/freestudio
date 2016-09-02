package com.freestudio.framework.support.security.filter;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.freestudio.framework.support.core.utils.Debug;
import com.octo.captcha.service.CaptchaService;
import com.octo.captcha.service.CaptchaServiceException;

/**
 * JCaptcha验证码过滤类
 * 
 * 
 */
public class JCaptchaFilter implements Filter {

	// web.xml中的参数名定义
	public static final String CAPTCHA_PARAMTER_NAME_PARAM = "captchaParamterName";
	public static final String CAPTCHA_SERVICE_ID_PARAM = "captchaServiceId";
	public static final String FILTER_PROCESSES_URL_PARAM = "filterProcessesUrl";
	public static final String FAILURE_URL_PARAM = "failureUrl";
	public static final String AUTO_PASS_VALUE_PARAM = "autoPassValue";

	// 默认值定义
	public static final String DEFAULT_FILTER_PROCESSES_URL = "/backcontrol/j_spring_security_check";
	public static final String DEFAULT_CAPTCHA_SERVICE_ID = "captchaService";
	public static final String DEFAULT_CAPTCHA_PARAMTER_NAME = "j_captcha";
	public static final String INVALID_AUTO_PASS_VALUE = "invalid";

	private static Logger logger = LoggerFactory
			.getLogger(JCaptchaFilter.class);
	private String failureUrl;// 验证失败跳转的URL（默认值）
	private String failureFrontUrl;// 前台验证失败跳转的URL
	private String failureAdminUrl;// 后台验证失败跳转的URL
	private String filterProcessesUrl;// 验证成功跳转的URL（默认值）
	private String filterProcessesFrontUrl;// 前台验证成功跳转的URL
	private String filterProcessesAdminUrl;// 后台验证成功跳转的URL
	private String captchaServiceId;
	private String captchaParamterName;
	private String autoPassValue;
	private CaptchaService captchaService;

	public JCaptchaFilter() {
		this.filterProcessesUrl = DEFAULT_FILTER_PROCESSES_URL;
		this.captchaServiceId = DEFAULT_CAPTCHA_SERVICE_ID;
		this.captchaParamterName = DEFAULT_CAPTCHA_PARAMTER_NAME;
		this.autoPassValue = INVALID_AUTO_PASS_VALUE;
	}

	public void init(FilterConfig fConfig) throws ServletException {
		initParameters(fConfig);
		initCaptchaService(fConfig);
	}

	/**
	 * 初始化web.xml中定义的filter init-param
	 * 
	 * @param fConfig
	 */
	protected void initParameters(FilterConfig fConfig) {
		if (StringUtils.isBlank(fConfig.getInitParameter("failureUrl"))) {
			throw new IllegalArgumentException("CaptchaFilter缺少failureUrl参数");
		}
		this.failureUrl = fConfig.getInitParameter("failureUrl");
		Debug.println("initParameters-failureUrl:" + failureUrl);
		if (StringUtils.isNotBlank(fConfig.getInitParameter("failureFrontUrl"))) {
			this.failureFrontUrl = fConfig.getInitParameter("failureFrontUrl");
		}
		Debug.println("initParameters-failureFrontUrl:" + failureFrontUrl);
		if (StringUtils.isNotBlank(fConfig.getInitParameter("failureAdminUrl"))) {
			this.failureAdminUrl = fConfig.getInitParameter("failureAdminUrl");
		}
		Debug.println("initParameters-failureAdminUrl:" + failureAdminUrl);

		if (StringUtils.isNotBlank(fConfig
				.getInitParameter("filterProcessesUrl"))) {
			this.filterProcessesUrl = fConfig
					.getInitParameter("filterProcessesUrl");
		}
		Debug.println("initParameters-filterProcessesUrl:" + filterProcessesUrl);
		if (StringUtils.isNotBlank(fConfig
				.getInitParameter("filterProcessesFrontUrl"))) {
			this.filterProcessesFrontUrl = fConfig
					.getInitParameter("filterProcessesFrontUrl");
		}
		Debug.println("initParameters-filterProcessesFrontUrl:"
				+ filterProcessesFrontUrl);
		if (StringUtils.isNotBlank(fConfig
				.getInitParameter("filterProcessesAdminUrl"))) {
			this.filterProcessesAdminUrl = fConfig
					.getInitParameter("filterProcessesAdminUrl");
		}
		Debug.println("initParameters-filterProcessesAdminUrl:"
				+ filterProcessesAdminUrl);

		if (StringUtils
				.isNotBlank(fConfig.getInitParameter("captchaServiceId"))) {
			this.captchaServiceId = fConfig
					.getInitParameter("captchaServiceId");
		}

		if (StringUtils.isNotBlank(fConfig
				.getInitParameter("captchaParamterName"))) {
			this.captchaParamterName = fConfig
					.getInitParameter("captchaParamterName");
		}

		if (StringUtils.isNotBlank(fConfig.getInitParameter("autoPassValue")))
			this.autoPassValue = fConfig.getInitParameter("autoPassValue");
	}

	/**
	 * 从ApplicatonContext获取CaptchaService实例
	 * 
	 * @param fConfig
	 */
	protected void initCaptchaService(FilterConfig fConfig) {
		ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(fConfig.getServletContext());
		this.captchaService = ((CaptchaService) context
				.getBean(this.captchaServiceId));
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest theRequest,
			ServletResponse theResponse, FilterChain chain) throws IOException,
			ServletException {
		HttpServletRequest request = (HttpServletRequest) theRequest;
		HttpServletResponse response = (HttpServletResponse) theResponse;
		String servletPath = request.getServletPath();
		logger.info("servletPath:" + servletPath);

		Debug.println("servletPath:" + servletPath);
		Debug.println("filterProcessesUrl:" + filterProcessesUrl);
		Debug.println("filterProcessesFrontUrl:" + filterProcessesFrontUrl);
		Debug.println("filterProcessesAdminUrl:" + filterProcessesAdminUrl);

		// 符合filterProcessesUrl为验证处理请求,其余为生成验证图片请求
		if (StringUtils.startsWith(servletPath, this.filterProcessesUrl)) {
			boolean validated = validateCaptchaChallenge(request);
			if (validated) {
				chain.doFilter(request, response);
			} else {
				redirectFailureUrl(request, response, this.failureUrl);
			}
		} else if (StringUtils.startsWith(servletPath,
				this.filterProcessesFrontUrl)) {
			boolean validated = validateCaptchaChallenge(request);
			if (validated) {
				chain.doFilter(request, response);
			} else {
				redirectFailureUrl(request, response, this.failureFrontUrl);
			}
		} else if (StringUtils.startsWith(servletPath,
				this.filterProcessesAdminUrl)) {
			boolean validated = validateCaptchaChallenge(request);
			if (validated) {
				chain.doFilter(request, response);
			} else {
				redirectFailureUrl(request, response, this.failureAdminUrl);
			}
		} else {
			genernateCaptchaImage(request, response);
		}

	}

	/**
	 * 生成验证码图片
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	protected void genernateCaptchaImage(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 设置禁止客户端缓存的Header
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0L);
		response.setContentType("image/jpeg");

		ServletOutputStream out = response.getOutputStream();
		try {
			String captchaId = request.getSession(true).getId();
			BufferedImage challenge = (BufferedImage) this.captchaService
					.getChallengeForID(captchaId, request.getLocale());
			ImageIO.write(challenge, "jpg", out);
			out.flush();
		} catch (CaptchaServiceException e) {
			logger.error(e.getMessage(), e);
		} finally {
			out.close();
		}
	}

	/**
	 * 验证验证码
	 * 
	 * @param request
	 * @return
	 */
	protected boolean validateCaptchaChallenge(HttpServletRequest request) {
		try {
			String captchaID = request.getSession().getId();
			logger.info("captchaID:" + captchaID);
			String challengeResponse = request
					.getParameter(this.captchaParamterName);
			logger.info("challengeResponse:" + challengeResponse);

			// 自动通过值存在时,检验输入值是否等于自动通过值
			if ((!"invalid".equals(this.autoPassValue))
					&& (this.autoPassValue.equals(challengeResponse))) {
				return true;
			}
			return this.captchaService.validateResponseForID(captchaID,
					challengeResponse).booleanValue();
		} catch (CaptchaServiceException e) {
			logger.error(e.getMessage(), e);
		}
		return false;
	}

	/**
	 * 跳转到失败页面 可在子类进行扩展, 比如在session中放入SpringSecurity的Exception
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	protected void redirectFailureUrl(HttpServletRequest request,
			HttpServletResponse response, String failUrl) throws IOException {
		logger.info("跳转到失败页面:" + request.getContextPath() + failUrl);
		Debug.println("跳转到失败页面:" + request.getContextPath() + failUrl);
		response.sendRedirect(request.getContextPath() + failUrl);
	}

}
