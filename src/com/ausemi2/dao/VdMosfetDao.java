package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.VdMosfet;
import com.ausemi2.common.Conn;

public class VdMosfetDao {
	private List<VdMosfet> allVdMosfet;
	private Connection con;
	
	//新增
	public boolean add(VdMosfet vdMosfet){		
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("INSERT INTO t_vdmosfet(vpartNo, vdescription, vvdssV, vvgsV, vminv, vmaxv, vids, vrds10, vrds0, vpd, vpackage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ");
			pStmt.setString(1,vdMosfet.getVpartNo());
			pStmt.setString(2, vdMosfet.getVdescription());
			pStmt.setString(3, vdMosfet.getVvdss());
			pStmt.setString(4, vdMosfet.getVvgs());
			pStmt.setString(5, vdMosfet.getVvth_min());
			pStmt.setString(6, vdMosfet.getVvth_min());
			pStmt.setString(7, vdMosfet.getVids());
			pStmt.setString(8, vdMosfet.getVrds_10());
			pStmt.setString(9, vdMosfet.getVrds_0());
			pStmt.setString(10, vdMosfet.getVpd());
			pStmt.setString(11, vdMosfet.getVproductPackage());
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
	//返回所有产品信息
	public List<VdMosfet> allVdMosfet(){
		allVdMosfet = new ArrayList<VdMosfet>();
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_vdmosfet");
			rs = pStmt.executeQuery();
			while (rs.next()){
				VdMosfet vdMosfet = new VdMosfet();
				vdMosfet.setVdMosfetId(rs.getInt(1));
				vdMosfet.setVpartNo(rs.getString(2));
				vdMosfet.setVdescription(rs.getString(3));
				vdMosfet.setVvdss(rs.getString(4));
				vdMosfet.setVvgs(rs.getString(5));
				vdMosfet.setVvth_min(rs.getString(6));
				vdMosfet.setVvth_max(rs.getString(7));
				vdMosfet.setVids(rs.getString(8));
				vdMosfet.setVrds_10(rs.getString(9));
				vdMosfet.setVrds_0(rs.getString(10));
				vdMosfet.setVpd(rs.getString(11));
				vdMosfet.setVproductPackage(rs.getString(12));
				allVdMosfet.add(vdMosfet);
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
		return allVdMosfet;
	}
	//删除产品信息
	public boolean delete(int id){
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("DELETE FROM t_vdmosfet WHERE id=?");
			pStmt.setInt(1, id);
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
	public boolean edit(VdMosfet vdMosfet){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("UPDATE t_vdmosfet set vpartNo=?, vdescription=?, vvdssV=?, vvgsV=?, vminv=?, vmaxv=?, vids=?, vrds10=?, vrds0=?, vpd=? WHERE id=?");
			pStmt.setString(1,vdMosfet.getVpartNo());
			pStmt.setString(2, vdMosfet.getVdescription());
			pStmt.setString(3, vdMosfet.getVvdss());
			pStmt.setString(4, vdMosfet.getVvgs());
			pStmt.setString(5, vdMosfet.getVvth_min());
			pStmt.setString(6, vdMosfet.getVvth_min());
			pStmt.setString(7, vdMosfet.getVids());
			pStmt.setString(8, vdMosfet.getVrds_10());
			pStmt.setString(9, vdMosfet.getVrds_0());
			pStmt.setString(10, vdMosfet.getVpd());
			pStmt.setInt(11,vdMosfet.getVdMosfetId());
			int flag = pStmt.executeUpdate();
			if (flag != 0) {
				return true;
			}
			Conn.closeResultSet(rs);
			Conn.closeStatement(pStmt);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				Conn.closeConnection(con);
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return false;
	}
}
