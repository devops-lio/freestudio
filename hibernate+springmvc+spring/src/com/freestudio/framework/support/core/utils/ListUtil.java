package com.freestudio.framework.support.core.utils;

import java.util.HashSet;
import java.util.List;

/**
 * List工具类
 * 
 */
public class ListUtil {

	/**
	 * 剔除LongList中重复的数据,不维持list原来的顺序
	 * 
	 * @param list
	 */
	public static void removeDuplicate(List<Long> list) {
		// Debug.println("removeDuplicate-list:" + list.size());
		HashSet<Long> h = new HashSet<Long>(list);
		list.clear();
		list.addAll(h);
		// Debug.println("removeDuplicate-list:" + list.size());
	}

	/**
	 * 判断idList是否为空
	 * 
	 * @param idList
	 * @return
	 */
	public static boolean isNotBlank(List<Long> idList) {
		if (idList != null && idList.size() > 0) {
			return true;
		} else {
			return false;
		}
	}

}
