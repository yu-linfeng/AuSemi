package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.Search;
import com.ausemi2.common.Conn;

public class SearchDao {
	private List<Search> allSearch;
	private Connection con;
	
	//查询
	public List<Search> findProduct(String partNo){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		allSearch = new ArrayList<Search>();
		String temp = "%" + partNo + "%";
		try {
			//查HV
			pStmt = con.prepareStatement("SELECT hpartNo, hpackage  FROM t_hvmosfet WHERE hpartNo=? ");
			pStmt.setString(1, partNo);
			rs = pStmt.executeQuery();
			while (rs.next()){
				Search search = new Search();
				search.setPartNo(rs.getString(1));
				search.setPackages(rs.getString(2));
				allSearch.add(search);
			}
			//查LV
			pStmt = con.prepareStatement("SELECT partNo, package  FROM t_lvmosfet WHERE partNo=? ");
			pStmt.setString(1, partNo);
			rs = pStmt.executeQuery();
			while (rs.next()){
				Search search = new Search();
				search.setPartNo(rs.getString(1));
				search.setPackages(rs.getString(2));
				allSearch.add(search);
			}
			//查SR
			pStmt = con.prepareStatement("SELECT srpartNo, srProductPackage  FROM t_srmodule WHERE srpartNo=? ");
			pStmt.setString(1, partNo);
			rs = pStmt.executeQuery();
			while (rs.next()){
//				System.out.println(rs.getString(1));
				Search search = new Search();
				search.setPartNo(rs.getString(1));
				search.setPackages(rs.getString(2));
				allSearch.add(search);
			}
			//查VD
			pStmt = con.prepareStatement("SELECT vpartNo, vpackage  FROM t_vdmosfet WHERE vpartNo=? ");
			pStmt.setString(1, partNo);
			rs = pStmt.executeQuery();
			while (rs.next()){
				Search search = new Search();
				search.setPartNo(rs.getString(1));
				search.setPackages(rs.getString(2));
				allSearch.add(search);
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
		
		
		return allSearch;
	}
}
