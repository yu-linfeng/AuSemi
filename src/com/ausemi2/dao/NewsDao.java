package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.News;
import com.ausemi2.common.Conn;

public class NewsDao {
	private News news;
	private Connection con;
	private List<News> allNews;
	

	//返回新闻
	public News allNews(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_news WHERE newscentre='NewsCentre'");
			rs = pStmt.executeQuery();
			news = new News();
			if(rs.next()){
				news.setNewsCentre(rs.getString(2));
				news.setNews(rs.getString(3));
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
		return news;
	}
	
	//修改
	public boolean edit(News news){
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("UPDATE t_news set news=? WHERE newscentre=? ");
			pStmt.setString(1, news.getNews());
			pStmt.setString(2, news.getNewsCentre());
			int flag = pStmt.executeUpdate();
			if (flag != 0){
				return true;
			}
			Conn.closeStatement(pStmt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
}
