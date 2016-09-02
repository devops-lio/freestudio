package com.freestudio.framework.support.core.utils;

import java.util.Comparator;

import com.freestudio.framework.support.security.model.Resource;

/**
 * 菜单顺序比较器
 * 
 */
@SuppressWarnings("unchecked")
public class ModuleOrderComparator implements Comparator {

	/**
	 * 比较顺序
	 * 
	 * @param o1
	 *            Object：第一个
	 * @param o2
	 *            Object：第二个
	 * @return int：返回值
	 */
	public int compare(Object o1, Object o2) {
		Resource menu1 = (Resource) o1;
		Resource menu2 = (Resource) o2;
		// 如果有为空的则不再判断
		int res = nullCheck(menu1, menu2);
		// 两个都不为空
		if (res != -3) {
			return res;
		}
		// 判断顺序
		int res2 = nullCheck(menu1.getOrderNo(), menu2.getOrderNo());
		if (res2 != -3) {
			// 有一个顺序为空则返回
			return res2;
		}
		// 两个顺序都不为空
		Integer order1 = menu1.getOrderNo();
		Integer order2 = menu2.getOrderNo();
		if (order1.longValue() == order2.longValue()) {
			return 0;
		}
		return order1 > order2 ? 1 : -1;

	}

	/**
	 * null的检查
	 * 
	 * @param o1
	 *            Object：对象1
	 * @param o2
	 *            Object：对象2
	 * @return int：0 相等；1 大于；-1 小于；-3 两个都不为空
	 */
	private static int nullCheck(Object o1, Object o2) {
		if (o1 != null && o2 != null) {
			return -3;
		}
		if (o1 == null && o2 == null) {
			// 两个都为null表示相等
			return 0;
		}
		if (o1 == null) {
			// 一个null一个不为null
			return -1;
		}
		if (o2 == null) {
			// 一个null一个不为null
			return -1;
		}
		return -3;
	}
}
