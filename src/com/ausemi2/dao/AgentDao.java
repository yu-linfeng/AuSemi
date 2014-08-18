package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.Agent;
import com.ausemi2.common.Conn;

public class AgentDao {
	private List<Agent> allAgent;
	private Agent agent;
	private Connection con;
	//新增
		public boolean add(Agent agent){
			PreparedStatement pStmt = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("INSERT INTO t_agent(area, companyName, url, agentContent) VALUES(?, ?, ?, ?) ");
				pStmt.setString(1,agent.getArea());
				pStmt.setString(2, agent.getCompanyName());
				pStmt.setString(3, agent.getUrl());
				pStmt.setString(4, agent.getAgentContent());
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
		//返回所有
		public List<Agent> all(){
			allAgent = new ArrayList<Agent>();
			PreparedStatement pStmt = null;
			ResultSet rs = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("SELECT * FROM t_agent");
				rs = pStmt.executeQuery();
				while (rs.next()){
					Agent agent = new Agent();
					agent.setAgentId(rs.getInt(1));
					agent.setArea(rs.getString(2));
					agent.setCompanyName(rs.getString(3));
					agent.setUrl(rs.getString(4));
					agent.setAgentContent(rs.getString(5));
					allAgent.add(agent);
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
			return allAgent;
		}
		//删除新闻信息
		public boolean delete(int id){
			PreparedStatement pStmt = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("DELETE FROM t_agent WHERE id=?");
				pStmt.setInt(1, id);
				System.out.println(id);
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
		//修改
		public boolean edit(Agent agent){
			PreparedStatement pStmt = null;
			ResultSet rs = null;
			con = Conn.getConnection();
			try {
				pStmt = con.prepareStatement("UPDATE t_agent set  area=?, companyName=?, url=?, agentContent=? WHERE id=?");
				pStmt.setString(1,agent.getArea());
				pStmt.setString(2,agent.getCompanyName());
				pStmt.setString(3,agent.getUrl());
				pStmt.setString(4,agent.getAgentContent());
				pStmt.setInt(5,  agent.getAgentId());
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
