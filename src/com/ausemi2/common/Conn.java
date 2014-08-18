package com.ausemi2.common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Conn {
	public static Connection getConnection(){
			Connection con = null;
			try {
				Class.forName("com.mysql.jdbc.Driver");
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ausemi", "root", "1");	//数据库配置
			} catch (Exception e) {
				System.out.println("数据库连接失败!"+e.getMessage());
			}
			return con;
	}
	public static void closeStatement(Statement stmt) throws SQLException{
		try{
			if (stmt != null)
				stmt.close();
		} catch (SQLException e){
			throw new SQLException("关闭Statement失败");
		}
	}
	public static void closeResultSet(ResultSet rs) throws SQLException{
		try {
			if (rs != null)
				rs.close();
		}catch (SQLException e){
			throw new SQLException("关闭ResultSet失败");
		}
	}
	public static void closeConnection(Connection conn) throws SQLException{
		try {
			if (conn != null)
				conn.close();
		}catch (SQLException e){
			throw new SQLException("关闭Connection失败");
		}
	}
}
