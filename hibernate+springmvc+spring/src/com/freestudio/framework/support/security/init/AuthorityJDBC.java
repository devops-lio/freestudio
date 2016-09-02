package com.freestudio.framework.support.security.init;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.freestudio.framework.support.security.model.Authority;

/**
 * 资源授权JDBC
 * 
 * 
 */
public class AuthorityJDBC {

	/**
	 * 获取全部资源列表信息
	 * 
	 * @return
	 */
	public List<Authority> getAuthoritys() {
		List<Authority> authoritys = new ArrayList<Authority>();
		ResultSet rs = null;
		Connection conn = null;
		PreparedStatement pstat = null;
		try {
			conn = DBConnection.getDBConnection();
			String query_sql = "select * from suncco_account_authority";
			pstat = conn.prepareStatement(query_sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			rs = pstat.executeQuery();
			while (rs.next()) {
				if (rs.getString("name") != null && rs.getString("url") != null
						&& !rs.getString("url").equals("")) {
					Authority authority = new Authority();
					authority.setId(rs.getLong("id"));
					authority.setName(rs.getString("name"));
					authority.setUrl(rs.getString("url"));
					authoritys.add(authority);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstat != null) {
					pstat.close();
					pstat = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return authoritys;
	}

	/**
	 * 根据授权列表Id删除角色授权关系表里面的对应授权信息
	 * 
	 * @param authIdList
	 *            授权列表ID
	 */
	public void delAuthorityRoleByAuthIdList(List<Long> authIdList) {
		Connection conn = null;
		PreparedStatement pstat = null;
		String authIdListStr = authIdList.toString();
		String authIdStr = authIdListStr.substring(1,
				authIdListStr.length() - 1);
		try {
			conn = DBConnection.getDBConnection();
			String delete_sql = "delete from suncco_role_authority where authority_id in("
					+ authIdStr + ")";
			pstat = conn.prepareStatement(delete_sql);
			pstat.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (pstat != null) {
					pstat.close();
					pstat = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
