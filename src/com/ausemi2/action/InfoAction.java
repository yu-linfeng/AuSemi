package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ausemi2.bean.Info;
import com.ausemi2.dao.InfoDao;
import com.opensymphony.xwork2.ActionSupport;

public class InfoAction extends ActionSupport{
	private Info info;
	private InfoDao infoDao;
	private JSONObject jsonObject;
	private String json, newPwd;
	private Map flag;
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	public String getNewPwd() {
		return newPwd;
	}
	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public Info getInfo() {
		return info;
	}
	public void setInfo(Info info) {
		this.info = info;
	}
	public InfoDao getInfoDao() {
		return infoDao;
	}
	public void setInfoDao(InfoDao infoDao) {
		this.infoDao = infoDao;
	}
	public JSONObject getJsonObject() {
		return jsonObject;
	}
	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}
	//查看管理员信息
	public String checkInfo() throws Exception{
		info = new Info();
		infoDao = new InfoDao();
		info = infoDao.checkInfo();
		return SUCCESS;
	}
	//修改信息
	public String editInfo() throws Exception{
		info = new Info();
		infoDao = new InfoDao();
		flag = new HashMap<String, Object>();
		jsonObject = JSONObject.fromObject(json);
		info.setNameInfo(jsonObject.getString("nameInfo"));
		info.setPwdInfo(jsonObject.getString("pwdInfo"));
		if (infoDao.editInfo(info, newPwd)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		
		return SUCCESS;
	}
}
