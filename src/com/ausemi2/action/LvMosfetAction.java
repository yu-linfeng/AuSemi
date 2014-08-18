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

import com.ausemi2.bean.LvMosfet;
import com.ausemi2.dao.LvMosfetDao;
import com.opensymphony.xwork2.ActionSupport;

public class LvMosfetAction extends ActionSupport {
	private List<LvMosfet> allLvMosfet;
	private LvMosfet lvMosfet;
	private LvMosfetDao lvMosfetDao;
	private String json;
	private JSONObject jsonObject;
	private Map flag;
	private String productPackage;
	private File LvMosfetUpdate;
	public List<LvMosfet> getAllLvMosfet() {
		return allLvMosfet;
	}
	public void setAllLvMosfet(List<LvMosfet> allLvMosfet) {
		this.allLvMosfet = allLvMosfet;
	}
	public File getLvMosfetUpdate() {
		return LvMosfetUpdate;
	}
	public void setLvMosfetUpdate(File lvMosfetUpdate) {
		LvMosfetUpdate = lvMosfetUpdate;
	}
	public String getProductPackage() {
		return productPackage;
	}
	public void setProductPackage(String productPackage) {
		this.productPackage = productPackage;
	}
	public LvMosfet getLvMosfet() {
		return lvMosfet;
	}
	public void setLvMosfet(LvMosfet lvMosfet) {
		this.lvMosfet = lvMosfet;
	}
	public LvMosfetDao getLvMosfetDao() {
		return lvMosfetDao;
	}
	public void setLvMosfetDao(LvMosfetDao lvMosfetDao) {
		this.lvMosfetDao = lvMosfetDao;
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
//新增
	public String addProduct() throws Exception{
		// /*获取项目路径*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		
		flag = new HashMap<String, Object>();
		lvMosfet = new LvMosfet();
		lvMosfetDao = new LvMosfetDao();
		jsonObject = JSONObject.fromObject(json);
		lvMosfet.setPartNo(jsonObject.getString("partNo"));
		lvMosfet.setVtype(jsonObject.getString("vtype"));
		lvMosfet.setVvdss(jsonObject.getString("vvdss"));
		lvMosfet.setVid(jsonObject.getString("vid"));
		lvMosfet.setVpd(jsonObject.getString("vpd"));
		lvMosfet.setVvgs(jsonObject.getString("vvgs"));
		lvMosfet.setRdsontyp10(jsonObject.getString("rdsontyp10"));
		lvMosfet.setRdsontyp4(jsonObject.getString("rdsontyp4"));
		lvMosfet.setProductPackage(jsonObject.getString("productPackage"));
		if (lvMosfetDao.add(lvMosfet)){
			try {
				String htmls = "<!DOCTYPE html><html><body marginwidth=\"0\" marginheight=\"0\""
						+ " style=\"background-color:rgb(38,38,38)\"><embed width=\"100%\" height=\"670px\" name=\"plugin\" src=\""
						+ productPackage
						+ ".pdf"
						+ "\" type=\"application/pdf\"></body></html>";
				InputStream is = new FileInputStream(LvMosfetUpdate);		//存入临时路径
				OutputStream os = new FileOutputStream(basePath + "File/"+ productPackage + ".pdf");		//保存路径
				//每个产品对应一个html
				FileWriter fw = new FileWriter(basePath+"File/" + productPackage+".html");   //每个产品对应一个html文件，用来查看pdf文件及下载
				fw.write(htmls, 0, htmls.length());
				fw.flush();
				fw.close();
				int len = 0;		//记录文件长度（大小）
				byte[] buffer = new byte[10000000];

				while (true) {
					len = is.read(buffer);
					if (len < 0){
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
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
	//返回所有LvMosfet产品
	public String allLvMosfet() throws Exception{
		allLvMosfet = new ArrayList<LvMosfet>();
		lvMosfetDao = new LvMosfetDao();
		allLvMosfet = lvMosfetDao.allLvMosfet();
		return SUCCESS;
	}
	//删除产品
	public String deleteLvMosfet() throws Exception{
		lvMosfet = new LvMosfet();
		lvMosfetDao = new LvMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		lvMosfet.setLvMosfetId(jsonObject.getInt("lvMosfetId"));
		lvMosfet.setProductPackage(jsonObject.getString("productPackage"));
		/* 获取项目路径 ,用来删除产品相关文件*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		File pdfFile = new File(basePath + "File/" + lvMosfet.getProductPackage()
				+ ".pdf");
		File htmlFile = new File(basePath + "File/"
				+ lvMosfet.getProductPackage() + ".html");
		if (lvMosfetDao.delete(lvMosfet.getLvMosfetId())) {
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
	public String editLvMosfet() throws Exception{
		lvMosfet = new LvMosfet();
		lvMosfetDao = new LvMosfetDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		lvMosfet.setLvMosfetId(jsonObject.getInt("lvMosfetId"));
		lvMosfet.setPartNo(jsonObject.getString("partNo"));
		lvMosfet.setVtype(jsonObject.getString("vtype"));
		lvMosfet.setVvdss(jsonObject.getString("vvdss"));
		lvMosfet.setVid(jsonObject.getString("vid"));
		lvMosfet.setVpd(jsonObject.getString("vpd"));
		lvMosfet.setVvgs(jsonObject.getString("vvgs"));
		lvMosfet.setRdsontyp10(jsonObject.getString("rdsontyp10"));
		lvMosfet.setRdsontyp4(jsonObject.getString("rdsontyp4"));
		lvMosfet.setProductPackage(jsonObject.getString("productPackage"));
		if (lvMosfetDao.edit(lvMosfet)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
