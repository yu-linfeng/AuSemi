package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.LvMosfet;
import com.ausemi2.common.Conn;

public class LvMosfetDao {
	private List<LvMosfet> allLvMosfet;
	private LvMosfet lvMosfet;
	private Connection con;

	// 新增
	public boolean add(LvMosfet lvMosfet) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("INSERT INTO t_lvmosfet(vpartNo, vtype, vvdss, vid, vpd, vvgs, rdsontyp10, rdsontyp4, vpackage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ");
			pStmt.setString(1, lvMosfet.getPartNo());
			pStmt.setString(2, lvMosfet.getVtype());
			pStmt.setString(3, lvMosfet.getVvdss());
			pStmt.setString(4, lvMosfet.getVid());
			pStmt.setString(5, lvMosfet.getVpd());
			pStmt.setString(6, lvMosfet.getVvgs());
			pStmt.setString(7, lvMosfet.getRdsontyp10());
			pStmt.setString(8, lvMosfet.getRdsontyp4());
			pStmt.setString(9, lvMosfet.getProductPackage());
			int count = pStmt.executeUpdate();
			if (count != 0) {
				return true;
			}
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

	// 返回所有产品信息
	public List<LvMosfet> allLvMosfet() {
		allLvMosfet = new ArrayList<LvMosfet>();
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_lvmosfet");
			rs = pStmt.executeQuery();
			while (rs.next()) {
				LvMosfet lvMosfet = new LvMosfet();
				lvMosfet.setLvMosfetId(rs.getInt(1));
				lvMosfet.setPartNo(rs.getString(2));
				lvMosfet.setVtype(rs.getString(3));
				lvMosfet.setVvdss(rs.getString(4));
				lvMosfet.setVid(rs.getString(5));
				lvMosfet.setVpd(rs.getString(6));
				lvMosfet.setVvgs(rs.getString(7));
				lvMosfet.setRdsontyp10(rs.getString(8));
				lvMosfet.setRdsontyp4(rs.getString(9));
				lvMosfet.setProductPackage(rs.getString(10));
				allLvMosfet.add(lvMosfet);
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
		return allLvMosfet;
	}

	// 删除产品信息
	public boolean delete(int id) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("DELETE FROM t_lvmosfet WHERE id=?");
			pStmt.setInt(1, id);
			int flag = pStmt.executeUpdate();
			if (flag != 0) {
				return true;
			}
			Conn.closeStatement(pStmt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	// 修改
	public boolean edit(LvMosfet lvMosfet) {
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("UPDATE t_lvmosfet set vpartNo=?, vtype=?, vvdss=?, vid=?, vpd=?, vvgs=?, rdsontyp10=?, rdsontyp4=? WHERE id=?");
			pStmt.setString(1, lvMosfet.getPartNo());
			pStmt.setString(2, lvMosfet.getVtype());
			pStmt.setString(3, lvMosfet.getVvdss());
			pStmt.setString(4, lvMosfet.getVid());
			pStmt.setString(5, lvMosfet.getVpd());
			pStmt.setString(6, lvMosfet.getVvgs());
			pStmt.setString(7, lvMosfet.getRdsontyp10());
			pStmt.setString(8, lvMosfet.getRdsontyp4());
			pStmt.setInt(9, lvMosfet.getLvMosfetId());
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
