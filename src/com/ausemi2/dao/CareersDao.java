package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.Careers;
import com.ausemi2.common.Conn;

public class CareersDao {
	private Careers careers;
	private Connection con;
	//查询
	public Careers find(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_careers WHERE careersTitle='Careers'");
			rs = pStmt.executeQuery();
			careers = new Careers();
			if (rs.next()){
				careers.setCareersTitle(rs.getString(2));
				careers.setCareers(rs.getString(3));
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
		return careers;
	}
	//修改
	public boolean edit(String careersTitle, String careers){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("UPDATE t_careers set  careers=? WHERE careersTitle=?");
			pStmt.setString(1,careers);
			pStmt.setString(2,careersTitle);
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
