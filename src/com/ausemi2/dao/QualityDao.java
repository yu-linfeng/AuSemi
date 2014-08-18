package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ausemi2.bean.Quality;
import com.ausemi2.common.Conn;

public class QualityDao {
	private Quality quality;
	private Connection con;
	
	//查询
	public Quality find(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_quality WHERE qualityTitle='Quality'");
			rs = pStmt.executeQuery();
			quality = new Quality();
			if (rs.next()){
				quality.setQualityTitle(rs.getString(2));
				quality.setQuality(rs.getString(3));
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
		return quality;
	}
	//修改
	public boolean edit(String qualityTitle, String quality){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("UPDATE t_quality set  quality=? WHERE qualityTitle=?");
			pStmt.setString(1,quality);
			pStmt.setString(2,qualityTitle);
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
