package com.ausemi2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.SrModule;
import com.ausemi2.common.Conn;

public class SrModuleDao {
	private List<SrModule> allSrModule;
	private SrModule srModule;
	private Connection con;

	// 新增
	public boolean add(SrModule srModule) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("INSERT INTO t_srmodule(srpartNo, stype, siout, svdd, svgs, freq, srProductPackage) VALUES(?, ?, ?, ?, ?, ?, ?) ");
			pStmt.setString(1, srModule.getSrpartNo());
			pStmt.setString(2, srModule.getStype());
			pStmt.setString(3, srModule.getSiout());
			pStmt.setString(4, srModule.getSvdd());
			pStmt.setString(5, srModule.getSvgs());
			pStmt.setString(6, srModule.getFreq());
			pStmt.setString(7, srModule.getSrProductPackage());
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
	public List<SrModule> all() {
		allSrModule = new ArrayList<SrModule>();
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("SELECT * FROM t_srmodule");
			rs = pStmt.executeQuery();
			while (rs.next()) {
				SrModule srModule = new SrModule();
				srModule.setSrModuleId(rs.getInt(1));
				srModule.setSrpartNo(rs.getString(2));
				srModule.setStype(rs.getString(3));
				srModule.setSiout(rs.getString(4));
				srModule.setSvdd(rs.getString(5));
				srModule.setSvgs(rs.getString(6));
				
				srModule.setFreq(rs.getString(7));
				srModule.setSrProductPackage(rs.getString(8));
				allSrModule.add(srModule);
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
		return allSrModule;
	}

	// 删除产品信息
	public boolean delete(int id) {
		PreparedStatement pStmt = null;
		con = Conn.getConnection();
		try {
			pStmt = con.prepareStatement("DELETE FROM t_srmodule WHERE id=?");
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
	public boolean edit(SrModule srModule){
		PreparedStatement pStmt = null;
		ResultSet rs = null;
		con = Conn.getConnection();
		try {
			pStmt = con
					.prepareStatement("UPDATE t_srmodule set srpartNo=?, stype=?, siout=?, svdd=?, svgs=?, freq=? WHERE id=?");
			pStmt.setString(1, srModule.getSrpartNo());
			pStmt.setString(2, srModule.getStype());
			pStmt.setString(3, srModule.getSiout());
			pStmt.setString(4, srModule.getSvdd());
			pStmt.setString(5, srModule.getSvgs());
			pStmt.setString(6, srModule.getFreq());
			pStmt.setInt(7, srModule.getSrModuleId());
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
