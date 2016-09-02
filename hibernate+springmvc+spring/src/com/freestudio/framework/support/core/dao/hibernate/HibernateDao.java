package com.freestudio.framework.support.core.dao.hibernate;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;

import com.freestudio.framework.support.core.model.orm.Page;
import com.freestudio.framework.support.core.model.orm.PropertyFilter;
import com.freestudio.framework.support.core.model.orm.PropertyFilter.MatchType;

/**
 * Hibernat DAO泛型基类接口
 * 
 */
public interface HibernateDao<T, PK> {

	/**
	 * 保存新增或修改的对象.
	 */
	public void save(final T entity);

	/**
	 * 删除对象.
	 * 
	 * @param entity
	 *            对象必须是session中的对象或含id属性的transient对象.
	 */
	public void delete(final T entity);

	/**
	 * 按id删除对象.
	 */
	public void deleteById(final PK id);

	/**
	 * 按id获取对象.
	 */
	public T get(final PK id);

	/**
	 * 按id列表获取对象列表.
	 * 
	 * @param ids
	 *            主键ids
	 * @param isCache
	 *            是否开始缓存
	 * @return
	 */
	public List<T> get(final Collection<PK> ids, final boolean isCache);

	/**
	 * 获取全部对象.
	 * 
	 * @param isCache
	 *            是否开始缓存
	 * @return
	 */
	public List<T> getAll(final boolean isCache);

	/**
	 * 获取全部对象, 支持按属性行序.
	 * 
	 * @param orderByProperty
	 *            排序方式
	 * @param isAsc
	 *            是否升序
	 * @param isCache
	 *            是否开始缓存
	 * @return
	 */
	public List<T> getAll(String orderByProperty, boolean isAsc, boolean isCache);

	/**
	 * 按属性查找对象列表, 匹配方式为相等.
	 * 
	 * @param propertyName
	 *            查找字段名称
	 * @param value
	 *            字段值
	 * @param isCache
	 *            是否开始缓存
	 * @return
	 */
	public List<T> findBy(final String propertyName, final Object value,
			final boolean isCache);

	/**
	 * 按属性查找唯一对象, 匹配方式为相等.
	 * 
	 * @param propertyName
	 *            查找字段名称
	 * @param value
	 *            字段值
	 * @param isCache
	 *            是否开始缓存
	 * @return
	 */
	public T findUniqueBy(final String propertyName, final Object value,
			final boolean isCache);

	/**
	 * 按HQL查询对象列表.
	 * 
	 * @param <X>
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开始缓存
	 * @param values
	 *            HQL语句对应的参数值,数量可变的参数,按顺序绑定.
	 * @return
	 */
	public <X> List<X> find(final String hql, final boolean isCache,
			final Object... values);

	/**
	 * 按HQL查询对象列表.
	 * 
	 * @param <X>
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return
	 */
	public <X> List<X> find(final String hql, final boolean isCache,
			final Map<String, ?> values);

	/**
	 * 按HQL查询唯一对象.
	 * 
	 * @param <X>
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 * @return
	 */
	public <X> X findUnique(final String hql, final boolean isCache,
			final Object... values);

	/**
	 * 按HQL查询唯一对象.
	 * 
	 * @param <X>
	 * @param hql
	 *            HQL语句
	 * @param isCache
	 *            是否开启缓存
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return
	 */
	public <X> X findUnique(final String hql, final boolean isCache,
			final Map<String, ?> values);

	/**
	 * 执行HQL进行批量修改/删除操作.
	 * 
	 * @param hql
	 *            HQL语句
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 * @return 更新记录数.
	 */
	public int batchExecute(final String hql, final Object... values);

	/**
	 * 执行HQL进行批量修改/删除操作.
	 * 
	 * @param hql
	 *            HQL语句
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return 更新记录数.
	 */
	public int batchExecute(final String hql, final Map<String, ?> values);

	/**
	 * 根据查询HQL与参数列表创建Query对象. 与find()函数可进行更加灵活的操作.
	 * 
	 * @param queryString
	 *            HQL语句
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 * @return
	 */
	public Query createQuery(final String queryString, final Object... values);

	/**
	 * 根据查询HQL与参数列表创建Query对象. 与find()函数可进行更加灵活的操作.
	 * 
	 * @param queryString
	 *            HQL语句
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return Query
	 */
	public Query createQuery(final String queryString,
			final Map<String, ?> values);

	/**
	 * 按Criteria查询对象列表.
	 * 
	 * @param isCache
	 *            是否开启缓存
	 * @param criterions
	 *            数量可变的Criterion.
	 * @return
	 */
	public List<T> find(final boolean isCache, final Criterion... criterions);

	/**
	 * 按Criteria查询唯一对象.
	 * 
	 * @param isCache
	 *            是否开启缓存
	 * @param criterions
	 *            数量可变的Criterion.
	 * @return
	 */
	public T findUnique(final boolean isCache, final Criterion... criterions);

	/**
	 * 根据Criterion条件创建Criteria. 与find()函数可进行更加灵活的操作.
	 * 
	 * @param isCache
	 *            是否开启缓存
	 * @param criterions
	 *            数量可变的Criterion.
	 * @return
	 */
	public Criteria createCriteria(final boolean isCache,
			final Criterion... criterions);

	/**
	 * 判断对象的属性值在数据库内是否唯一. 在修改对象的情景下,如果属性新修改的值(value)等于属性原来的值(orgValue)则不作比较.
	 * 
	 * @param propertyName
	 *            字段名称
	 * @param newValue
	 *            新的字段值
	 * @param oldValue
	 *            旧的字段值
	 * @param isCache
	 *            是否开启缓存
	 * @return
	 */
	public boolean isPropertyUnique(final String propertyName,
			final Object newValue, final Object oldValue, final boolean isCache);

	/**
	 * 取得对象的主键名.
	 */
	public String getIdName();

	// -- 分页查询函数 --//

	/**
	 * 分页获取全部对象.
	 * 
	 * @param page
	 *            分页参数. 注意不支持其中的orderBy参数.
	 * @param isCache
	 *            是否开启缓存 return
	 */
	public Page<T> getAll(final Page<T> page, final boolean isCache);

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
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final String hql, final Object... values);

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
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final String hql, final Map<String, ?> values);

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
	public Page<T> findPage(final Page<T> page, final boolean isCache,
			final Criterion... criterions);

	/**
	 * 设置分页参数到Query对象,辅助函数.
	 * 
	 * @param q
	 *            Query查询对象
	 * @param page
	 *            分页对象.
	 * @return
	 */
	public Query setPageParameterToQuery(final Query q, final Page<T> page);

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
			final Page<T> page);

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
			final Object... values);

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
			final Map<String, ?> values);

	/**
	 * 执行count查询获得本次Criteria查询所能获得的对象总数.
	 * 
	 * @param c
	 *            Criteria对象.
	 * @return
	 */
	public long countCriteriaResult(final Criteria c);

	// -- 属性过滤条件(PropertyFilter)查询函数 --//

	/**
	 * 按属性查找对象列表,支持多种匹配方式.
	 * 
	 * @param matchType
	 *            匹配方式,目前支持的取值见PropertyFilter的MatcheType enum.
	 */
	public List<T> findBy(final String propertyName,
			final Class<?> propertyClass, final Object value,
			final MatchType matchType, final boolean isCache);

	/**
	 * 按属性过滤条件列表查找对象列表.
	 * 
	 * @param filters
	 *            PropertyFilter过滤条件
	 * @param isCache
	 *            是否开启缓存
	 * @return
	 */
	public List<T> find(List<PropertyFilter> filters, final boolean isCache);

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
			final List<PropertyFilter> filters, final boolean isCache);

	/**
	 * 按属性条件参数创建Criterion,辅助函数.
	 * 
	 * @param propertyName
	 *            字段名称
	 * @param propertyClass
	 *            字段类型
	 * @param propertyValue
	 *            字段值
	 * @param matchType
	 *            比较类型
	 * @return
	 */
	public Criterion buildCriterion(final String propertyName,
			final Class<?> propertyClass, final Object propertyValue,
			final MatchType matchType);

	/**
	 * 按属性条件列表创建Criterion数组,辅助函数.
	 */
	public Criterion[] buildCriterionByPropertyFilter(
			final List<PropertyFilter> filters);

	/**
	 * 批量保存List<T>数据
	 * 
	 * @param List
	 *            <T>
	 * @return
	 */
	public int batchSave(List<T> list);

	/**
	 * 根据主键List批量处理
	 * 
	 * @param hql
	 *            HQL语句
	 * @param idList
	 *            主键List
	 * @return
	 */
	public Integer batchExecuteByIdList(String hql, List<Long> idList);

}
