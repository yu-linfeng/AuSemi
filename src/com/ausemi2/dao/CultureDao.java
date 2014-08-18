package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.Culture;
import com.ausemi2.common.Conn;

public class CultureDao {
	private Culture culture;
	private Connection con;
	//查询
		public Culture find(){
			PreparedStatement pStmt = null;
			ResultSet rs = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("SELECT * FROM t_culture WHERE cultureTitle='Culture'");
				rs = pStmt.executeQuery();
				culture = new Culture();
				if (rs.next()){
					culture.setCultureTitle(rs.getString(2));
					culture.setCulture(rs.getString(3));
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
			return culture;
		}
		//修改
		public boolean edit(String cultureTitle, String culture){
			PreparedStatement pStmt = null;
			ResultSet rs = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("UPDATE t_culture set  culture=? WHERE cultureTitle=?");
				pStmt.setString(1,culture);
				pStmt.setString(2,cultureTitle);
//				rs = pStmt.executeQuery();
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
