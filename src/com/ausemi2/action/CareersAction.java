package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import com.ausemi2.bean.Careers;
import com.ausemi2.dao.CareersDao;
import com.opensymphony.xwork2.ActionSupport;

public class CareersAction extends ActionSupport {
	private Careers careerss;
	private CareersDao careersDao;
	private Map flag;
	private String careersTitle, careers;
	public Careers getCareerss() {
		return careerss;
	}
	public void setCareerss(Careers careerss) {
		this.careerss = careerss;
	}
	public CareersDao getCareersDao() {
		return careersDao;
	}
	public void setCareersDao(CareersDao careersDao) {
		this.careersDao = careersDao;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	public String getCareersTitle() {
		return careersTitle;
	}
	public void setCareersTitle(String careersTitle) {
		this.careersTitle = careersTitle;
	}
	public String getCareers() {
		return careers;
	}
	public void setCareers(String careers) {
		this.careers = careers;
	}
	// 查询
	public String findCareers() throws Exception{
		careerss = new Careers();
		careersDao = new CareersDao();
		careerss = careersDao.find();
		return SUCCESS;
	}
	//修改
	public String editCareers() throws Exception{
		careerss = new Careers();
		careersDao = new CareersDao();
		flag = new HashMap<String, Object>();
		careerss.setCareersTitle(careersTitle);
		careerss.setCareers(careers);
		if (careersDao.edit(careerss.getCareersTitle(), careerss.getCareers())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
