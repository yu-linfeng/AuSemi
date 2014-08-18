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

import com.ausemi2.bean.HvMosfet;
import com.ausemi2.dao.HvMosfetDao;
import com.opensymphony.xwork2.ActionSupport;

public class HvMosfetAction extends ActionSupport {
	private List<HvMosfet> allHvMosfet;
	private HvMosfet hvMosfet;
	private HvMosfetDao hvMosfetDao;
	private String json;
	private JSONObject jsonObject;
	private Map flag;
	private String hproductPackage;
	private File hvMosfetUpdate;

	public List<HvMosfet> getAllHvMosfet() {
		return allHvMosfet;
	}

	public void setAllHvMosfet(List<HvMosfet> allHvMosfet) {
		this.allHvMosfet = allHvMosfet;
	}

	public HvMosfet getHvMosfet() {
		return hvMosfet;
	}

	public void setHvMosfet(HvMosfet hvMosfet) {
		this.hvMosfet = hvMosfet;
	}

	public HvMosfetDao getHvMosfetDao() {
		return hvMosfetDao;
	}

	public void setHvMosfetDao(HvMosfetDao hvMosfetDao) {
		this.hvMosfetDao = hvMosfetDao;
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

	public String getHproductPackage() {
		return hproductPackage;
	}

	public void setHproductPackage(String hproductPackage) {
		this.hproductPackage = hproductPackage;
	}

	public File getHvMosfetUpdate() {
		return hvMosfetUpdate;
	}

	public void setHvMosfetUpdate(File hvMosfetUpdate) {
		this.hvMosfetUpdate = hvMosfetUpdate;
	}

	// 新增
	public String addProduct() throws Exception {
		// /*获取项目路径*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
	//	String path = ServletActionContext.getServletContext().getRealPath("/");
		flag = new HashMap<String, Object>();
		hvMosfet = new HvMosfet();
		hvMosfetDao = new HvMosfetDao();
		jsonObject = JSONObject.fromObject(json);
		hvMosfet.setHpartNo(jsonObject.getString("hpartNo"));
		hvMosfet.setHtype(jsonObject.getString("htype"));
		hvMosfet.setHvds(jsonObject.getString("hvds"));
		hvMosfet.setHid(jsonObject.getString("hid"));
		hvMosfet.setHpd(jsonObject.getString("hpd"));
		hvMosfet.setHvgs(jsonObject.getString("hvgs"));
		hvMosfet.setHrdstyp(jsonObject.getString("hrdstyp"));
		hvMosfet.setHrdsmax(jsonObject.getString("hrdsmax"));
		hvMosfet.setHproductPackage(jsonObject.getString("hproductPackage"));
		if (hvMosfetDao.add(hvMosfet)) {
			try {
				String htmls = "<!DOCTYPE html><html><body marginwidth=\"0\" marginheight=\"0\""
						+ " style=\"background-color:rgb(38,38,38)\"><embed width=\"100%\" height=\"670px\" name=\"plugin\" src=\""
						+ hproductPackage
						+ ".pdf"
						+ "\" type=\"application/pdf\"></body></html>";
				InputStream is = new FileInputStream(hvMosfetUpdate); // 存入临时路径
				OutputStream os = new FileOutputStream(basePath + "File/"
						+ hproductPackage + ".pdf"); // 保存路径
				// 每个产品对应一个html
				FileWriter fw = new FileWriter(basePath + "File/"
						+ hproductPackage + ".html"); // 每个产品对应一个html文件，用来查看pdf文件及下载
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

	// 返回所有HvMosfet产品
	public String allHvMosfet() throws Exception {
		allHvMosfet = new ArrayList<HvMosfet>();
		hvMosfetDao = new HvMosfetDao();
		allHvMosfet = hvMosfetDao.all();
		return SUCCESS;
	}

	// 删除产品
	public String deleteHvMosfet() throws Exception {
		hvMosfet = new HvMosfet();
		hvMosfetDao = new HvMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		hvMosfet.setHvMosfetId(jsonObject.getInt("hvMosfetId"));
		hvMosfet.setHproductPackage(jsonObject.getString("hproductPackage"));
		/* 获取项目路径 ,用来删除产品相关文件*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		File pdfFile = new File(basePath + "File/" + hvMosfet.getHproductPackage()
				+ ".pdf");
		File htmlFile = new File(basePath + "File/"
				+ hvMosfet.getHproductPackage() + ".html");
		if (hvMosfetDao.delete(hvMosfet.getHvMosfetId())) {
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
	public String editHvMosfet() throws Exception{
		hvMosfet = new HvMosfet();
		hvMosfetDao = new HvMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		hvMosfet.setHvMosfetId(jsonObject.getInt("hvMosfetId"));
		hvMosfet.setHpartNo(jsonObject.getString("hpartNo"));
		hvMosfet.setHtype(jsonObject.getString("htype"));
		hvMosfet.setHvds(jsonObject.getString("hvds"));
		hvMosfet.setHid(jsonObject.getString("hid"));
		hvMosfet.setHpd(jsonObject.getString("hpd"));
		hvMosfet.setHvgs(jsonObject.getString("hvgs"));
		hvMosfet.setHrdstyp(jsonObject.getString("hrdstyp"));
		hvMosfet.setHrdsmax(jsonObject.getString("hrdsmax"));
		hvMosfet.setHproductPackage(jsonObject.getString("hproductPackage"));
		if (hvMosfetDao.edit(hvMosfet)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
