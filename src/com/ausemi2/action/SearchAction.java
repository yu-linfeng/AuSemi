package com.ausemi2.action;

import java.util.ArrayList;
import java.util.List;

import com.ausemi2.bean.Search;
import com.ausemi2.dao.SearchDao;
import com.opensymphony.xwork2.ActionSupport;

public class SearchAction extends ActionSupport {
	private String search;
	private List<Search> allSearch;
	private SearchDao searchDao;
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public List<Search> getAllSearch() {
		return allSearch;
	}
	public void setAllSearch(List<Search> allSearch) {
		this.allSearch = allSearch;
	}
	public SearchDao getSearchDao() {
		return searchDao;
	}
	public void setSearchDao(SearchDao searchDao) {
		this.searchDao = searchDao;
	}
	//搜索
	public String find() throws Exception{
		allSearch = new ArrayList<Search>();
		searchDao = new SearchDao();
		allSearch = searchDao.findProduct(search);
		return SUCCESS;
	}
	
	
	
}
