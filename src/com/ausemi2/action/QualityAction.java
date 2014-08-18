package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import com.ausemi2.bean.Quality;
import com.ausemi2.dao.QualityDao;
import com.opensymphony.xwork2.ActionSupport;

public class QualityAction extends ActionSupport {
	private Quality qualitys;
	private QualityDao qualityDao;
	private Map flag;
	private String qualityTitle, quality;
	public Quality getQualitys() {
		return qualitys;
	}
	public void setQualitys(Quality qualitys) {
		this.qualitys = qualitys;
	}
	public QualityDao getQualityDao() {
		return qualityDao;
	}
	public void setQualityDao(QualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	public String getQualityTitle() {
		return qualityTitle;
	}
	public void setQualityTitle(String qualityTitle) {
		this.qualityTitle = qualityTitle;
	}
	public String getQuality() {
		return quality;
	}
	public void setQuality(String quality) {
		this.quality = quality;
	}
	
	//查询
	public String findQuality() throws Exception{
		qualitys = new Quality();
		qualityDao = new QualityDao();
		qualitys = qualityDao.find();
		return SUCCESS;
	}
	//修改
	public String editQuality() throws Exception{
		flag = new HashMap<String, Object>();
		qualitys = new Quality();
		qualityDao = new QualityDao();

		qualitys.setQuality(quality);
		qualitys.setQualityTitle(qualityTitle);
		if (qualityDao.edit(qualitys.getQualityTitle(), qualitys.getQuality())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
