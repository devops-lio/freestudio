package com.freestudio.framework.support.core.dao.hibernate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.impl.CriteriaImpl;
import org.hibernate.transform.ResultTransformer;
import org.springframework.util.Assert;

import com.freestudio.framework.support.core.model.orm.Page;
import com.freestudio.framework.support.core.model.orm.PropertyFilter;
import com.freestudio.framework.support.core.model.orm.PropertyFilter.MatchType;
import com.freestudio.framework.support.core.model.orm.PropertyFilter.PropertyType;
import com.freestudio.framework.support.core.utils.reflection.ConvertUtils;
import com.freestudio.framework.support.core.utils.reflection.ReflectionUtils;

/**
 * 封装SpringSide扩展功能的Hibernat DAO泛型基类.
 * 
 * 扩展功能包括分页查询,按属性过滤条件列表查询. 可在Service层直接使用,也可以扩展泛型DAO子类使用,见两个构造函数的注释.
 * 
 * @param <T>
 *            DAO操作的对象类型
 * @param <PK>
 *            主键类型
 * 
 * 
 */
public abstract class HibernateDaoImpl<T, PK extends Serializable> extends
		SimpleHibernateDaoImpl<T, PK> implements HibernateDao<T, PK> {

	/**
	 * 用于Dao层子类的构造函数. 通过子类的泛型定义取得对象类型Class. eg. public class UserDao extends
	 * HibernateDao<User, Long>{ }
	 */
	public HibernateDaoImpl() {
		super();
	}

	/**
	 * 用于省略Dao层, Service层直接使用通用HibernateDao的构造函数. 在构造函数中定义对象类型Class. eg.
	 * HibernateDao<User, Long> userDao = new HibernateDao<User,
	 * Long>(sessionFactory, User.class);
	 */
	public HibernateDaoImpl(final SessionFactory sessionFactory,
			final Class<T> entityClass) {
		super(sessionFactory, entityClass);
	}

	// -- 分页查询函数 --//

	/**
	 * 分页获取全部对象.
	 * 
	 * @param page
	 *            分页参数. 注意不支持其中的orderBy参数.
	 * @param isCache
	 *            是否开启缓存 return
	 */
	public Page<T> getAll(final Page<T> page, final boolean isCache) {
		return findPage(page, isCache);
	}

	/**
	 * 按HQL分页查询.
	 * 
	 * @param page
	 *            分页参数. 注意不支持其中的orderBy参数.
	 * @param hql
	 *            hql语句.
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            数量可变的查询参数,按顺序绑定.
	 * @return 分页查询结果, 附带结果列表及所有查询输入参数.
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final String hql, final Object... values) {
		Assert.notNull(page, "page不能为空");

		Query q = createQuery(hql, values);

		if (page.isAutoCount()) {
			long totalCount = countHqlResult(hql, isCache, values);
			page.setTotalCount(totalCount);
		}
		if (isCache) {
			q.setCacheable(true);
		}

		setPageParameterToQuery(q, page);

		List result = q.list();
		page.setResult(result);
		return page;
	}

	/**
	 * 按HQL分页查询.
	 * 
	 * @param page
	 *            分页参数. 注意不支持其中的orderBy参数.
	 * @param hql
	 *            hql语句.
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return 分页查询结果, 附带结果列表及所有查询输入参数.
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final String hql, final Map<String, ?> values) {
		Assert.notNull(page, "page不能为空");

		Query q = createQuery(hql, values);

		if (page.isAutoCount()) {
			long totalCount = countHqlResult(hql, isCache, values);
			page.setTotalCount(totalCount);
		}
		if (isCache) {
			q.setCacheable(true);
		}

		setPageParameterToQuery(q, page);

		List result = q.list();
		page.setResult(result);
		return page;
	}

	/**
	 * 按Criteria分页查询.
	 * 
	 * @param page
	 *            分页参数.
	 * @param isCache
	 *            是否开启缓存
	 * @param criterions
	 *            数量可变的Criterion.
	 * @return 分页查询结果.附带结果列表及所有查询输入参数.
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final Criterion... criterions) {
		Assert.notNull(page, "page不能为空");

		Criteria c = createCriteria(isCache, criterions);

		if (page.isAutoCount()) {
			long totalCount = countCriteriaResult(c);
			page.setTotalCount(totalCount);
		}

		setPageParameterToCriteria(c, page);

		List result = c.list();
		page.setResult(result);
		return page;
	}

	/**
	 * 设置分页参数到Query对象,辅助函数.
	 * 
	 * @param q
	 *            Query查询对象
	 * @param page
	 *            分页对象.
	 * @return
	 */
	public Query setPageParameterToQuery(final Query q, final Page<T> page) {
		Assert.isTrue(page.getPageSize() > 0, "Page Size must larger than zero");
		// hibernate的firstResult的序号从0开始
		q.setFirstResult(page.getFirst() - 1);
		q.setMaxResults(page.getPageSize());
		return q;
	}

	/**
	 * 设置分页参数到Criteria对象,辅助函数.
	 * 
	 * @param c
	 *            Criteria对象
	 * @param page
	 *            分页对象.
	 * @return
	 */
	public Criteria setPageParameterToCriteria(final Criteria c,
			final Page<T> page) {

		Assert.isTrue(page.getPageSize() > 0, "Page Size must larger than zero");

		// hibernate的firstResult的序号从0开始
		c.setFirstResult(page.getFirst() - 1);
		c.setMaxResults(page.getPageSize());

		if (page.isOrderBySetted()) {
			String[] orderByArray = StringUtils.split(page.getOrderBy(), ',');
			String[] orderArray = StringUtils.split(page.getOrder(), ',');

			Assert.isTrue(orderByArray.length == orderArray.length,
					"分页多重排序参数中,排序字段与排序方向的个数不相等");

			for (int i = 0; i < orderByArray.length; i++) {
				if (Page.ASC.equals(orderArray[i])) {
					c.addOrder(Order.asc(orderByArray[i]));
				} else {
					c.addOrder(Order.desc(orderByArray[i]));
				}
			}
		}
		return c;
	}

	/**
	 * 执行count查询获得本次Hql查询所能获得的对象总数. 本函数只能自动处理简单的hql语句,复杂的hql查询请另行编写count语句查询.
	 * 
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            HQL语句对应的参数值,数量可变的参数,按顺序绑定.
	 * @return
	 */
	public long countHqlResult(final String hql, final boolean isCache,
			final Object... values) {
		String countHql = prepareCountHql(hql);

		try {
			Long count = findUnique(countHql, isCache, values);
			return count;
		} catch (Exception e) {
			throw new RuntimeException("hql can't be auto count, hql is:"
					+ countHql, e);
		}
	}

	/**
	 * 执行count查询获得本次Hql查询所能获得的对象总数. 本函数只能自动处理简单的hql语句,复杂的hql查询请另行编写count语句查询.
	 * 
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            HQL语句对应的参数值,数量可变的参数,按顺序绑定.
	 * @return
	 */
	public long countHqlResult(final String hql, final boolean isCache,
			final Map<String, ?> values) {
		String countHql = prepareCountHql(hql);

		try {
			Long count = findUnique(countHql, isCache, values);
			return count;
		} catch (Exception e) {
			throw new RuntimeException("hql can't be auto count, hql is:"
					+ countHql, e);
		}
	}

	public String prepareCountHql(String orgHql) {
		String fromHql = orgHql;
		// select子句与order by子句会影响count查询,进行简单的排除.
		fromHql = "from " + StringUtils.substringAfter(fromHql, "from");
		fromHql = StringUtils.substringBefore(fromHql, "order by");

		String countHql = "select count(*) " + fromHql;
		return countHql;
	}

	/**
	 * 执行count查询获得本次Criteria查询所能获得的对象总数.
	 * 
	 * @param c
	 *            Criteria对象.
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public long countCriteriaResult(final Criteria c) {
		CriteriaImpl impl = (CriteriaImpl) c;

		// 先把Projection、ResultTransformer、OrderBy取出来,清空三者后再执行Count操作
		Projection projection = impl.getProjection();
		ResultTransformer transformer = impl.getResultTransformer();

		List<CriteriaImpl.OrderEntry> orderEntries = null;
		try {
			orderEntries = (List) ReflectionUtils.getFieldValue(impl,
					"orderEntries");
			ReflectionUtils
					.setFieldValue(impl, "orderEntries", new ArrayList());
		} catch (Exception e) {
			logger.error("不可能抛出的异常:{}", e.getMessage());
		}

		// 执行Count查询
		Long totalCountObject = (Long) c.setProjection(Projections.rowCount())
				.uniqueResult();
		long totalCount = (totalCountObject != null) ? totalCountObject : 0;

		// 将之前的Projection,ResultTransformer和OrderBy条件重新设回去
		c.setProjection(projection);

		if (projection == null) {
			c.setResultTransformer(CriteriaSpecification.ROOT_ENTITY);
		}
		if (transformer != null) {
			c.setResultTransformer(transformer);
		}
		try {
			ReflectionUtils.setFieldValue(impl, "orderEntries", orderEntries);
		} catch (Exception e) {
			logger.error("不可能抛出的异常:{}", e.getMessage());
		}

		return totalCount;
	}

	// -- 属性过滤条件(PropertyFilter)查询函数 --//

	/**
	 * 按属性查找对象列表,支持多种匹配方式.
	 * 
	 * @param matchType
	 *            匹配方式,目前支持的取值见PropertyFilter的MatcheType enum.
	 */
	public List<T> findBy(final String propertyName,
			final Class<?> propertyClass, final Object value,
			final MatchType matchType, final boolean isCache) {
		Criterion criterion = buildCriterion(propertyName, propertyClass,
				value, matchType);
		return find(isCache, criterion);
	}

	/**
	 * 按属性过滤条件列表查找对象列表.
	 * 
	 * @param filters
	 *            PropertyFilter过滤条件
	 * @param isCache
	 *            是否开启缓存
	 * @return
	 */
	public List<T> find(List<PropertyFilter> filters, final boolean isCache) {
		Criterion[] criterions = buildCriterionByPropertyFilter(filters);
		return find(isCache, criterions);
	}

	/**
	 * 按属性过滤条件列表分页查找对象.
	 * 
	 * @param page
	 *            分页对象
	 * @param filters
	 *            PropertyFilter过滤条件
	 * @param isCache
	 *            是否开启缓存
	 * @return
	 */
	public Page<T> findPage(final Page<T> page,
			final List<PropertyFilter> filters, final boolean isCache) {
		Criterion[] criterions = buildCriterionByPropertyFilter(filters);
		return findPage(page, isCache, criterions);
	}

	/**
	 * 按属性条件参数创建Criterion,辅助函数.
	 */
	public Criterion buildCriterion(final String propertyName,
			final Class<?> propertyClass, final Object propertyValue,
			final MatchType matchType) {
		Assert.hasText(propertyName, "propertyName不能为空");
		Criterion criterion = null;
		// 根据MatchType构造criterion
		switch (matchType) {
		case EQ:
			criterion = Restrictions.eq(propertyName, propertyValue);
			break;
		case NE:
			criterion = Restrictions.ne(propertyName, propertyValue);
			break;
		case LE:
			criterion = Restrictions.le(propertyName, propertyValue);
			break;
		case LT:
			criterion = Restrictions.lt(propertyName, propertyValue);
			break;
		case GE:
			criterion = Restrictions.ge(propertyName, propertyValue);
			break;
		case GT:
			criterion = Restrictions.gt(propertyName, propertyValue);
			break;
		case LIKE:
			criterion = Restrictions.like(propertyName, (String) propertyValue,
					MatchMode.ANYWHERE);
			break;
		case NLIKE:
			criterion = Restrictions.not(Restrictions.like(propertyName,
					(String) propertyValue, MatchMode.ANYWHERE));
			break;
		case ISNULL:
			criterion = Restrictions.isNull(propertyName);
			break;
		case NOTNULL:
			criterion = Restrictions.isNotNull(propertyName);
			break;
		case IEMPTY:
			criterion = Restrictions.isEmpty(propertyName);
			break;
		case NEMPTY:
			criterion = Restrictions.isNotEmpty(propertyName);
			break;
		case IN:
			Object[] inValues = ConvertUtils.convertStringToObjects(
					propertyValue.toString(), propertyClass);
			criterion = Restrictions.in(propertyName, inValues);
			break;
		case NIN:
			Object[] ninValues = ConvertUtils.convertStringToObjects(
					propertyValue.toString(), propertyClass);
			criterion = Restrictions.not(Restrictions.in(propertyName,
					ninValues));
			break;
		case BETWEEN:
			Object[] btValues = ConvertUtils.convertStringToObjects(
					propertyValue.toString(), propertyClass);
			criterion = Restrictions.between(propertyName, btValues[0],
					btValues[1]);
			break;
		case NBETWEEN:
			Object[] nbtValues = ConvertUtils.convertStringToObjects(
					propertyValue.toString(), propertyClass);
			criterion = Restrictions.not(Restrictions.between(propertyName,
					nbtValues[0], nbtValues[1]));
		}
		return criterion;
	}

	/**
	 * 按属性条件列表创建Criterion数组,辅助函数.
	 */
	public Criterion[] buildCriterionByPropertyFilter(
			final List<PropertyFilter> filters) {
		List<Criterion> criterionList = new ArrayList<Criterion>();
		for (PropertyFilter filter : filters) {
			if (!filter.hasMultiProperties()) {
				// 只有一个属性需要比较的情况.
				Criterion criterion = buildCriterion(filter.getPropertyName(),
						filter.getPropertyClass(), filter.getMatchValue(),
						filter.getMatchType());
				criterionList.add(criterion);
			} else {
				// 包含多个属性需要比较的情况,进行or处理.
				Disjunction disjunction = Restrictions.disjunction();
				int count = 0;
				for (String param : filter.getPropertyNames()) {
					Criterion criterion = null;
					count++;
					if (!param.equals("") && param.contains("_")) {
						MatchType matchType = null;
						Class<?> propertyClass = null;
						String firstPart = StringUtils.substringBefore(param,
								"_");
						String matchTypeCode = StringUtils.substring(firstPart,
								0, firstPart.length() - 1);
						String propertyTypeCode = StringUtils.substring(
								firstPart, firstPart.length() - 1,
								firstPart.length());
						try {
							matchType = Enum.valueOf(MatchType.class,
									matchTypeCode);
						} catch (RuntimeException e) {
							throw new IllegalArgumentException("filter名称"
									+ param + "没有按规则编写,无法得到属性比较类型.", e);
						}
						try {
							propertyClass = Enum.valueOf(PropertyType.class,
									propertyTypeCode).getValue();
						} catch (RuntimeException e) {
							throw new IllegalArgumentException("filter名称"
									+ param + "没有按规则编写,无法得到属性值类型.", e);
						}
						String propertyNameStr = StringUtils.substringAfter(
								param, "_");
						Assert.isTrue(StringUtils.isNotBlank(propertyNameStr),
								"filter名称" + param + "没有按规则编写,无法得到属性名称.");
						criterion = buildCriterion(propertyNameStr,
								propertyClass, this.getMatchValue(
										filter.getMatchValue(), propertyClass,
										count), matchType);
					} else {
						criterion = buildCriterion(param,
								filter.getPropertyClass(), this.getMatchValue(
										filter.getMatchValue(),
										filter.getPropertyClass(), count),
								filter.getMatchType());
					}
					disjunction.add(criterion);
				}
				criterionList.add(disjunction);
			}
		}
		return criterionList.toArray(new Criterion[criterionList.size()]);
	}

	/**
	 * 解析OR条件参数值
	 * 
	 * @param obj
	 *            总的参数值
	 * @param count
	 *            参数总数
	 * @return
	 */
	private Object getMatchValue(Object obj, Class<?> propertyClass, int count) {
		String matchValue = null;
		String[] repropertyValue = StringUtils.split(obj.toString(), ";");
		int length = repropertyValue.length;
		if (length >= count) {
			matchValue = repropertyValue[count - 1];
		} else {
			matchValue = repropertyValue[length - 1];
		}
		return ConvertUtils.convertStringToObject(matchValue, propertyClass);
	}

	/**
	 * 批量保存List<T>数据
	 * 
	 * @param List
	 *            <T>
	 * @return
	 */
	public int batchSave(List<T> list) {
		int count = 0;
		for (T object : list) {
			save(object);
			count++;
		}
		return count;
	}

	/**
	 * 根据主键List批量处理
	 * 
	 * @param hql
	 *            HQL语句
	 * @param idList
	 *            主键List
	 * @return
	 */
	public Integer batchExecuteByIdList(String hql, List<Long> idList) {
		int count = 0;
		Map<String, List<Long>> map = Collections.singletonMap("ids", idList);
		count = batchExecute(hql, map);
		return count;
	}

}
