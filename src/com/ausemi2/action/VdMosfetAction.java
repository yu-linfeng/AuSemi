package com.ausemi2.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.ausemi2.bean.VdMosfet;
import com.ausemi2.dao.VdMosfetDao;
import com.opensymphony.xwork2.ActionSupport;

public class VdMosfetAction extends ActionSupport {

	private List<VdMosfet> allVdMosfet;
	private VdMosfet vdMosfet;
	private VdMosfetDao vdMosfetDao;
	private String json;
	private JSONObject jsonObject;
	private Map flag;
	private String vproductPackage;
	private File vdMosfetUpdate;

	public List<VdMosfet> getAllVdMosfet() {
		return allVdMosfet;
	}

	public void setAllVdMosfet(List<VdMosfet> allVdMosfet) {
		this.allVdMosfet = allVdMosfet;
	}

	public VdMosfet getVdMosfet() {
		return vdMosfet;
	}

	public void setVdMosfet(VdMosfet vdMosfet) {
		this.vdMosfet = vdMosfet;
	}

	public VdMosfetDao getVdMosfetDao() {
		return vdMosfetDao;
	}

	public void setVdMosfetDao(VdMosfetDao vdMosfetDao) {
		this.vdMosfetDao = vdMosfetDao;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public JSONObject getJsonObject() {
		return jsonObject;
	}

	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}

	public Map getFlag() {
		return flag;
	}

	public void setFlag(Map flag) {
		this.flag = flag;
	}

	public String getVproductPackage() {
		return vproductPackage;
	}

	public void setVproductPackage(String vproductPackage) {
		this.vproductPackage = vproductPackage;
	}

	public File getVdMosfetUpdate() {
		return vdMosfetUpdate;
	}

	public void setVdMosfetUpdate(File vdMosfetUpdate) {
		this.vdMosfetUpdate = vdMosfetUpdate;
	}

	// 新增
	public String addProduct() throws Exception {
		// /*获取项目路径*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		flag = new HashMap<String, Object>();
		vdMosfet = new VdMosfet();
		vdMosfetDao = new VdMosfetDao();
		jsonObject = JSONObject.fromObject(json);
		vdMosfet.setVpartNo(jsonObject.getString("vpartNo"));
//		vdMosfet.setHtype(jsonObject.getString("htype"));
		vdMosfet.setVdescription(jsonObject.getString("vdescription"));
		vdMosfet.setVvdss(jsonObject.getString("vvdss"));
		vdMosfet.setVvgs(jsonObject.getString("vvgs"));
		vdMosfet.setVvth_min(jsonObject.getString("vvth_min"));
		vdMosfet.setVvth_max(jsonObject.getString("vvth_max"));
		vdMosfet.setVids(jsonObject.getString("vids"));
		vdMosfet.setVrds_10(jsonObject.getString("vrds_10"));
		vdMosfet.setVrds_0(jsonObject.getString("vrds_0"));
		vdMosfet.setVpd(jsonObject.getString("vpd"));
		vdMosfet.setVproductPackage(jsonObject.getString("vproductPackage"));
		if (vdMosfetDao.add(vdMosfet)) {
			try {
				String htmls = "<!DOCTYPE html><html><body marginwidth=\"0\" marginheight=\"0\""
						+ " style=\"background-color:rgb(38,38,38)\"><embed width=\"100%\" height=\"670px\" name=\"plugin\" src=\""
						+ vproductPackage
						+ ".pdf"
						+ "\" type=\"application/pdf\"></body></html>";
				InputStream is = new FileInputStream(vdMosfetUpdate); // 存入临时路径
				OutputStream os = new FileOutputStream(basePath + "\\"+ vproductPackage
						+ ".pdf"); // 保存路径
				//每个产品对应一个html
				FileWriter fw = new FileWriter(basePath+"File/" + vproductPackage+".html");   //每个产品对应一个html文件，用来查看pdf文件及下载
				fw.write(htmls, 0, htmls.length());
				fw.flush();
				fw.close();
				int len = 0; // 记录文件长度（大小）
				byte[] buffer = new byte[10000000];

				while (true) {
					len = is.read(buffer);
					if (len < 0) {
						break;
					}
					os.write(buffer, 0, len);
				}
				flag.put("success", true);
				is.close();
				os.close();
			} catch (IOException e) {
				e.printStackTrace();// TODO: handle exception
			}
		} else {
			flag.put("failure", true);
		}
		return SUCCESS;
	}

	// 返回所有vdMosfet产品
	public String allVdMosfet() throws Exception {
		allVdMosfet = new ArrayList<VdMosfet>();
		vdMosfetDao = new VdMosfetDao();
		allVdMosfet = vdMosfetDao.allVdMosfet();
		return SUCCESS;
	}

	// 删除产品
	public String deleteVdMosfet() throws Exception {
		vdMosfet = new VdMosfet();
		vdMosfetDao = new VdMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		vdMosfet.setVdMosfetId(jsonObject.getInt("vdMosfetId"));
		vdMosfet.setVproductPackage(jsonObject.getString("vproductPackage"));
		/* 获取项目路径 ,用来删除产品相关文件*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		File pdfFile = new File(basePath + "File/" + vdMosfet.getVproductPackage()
				+ ".pdf");
		File htmlFile = new File(basePath + "File/"
				+ vdMosfet.getVproductPackage() + ".html");
		if (vdMosfetDao.delete(vdMosfet.getVdMosfetId())) {
			if (pdfFile.exists() && htmlFile.exists()) {
				pdfFile.delete();
				htmlFile.delete();
				flag.put("success", true);
			}
		} else {
			flag.put("failure", true);
		}
		return SUCCESS;
	}
	//修改
	public String editVdMosfet() throws Exception{
		vdMosfet = new VdMosfet();
		vdMosfetDao = new VdMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		vdMosfet.setVdMosfetId(jsonObject.getInt("vdMosfetId"));
		vdMosfet.setVpartNo(jsonObject.getString("vpartNo"));
		vdMosfet.setVdescription(jsonObject.getString("vdescription"));
		vdMosfet.setVvdss(jsonObject.getString("vvdss"));
		vdMosfet.setVvgs(jsonObject.getString("vvgs"));
		vdMosfet.setVvth_min(jsonObject.getString("vvth_min"));
		vdMosfet.setVvth_max(jsonObject.getString("vvth_max"));
		vdMosfet.setVids(jsonObject.getString("vids"));
		vdMosfet.setVrds_10(jsonObject.getString("vrds_10"));
		vdMosfet.setVrds_0(jsonObject.getString("vrds_0"));
		vdMosfet.setVpd(jsonObject.getString("vpd"));
		vdMosfet.setVproductPackage(jsonObject.getString("vproductPackage"));
		if (vdMosfetDao.edit(vdMosfet)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
