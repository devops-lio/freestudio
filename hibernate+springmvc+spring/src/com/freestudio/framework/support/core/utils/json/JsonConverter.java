package com.freestudio.framework.support.core.utils.json;

import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import com.freestudio.framework.support.core.utils.DateUtil;
import com.freestudio.framework.support.core.utils.StringUtil;

/**
 * JSON工具类
 * 
 * 
 */
public class JsonConverter<T> {

	// -- JAVA基本数据类型类 --//
	public static final String TYPE_CLS_STRING = "java.lang.String";
	public static final String TYPE_CLS_INTEGER = "java.lang.Integer";
	public static final String TYPE_CLS_LONG = "java.lang.Long";
	public static final String TYPE_CLS_FLOAT = "java.lang.Float";
	public static final String TYPE_CLS_DOUBLE = "java.lang.Double";
	public static final String TYPE_CLS_BOOLEAN = "java.lang.Boolean";
	public static final String TYPE_CLS_BYTE = "java.lang.Byte";
	public static final String TYPE_CLS_SHORT = "java.lang.Short";
	public static final String TYPE_CLS_DATE = "java.util.Date";

	// -- JAVA简单数据类型 --//
	public static final String TYPE_INTEGER = "int";
	public static final String TYPE_LONG = "long";
	public static final String TYPE_FLOAT = "float";
	public static final String TYPE_DOUBLE = "double";
	public static final String TYPE_BOOLEAN = "boolean";
	public static final String TYPE_BYTE = "byte";
	public static final String TYPE_SHORT = "short";

	private String datePattern = "yyyy-MM-dd HH:mm:ss";

	private static final Logger log = Logger.getLogger(JsonConverter.class);
	private static final ObjectMapper objectMapper = new ObjectMapper();

	/**
	 * List<T>转换成 JSON
	 * 
	 * @param object
	 * @return
	 */
	public String objectListToJsons(List<T> list) {
		StringWriter writer = new StringWriter();
		try {
			objectMapper.writeValue(writer, list);
		} catch (RuntimeException e) {
			e.printStackTrace();
			throw e;
		} catch (Exception e) {
			log.error("Unable to serialize to json: " + list, e);
			e.printStackTrace();
			return null;
		}
		return writer.toString();
	}

	/**
	 * 实体/列表/HashMap... 转换成 JSON
	 * 
	 * @param object
	 * @return
	 */
	public String objectToJson(Object object) {
		StringWriter writer = new StringWriter();
		try {
			objectMapper.writeValue(writer, object);
		} catch (RuntimeException e) {
			e.printStackTrace();
			throw e;
		} catch (Exception e) {
			log.error("Unable to serialize to json: " + object, e);
			e.printStackTrace();
			return null;
		}
		return writer.toString();
	}

	/**
	 * JSON转化成实体对象（严谨匹配）
	 * 
	 * @param json
	 * @param klass
	 * @return
	 */
	public T jsonToObject(String json, Class<T> klass) {
		T object;
		try {
			object = objectMapper.readValue(json, klass);
		} catch (RuntimeException e) {
			e.printStackTrace();
			log.error("Runtime exception during deserializing "
					+ klass.getSimpleName() + " from ");
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception during deserializing " + klass.getSimpleName()
					+ " from ");
			return null;
		}
		return object;
	}

	/**
	 * JSON转化成实体对象（非严谨匹配）
	 * 
	 * @param <T>
	 * @param json
	 * @param nodePath
	 *            从根节点到目的节点的路径，比如
	 *            {"config":{"suncco":{"node":{"name":"xiaoben","xx"
	 *            :"dd","ss":"dd"}}}} 传入config/suncco/node
	 * @param klass
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public T jsonToObject(String json, String nodePath, Class<T> klass) {

		// 字段类型
		String[] fieldType;
		// 字段属性名，首字母大写
		String[] fieldTitle;
		// 字段属性名
		String[] lFieldTitle;
		try {
			// 获取实体类的所有属性，返回Field数组
			Field[] field = klass.getDeclaredFields();
			fieldTitle = new String[field.length];
			fieldType = new String[field.length];
			lFieldTitle = new String[field.length];

			// 遍历所有属性
			for (int j = 0; j < field.length; j++) {
				lFieldTitle[j] = field[j].getName();
				// 属性名
				fieldTitle[j] = StringUtil.wordFrontUpperToLower(field[j]
						.getName());
				// 字段类型
				String type = field[j].getGenericType().toString();
				if (type.contains("class")) {
					type = type.substring(type.indexOf("class ") + 6,
							type.length());
				}
				fieldType[j] = type;
			}

			// 根节点
			JsonNode node = objectMapper.readTree(json);

			// 根据节点路径找到目的节点
			if (nodePath != null && !nodePath.equals("")) {
				String[] paths = nodePath.split("/");
				for (String path : paths) {
					node = node.get(path);
				}
			}

			// 实例化实体
			T model = klass.newInstance();

			// 设置实体对象属性
			int i = 0;
			while (i < fieldType.length) {
				Method method = klass.getMethod("set" + fieldTitle[i],
						Class.forName(fieldType[i]));
				String value = "";
				value = node.get(lFieldTitle[i]).getValueAsText();
				invoke(model, method, value, fieldType[i]);
				i++;
			}

			return model;
		} catch (RuntimeException e) {
			e.printStackTrace();
			log.error("Runtime exception during deserializing "
					+ klass.getSimpleName() + " from ");
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception during deserializing " + klass.getSimpleName()
					+ " from ");
			return null;
		}
	}

	/**
	 * 导入数据匹配字段类型
	 * 
	 * @param clsType
	 * @param model
	 * @param method
	 * @param value
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	private boolean invoke(T model, Method method, String value, String clsType)
			throws IllegalArgumentException, IllegalAccessException,
			InvocationTargetException {
		if (clsType.equals(JsonConverter.TYPE_CLS_STRING)) {
			method.invoke(model, value);
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_BOOLEAN)
				|| clsType.equals(JsonConverter.TYPE_CLS_BOOLEAN)) {
			if (value.equals("true")) {
				method.invoke(model, true);
			} else if (value.equals("false")) {
				method.invoke(model, false);
			}
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_BYTE)
				|| clsType.equals(JsonConverter.TYPE_BYTE)) {
			method.invoke(model, Byte.parseByte(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_DOUBLE)
				|| clsType.equals(JsonConverter.TYPE_DOUBLE)) {
			method.invoke(model, Double.parseDouble(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_FLOAT)
				|| clsType.equals(JsonConverter.TYPE_FLOAT)) {
			method.invoke(model, Float.parseFloat(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_INTEGER)
				|| clsType.equals(JsonConverter.TYPE_INTEGER)) {
			method.invoke(model, Integer.parseInt(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_LONG)
				|| clsType.equals(JsonConverter.TYPE_LONG)) {
			method.invoke(model, Long.parseLong(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_SHORT)
				|| clsType.equals(JsonConverter.TYPE_SHORT)) {
			method.invoke(model, Short.parseShort(value));
			return true;
		} else if (clsType.equals(JsonConverter.TYPE_CLS_DATE)) {
			Date date = DateUtil.StringToDate(value, datePattern);
			method.invoke(model, date);
			return true;
		}
		return false;
	}

}
