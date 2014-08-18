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

import com.ausemi2.bean.News;
import com.ausemi2.dao.NewsDao;
import com.opensymphony.xwork2.ActionSupport;

public class NewsAction extends ActionSupport {
	/**
	 * 
	 */
//	private static final long serialVersionUID = 1L;
	public News newss; // 新增、删除新闻
	public NewsDao newsDao;
	public Map<String, Object> flag;
	public String json;
	public JSONObject jsonObject;


	public News getNewss() {
		return newss;
	}

	public void setNewss(News newss) {
		this.newss = newss;
	}

	public NewsDao getNewsDao() {
		return newsDao;
	}

	public void setNewsDao(NewsDao newsDao) {
		this.newsDao = newsDao;
	}

	public JSONObject getJsonObject() {
		return jsonObject;
	}

	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}


	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public Map<String, Object> getFlag() {
		return flag;
	}

	public void setFlag(Map<String, Object> flag) {
		this.flag = flag;
	}

	

	// 返回新闻
	public String allNews() throws Exception {
		flag = new HashMap<String, Object>();
		newsDao = new NewsDao();
		newss = new News();
		newss = newsDao.allNews();
		return SUCCESS;
	}


	//修改
	public String editNews() throws Exception{
		flag = new HashMap<String, Object>();
		newss = new News();
		newsDao = new NewsDao();
		jsonObject = JSONObject.fromObject(json);
//		System.out.println(jsonObject.getString("newsCentre"));
//		System.out.println(jsonObject.getString("news"));
		newss.setNewsCentre(jsonObject.getString("newsCentre"));
		newss.setNews(jsonObject.getString("news"));
		if (newsDao.edit(newss)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
