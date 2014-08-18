package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.Message;
import com.ausemi2.common.Conn;

public class MessageDao {
	private List<Message> allMessage;
	private Connection con;
	//查询
	public List<Message> find(){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_message");
//			pStmt.setInt(1, id);
			rs = pStmt.executeQuery();
			allMessage = new ArrayList<Message>();
			while (rs.next()){
				Message message = new Message();
				message.setId(rs.getInt(1));
				message.setMessageTitle(rs.getString(2));
				message.setMail(rs.getString(3));
				message.setMessage(rs.getString(4));
				allMessage.add(message);
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
		return allMessage;
	}
	//删除
	public boolean delete(int id){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("DELETE FROM t_message WHERE id=?");
			pStmt.setInt(1, id);
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
	//新增留言
	public boolean newMessage(Message message){
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("INSERT INTO t_message(messageTitle, mail, message) VALUES(?, ?, ?) ");
			pStmt.setString(1,message.getMessageTitle());
			pStmt.setString(2, message.getMail());
			pStmt.setString(3, message.getMessage());
			int count = pStmt.executeUpdate();
			if (count != 0){
				return true;
			}
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
