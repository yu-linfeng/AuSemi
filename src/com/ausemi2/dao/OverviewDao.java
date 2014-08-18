package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.Overview;
import com.ausemi2.common.Conn;

public class OverviewDao {
	private Overview overview;
	private Connection con;
	
	//查询
	public Overview find(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_overview WHERE overviewTitle='CompanyOverview'");
			rs = pStmt.executeQuery();
			overview = new Overview();
			if (rs.next()){
				overview.setOverviewTitle(rs.getString(2));
				overview.setOverview(rs.getString(3));
			}
			Conn.closeResultSet(rs);
			Conn.closeStatement(pStmt);
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				Conn.closeConnection(con);
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return overview;
	}
	//修改
	public boolean edit(String overviewTitle, String overview){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("UPDATE t_overview set  overview=? WHERE overviewTitle=?");
			pStmt.setString(1,overview);
			pStmt.setString(2,overviewTitle);
//			rs = pStmt.executeQuery();
			int flag = pStmt.executeUpdate();
			if (flag != 0){
				return true;
			}
			Conn.closeResultSet(rs);
			Conn.closeStatement(pStmt);
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				Conn.closeConnection(con);
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return false;
	}
}
