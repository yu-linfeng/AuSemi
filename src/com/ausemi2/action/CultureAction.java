package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import com.ausemi2.bean.Culture;
import com.ausemi2.dao.CultureDao;
import com.opensymphony.xwork2.ActionSupport;

public class CultureAction extends ActionSupport {
	private Culture cultures;
	private CultureDao cultureDao;
	private Map flag;
	private String cultureTitle, culture;

	public Culture getCultures() {
		return cultures;
	}
	public void setCultures(Culture cultures) {
		this.cultures = cultures;
	}
	public String getCultureTitle() {
		return cultureTitle;
	}
	public void setCultureTitle(String cultureTitle) {
		this.cultureTitle = cultureTitle;
	}
	public String getCulture() {
		return culture;
	}
	public void setCulture(String culture) {
		this.culture = culture;
	}
	public CultureDao getCultureDao() {
		return cultureDao;
	}
	public void setCultureDao(CultureDao cultureDao) {
		this.cultureDao = cultureDao;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	//查询
	public String findCulture() throws Exception{
		cultures = new Culture();
		cultureDao = new CultureDao();
		cultures = cultureDao.find();
		return SUCCESS;
	}
	//修改
	public String editCulture() throws Exception{
		cultures = new Culture();
		cultureDao = new CultureDao();
		flag = new HashMap<String, Object>();
		cultures.setCultureTitle(cultureTitle);
		cultures.setCulture(culture);
		if (cultureDao.edit(cultures.getCultureTitle(), cultures.getCulture())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
