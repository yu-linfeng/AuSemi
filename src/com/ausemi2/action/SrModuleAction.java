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

import com.ausemi2.bean.SrModule;
import com.ausemi2.dao.SrModuleDao;
import com.opensymphony.xwork2.ActionSupport;

public class SrModuleAction extends ActionSupport {
	private List<SrModule> allSrModule;
	private SrModule srModule;
	private SrModuleDao srModuleDao;
	private String json;
	private JSONObject jsonObject;
	private Map flag;
	private String srProductPackage;
	private File srModuleUpdate;

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

	public List<SrModule> getAllSrModule() {
		return allSrModule;
	}

	public void setAllSrModule(List<SrModule> allSrModule) {
		this.allSrModule = allSrModule;
	}

	public SrModule getSrModule() {
		return srModule;
	}

	public void setSrModule(SrModule srModule) {
		this.srModule = srModule;
	}

	public SrModuleDao getSrModuleDao() {
		return srModuleDao;
	}

	public void setSrModuleDao(SrModuleDao srModuleDao) {
		this.srModuleDao = srModuleDao;
	}

	public String getSrProductPackage() {
		return srProductPackage;
	}

	public void setSrProductPackage(String srProductPackage) {
		this.srProductPackage = srProductPackage;
	}

	public File getSrModuleUpdate() {
		return srModuleUpdate;
	}

	public void setSrModuleUpdate(File srModuleUpdate) {
		this.srModuleUpdate = srModuleUpdate;
	}

	// 新增
	public String addProduct() throws Exception {
		// /*获取项目路径*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		flag = new HashMap<String, Object>();
		srModule = new SrModule();
		srModuleDao = new SrModuleDao();
		jsonObject = JSONObject.fromObject(json);
		srModule.setSrpartNo(jsonObject.getString("srpartNo"));
		srModule.setStype(jsonObject.getString("stype"));
		srModule.setSiout(jsonObject.getString("siout"));
		srModule.setSvdd(jsonObject.getString("svdd"));
		srModule.setSvgs(jsonObject.getString("svgs"));
		srModule.setFreq(jsonObject.getString("freq"));
		srModule.setSrProductPackage(jsonObject.getString("srProductPackage"));

		if (srModuleDao.add(srModule)) {
			try {
				String htmls = "<!DOCTYPE html><html><body marginwidth=\"0\" marginheight=\"0\""
						+ " style=\"background-color:rgb(38,38,38)\"><embed width=\"100%\" height=\"670px\" name=\"plugin\" src=\""
						+ srProductPackage
						+ ".pdf"
						+ "\" type=\"application/pdf\"></body></html>";
				InputStream is = new FileInputStream(srModuleUpdate); // 存入临时路径
				OutputStream os = new FileOutputStream(basePath +"File/" + srProductPackage
						+ ".pdf"); // 保存路径
				//每个产品对应一个html
				FileWriter fw = new FileWriter(basePath+"File/" + srProductPackage+".html");   //每个产品对应一个html文件，用来查看pdf文件及下载
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
	public String allSrModule() throws Exception {
		allSrModule = new ArrayList<SrModule>();
		srModuleDao = new SrModuleDao();
		allSrModule = srModuleDao.all();
		return SUCCESS;
	}

	// 删除产品
	public String deleteSrModule() throws Exception {
		srModule = new SrModule();
		srModuleDao = new SrModuleDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		srModule.setSrModuleId(jsonObject.getInt("srModuleId"));
		srModule.setSrProductPackage(jsonObject.getString("srProductPackage"));
		/* 获取项目路径 ,用来删除产品相关文件*/
		HttpServletRequest request = ServletActionContext.getRequest();
		String basePath = request.getSession().getServletContext()
				.getRealPath("/");
		File pdfFile = new File(basePath + "File/" + srModule.getSrProductPackage()
				+ ".pdf");
		File htmlFile = new File(basePath + "File/"
				+ srModule.getSrProductPackage() + ".html");
		if (srModuleDao.delete(srModule.getSrModuleId())) {
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
	public String editSrModule() throws Exception{
		srModule = new SrModule();
		srModuleDao = new SrModuleDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		srModule.setSrModuleId(jsonObject.getInt("srModuleId"));
		srModule.setSrpartNo(jsonObject.getString("srpartNo"));
		srModule.setStype(jsonObject.getString("stype"));
		srModule.setSiout(jsonObject.getString("siout"));
		srModule.setSvdd(jsonObject.getString("svdd"));
		srModule.setSvgs(jsonObject.getString("svgs"));
		srModule.setFreq(jsonObject.getString("freq"));
		srModule.setSrProductPackage(jsonObject.getString("srProductPackage"));
		if (srModuleDao.edit(srModule)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
