package com.freestudio.framework.support.security.model;

/**
 * 性别枚举类
 * 
 * 
 */
public enum Gender {

	MAN {
		public String getName() {
			return "男";
		}
	},
	WOMEN {
		public String getName() {
			return "女";
		}
	};

	public abstract String getName();

}
