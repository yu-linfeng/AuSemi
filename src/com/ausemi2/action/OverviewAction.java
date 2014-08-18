package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ausemi2.bean.Overview;
import com.ausemi2.dao.OverviewDao;
import com.opensymphony.xwork2.ActionSupport;

public class OverviewAction extends ActionSupport {
	private Overview overviews;
	private OverviewDao overviewDao;
	private JSONObject jsonObject;
	private Map flag;
	private String json;
	private String overviewTitle, overview;
	
	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public Overview getOverviews() {
		return overviews;
	}

	public void setOverviews(Overview overviews) {
		this.overviews = overviews;
	}

	public String getOverviewTitle() {
		return overviewTitle;
	}

	public void setOverviewTitle(String overviewTitle) {
		this.overviewTitle = overviewTitle;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public OverviewDao getOverviewDao() {
		return overviewDao;
	}

	public void setOverviewDao(OverviewDao overviewDao) {
		this.overviewDao = overviewDao;
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

	//查询
	public String findView() throws Exception{
		overviews = new Overview();
		overviewDao = new OverviewDao();
		overviews = overviewDao.find();
		return SUCCESS;
	}
	//修改
	public String editView() throws Exception{
		flag = new HashMap<String, Object>();
		overviews = new Overview();
		overviewDao = new OverviewDao();
//		jsonObject = new JSONObject();
//		jsonObject = JSONObject.fromObject(json);
//		overview.setOverviewTitle( jsonObject.getString("overviewTitle"));
//		overview.setOverview(jsonObject.getString("overview"));
		overviews.setOverview(overview);
		overviews.setOverviewTitle(overviewTitle);
		if (overviewDao.edit(overviews.getOverviewTitle(), overviews.getOverview())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
