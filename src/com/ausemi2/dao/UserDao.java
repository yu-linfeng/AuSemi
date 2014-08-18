package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.User;
import com.ausemi2.common.Conn;

public class UserDao {
	private User user;
	private Connection con;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	//登录验证
	public boolean login(String name, String pwd){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_user WHERE username=? AND pwd=?");
			pStmt.setString(1,name);
			pStmt.setString(2,pwd);
			rs = pStmt.executeQuery();
			if (rs.next()){
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
