package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.Info;
import com.ausemi2.common.Conn;

public class InfoDao {
	private Info info;
	private Connection con;
	//返回信息
	public Info checkInfo(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_user WHERE username='admin'");
			rs = pStmt.executeQuery();
			info = new Info();
			if (rs.next()){
				info.setNameInfo(rs.getString(2));
				info.setPwdInfo(rs.getString(3));
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
		return info;
	}
	//修改信息
	public boolean editInfo(Info info, String newPwd){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("UPDATE t_user set  pwd=? WHERE username=? AND pwd=?");
			pStmt.setString(1,newPwd);
			pStmt.setString(2,info.getNameInfo());
			pStmt.setString(3, info.getPwdInfo());
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
