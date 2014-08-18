package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.HvMosfet;
import com.ausemi2.common.Conn;

public class HvMosfetDao {
	private HvMosfet hvMosfet;
	private List<HvMosfet> allHvMosfet;
	private Connection con;

	// 新增
	public boolean add(HvMosfet hvMosfet) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("INSERT INTO t_hvmosfet(hpartNo, htype, hvds, hid, hpd, hvgs,hrdstyp, hrdsmax, hpackage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ");
			pStmt.setString(1, hvMosfet.getHpartNo());
			pStmt.setString(2, hvMosfet.getHtype());
			pStmt.setString(3, hvMosfet.getHvds());
			pStmt.setString(4, hvMosfet.getHid());
			pStmt.setString(5, hvMosfet.getHpd());
			pStmt.setString(6, hvMosfet.getHvgs());
			pStmt.setString(7, hvMosfet.getHrdstyp());
			pStmt.setString(8, hvMosfet.getHrdsmax());
			pStmt.setString(9, hvMosfet.getHproductPackage());
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
	public List<HvMosfet> all() {
		allHvMosfet = new ArrayList<HvMosfet>();
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_hvmosfet");
			rs = pStmt.executeQuery();
			while (rs.next()) {
				HvMosfet hvMosfet = new HvMosfet();
				hvMosfet.setHvMosfetId(rs.getInt(1));
				hvMosfet.setHpartNo(rs.getString(2));
				hvMosfet.setHtype(rs.getString(3));
				hvMosfet.setHvds(rs.getString(4));
				hvMosfet.setHid(rs.getString(5));
				hvMosfet.setHpd(rs.getString(6));
				hvMosfet.setHvgs(rs.getString(7));
				hvMosfet.setHrdstyp(rs.getString(8));
				hvMosfet.setHrdsmax(rs.getString(9));
				hvMosfet.setHproductPackage(rs.getString(10));
				allHvMosfet.add(hvMosfet);
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
		return allHvMosfet;
	}

	// 删除产品信息
	public boolean delete(int id) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("DELETE FROM t_hvmosfet WHERE id=?");
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
	public boolean edit(HvMosfet hvMosfet) {
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("UPDATE t_hvmosfet set hpartNo=?, htype=?, hvds=?, hid=?, hpd=?, hvgs=?,hrdstyp=?, hrdsmax=? WHERE id=?");
			pStmt.setString(1, hvMosfet.getHpartNo());
			pStmt.setString(2, hvMosfet.getHtype());
			pStmt.setString(3, hvMosfet.getHvds());
			pStmt.setString(4, hvMosfet.getHid());
			pStmt.setString(5, hvMosfet.getHpd());
			pStmt.setString(6, hvMosfet.getHvgs());
			pStmt.setString(7, hvMosfet.getHrdstyp());
			pStmt.setString(8, hvMosfet.getHrdsmax());
			pStmt.setInt(9, hvMosfet.getHvMosfetId());
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
